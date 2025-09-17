import { Type, GoogleGenAI } from "@google/genai";
import type { ErrorRange, CorrectionPair } from "@/app/types";

export async function POST(req: Request) {
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
        "You are a precise grammar and spelling corrector.",
        "Your task: detect issues in the provided text and propose fixes.",
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
                                start: {
                                    type: Type.INTEGER,
                                },
                                end: {
                                    type: Type.INTEGER,
                                },
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

    const errors: ErrorRange[] = structuredErrors
        .map((e: any) => {
            const start = e.start;
            const end = e.end;
            if (end < start) {
                return null;
            }
            const suggestion = e.suggestion;
            const word = e.original;
            const info = e.comments;
            const type = e.mistakeType;
            return {
                start,
                end,
                suggestion,
                word,
                type,
                info,
            } as ErrorRange;
        })
        .filter((e: ErrorRange | null): e is ErrorRange => Boolean(e));

    console.log(errors);
    console.log(correctedText);

    return new Response(JSON.stringify({ errors }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
