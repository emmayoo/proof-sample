import { GrammarRule } from "@/app/types";

export const SAMPLE_ESSAY = 
`The people in the park was all sitting like very quite \
and then suddenly a dog runned across the grass and it bark so loud. \
everyone look at it but nobody was doing nothing, it just keep run and the owner was like shouting \
“come back here stupid” but he dont listen and then the child start crying cause \
she think the dog going to bite but actually it was just wanting play. \
the weather also not very good, like kind of sunny but cloudy at same time, \
which make it feel annoying atmosphere and i didnt like it much, so i lefted early.\
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