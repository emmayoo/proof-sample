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

export type CorrectionChangeType = "replace" | "insert" | "delete";

export interface CorrectionPair {
  original: string;
  corrected: string;
  originalStart?: number;
  originalEnd?: number;
  correctedStart?: number;
  correctedEnd?: number;
  type: CorrectionChangeType;
}