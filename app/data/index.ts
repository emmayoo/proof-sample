import { GrammarRule } from "@/app/types";

export const SAMPLE_ESSAY = 
`The city was buzzing with people going about they’re lifes, \
shops clozed too early and some resturants didnt even bother too open on time. \
Walking down the street, a dog barked loudly at it’s own shadow, while a group of \
teenagers were laughing way too hard at jokes that made no sense what so ever. \
The weather was kind of chilly, but nobody seem to care, they just kept scrolling on they phones, \
ignoring the trafic noise and the sirens blarring in the backround.
`;

export const RULES: GrammarRule[] = [
  // Spelling
  { type: "spelling", match: "teh", suggestion: "the" },
  { type: "spelling", match: "recieve", suggestion: "receive" },
  { type: "spelling", match: "wierd", suggestion: "weird" },
  { type: "spelling", match: "definately", suggestion: "definitely" },
  { type: "spelling", match: "seperate", suggestion: "separate" },

  // Grammar
  { type: "grammar", match: /I has/g, suggestion: "I have", info: "'I has' → 'I have' (subject-verb agreement)" },
  { type: "grammar", match: /He go/g, suggestion: "He goes", info: "3인칭 단수 시 현재형 동사" },

  // Style / Awkward sentence
  { type: "style", match: /very unique/g, suggestion: "unique", info: "'unique'는 최상급/단독형이므로 'very' 불필요" },
  { type: "style", match: /in order to/g, suggestion: "to", info: "간결하게 표현 가능" },
];