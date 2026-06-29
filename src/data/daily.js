import { stripContentPunctuation } from '../constants/feedback.js';

// â”€â”€ DAILY CHALLENGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DAILY = {
  instruction: "âš¡ Daily Transmission: Write a paragraph that says: Hello Earth!",
  hint1: "Use the <p> tag for regular text",
  hint2: "<p>â€¦your textâ€¦</p>",
  hint3: "<p>Hello Earth!</p>",
  xp: 50,
  smartCheck: (v) => {
    const n = stripContentPunctuation(v.toLowerCase());
    if (!n.trim()) return "empty";
    if (/<p>\s*hello earth[!]?\s*<\/p>/.test(n)) return "pass";
    if (/<p\s*>/.test(n) && !/<\/p>/.test(n)) return "no_close";
    if (!/<p/.test(n)) return "wrong_tag";
    return "generic";
  },
};

export { DAILY };
