import { Type, GoogleGenAI } from "@google/genai";
import type { ErrorRange } from "@/app/types";
import { diff_match_patch } from "diff-match-patch";
import fs from "fs";
import path from "path";

type DiffEdit = { start: number; end: number; original: string; corrected: string };

function computeEditsWithIndices(original: string, corrected: string): DiffEdit[] {
    const dmp = new diff_match_patch();
    dmp.Diff_Timeout = 1.0;
    const diffs = dmp.diff_main(original, corrected);
    dmp.diff_cleanupSemantic(diffs);

    const edits: DiffEdit[] = [];
    let origIdx = 0;

    let curStart: number | null = null;
    let bufDel: string[] = [];
    let bufIns: string[] = [];

    const flush = () => {
        if (curStart === null) return;
        const originalChunk = bufDel.join("");
        const correctedChunk = bufIns.join("");
        const start = curStart;
        const end = start + originalChunk.length;
        if (originalChunk !== correctedChunk) {
            edits.push({ start, end, original: originalChunk, corrected: correctedChunk });
        }
        curStart = null;
        bufDel = [];
        bufIns = [];
    };

    for (const [op, data] of diffs as Array<[number, string]>) {
        if (op === 0) {
            // equal
            flush();
            origIdx += data.length;
        } else if (op === -1) {
            // deletion from original
            if (curStart === null) curStart = origIdx;
            bufDel.push(data);
            origIdx += data.length;
        } else if (op === 1) {
            // insertion into corrected
            if (curStart === null) curStart = origIdx;
            bufIns.push(data);
        }
    }
    flush();
    return edits;
}

function remapErrorsToEdits(
    structuredErrors: any[] | undefined,
    edits: DiffEdit[],
    originalText: string
): ErrorRange[] {
    const result: ErrorRange[] = [];
    if (!structuredErrors?.length) return result;

    const used = new Set<number>();
    let scanFrom = 0;

    const nextUnusedEditIndex = () => {
        for (let i = 0; i < edits.length; i++) if (!used.has(i)) return i;
        return -1;
    };

    for (const e of structuredErrors) {
        const original = e?.original ?? "";
        const suggestion = e?.suggestion ?? "";
        const type = e?.mistakeType ?? "other";
        const info = e?.comments ?? "";

        let mappedStart = -1;
        let mappedEnd = -1;

        // 1) exact match on a whole diff edit
        let idx = -1;
        for (let i = 0; i < edits.length; i++) {
            if (used.has(i)) continue;
            if (edits[i].original === original && edits[i].corrected === suggestion) {
                idx = i;
                break;
            }
        }
        if (idx >= 0) {
            used.add(idx);
            mappedStart = edits[idx].start;
            mappedEnd = edits[idx].end;
        } else {
            // 2) subspan match inside a diff edit
            let subIdx = -1;
            let localStartOffset = 0;
            for (let i = 0; i < edits.length; i++) {
                // allow reusing the same edit for multiple sub-errors
                const ed = edits[i];
                const a = original ? ed.original.indexOf(original) : 0;
                const b = suggestion ? ed.corrected.indexOf(suggestion) : 0;
                const okOriginal = original ? a >= 0 : true;
                const okSuggestion = suggestion ? b >= 0 : true;
                if (okOriginal && okSuggestion) {
                    subIdx = i;
                    localStartOffset = Math.max(0, a);
                    break;
                }
            }
            if (subIdx >= 0) {
                mappedStart = edits[subIdx].start + localStartOffset;
                mappedEnd = mappedStart + original.length; // insertion => len 0, fine
            } else {
                // 3) order-based fallback: grab next unused edit, or brute search in the source
                const i = nextUnusedEditIndex();
                if (i >= 0) {
                    used.add(i);
                    if (original) {
                        const k = originalText.indexOf(original, Math.max(scanFrom, edits[i].start));
                        if (k !== -1) {
                            mappedStart = k;
                            mappedEnd = k + original.length;
                            scanFrom = mappedEnd;
                        } else {
                            mappedStart = edits[i].start;
                            mappedEnd = edits[i].end;
                            scanFrom = mappedEnd;
                        }
                    } else {
                        // pure insertion: position is the edit start
                        mappedStart = edits[i].start;
                        mappedEnd = edits[i].start;
                    }
                } else {
                    // last resort: linear search
                    if (original) {
                        const k = originalText.indexOf(original, scanFrom);
                        mappedStart = k >= 0 ? k : 0;
                        mappedEnd = k >= 0 ? k + original.length : 0;
                        scanFrom = mappedEnd;
                    } else {
                        mappedStart = scanFrom;
                        mappedEnd = scanFrom;
                    }
                }
            }
        }

        result.push({
            start: Math.max(0, mappedStart),
            end: Math.max(0, mappedEnd),
            suggestion,
            word: original,
            type,
            info,
        });
    }

    return result;
}

export async function POST(req: Request) {
    if (process.env.NODE_ENV === "production") {

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({ error: "Missing GEMINI_API_KEY" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
        const genAI = new GoogleGenAI({ apiKey });
        const body = await req.json();
        const originalText = typeof body === "string" ? body : body?.text ?? "";

        if (!originalText || typeof originalText !== "string") {
            return new Response(JSON.stringify({ error: "Missing 'text' in request body" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const system = [
            "You are a precise grammar, spelling, and style corrector.",
            "Your task: detect issues in the provided text and propose fixes.",
            "If two consecutive words are both wrong, fix each of them separately as separate error items.",
            "The issue should go in 'original', the fix in 'suggestion'.",
            "The mistake type should go in 'mistakeType': spelling, grammar, or style",
            "The comments should go in 'comments'.",
            "Use zero-based indices into the ORIGINAL text.",
            "The end index must be exclusive (slice semantics).",
            "If you insert text, set start==end at the insertion point and set original to an empty string.",
        ].join("\n");

        const result = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `${system}\n\nText to analyze:\n${originalText}`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        errors: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    suggestion: {
                                        type: Type.STRING,
                                    },
                                    original: {
                                        type: Type.STRING,
                                    },
                                    mistakeType: {
                                        type: Type.STRING,
                                    },
                                    comments: {
                                        type: Type.STRING,
                                    },
                                },
                            },
                        },
                        correctedText: {
                            type: Type.STRING,
                        },
                    },
                },
            },
        });

        const raw = result.text ?? "{}";
        let parsed: any = {};
        try {
            parsed = JSON.parse(raw);
        } catch {
            parsed = {};
        }

        const structuredErrors = parsed.errors;
        const correctedText = parsed.correctedText

        // 1) Compute deterministic edit spans from diff
        const edits = computeEditsWithIndices(originalText, correctedText);

        // 2) Remap model-provided errors to those spans
        const errors: ErrorRange[] = remapErrorsToEdits(structuredErrors, edits, originalText);
        console.log(errors);
        console.log(correctedText);


        return new Response(JSON.stringify({ errors }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
    const filePath = path.join(process.cwd(), "public", "errors_test.json");
    const data = fs.readFileSync(filePath, "utf8");
    const errors = JSON.parse(data);

    return new Response(JSON.stringify({ errors }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
