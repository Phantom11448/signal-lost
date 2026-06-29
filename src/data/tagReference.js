// ── TAG REFERENCE DATA ────────────────────────────────────────
const TAG_REFERENCE = [
  {
    category: "Text & Headings",
    color: "#ffe94d",
    tags: [
      { tag: "<h1> – <h6>", desc: "Headings — h1 is biggest, h6 is smallest" },
      { tag: "<p>", desc: "Paragraph — a block of regular text" },
      { tag: "<strong>", desc: "Bold text — for important words" },
      { tag: "<em>", desc: "Italic text — for emphasis" },
      { tag: "<br>", desc: "Line break — forces a new line (no closing tag)" },
      { tag: "<hr>", desc: "Horizontal rule — draws a dividing line (no closing tag)" },
      { tag: "<span>", desc: "Inline container — for styling a word or phrase" },
    ],
  },
  {
    category: "Links & Media",
    color: "#00f5c4",
    tags: [
      { tag: "<a>", desc: "Link — use href= to set the destination" },
      { tag: "<img>", desc: "Image — use src= for the file, alt= for description (no closing tag)" },
      { tag: "<video>", desc: "Video player — use src= for the video file" },
      { tag: "<audio>", desc: "Audio player — use src= for the audio file" },
      { tag: "<iframe>", desc: "Embedded window — for YouTube, maps, other pages" },
    ],
  },
  {
    category: "Lists",
    color: "#39ff14",
    tags: [
      { tag: "<ul>", desc: "Unordered list — bullet points" },
      { tag: "<ol>", desc: "Ordered list — numbered" },
      { tag: "<li>", desc: "List item — goes inside <ul> or <ol>" },
    ],
  },
  {
    category: "Structure & Layout",
    color: "#a98dff",
    tags: [
      { tag: "<div>", desc: "Block container — groups elements into sections" },
      { tag: "<header>", desc: "Page header — usually holds logo and nav" },
      { tag: "<nav>", desc: "Navigation — holds links to other pages" },
      { tag: "<main>", desc: "Main content area — the primary content of the page" },
      { tag: "<section>", desc: "A themed section of a page" },
      { tag: "<article>", desc: "Self-contained content — like a blog post" },
      { tag: "<aside>", desc: "Side content — like a sidebar or ad" },
      { tag: "<footer>", desc: "Page footer — usually holds copyright and links" },
    ],
  },
  {
    category: "Forms",
    color: "#ff9f43",
    tags: [
      { tag: "<form>", desc: "Form container — wraps all form elements" },
      { tag: "<input>", desc: "Input field — use type= to set text, email, password, etc (no closing tag)" },
      { tag: "<label>", desc: "Label for an input — describes what the field is for" },
      { tag: "<textarea>", desc: "Multi-line text input — for longer messages" },
      { tag: "<select>", desc: "Dropdown menu" },
      { tag: "<option>", desc: "An option inside a <select> dropdown" },
      { tag: "<button>", desc: "Clickable button — add type=submit to submit a form" },
    ],
  },
  {
    category: "Page Setup",
    color: "#ff4d6d",
    tags: [
      { tag: "<html>", desc: "The root element — wraps the entire page" },
      { tag: "<head>", desc: "Invisible page info — title, styles, meta tags go here" },
      { tag: "<title>", desc: "The text shown in the browser tab" },
      { tag: "<meta>", desc: "Page metadata — charset, description, viewport (no closing tag)" },
      { tag: "<link>", desc: "Links to external files — usually CSS stylesheets (no closing tag)" },
      { tag: "<body>", desc: "Everything visible on the page goes inside here" },
      { tag: "<script>", desc: "JavaScript code — for making pages interactive" },
    ],
  },
];

const WIREFRAME_SECTIONS = [
  {
    tag: "<header>",
    label: "HEADER",
    color: "#ffe94d",
    height: 48,
    desc: "Sits at the very top of every page. Usually holds the site logo, main title, and sometimes the navigation. There's typically only one per page.",
    example: "<header>\n  <h1>My Website</h1>\n</header>",
  },
  {
    tag: "<nav>",
    label: "NAV",
    color: "#00f5c4",
    height: 36,
    desc: "Holds the navigation links — the menu that lets users jump to different pages or sections. Search engines pay special attention to what's in here.",
    example: '<nav>\n  <a href="/home">Home</a>\n  <a href="/about">About</a>\n</nav>',
  },
  {
    tag: "<main>",
    label: "MAIN CONTENT",
    color: "#39ff14",
    height: 120,
    desc: "The primary content of the page — the stuff people actually came to read. There should be exactly ONE <main> per page.",
    example: "<main>\n  <h2>Welcome</h2>\n  <p>This is the main content.</p>\n</main>",
  },
  {
    tag: "<footer>",
    label: "FOOTER",
    color: "#a98dff",
    height: 40,
    desc: "Sits at the very bottom. Usually holds copyright info, contact links, social media links, and legal pages.",
    example: "<footer>\n  <p>© 2026 My Website</p>\n</footer>",
  },
];

export { TAG_REFERENCE, WIREFRAME_SECTIONS };
