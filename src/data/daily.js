import { stripContentPunctuation } from '../constants/feedback.js';

// ── DAILY CHALLENGE ───────────────────────────────────────────
const DAILY = {
  instruction: "⚡ Daily Transmission: Write a paragraph that says: Hello Earth!",
  hint1: "Use the <p> tag for regular text",
  hint2: "<p>…your text…</p>",
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
