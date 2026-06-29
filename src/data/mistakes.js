// ── MISTAKES MUSEUM ───────────────────────────────────────────
const MISTAKES = [
  { title: "The Forgotten Slash", bad: "<p>Hello<p>", good: "<p>Hello</p>", explain: "The closing tag needs a forward slash / before the tag name. Without it the browser thinks you're opening TWO paragraphs!" },
  { title: "The Naked Attribute", bad: '<a href=https://google.com>Link</a>', good: '<a href="https://google.com">Link</a>', explain: 'Attribute values must always be wrapped in quotes. No quotes = the browser gets confused about where the address ends.' },
  { title: "The Runaway Tag", bad: "< p>Hello</p>", good: "<p>Hello</p>", explain: "There's a space after the < symbol. Tags can't have spaces right after the opening bracket — the browser won't recognize it!" },
  { title: "The Missing Bracket", bad: "<p Hello</p>", good: "<p>Hello</p>", explain: "The > at the end of the opening tag is missing. Every opening tag needs a > to close it or the browser can't tell where the tag ends." },
  { title: "The Mismatched Twins", bad: "<h1>Title</h2>", good: "<h1>Title</h1>", explain: "The opening tag is h1 but the closing tag is h2. They must always match — opening and closing tags are a pair!" },
  { title: "The Ghost Image", bad: '<img src="photo.jpg">', good: '<img src="photo.jpg" alt="a photo">', explain: "Missing the alt attribute. Alt text describes the image for people who can't see it — always include it!" },
];

export { MISTAKES };