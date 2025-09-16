export const tokenizeWithIndices = (text: string) => {
  const tokens: { text: string; start: number; end: number; isWord: boolean }[] = [];
  const re = /(\s+)|([^\s]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const tokenText = m[0];
    const start = m.index;
    const end = start + tokenText.length;
    const isWord = !/^\s+$/.test(tokenText);
    tokens.push({ text: tokenText, start, end, isWord });
  }
  return tokens;
}
