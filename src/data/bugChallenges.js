import { stripContentPunctuation } from '../constants/feedback.js';

// â”€â”€ BUG IN THE SYSTEM CHALLENGES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BUG_CHALLENGES = [
  {
    id: "bug1",
    number: 1,
    title: "Bug in the System #1",
    subtitle: "Missions 1 â€” 3",
    unlocksAfter: [1, 2, 3], // mission IDs that must be complete
    xp: 150,
    instruction: [
      "ðŸ›¸ System corruption detected â€” full diagnostic required!",
      "Write an h1 that says: My Alien Page",
      "Write a paragraph that says: I crashed on Earth",
      "Write an unordered list with two items: Need food and Need fuel",
      "Write a button that says: Send Help",
    ],
    hint1: "You need four separate tags â€” h1, p, ul with two li items, and a button",
    hint2: "<h1>...</h1>  <p>...</p>  <ul><li>...</li><li>...</li></ul>  <button>...</button>",
    hint3: "<h1>My Alien Page</h1><p>I crashed on Earth</p><ul><li>Need food</li><li>Need fuel</li></ul><button>Send Help</button>",
    walkthrough: [
      "Write the heading: <h1>My Alien Page</h1>",
      "Write the paragraph: <p>I crashed on Earth</p>",
      "Open the list: <ul>",
      "Add item 1: <li>Need food</li>",
      "Add item 2: <li>Need fuel</li>",
      "Close the list: </ul>",
      "Write the button: <button>Send Help</button>",
    ],
    smartCheck: (v) => {
      const n = stripContentPunctuation(v.toLowerCase());
      if (!n.trim()) return "empty";
      const hasH1 = /<h1>[\s\S]*my alien page[\s\S]*<\/h1>/.test(n);
      const hasP = /<p>[\s\S]*i crashed on earth[\s\S]*<\/p>/.test(n);
      const hasUl = /<ul>[\s\S]*<li>[\s\S]*need food[\s\S]*<\/li>[\s\S]*<li>[\s\S]*need fuel[\s\S]*<\/li>[\s\S]*<\/ul>/.test(n);
      const hasButton = /<button>[\s\S]*send help[\s\S]*<\/button>/.test(n);
      if (hasH1 && hasP && hasUl && hasButton) return "pass";
      if (!hasH1) return "wrong_tag";
      if (!hasP) return "wrong_tag";
      if (!hasUl) return "wrong_tag";
      if (!hasButton) return "wrong_tag";
      return "generic";
    },
  },
  {
    id: "bug2",
    number: 2,
    title: "Bug in the System #2",
    subtitle: "Missions 1 â€” 6",
    unlocksAfter: [1, 2, 3, 4, 5, 6],
    xp: 200,
    instruction: [
      "ðŸ›¸ Multiple systems corrupted â€” rebuild the distress page!",
      "Write a <header> with an h1 that says: Distress Signal",
      "Write a <main> containing a paragraph with the word: URGENT in bold",
      "After the paragraph add a <br> then write: All crew accounted for in italic",
      "Add an unordered list with two items: Fuel depleted and Engine offline",
      "Add a link to https://earth.com that says: Contact Earth",
      "Write a <footer> with a paragraph that says: Transmission from Sector 7",
    ],
    hint1: "header, main with content, then footer â€” semantic layout wrapping everything",
    hint2: "<header><h1>Distress Signal</h1></header><main><p><strong>URGENT</strong><br><em>All crew accounted for</em></p><ul><li>Fuel depleted</li><li>Engine offline</li></ul><a href='https://earth.com'>Contact Earth</a></main><footer><p>Transmission from Sector 7</p></footer>",
    hint3: "<header><h1>Distress Signal</h1></header><main><p><strong>URGENT</strong><br><em>All crew accounted for</em></p><ul><li>Fuel depleted</li><li>Engine offline</li></ul><a href='https://earth.com'>Contact Earth</a></main><footer><p>Transmission from Sector 7</p></footer>",
    walkthrough: [
      "Write the header: <header><h1>Distress Signal</h1></header>",
      "Open main: <main>",
      "Add bold text in a paragraph: <p><strong>URGENT</strong>",
      "Add line break and italic: <br><em>All crew accounted for</em></p>",
      "Add the list: <ul><li>Fuel depleted</li><li>Engine offline</li></ul>",
      "Add the link: <a href='https://earth.com'>Contact Earth</a>",
      "Close main: </main>",
      "Add footer: <footer><p>Transmission from Sector 7</p></footer>",
    ],
    smartCheck: (v) => {
      const n = stripContentPunctuation(v.toLowerCase());
      if (!n.trim()) return "empty";
      const hasHeader = /<header>[\s\S]*<h1>[\s\S]*distress signal[\s\S]*<\/h1>[\s\S]*<\/header>/.test(n);
      const hasStrong = /<strong>[\s\S]*urgent[\s\S]*<\/strong>/.test(n);
      const hasEm = /<em>[\s\S]*all crew accounted for[\s\S]*<\/em>/.test(n);
      const hasList = /<ul>[\s\S]*fuel depleted[\s\S]*engine offline[\s\S]*<\/ul>/.test(n);
      const hasLink = /<a[^>]*href="https:\/\/earth\.com"[^>]*>[\s\S]*contact earth[\s\S]*<\/a>/.test(n);
      const hasFooter = /<footer>[\s\S]*transmission from sector 7[\s\S]*<\/footer>/.test(n);
      if (hasHeader && hasStrong && hasEm && hasList && hasLink && hasFooter) return "pass";
      if (!hasHeader) return "wrong_tag";
      if (!hasStrong) return "wrong_tag";
      if (!hasEm) return "wrong_tag";
      if (!hasList) return "wrong_tag";
      if (!hasLink) return "wrong_tag";
      if (!hasFooter) return "wrong_tag";
      return "generic";
    },
  },
  {
    id: "bug3",
    number: 3,
    title: "Bug in the System #3",
    subtitle: "Missions 1 â€” 9",
    unlocksAfter: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    xp: 250,
    instruction: [
      "ðŸ›¸ Critical system failure â€” rebuild the full crew manifest!",
      "Write a <header> with an h1 that says: Crew Manifest",
      "Write a <main> containing an <article> with an h2 that says: Active Crew",
      "Inside the article add a table with headers: Name and Status",
      "Add two data rows: Commander Zyx / Active and Engineer Blorp / MIA",
      "After the article add an <aside> with a paragraph that says: Last updated: Stardate 2026",
      "Write a <form> with a label for name that says: Your Name and an input with id name and type text and a submit button that says: Join Crew",
      "Write a <footer> with a paragraph that says: Signal Lost â€” Sector 7",
    ],
    hint1: "This one is long â€” take it section by section. Header, then main with article and aside, then form, then footer",
    hint2: "Build it piece by piece â€” header first, then main, then form, then footer",
    hint3: "Check the walkthrough for the full answer",
    walkthrough: [
      "Write: <header><h1>Crew Manifest</h1></header>",
      "Open: <main>",
      "Open article: <article><h2>Active Crew</h2>",
      "Write table: <table><tr><th>Name</th><th>Status</th></tr><tr><td>Commander Zyx</td><td>Active</td></tr><tr><td>Engineer Blorp</td><td>MIA</td></tr></table>",
      "Close article: </article>",
      "Add aside: <aside><p>Last updated: Stardate 2026</p></aside>",
      "Close main: </main>",
      "Write form: <form><label for='name'>Your Name</label><input id='name' type='text'><button>Join Crew</button></form>",
      "Write footer: <footer><p>Signal Lost â€” Sector 7</p></footer>",
    ],
    smartCheck: (v) => {
      const n = stripContentPunctuation(v.toLowerCase());
      if (!n.trim()) return "empty";
      const hasHeader = /<header>[\s\S]*crew manifest[\s\S]*<\/header>/.test(n);
      const hasArticle = /<article>[\s\S]*active crew[\s\S]*<\/article>/.test(n);
      const hasTable = /<table>[\s\S]*<th>[\s\S]*name[\s\S]*<\/th>[\s\S]*<th>[\s\S]*status[\s\S]*<\/th>[\s\S]*<\/table>/.test(n);
      const hasZyx = /<td>[\s\S]*commander zyx[\s\S]*<\/td>/.test(n);
      const hasBlorp = /<td>[\s\S]*engineer blorp[\s\S]*<\/td>/.test(n);
      const hasAside = /<aside>[\s\S]*stardate 2026[\s\S]*<\/aside>/.test(n);
      const hasForm = /<form>[\s\S]*<\/form>/.test(n);
      const hasFooter = /<footer>[\s\S]*signal lost[\s\S]*<\/footer>/.test(n);
      if (hasHeader && hasArticle && hasTable && hasZyx && hasBlorp && hasAside && hasForm && hasFooter) return "pass";
      if (!hasHeader) return "wrong_tag";
      if (!hasArticle) return "wrong_tag";
      if (!hasTable) return "wrong_tag";
      if (!hasAside) return "wrong_tag";
      if (!hasForm) return "wrong_tag";
      if (!hasFooter) return "wrong_tag";
      return "generic";
    },
  },
];

export { BUG_CHALLENGES };
