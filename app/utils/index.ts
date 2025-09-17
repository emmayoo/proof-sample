export const tokenizeWithIndices = (text: string) => {
  const tokens: { text: string; start: number; end: number; isWord: boolean }[] = [];
  const re = /(\s+)|([^\s]+)/g;
  
  let m: RegExpExecArray | null;
  
  while ((m = re.exec(text)) !== null) {
    const tokenText = m[0];
    const start = m.index;
    const end = start + tokenText.length;
    const isWord = /^\w+$/.test(tokenText);
    tokens.push({ text: tokenText, start, end, isWord });
  }
  return tokens;
}

const tokenizeWordsOnly = (text: string): { text: string; start: number; end: number }[] => {
  const tokens = tokenizeWithIndices(text).filter(t => t.isWord);
  return tokens.map(({ text, start, end }) => ({ text, start, end }));
}

// A simple diff algorithm over word tokens that groups consecutive edits
export const computeWordDiffPairs = (
  originalText: string,
  correctedText: string
) => {
  const a = tokenizeWordsOnly(originalText);
  const b = tokenizeWordsOnly(correctedText);

  const n = a.length;
  const m = b.length;

  // LCS DP table
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (a[i].text === b[j].text) dp[i][j] = dp[i + 1][j + 1] + 1;
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  // Backtrack to build edit script
  type Step = { type: "keep" | "delete" | "insert"; ai?: number; bj?: number };
  const steps: Step[] = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i].text === b[j].text) {
      steps.push({ type: "keep", ai: i, bj: j });
      i++; j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      steps.push({ type: "delete", ai: i });
      i++;
    } else {
      steps.push({ type: "insert", bj: j });
      j++;
    }
  }
  while (i < n) { steps.push({ type: "delete", ai: i }); i++; }
  while (j < m) { steps.push({ type: "insert", bj: j }); j++; }

  // Group consecutive edits into pairs
  type Pair = {
    original: string;
    corrected: string;
    originalStart?: number;
    originalEnd?: number;
    correctedStart?: number;
    correctedEnd?: number;
    type: "replace" | "insert" | "delete";
  };

  const pairs: Pair[] = [];
  let currDel: typeof a = [] as any;
  let currIns: typeof b = [] as any;

  const flush = () => {
    if (currDel.length === 0 && currIns.length === 0) return;
    const original = currDel.map(t => t.text).join(" ");
    const corrected = currIns.map(t => t.text).join(" ");
    const type = currDel.length > 0 && currIns.length > 0 ? "replace" : (currDel.length > 0 ? "delete" : "insert");
    const originalStart = currDel.length ? currDel[0].start : undefined;
    const originalEnd = currDel.length ? currDel[currDel.length - 1].end : undefined;
    const correctedStart = currIns.length ? currIns[0].start : undefined;
    const correctedEnd = currIns.length ? currIns[currIns.length - 1].end : undefined;
    pairs.push({ original, corrected, originalStart, originalEnd, correctedStart, correctedEnd, type });
    currDel = [] as any;
    currIns = [] as any;
  }

  for (const s of steps) {
    if (s.type === "keep") {
      flush();
    } else if (s.type === "delete") {
      currDel.push(a[s.ai!]);
    } else if (s.type === "insert") {
      currIns.push(b[s.bj!]);
    }
  }
  flush();

  // Only return meaningful pairs (non-empty change)
  return pairs.filter(p => (p.type !== "replace" || p.original !== p.corrected));
}
