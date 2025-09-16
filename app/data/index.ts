import { GrammarRule } from "@/app/types";

export const SAMPLE_ESSAY = 
`This is teh sample text with some recieve and wierd mistakes. 
I has a plan to go there, but it might not work out. 
He go to the market every morning. 
This is a very unique opportunity in order to learn more. 
Sometimes people definately forget to seperate their tasks properly. 
It is important to use correct grammar in order to communicate clearly. 
I has never seen such a wierd combination of words before. 
Trying to write in a very unique style can sometimes confuse readers. 
Remember to always recieve feedback and apply it wisely. 
Even small mistakes like teh wrong spelling can affect readability. 
Many students struggle with writing coherent sentences in order to express ideas clearly. 
Teachers often point out grammar mistakes like I has and He go in their essays. 
Improving writing skills requires practice, feedback, and a very unique approach to each topic. 
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