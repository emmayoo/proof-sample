export type GrammarErrorType = "spelling" | "grammar" | "style";

export interface GrammarRule {
  type: GrammarErrorType;
  match: string | RegExp;
  suggestion?: string;
  info?: string;
}

export interface ErrorRange {
  start: number;
  end: number;
  suggestion?: string;
  word: string;
  type: GrammarErrorType;
  info?: string;
}