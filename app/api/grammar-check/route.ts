import { RULES } from "@/app/data";
import type { GrammarRule }  from "@/app/types";

export async function POST(req: Request) {
  const { text } = await req.json();
  const errors: { start: number; end: number; suggestion?: string; word: string; type: string; info?: string }[] = [];

  RULES.forEach((rule: GrammarRule) => {
    if (typeof rule.match === "string") {
      let idx = text.indexOf(rule.match);
      while (idx !== -1) {
        errors.push({
          start: idx,
          end: idx + rule.match.length,
          suggestion: rule.suggestion,
          word: text.slice(idx, idx + rule.match.length),
          type: rule.type,
          info: rule.info,
        });
        idx = text.indexOf(rule.match, idx + 1);
      }
    } else if (rule.match instanceof RegExp) {
      let m: RegExpExecArray | null;
      while ((m = rule.match.exec(text)) !== null) {
        errors.push({
          start: m.index,
          end: m.index + m[0].length,
          suggestion: rule.suggestion,
          word: m[0],
          type: rule.type,
          info: rule.info,
        });
      }
    }
  });

  return new Response(JSON.stringify({ errors }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}