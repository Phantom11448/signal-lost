import React, { useState, useEffect, useRef } from "react";

// ── GOOGLE FONTS ──────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;600;700&family=Share+Tech+Mono&display=swap";
document.head.appendChild(fontLink);

const FONTS = {
  heading: "'Orbitron', sans-serif",
  body: "'Exo 2', system-ui, sans-serif",
  mono: "'Share Tech Mono', 'Courier New', monospace",
};

const ALIEN_BULLETS = ["👽", "🛸", "👾", "🪐", "🌍"];
function randomBullet() {
  return ALIEN_BULLETS[Math.floor(Math.random() * ALIEN_BULLETS.length)];
}

// Strip punctuation from text content between tags only, preserving tag syntax
function stripContentPunctuation(str) {
  return str.replace(/>([^<]*)</g, (match, content) => {
    return ">" + content.replace(/[!?,;:]/g, "") + "<";
  }).replace(/[!?,;:]\s*$/g, ""); // strip trailing punctuation but NOT periods
}

// ── ALIEN COLOR PALETTE ───────────────────────────────────────
const C = {
  bg: "#020b18",
  surface: "#041528",
  card: "#061d35",
  border: "#0a3555",
  accent: "#00f5c4",
  accentDim: "#00f5c422",
  alien: "#39ff14",
  alienDim: "#39ff1422",
  alienDim: "#39ff1422",
  gold: "#ffe94d",
  goldDim: "#ffe94d22",
  red: "#ff4d6d",
  redDim: "#ff4d6d22",
  textPrimary: "#c8f0ff",
  textMuted: "#4a7fa0",
  tagBg: "#031a2e",
  tagText: "#00f5c4",
  glowAccent: "0 0 12px #00f5c488",
  glowAlien: "0 0 12px #39ff1488",
};

// ── STARS BACKGROUND ──────────────────────────────────────────
function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.7 + 0.2,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.map((s, i) => (
        <div key={i} style={{
          position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size, borderRadius: "50%",
          background: "#fff", opacity: s.opacity,
        }} />
      ))}
    </div>
  );
}

// ── FULLSCREEN CODE MODAL ─────────────────────────────────────
function CodeModal({ code, onClose }) {
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)",
      zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, boxSizing: "border-box",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: C.surface, border: `1px solid ${C.accent}66`, borderRadius: 14,
        width: "100%", maxWidth: 560, maxHeight: "80vh", overflow: "hidden",
        display: "flex", flexDirection: "column",
        boxShadow: C.glowAccent,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: `1px solid ${C.border}` }}>
          <span style={{ color: C.accent, fontSize: 12, fontFamily: FONTS.mono, letterSpacing: 2 }}>// TRANSMISSION CODE</span>
          <button onClick={onClose} style={{ background: C.card, border: `1px solid ${C.border}`, color: C.textPrimary, borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 13 }}>✕ Close</button>
        </div>
        <pre style={{
          margin: 0, padding: "20px 16px", overflowY: "auto",
          fontFamily: FONTS.mono,
          fontSize: 14, color: C.tagText, whiteSpace: "pre-wrap", wordBreak: "break-all", lineHeight: 1.8,
        }}>{code}</pre>
      </div>
    </div>
  );
}

// ── TAG ANATOMY ───────────────────────────────────────────────
function TagAnatomy({ parts, slideKey }) {
  const [active, setActive] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => { setActive(null); }, [slideKey]);
  const plainCode = parts.map((p) => p.text).join("");
  return (
    <div style={{ margin: "16px 0" }}>
      <div style={{
        background: C.tagBg, border: `1px solid ${C.accent}44`, borderRadius: 10,
        padding: "14px 12px", paddingBottom: 36, fontFamily: FONTS.mono,
        fontSize: 13, position: "relative", overflowX: "auto",
        marginBottom: 12, boxSizing: "border-box", width: "100%",
      }}>
        <div style={{ whiteSpace: "pre", lineHeight: 1.8 }}>
        {parts.map((p, i) => (
          <span key={i} onClick={() => setActive(active === i ? null : i)} style={{
            color: active === i ? "#020b18" : p.color || C.tagText,
            background: active === i ? p.highlight || C.accent : "transparent",
            borderRadius: 4, padding: "1px 2px", cursor: "pointer", transition: "all 0.15s",
            opacity: active !== null && active !== i ? 0.3 : 1,
          }}>{p.text.replace(/\n/g, " ")}</span>
        ))}
        </div>
        <button onClick={() => setShowModal(true)} style={{
          position: "absolute", bottom: 8, right: 8,
          background: C.surface, border: `1px solid ${C.accent}44`,
          color: C.accent, borderRadius: 5, padding: "2px 7px",
          fontSize: 10, cursor: "pointer", letterSpacing: 1,
        }}>⛶ FULL</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {parts.map((p, i) => (
          <div key={i} onClick={() => setActive(active === i ? null : i)} style={{
            background: active === i ? `${p.highlight || C.accent}18` : C.card,
            border: `1.5px solid ${active === i ? (p.highlight || C.accent) : C.border}`,
            borderRadius: 8, padding: "7px 11px", cursor: "pointer", transition: "all 0.2s",
            flexShrink: 0, maxWidth: "calc(50% - 4px)", boxSizing: "border-box",
          }}>
            <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: p.color || C.tagText, marginBottom: 3, wordBreak: "break-all" }}>{p.label}</div>
            <div style={{ fontSize: 12, color: active === i ? C.textPrimary : C.textMuted, lineHeight: 1.4 }}>{p.explain}</div>
          </div>
        ))}
      </div>
      <p style={{ color: C.textMuted, fontSize: 11, marginTop: 6 }}>👾 tap any part to scan it</p>
      {showModal && <CodeModal code={plainCode} onClose={() => setShowModal(false)} />}
    </div>
  );
}

// ── CODE BLOCK ────────────────────────────────────────────────
function CodeBlock({ code }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div style={{ position: "relative", margin: "16px 0" }}>
      <pre style={{
        background: C.tagBg, border: `1px solid ${C.accent}44`, borderRadius: 10,
        padding: "14px 12px", paddingBottom: 36,
        fontFamily: FONTS.mono,
        fontSize: 13, color: C.tagText,
        whiteSpace: "pre-wrap", wordBreak: "break-all",
        overflowX: "hidden", margin: 0, lineHeight: 1.8,
        boxSizing: "border-box", width: "100%",
      }}>{code}</pre>
      <button onClick={() => setShowModal(true)} style={{
        position: "absolute", bottom: 8, right: 8,
        background: C.surface, border: `1px solid ${C.accent}44`,
        color: C.accent, borderRadius: 5, padding: "2px 7px",
        fontSize: 10, cursor: "pointer", letterSpacing: 1,
      }}>⛶ FULL</button>
      {showModal && <CodeModal code={code} onClose={() => setShowModal(false)} />}
    </div>
  );
}

// ── INTERACTIVE CODE BLOCK (for "Putting it Together" slides) ─
function InteractiveCodeBlock({ code }) {
  const [editableCode, setEditableCode] = useState(code);
  const [showModal, setShowModal] = useState(false);
  const [isWide, setIsWide] = useState(window.innerWidth > 600);
  const iframeRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsWide(window.innerWidth > 600);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;
    try {
      doc.open();
      doc.write(`<html><head><style>
        body{font-family:system-ui,sans-serif;padding:12px;color:#1a1828;background:#f0fff8;margin:0;font-size:14px;}
        h1,h2,h3{margin:0 0 6px;color:#020b18;}p{margin:0 0 6px;}a{color:#7c5cfc;}
        ul,ol{margin:0 0 6px;padding-left:20px;}li{margin-bottom:2px;}
        button{background:#00b894;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:14px;}
        strong{font-weight:700;}em{font-style:italic;}hr{border:none;border-top:2px solid #ccc;margin:8px 0;}
        input,select,textarea{border:1px solid #ccc;padding:6px 10px;border-radius:4px;font-size:13px;margin:4px 0;display:block;width:100%;box-sizing:border-box;}
        label{font-size:13px;font-weight:600;margin-top:6px;display:block;}
        form{background:#f0f0f0;padding:10px;border-radius:6px;margin-bottom:6px;}
        table{border-collapse:collapse;width:100%;margin:4px 0;}
        td,th{border:1px solid #ccc;padding:5px 8px;text-align:left;font-size:13px;}
        th{background:#e0e0e0;font-weight:700;}
        header{background:#e8f4fd;padding:8px;border-radius:4px;margin-bottom:6px;}
        nav{background:#fef9e7;padding:6px;border-radius:4px;margin-bottom:6px;}
        main{background:#f9f9f9;padding:8px;border-radius:4px;margin-bottom:6px;}
        footer{background:#f0f0f0;padding:6px;border-radius:4px;font-size:12px;}
        aside{background:#fff3e0;padding:8px;border-radius:4px;border-left:3px solid #ff9f43;margin-bottom:6px;}
        article{background:#f5f5f5;padding:8px;border-radius:4px;margin-bottom:6px;}
        figure{margin:0 0 8px;}figcaption{font-size:11px;color:#666;margin-top:3px;}
      </style></head><body>${editableCode}</body></html>`);
      doc.close();
    } catch(e) {}
  }, [editableCode]);

  return (
    <div style={{ margin: "16px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ color: C.accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, fontFamily: FONTS.mono }}>🛸 Live Schematic — edit and see it change</span>
        <button onClick={() => setEditableCode(code)} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 6, padding: "2px 8px", fontSize: 11, cursor: "pointer" }}>Reset</button>
      </div>

      <div style={{ display: "flex", flexDirection: isWide ? "row" : "column", gap: 10 }}>
        {/* code editor */}
        <div style={{ position: "relative", flex: 1 }}>
          <textarea
            value={editableCode}
            onChange={(e) => setEditableCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                const start = e.target.selectionStart;
                const end = e.target.selectionEnd;
                const newVal = editableCode.substring(0, start) + "  " + editableCode.substring(end);
                setEditableCode(newVal);
                setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = start + 2; }, 0);
              }
            }}
            style={{
              width: "100%", boxSizing: "border-box",
              height: isWide ? 260 : 180,
              background: C.tagBg, color: C.tagText,
              border: `1px solid ${C.accent}44`, borderRadius: 10,
              padding: "12px 14px", fontFamily: FONTS.mono,
              fontSize: 12, resize: "vertical", outline: "none",
              lineHeight: 1.8, paddingBottom: 32,
            }}
          />
          <button onClick={() => setShowModal(true)} style={{
            position: "absolute", bottom: 8, right: 8,
            background: C.surface, border: `1px solid ${C.accent}44`,
            color: C.accent, borderRadius: 5, padding: "2px 7px",
            fontSize: 10, cursor: "pointer", letterSpacing: 1,
          }}>⛶ FULL</button>
        </div>

        {/* live preview */}
        <div style={{ flex: 1 }}>
          <p style={{ color: C.accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 6px", fontFamily: FONTS.mono }}>📡 Transmission Preview</p>
          <iframe ref={iframeRef} title="interactive-preview" style={{
            width: "100%", height: isWide ? 260 : 200,
            border: `1px solid ${C.accent}44`,
            borderRadius: 10, background: "#f0fff8",
          }} sandbox="allow-same-origin" />
        </div>
      </div>
      {showModal && <CodeModal code={editableCode} onClose={() => setShowModal(false)} />}
    </div>
  );
}


// ── MISSIONS (LEVELS) DATA ────────────────────────────────────
// Each theory slide now has its own miniChallenge.
// After all slides, a final bossChallenge combines everything.
const MISSIONS = [
  {
    id: 1,
    title: "Repair the Antenna",
    subtitle: "Tags & Headings",
    badge: "📡",
    badgeName: "Antenna Core",
    shipPart: "ANTENNA MODULE",
    storyIntro: "Your ship's antenna is offline. To send any signal, you must first learn the basic building blocks of human web communication — HTML tags.",
    theory: [
      {
        heading: "Fix the Phasers",
        body: "Think of HTML tags like a label gun at a warehouse. You wrap a label around something so everyone knows what it is. The label has two parts — one that says where it starts and one that says where it ends. Everything in between is the content. There are lots of different tags, each with a different job: <h1> for big titles, <p> for regular sentences, <button> for clickable buttons. They all follow the same pattern: open it, put your content in, close it.",
        anatomy: [
          { text: "<h1>", color: "#ffe94d", highlight: "#ffe94d", label: "<h1> opening tag", explain: "Opens the tag — the tag name tells the browser what this content IS" },
          { text: "Hello Earth", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "Whatever you want to show — text, words, anything" },
          { text: "</h1>", color: "#ffe94d", highlight: "#ffe94d", label: "</h1> closing tag", explain: "Closes the tag — the / means 'this tag ends here'. Must match the opening tag" },
        ],
        miniChallenge: {
          id: "m1a", xp: 20,
          instruction: ["Fix the phasers! Wrap the word: Hello — in ANY tag you like. Pick one:", "<h1>Hello</h1>", "<p>Hello</p>", "<h2>Hello</h2>"],
          hint1: "Try: <p>Hello</p> or <h1>Hello</h1>",
          hint2: "<p>Hello</p>",
          hint3: "<p>Hello</p>",
          walkthrough: ["Pick any tag — let's use <p>", "Type: <p>", "Add the word: Hello", "Close it: </p>", "Full answer: <p>Hello</p>"],
          smartCheck: (v) => {
            const n = v.toLowerCase().replace(/[.!?,]/g, "");
            if (!n.trim()) return "empty";
            if (/<[a-z][a-z0-9]*>\s*hello\s*<\/[a-z][a-z0-9]*>/.test(n)) return "pass";
            if (/<[a-z]+>/.test(n) && !/<\/[a-z]+>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Reboot the Holographic Display",
        body: "Headings work like the text on a movie poster. The big title at the top is huge — that is h1. The actor names underneath are medium — that is h2 or h3. The fine print at the bottom that nobody reads — that is h6. The browser automatically makes h1 the biggest and h6 the smallest. You just pick the right number for how important that heading is.",
        anatomy: [
          { text: "<h1>", color: "#ffe94d", highlight: "#ffe94d", label: "<h1>", explain: "The biggest heading — like the title of a transmission" },
          { text: "DISTRESS SIGNAL", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "Whatever you want the heading to say" },
          { text: "</h1>", color: "#ffe94d", highlight: "#ffe94d", label: "</h1>", explain: "Closes THIS heading — every tag you open, you must close with a matching tag" },
        ],
        miniChallenge: {
          id: "m1b", xp: 20,
          instruction: "Reboot the holographic display! Write an h1 heading that says: My First Page",
          hint1: "Use <h1> for the biggest heading",
          hint2: "<h1>…</h1>",
          hint3: "<h1>My First Page</h1>",
          walkthrough: ["Open with: <h1>", "Type: My First Page", "Close with: </h1>", "Full answer: <h1>My First Page</h1>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<h1>\s*my first page\s*<\/h1>/.test(n)) return "pass";
            if (/<h1\s*>/.test(n) && !/<\/h1>/.test(n)) return "no_close";
            if (!/<h1/.test(n)) return "wrong_tag";
            if (/<h1>[^<]*<\/h1>/.test(n)) return "wrong_text";
            return "generic";
          },
        },
      },
      {
        heading: "Hack the Mainframe",
        body: "A <p> tag is like a paragraph in a book or newspaper — it is one block of regular readable text. Every time you start a new topic or new block of sentences, you wrap it in its own <p> tag. The browser adds a little space between paragraphs automatically so they do not all run together.",
        anatomy: [
          { text: "<p>", color: "#00f5c4", highlight: "#00f5c4", label: "<p>", explain: "Opens a paragraph" },
          { text: "Help! My ship has crashed on sector 7.", color: "#c8f0ff", highlight: "#39ff14", label: "your text", explain: "Normal readable text goes here" },
          { text: "</p>", color: "#00f5c4", highlight: "#00f5c4", label: "</p>", explain: "Closes THIS paragraph — the name inside must always match your opening tag" },
        ],
        miniChallenge: {
          id: "m1c", xp: 20,
          instruction: "Hack the mainframe! Write a paragraph that says: I am learning HTML!",
          hint1: "Use the <p> tag for normal text",
          hint2: "<p>…</p>",
          hint3: "<p>I am learning HTML!</p>",
          walkthrough: ["Open with: <p>", "Type: I am learning HTML!", "Close with: </p>", "Full answer: <p>I am learning HTML!</p>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<p>\s*i am learning html[!]?\s*<\/p>/.test(n)) return "pass";
            if (/<p\s*>/.test(n) && !/<\/p>/.test(n)) return "no_close";
            if (!/<p/.test(n)) return "wrong_tag";
            if (/<p>[^<]*<\/p>/.test(n)) return "wrong_text";
            return "generic";
          },
        },
      },
    ],
    bossChallenge: {
      id: "boss1", xp: 50,
      instruction: ["🛸 Reactivate the beacon!", "Write an h2 heading that says: About Me", "Then write a paragraph that says: I come in peace."],
      hint1: "You need two tags — an h2 heading and then a <p> paragraph below it",
      hint2: "<h2>About Me</h2>  then  <p>I come in peace.</p>",
      hint3: "<h2>About Me</h2><p>I come in peace.</p>",
      walkthrough: ["Write the heading: <h2>About Me</h2>", "Then write the paragraph: <p>I come in peace.</p>", "Full answer: <h2>About Me</h2><p>I come in peace.</p>"],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        if (/<h2>\s*about me\s*<\/h2>/.test(n) && /<p>\s*i come in peace[.]?\s*<\/p>/.test(n)) return "pass";
        if (!/<h2/.test(n)) return "wrong_tag";
        if (!/<p/.test(n)) return "wrong_tag";
        return "generic";
      },
    },
  },
  {
    id: 2,
    title: "Restore the Nav System",
    subtitle: "Links & Images",
    badge: "🛸",
    badgeName: "Nav Core",
    shipPart: "NAVIGATION MODULE",
    storyIntro: "Antenna online! Now your navigation system needs repairs. You need to learn how to create links and load images — the coordinates and star maps of the web.",
    theory: [
      {
        heading: "Override the Tractor Beam",
        body: "Some tags need extra instructions — like a shipping label that says FRAGILE or THIS SIDE UP. Those extra instructions are called attributes. They live inside the opening tag and always follow this pattern: name=\"value\". The name says what kind of instruction it is, and the value in quotes says what the instruction actually is.",
        anatomy: [
          { text: "<a ", color: "#00f5c4", highlight: "#00f5c4", label: "<a", explain: "Opens a link tag (a stands for anchor — like anchoring a ship to a location)" },
          { text: "href=", color: "#ffe94d", highlight: "#ffe94d", label: "href=", explain: "An attribute — tells the browser where the link goes" },
          { text: '"https://google.com"', color: "#39ff14", highlight: "#39ff14", label: '"address"', explain: "The web address — always wrapped in quotes" },
          { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the opening tag — link content starts now" },
          { text: "Click me!", color: "#c8f0ff", highlight: "#a98dff", label: "link text", explain: "The words humans see and click on the page" },
          { text: "</a>", color: "#00f5c4", highlight: "#00f5c4", label: "</a>", explain: "Closes THIS link — matches the <a> you opened" },
        ],
        miniChallenge: {
          id: "m2a", xp: 25,
          instruction: "Override the tractor beam! Write a link that goes to https://google.com and says: Visit Google",
          hint1: "Links use <a> with an href attribute inside the opening tag",
          hint2: '<a href="https://google.com">…</a>',
          hint3: '<a href="https://google.com">Visit Google</a>',
          walkthrough: ['Start the tag: <a', 'Add the href: href="https://google.com"', 'Close the opening tag: >', 'Add link text: Visit Google', 'Close it: </a>', 'Full answer: <a href="https://google.com">Visit Google</a>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (!/<a/.test(n)) return "wrong_tag";
            if (/<a/.test(n) && !/<\/a>/.test(n)) return "no_close";
            if (!/href/.test(n)) return "no_href";
            if (/href/.test(n) && !/google/.test(n)) return "wrong_href";
            if (/<a[^>]*href="https:\/\/google\.com"[^>]*>\s*visit google\s*<\/a>/.test(n)) return "pass";
            return "wrong_text";
          },
        },
      },
      {
        heading: "Deploy the Recon Probe",
        body: "Adding an image is like taping a photo to a wall. The src attribute is the address of where the photo lives — either on your computer or somewhere on the internet. The alt attribute is a caption you write for people who cannot see the image — maybe they are blind and using a screen reader, or maybe the image failed to load. Always include both.",
        anatomy: [
          { text: "<img ", color: "#00f5c4", highlight: "#00f5c4", label: "<img", explain: "The image tag — no closing tag needed, it stands alone!" },
          { text: "src=", color: "#ffe94d", highlight: "#ffe94d", label: "src=", explain: "Short for 'source' — the address of the image file" },
          { text: '"photo.jpg" ', color: "#39ff14", highlight: "#39ff14", label: '"image address"', explain: "Where the image is stored" },
          { text: "alt=", color: "#ffe94d", highlight: "#ffe94d", label: "alt=", explain: "A plain-words description of the image for those who can't see it" },
          { text: '"a photo"', color: "#39ff14", highlight: "#39ff14", label: '"description"', explain: "Describe what the image shows" },
          { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the tag — no </img> needed, this one stands alone" },
        ],
        miniChallenge: {
          id: "m2b", xp: 25,
          instruction: 'Deploy the recon probe! Write an image tag with src="photo.jpg" and alt="my photo"',
          hint1: "Image tags use <img> and don't need a closing tag",
          hint2: '<img src="…" alt="…">',
          hint3: '<img src="photo.jpg" alt="my photo">',
          walkthrough: ['Start with: <img', 'Add src: src="photo.jpg"', 'Add alt: alt="my photo"', 'Close it: >', 'Full answer: <img src="photo.jpg" alt="my photo">'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (!/<img/.test(n)) return "wrong_tag";
            if (!/src/.test(n)) return "no_src";
            if (!/alt/.test(n)) return "no_alt";
            if (/<img[^>]*src="photo\.jpg"[^>]*alt="my photo"[^>]*>/.test(n) || /<img[^>]*alt="my photo"[^>]*src="photo\.jpg"[^>]*>/.test(n)) return "pass";
            return "generic";
          },
        },
      },
      {
        heading: "Recalibrate the Warp Core",
        body: "Now you know how to make a door people can walk through (links) and hang photos on the wall (images). Here is what a real page looks like when you combine both of those with a heading:",
        codeBlock: `<h1>Alien Distress Signal</h1>\n<a href="https://google.com">Contact Earth</a>\n<img src="crash-site.jpg" alt="crash site photo">`,
        miniChallenge: {
          id: "m2c", xp: 25,
          instruction: 'Recalibrate the warp core! Write an h2 that says "My Links" — then below it a link to https://nasa.gov that says: Contact NASA',
          hint1: "You need two tags — an h2 heading and then an <a> link below it",
          hint2: '<h2>My Links</h2>  then  <a href="https://nasa.gov">…</a>',
          hint3: '<h2>My Links</h2><a href="https://nasa.gov">Contact NASA</a>',
          walkthrough: ['Write the heading: <h2>My Links</h2>', 'Start the link: <a', 'Add href: href="https://nasa.gov"', 'Add text and close: >Contact NASA</a>', 'Full answer: <h2>My Links</h2><a href="https://nasa.gov">Contact NASA</a>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (!/<h2/.test(n)) return "missing_h2";
            if (!/<a/.test(n)) return "missing_link";
            if (/<h2>\s*my links\s*<\/h2>/.test(n) && /<a[^>]*href="https:\/\/nasa\.gov"[^>]*>\s*contact nasa\s*<\/a>/.test(n)) return "pass";
            return "generic";
          },
        },
      },
    ],
    bossChallenge: {
      id: "boss2", xp: 50,
      instruction: ["🛸 Engage the hyperspace relay!", "Write an h1 that says: My Signal Page", "Write a link to https://google.com that says: Earth Search", 'Write an image with src="alien.jpg" and alt="alien ship"'],
      hint1: "Three tags — an h1, then an <a> link, then an <img>",
      hint2: '<h1>…</h1>  <a href="…">…</a>  <img src="…" alt="…">',
      hint3: '<h1>My Signal Page</h1><a href="https://google.com">Earth Search</a><img src="alien.jpg" alt="alien ship">',
      walkthrough: ['Write: <h1>My Signal Page</h1>', 'Then: <a href="https://google.com">Earth Search</a>', 'Then: <img src="alien.jpg" alt="alien ship">', 'Put all three together on separate lines'],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasH1 = /<h1>\s*my signal page\s*<\/h1>/.test(n);
        const hasLink = /<a[^>]*href="https:\/\/google\.com"[^>]*>\s*earth search\s*<\/a>/.test(n);
        const hasImg = /<img[^>]*src="alien\.jpg"[^>]*alt="alien ship"[^>]*>/.test(n) || /<img[^>]*alt="alien ship"[^>]*src="alien\.jpg"[^>]*>/.test(n);
        if (hasH1 && hasLink && hasImg) return "pass";
        if (!hasH1) return "wrong_text";
        if (!hasLink) return "missing_link";
        if (!hasImg) return "no_src";
        return "generic";
      },
    },
  },
  {
    id: 3,
    title: "Power the Life Support",
    subtitle: "Lists & Buttons",
    badge: "⚡",
    badgeName: "Power Core",
    shipPart: "POWER MODULE",
    storyIntro: "Navigation online! Your life support systems are flickering. To stabilize them you need to organize your distress data into lists and add an emergency contact button.",
    theory: [
      {
        heading: "Defrag the Memory Banks",
        body: "An unordered list is like a grocery list on your fridge. The order does not matter — milk, eggs, bread, whatever order you write them is fine. Each item gets a bullet point automatically. The <ul> is the whole list, and each <li> is one item on that list. The li tags live INSIDE the ul — like items inside a bag.",
        anatomy: [
          { text: "<ul>", color: "#ffe94d", highlight: "#ffe94d", label: "<ul>", explain: "Opens the list — ul means unordered list (bullet points)" },
          { text: "<li>", color: "#00f5c4", highlight: "#00f5c4", label: "<li>", explain: "Opens one list item — li means list item" },
          { text: "Oxygen low", color: "#c8f0ff", highlight: "#39ff14", label: "item text", explain: "The text that shows up as a bullet point" },
          { text: "</li>", color: "#00f5c4", highlight: "#00f5c4", label: "</li>", explain: "Closes THIS list item — each <li> needs its own closing tag" },
          { text: "</ul>", color: "#ffe94d", highlight: "#ffe94d", label: "</ul>", explain: "Closes the whole list — must come after ALL your list items" },
        ],
        miniChallenge: {
          id: "m3a", xp: 25,
          instruction: "Defrag the memory banks! Write an unordered list with two items: Apples and Bananas",
          hint1: "You need a <ul> tag on the outside and <li> tags inside it",
          hint2: "<ul><li>…</li><li>…</li></ul>",
          hint3: "<ul><li>Apples</li><li>Bananas</li></ul>",
          walkthrough: ["Open the list: <ul>", "Add first item: <li>Apples</li>", "Add second item: <li>Bananas</li>", "Close the list: </ul>", "Full answer: <ul><li>Apples</li><li>Bananas</li></ul>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (!/<ul/.test(n)) return "no_ul";
            if (!/<li/.test(n)) return "no_li";
            if (/<ul/.test(n) && !/<\/ul>/.test(n)) return "no_close";
            if (/<ul[\s\S]*<li[\s\S]*apples[\s\S]*<\/li>[\s\S]*<li[\s\S]*bananas[\s\S]*<\/li>[\s\S]*<\/ul>/.test(n)) return "pass";
            if (!/apples/.test(n) || !/bananas/.test(n)) return "wrong_text";
            return "generic";
          },
        },
      },
      {
        heading: "Override the Autopilot",
        body: "An ordered list is like a recipe or a how-to guide — the order matters. Step 1 before step 2, always. Swap <ul> for <ol> and the browser automatically puts 1, 2, 3 in front of each item. You never have to type the numbers yourself — if you add or remove a step, the browser renumbers everything for you.",
        anatomy: [
          { text: "<ol>", color: "#ff9f43", highlight: "#ff9f43", label: "<ol>", explain: "Opens a numbered list — ol means ordered list" },
          { text: "<li>", color: "#00f5c4", highlight: "#00f5c4", label: "<li>", explain: "Each item still uses <li> — same as in a bullet list" },
          { text: "Send rescue ship", color: "#c8f0ff", highlight: "#39ff14", label: "item text", explain: "The browser automatically puts '1.' in front of this" },
          { text: "</li>", color: "#00f5c4", highlight: "#00f5c4", label: "</li>", explain: "Closes THIS list item" },
          { text: "</ol>", color: "#ff9f43", highlight: "#ff9f43", label: "</ol>", explain: "Closes THIS numbered list — goes after all your items" },
        ],
        miniChallenge: {
          id: "m3b", xp: 25,
          instruction: "Override the autopilot! Write a numbered list with two steps: Wake up and Eat breakfast",
          hint1: "Same as a bullet list but use <ol> instead of <ul>",
          hint2: "<ol><li>…</li><li>…</li></ol>",
          hint3: "<ol><li>Wake up</li><li>Eat breakfast</li></ol>",
          walkthrough: ["Open the numbered list: <ol>", "Add step one: <li>Wake up</li>", "Add step two: <li>Eat breakfast</li>", "Close the list: </ol>", "Full answer: <ol><li>Wake up</li><li>Eat breakfast</li></ol>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (!/<ol/.test(n) && /<ul/.test(n)) return "used_ul";
            if (!/<ol/.test(n)) return "no_ol";
            if (!/<li/.test(n)) return "no_li";
            if (/<ol/.test(n) && !/<\/ol>/.test(n)) return "no_close";
            if (/<ol[\s\S]*<li[\s\S]*wake up[\s\S]*<\/li>[\s\S]*<li[\s\S]*eat breakfast[\s\S]*<\/li>[\s\S]*<\/ol>/.test(n)) return "pass";
            return "wrong_text";
          },
        },
      },
      {
        heading: "Arm the Escape Pod",
        body: "A button is literally just a button. You put words on it, people click it. Right now it does not do anything on its own — that comes later when you learn JavaScript. But writing the button itself is as simple as wrapping your text in a <button> tag. The browser automatically makes it look clickable.",
        anatomy: [
          { text: "<button>", color: "#00f5c4", highlight: "#00f5c4", label: "<button>", explain: "Opens the button tag" },
          { text: "SEND RESCUE SIGNAL", color: "#c8f0ff", highlight: "#39ff14", label: "button text", explain: "Whatever words appear on the button" },
          { text: "</button>", color: "#00f5c4", highlight: "#00f5c4", label: "</button>", explain: "Closes THIS button — matches the <button> you opened" },
        ],
        miniChallenge: {
          id: "m3c", xp: 25,
          instruction: "Arm the escape pod! Write a button that says: Get Started",
          hint1: "Buttons use the <button> tag — just like <p> but for buttons",
          hint2: "<button>…</button>",
          hint3: "<button>Get Started</button>",
          walkthrough: ["Open: <button>", "Add text: Get Started", "Close: </button>", "Full answer: <button>Get Started</button>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (!/<button/.test(n)) return "wrong_tag";
            if (/<button/.test(n) && !/<\/button>/.test(n)) return "no_close";
            if (/<button>\s*get started\s*<\/button>/.test(n)) return "pass";
            if (/<button>[^<]*<\/button>/.test(n)) return "wrong_text";
            return "generic";
          },
        },
      },
      {
        heading: "Life Support Status Check",
        body: "Here is what it looks like when you put a heading, a bullet list, a numbered list, and a button all on the same page. This is basically the structure of half the websites on the internet:",
        codeBlock: `<h1>DISTRESS SIGNAL — SECTOR 7</h1>\n\n<ul>\n  <li>Oxygen: 12%</li>\n  <li>Fuel: Empty</li>\n</ul>\n\n<ol>\n  <li>Locate crash site</li>\n  <li>Send rescue ship</li>\n</ol>\n\n<button>SEND RESCUE SIGNAL</button>`,
        miniChallenge: null,
      },
    ],
    bossChallenge: {
      id: "boss3", xp: 50,
      instruction: ["🛸 Stabilize the life support grid!", "Write a bullet list with two items: Engine offline and Fuel empty", "Then write a button that says: Send SOS"],
      hint1: "You need a <ul> list with two <li> items, then a <button> below it",
      hint2: "<ul><li>…</li><li>…</li></ul>  then  <button>…</button>",
      hint3: "<ul><li>Engine offline</li><li>Fuel empty</li></ul><button>Send SOS</button>",
      walkthrough: ["Write the list: <ul>", "Add: <li>Engine offline</li>", "Add: <li>Fuel empty</li>", "Close: </ul>", "Then add: <button>Send SOS</button>", "Full answer: <ul><li>Engine offline</li><li>Fuel empty</li></ul><button>Send SOS</button>"],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasList = /<ul[\s\S]*<li[\s\S]*engine offline[\s\S]*<\/li>[\s\S]*<li[\s\S]*fuel empty[\s\S]*<\/li>[\s\S]*<\/ul>/.test(n);
        const hasButton = /<button>\s*send sos\s*<\/button>/.test(n);
        if (hasList && hasButton) return "pass";
        if (!/<ul/.test(n)) return "no_ul";
        if (!/<button/.test(n)) return "wrong_tag";
        return "generic";
      },
    },
  },
  {
    id: 4,
    title: "Restore the Ship Log",
    subtitle: "Text Formatting",
    badge: "📟",
    badgeName: "Log Core",
    shipPart: "LOG MODULE",
    storyIntro: "Power restored! Your ship log display is damaged — all text looks the same with no formatting. Restore the text formatting system so your distress message is clear and important parts stand out.",
    theory: [
      {
        heading: "Boost the Signal Amplifier",
        body: "The <strong> tag is like using a highlighter on the most important word in a sentence. The browser makes it bold automatically. Use it sparingly — if everything is bold, nothing stands out. Save it for the words that really matter, like a warning or a key piece of information.",
        anatomy: [
          { text: "<strong>", color: "#00f5c4", highlight: "#00f5c4", label: "<strong>", explain: "Opens the bold tag — everything inside will appear bold" },
          { text: "WARNING:", color: "#c8f0ff", highlight: "#39ff14", label: "your text", explain: "This text will be displayed in bold" },
          { text: "</strong>", color: "#00f5c4", highlight: "#00f5c4", label: "</strong>", explain: "Closes THIS bold tag — matches the <strong> you opened" },
        ],
        miniChallenge: {
          id: "m4a", xp: 20,
          instruction: "Boost the signal amplifier! Make the word MAYDAY bold using the <strong> tag",
          hint1: "Wrap the word in <strong> tags",
          hint2: "<strong>...</strong>",
          hint3: "<strong>MAYDAY</strong>",
          walkthrough: ["Open with: <strong>", "Type: MAYDAY", "Close with: </strong>", "Full answer: <strong>MAYDAY</strong>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<strong>\s*mayday\s*<\/strong>/.test(n)) return "pass";
            if (/<strong>/.test(n) && !/<\/strong>/.test(n)) return "no_close";
            if (!/<strong/.test(n)) return "wrong_tag";
            if (/<strong>[^<]*<\/strong>/.test(n)) return "wrong_text";
            return "generic";
          },
        },
      },
      {
        heading: "Engage Stealth Mode",
        body: "The <em> tag is like air-quoting something when you say it out loud — or putting a little stress on a word. Em stands for emphasis. The browser makes it italic. Use it for titles of things, technical terms you are introducing for the first time, or words you would naturally say with a slightly different tone.",
        anatomy: [
          { text: "<em>", color: "#ffe94d", highlight: "#ffe94d", label: "<em>", explain: "Opens the italic tag — em stands for emphasis" },
          { text: "Sector Seven", color: "#c8f0ff", highlight: "#39ff14", label: "your text", explain: "This text will appear in italic" },
          { text: "</em>", color: "#ffe94d", highlight: "#ffe94d", label: "</em>", explain: "Closes THIS italic tag — matches the <em> you opened" },
        ],
        miniChallenge: {
          id: "m4b", xp: 20,
          instruction: "Engage stealth mode! Make the phrase: crash landing — italic using the <em> tag",
          hint1: "Wrap the phrase in <em> tags",
          hint2: "<em>...</em>",
          hint3: "<em>crash landing</em>",
          walkthrough: ["Open with: <em>", "Type: crash landing", "Close with: </em>", "Full answer: <em>crash landing</em>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<em>\s*crash landing\s*<\/em>/.test(n)) return "pass";
            if (/<em>/.test(n) && !/<\/em>/.test(n)) return "no_close";
            if (!/<em/.test(n)) return "wrong_tag";
            if (/<em>[^<]*<\/em>/.test(n)) return "wrong_text";
            return "generic";
          },
        },
      },
      {
        heading: "Double Encrypt the Transmission",
        body: "You can put tags inside other tags — like a letter inside an envelope inside a box. Each wrapper adds its own effect. Putting <em> inside <strong> gives you text that is bold AND italic at the same time. The rule is: always close the inner tag before you close the outer one. Last one opened, first one closed.",
        anatomy: [
          { text: "<strong>", color: "#00f5c4", highlight: "#00f5c4", label: "<strong>", explain: "Opens bold — everything inside will be bold" },
          { text: "<em>", color: "#ffe94d", highlight: "#ffe94d", label: "<em>", explain: "Opens italic inside bold — this text is now BOTH" },
          { text: "Critical alert", color: "#c8f0ff", highlight: "#39ff14", label: "your text", explain: "This text will be bold AND italic" },
          { text: "</em>", color: "#ffe94d", highlight: "#ffe94d", label: "</em>", explain: "Closes italic — always close inner tags first" },
          { text: "</strong>", color: "#00f5c4", highlight: "#00f5c4", label: "</strong>", explain: "Closes bold — outer tags close last" },
        ],
        miniChallenge: {
          id: "m4c", xp: 25,
          instruction: "Double encrypt the transmission! Make the text: SOS — both bold AND italic by nesting <em> inside <strong>",
          hint1: "Put <em> inside <strong> — open strong first, then em",
          hint2: "<strong><em>...</em></strong>",
          hint3: "<strong><em>SOS</em></strong>",
          walkthrough: ["Open bold: <strong>", "Open italic inside it: <em>", "Type: SOS", "Close italic first: </em>", "Close bold last: </strong>", "Full answer: <strong><em>SOS</em></strong>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<strong>\s*<em>\s*sos\s*<\/em>\s*<\/strong>/.test(n)) return "pass";
            if (/<strong>/.test(n) && !/<em>/.test(n)) return "wrong_tag";
            if (/<em>/.test(n) && !/<\/em>/.test(n)) return "no_close";
            if (/<strong><em>[^<]*<\/em><\/strong>/.test(n)) return "wrong_text";
            return "generic";
          },
        },
      },
      {
        heading: "Vent the Plasma Conduits",
        body: "<br> is the Enter key of HTML — it just drops you to the next line without starting a whole new paragraph. <hr> is like dragging a ruler across the page to draw a dividing line between two sections. Neither of them wraps around any content, so neither of them needs a closing tag — they just do their thing and that is it.",
        anatomy: [
          { text: "Crew: 1", color: "#c8f0ff", highlight: "#39ff14", label: "first line", explain: "Regular text on the first line" },
          { text: "<br>", color: "#00f5c4", highlight: "#00f5c4", label: "<br>", explain: "Line break — jumps to the next line. No closing tag!" },
          { text: "Fuel: 0%", color: "#c8f0ff", highlight: "#39ff14", label: "second line", explain: "This text appears on the very next line" },
          { text: "<hr>", color: "#ff9f43", highlight: "#ff9f43", label: "<hr>", explain: "Horizontal rule — draws a dividing line. Also no closing tag!" },
        ],
        miniChallenge: {
          id: "m4d", xp: 25,
          instruction: "Vent the plasma conduits! Write: Status: Critical — then a <br> — then: Send help",
          hint1: "Type your first line, then <br>, then your second line — no closing tag on br",
          hint2: "Status: Critical<br>Send help",
          hint3: "Status: Critical<br>Send help",
          walkthrough: ["Type: Status: Critical", "Add a line break: <br>", "Type: Send help", "Full answer: Status: Critical<br>Send help"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/status[:\s]*critical\s*<br\s*\/?>\s*send help/.test(n)) return "pass";
            if (!/<br/.test(n)) return "wrong_tag";
            return "generic";
          },
        },
      },
    ],
    bossChallenge: {
      id: "boss4", xp: 60,
      instruction: ["🛸 Eject the warp core!", "Write a paragraph with ALERT in bold", "Add a line break then: ship damaged in italic", "Add an <hr> after the paragraph"],
      hint1: "You need <strong>, <br>, <em> inside a <p> tag, then <hr> after it",
      hint2: "<p><strong>ALERT</strong><br><em>ship damaged</em></p><hr>",
      hint3: "<p><strong>ALERT</strong><br><em>ship damaged</em></p><hr>",
      walkthrough: [
        "Open paragraph: <p>",
        "Add bold: <strong>ALERT</strong>",
        "Add line break: <br>",
        "Add italic: <em>ship damaged</em>",
        "Close paragraph: </p>",
        "Add divider: <hr>",
        "Full answer: <p><strong>ALERT</strong><br><em>ship damaged</em></p><hr>",
      ],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasStrong = /<strong>\s*alert\s*<\/strong>/.test(n);
        const hasBr = /<br\s*\/?>/.test(n);
        const hasEm = /<em>\s*ship damaged\s*<\/em>/.test(n);
        const hasHr = /<hr\s*\/?>/.test(n);
        if (hasStrong && hasBr && hasEm && hasHr) return "pass";
        if (!hasStrong) return "wrong_tag";
        if (!hasBr) return "wrong_tag";
        if (!hasEm) return "wrong_tag";
        return "wrong_tag";
      },
    },
  },
  {
    id: 5,
    title: "Rebuild the Hull Structure",
    subtitle: "Page Structure",
    badge: "🏗️",
    badgeName: "Hull Core",
    shipPart: "HULL MODULE",
    storyIntro: "Text formatting restored! But your ship's hull structure is in pieces — sections are floating everywhere with no organization. Learn how to structure a webpage into proper sections so everything has its place.",
    theory: [
      {
        heading: "Initiate Structural Containment",
        body: "A <div> is like a plain cardboard box with no label on it. It has no special meaning — it just holds things together. You use it when you need to group a bunch of elements so you can move them around or style them together. Every <div> takes up the full width of the page, so whatever comes after it starts on a new line below.",
        anatomy: [
          { text: "<div>", color: "#00f5c4", highlight: "#00f5c4", label: "<div>", explain: "Opens a generic block container — div stands for division" },
          { text: "<h2>Section Title</h2> <p>Some content here.</p>", color: "#c8f0ff", highlight: "#39ff14", label: "content inside", explain: "Anything can go inside a div — headings, paragraphs, images, other divs" },
          { text: "</div>", color: "#00f5c4", highlight: "#00f5c4", label: "</div>", explain: "Closes THIS div — always close what you open!" },
        ],
        miniChallenge: {
          id: "m5a", xp: 20,
          instruction: "Initiate structural containment! Write a <div> that contains a paragraph that says: I am a section",
          hint1: "Open a <div>, put a <p> inside it, then close the </div>",
          hint2: "<div><p>…</p></div>",
          hint3: "<div><p>I am a section</p></div>",
          walkthrough: ["Open: <div>", "Add a paragraph inside: <p>I am a section</p>", "Close the div: </div>", "Full answer: <div><p>I am a section</p></div>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<div>[\s\S]*<p>\s*i am a section\s*<\/p>[\s\S]*<\/div>/.test(n)) return "pass";
            if (!/<div/.test(n)) return "wrong_tag";
            if (/<div/.test(n) && !/<\/div>/.test(n)) return "no_close";
            if (!/<p/.test(n)) return "wrong_tag";
            return "generic";
          },
        },
      },
      {
        heading: "Deploy the Inline Scanner",
        body: "A <span> is like using a highlighter on one specific word inside a sentence — without moving that word anywhere. While a <div> takes up the whole row and pushes everything else down, a <span> just wraps around a word or phrase right where it sits. Use it when you need to target something small inside a bigger block of text.",
        anatomy: [
          { text: "<p>My ship is ", color: "#c8f0ff", highlight: "#39ff14", label: "text before", explain: "Regular paragraph text" },
          { text: "<span>", color: "#ffe94d", highlight: "#ffe94d", label: "<span>", explain: "Opens an inline container — sits inside the text without breaking the line" },
          { text: "critically damaged", color: "#ff4d6d", highlight: "#ff4d6d", label: "targeted text", explain: "Just this phrase is wrapped — you could change its color or style later with CSS" },
          { text: "</span>", color: "#ffe94d", highlight: "#ffe94d", label: "</span>", explain: "Closes THIS span — the text continues on the same line after" },
          { text: ".</p>", color: "#c8f0ff", highlight: "#39ff14", label: "text after", explain: "The rest of the paragraph continues normally" },
        ],
        miniChallenge: {
          id: "m5b", xp: 20,
          instruction: "Deploy the inline scanner! Write a paragraph that says: The hull is — then wrap the word: damaged — in a <span>",
          hint1: "Put the <span> inside the <p> tag, wrapping just the word damaged",
          hint2: "<p>The hull is <span>…</span></p>",
          hint3: "<p>The hull is <span>damaged</span></p>",
          walkthrough: ["Open: <p>", "Type: The hull is ", "Open span: <span>", "Type: damaged", "Close span: </span>", "Close p: </p>", "Full answer: <p>The hull is <span>damaged</span></p>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<p>[\s\S]*the hull is\s*<span>\s*damaged\s*<\/span>[\s\S]*<\/p>/.test(n)) return "pass";
            if (!/<p/.test(n)) return "wrong_tag";
            if (!/<span/.test(n)) return "wrong_tag";
            if (/<span/.test(n) && !/<\/span>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Engage the Semantic Grid",
        body: "Semantic tags are like labeling the rooms of a house instead of calling them all just room. A <div> tells the browser nothing — it is a mystery box. But <header> says this is the top of the page, <nav> says these are the navigation links, <main> says this is the important stuff, and <footer> says this is the bottom. Google uses these labels to understand your page. Screen readers use them to help blind users jump directly to the content they need.",
        wireframe: true,
        anatomy: [
          { text: "<header>", color: "#ffe94d", highlight: "#ffe94d", label: "<header>", explain: "The top of the page — usually has the logo, title, and main navigation" },
          { text: "<nav>", color: "#00f5c4", highlight: "#00f5c4", label: "<nav>", explain: "Navigation — holds links to other pages or sections. Nav = navigation" },
          { text: "<main>", color: "#39ff14", highlight: "#39ff14", label: "<main>", explain: "The main content of the page — there should only be ONE main per page" },
          { text: "<footer>", color: "#a98dff", highlight: "#a98dff", label: "<footer>", explain: "The bottom of the page — usually has copyright info, contact links, legal stuff" },
        ],
        miniChallenge: {
          id: "m5c", xp: 25,
          instruction: "Engage the semantic grid! Write a <header> tag containing an h1 that says: My Website",
          hint1: "Put the <h1> inside the <header> tag",
          hint2: "<header><h1>…</h1></header>",
          hint3: "<header><h1>My Website</h1></header>",
          walkthrough: ["Open: <header>", "Add heading inside: <h1>My Website</h1>", "Close: </header>", "Full answer: <header><h1>My Website</h1></header>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<header>[\s\S]*<h1>\s*my website\s*<\/h1>[\s\S]*<\/header>/.test(n)) return "pass";
            if (!/<header/.test(n)) return "wrong_tag";
            if (/<header/.test(n) && !/<\/header>/.test(n)) return "no_close";
            if (!/<h1/.test(n)) return "wrong_tag";
            return "generic";
          },
        },
      },
      {
        heading: "Full Hull Layout Schematic",
        body: "Here is what a real webpage structure looks like. Think of it like a building — the header is the sign above the front door, the nav is the directory board in the lobby, the main is the actual room you came to visit, and the footer is the fine print at the bottom. Every professional website on the internet follows roughly this same layout:",
        codeBlock: `<header>\n  <h1>Signal Lost — Mission Control</h1>\n</header>\n\n<nav>\n  <a href="#mission">Mission</a>\n  <a href="#crew">Crew</a>\n</nav>\n\n<main>\n  <h2>Status Report</h2>\n  <p>Hull integrity at <span>12%</span>.</p>\n  <div>\n    <p>Engine offline.</p>\n    <p>Fuel depleted.</p>\n  </div>\n</main>\n\n<footer>\n  <p>Transmission sent from Sector 7</p>\n</footer>`,
        miniChallenge: {
          id: "m5d", xp: 25,
          instruction: "Full schematic check! Write a <main> tag containing a paragraph that says: This is the main content",
          hint1: "Put the <p> inside the <main> tag",
          hint2: "<main><p>…</p></main>",
          hint3: "<main><p>This is the main content</p></main>",
          walkthrough: ["Open: <main>", "Add paragraph: <p>This is the main content</p>", "Close: </main>", "Full answer: <main><p>This is the main content</p></main>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<main>[\s\S]*<p>\s*this is the main content\s*<\/p>[\s\S]*<\/main>/.test(n)) return "pass";
            if (!/<main/.test(n)) return "wrong_tag";
            if (/<main/.test(n) && !/<\/main>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
    ],
    bossChallenge: {
      id: "boss5", xp: 60,
      instruction: ["🛸 Seal the hull!", "Write a <header> with an h1 that says: My Page", "Write a <main> with a paragraph that says: Welcome aboard", "Write a <footer> with a paragraph that says: Made by me"],
      hint1: "Three semantic tags — header, main, footer — each containing content",
      hint2: "<header><h1>My Page</h1></header>  <main><p>Welcome aboard</p></main>  <footer><p>Made by me</p></footer>",
      hint3: "<header><h1>My Page</h1></header><main><p>Welcome aboard</p></main><footer><p>Made by me</p></footer>",
      walkthrough: [
        "Write: <header><h1>My Page</h1></header>",
        "Then: <main><p>Welcome aboard</p></main>",
        "Then: <footer><p>Made by me</p></footer>",
        "Full answer: <header><h1>My Page</h1></header><main><p>Welcome aboard</p></main><footer><p>Made by me</p></footer>",
      ],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasHeader = /<header>[\s\S]*<h1>\s*my page\s*<\/h1>[\s\S]*<\/header>/.test(n);
        const hasMain = /<main>[\s\S]*<p>\s*welcome aboard\s*<\/p>[\s\S]*<\/main>/.test(n);
        const hasFooter = /<footer>[\s\S]*<p>\s*made by me\s*<\/p>[\s\S]*<\/footer>/.test(n);
        if (hasHeader && hasMain && hasFooter) return "pass";
        if (!hasHeader) return "wrong_tag";
        if (!hasMain) return "wrong_tag";
        if (!hasFooter) return "wrong_tag";
        return "generic";
      },
    },
  },
  {
    id: 6,
    title: "Activate the Communication Array",
    subtitle: "Forms Part 1",
    badge: "📻",
    badgeName: "Comms Core",
    shipPart: "COMMS MODULE",
    storyIntro: "Hull sealed! Your communication array is offline. Forms are how webpages collect information from users. Learn them to build your rescue request form.",
    theory: [
      {
        heading: "Charge the Subspace Transceiver",
        body: "Think of a <form> like a paper form at the doctor's office. The paper itself is not the information — it is just what holds all the fields together and gets handed in as one complete package. Without the form, your inputs are just random disconnected boxes floating on a page. Wrapping them in <form> tells the browser: these all belong together. When the user hits submit, the form collects every answer from every field inside it and sends them all at once.",
        anatomy: [
          { text: "<form>", color: "#00f5c4", highlight: "#00f5c4", label: "<form>", explain: "Opens the form container — everything inside is part of this form" },
          { text: "inputs go here", color: "#c8f0ff", highlight: "#39ff14", label: "inputs go here", explain: "Your input fields, labels, and buttons all go inside the form tags" },
          { text: "</form>", color: "#00f5c4", highlight: "#00f5c4", label: "</form>", explain: "Closes the form — always close what you open!" },
        ],
        miniChallenge: {
          id: "m6a", xp: 20,
          instruction: "Charge the transceiver! Write a <form> containing a paragraph that says: Rescue Request Form",
          hint1: "Put the <p> inside the <form> tags",
          hint2: "<form><p>...</p></form>",
          hint3: "<form><p>Rescue Request Form</p></form>",
          walkthrough: ["Open: <form>", "Add a paragraph: <p>Rescue Request Form</p>", "Close: </form>", "Full answer: <form><p>Rescue Request Form</p></form>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<form>[\s\S]*<p>\s*rescue request form\s*<\/p>[\s\S]*<\/form>/.test(n)) return "pass";
            if (!/<form/.test(n)) return "wrong_tag";
            if (/<form/.test(n) && !/<\/form>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Calibrate the Input Receivers",
        body: "An <input> is the blank line on a form where you write your answer. It is a void element — no closing tag needed because there is no content to wrap, it is just an empty field. The type attribute is crucial: type=\"text\" gives you a plain text box, type=\"email\" gives you one that checks for an @ sign, type=\"password\" hides what you type with dots. Always set the type so the browser knows what to expect.",
        anatomy: [
          { text: "<input ", color: "#00f5c4", highlight: "#00f5c4", label: "<input", explain: "Opens the input tag — no closing tag needed, it stands alone" },
          { text: 'type="text" ', color: "#ffe94d", highlight: "#ffe94d", label: 'type="text"', explain: "Sets what kind of input this is — text, email, password, number, etc." },
          { text: 'placeholder="Enter your name"', color: "#39ff14", highlight: "#39ff14", label: "placeholder", explain: "The grey hint text shown inside the field before the user types" },
          { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the tag — no </input> needed!" },
        ],
        miniChallenge: {
          id: "m6b", xp: 25,
          instruction: 'Calibrate the receiver! Write an input with type="text" and placeholder="Your name"',
          hint1: "Input tags stand alone — no closing tag needed",
          hint2: '<input type="text" placeholder="...">',
          hint3: '<input type="text" placeholder="Your name">',
          walkthrough: ['Start with: <input', 'Add type: type="text"', 'Add placeholder: placeholder="Your name"', 'Close it: >', 'Full answer: <input type="text" placeholder="Your name">'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<input[^>]*type="text"[^>]*placeholder="your name"[^>]*>/.test(n) ||
                /<input[^>]*placeholder="your name"[^>]*type="text"[^>]*>/.test(n)) return "pass";
            if (!/<input/.test(n)) return "wrong_tag";
            if (!/type/.test(n)) return "no_src";
            if (!/placeholder/.test(n)) return "no_alt";
            return "generic";
          },
        },
      },
      {
        heading: "Link the Label Transmitters",
        body: "A <label> is the text printed next to a blank line on a form — like the little words that say Name: or Email: before each field. Without a label, a blind person using a screen reader has no idea what they are supposed to type into an input. You connect a label to its input by giving them matching values: for=\"name\" on the label and id=\"name\" on the input. They have to match exactly — like a lock and a key.",
        anatomy: [
          { text: "<label ", color: "#ffe94d", highlight: "#ffe94d", label: "<label", explain: "Opens the label tag" },
          { text: 'for="name"', color: "#39ff14", highlight: "#39ff14", label: 'for="name"', explain: "Links this label to the input with id='name' — they must match exactly" },
          { text: ">Your name:</label>", color: "#ffe94d", highlight: "#ffe94d", label: ">text</label>", explain: "The text users see next to the input field" },
          { text: "<input", color: "#00f5c4", highlight: "#00f5c4", label: "<input", explain: "The input this label is linked to" },
          { text: 'id="name"', color: "#39ff14", highlight: "#39ff14", label: 'id="name"', explain: "Must match the for= value on the label above" },
          { text: ' type="text">', color: "#00f5c4", highlight: "#00f5c4", label: 'type="text">', explain: "The rest of the input attributes" },
        ],
        miniChallenge: {
          id: "m6c", xp: 25,
          instruction: 'Link the transmitters! Write a label with for="email" that says: Email Address — then an input with id="email" and type="email"',
          hint1: "The label for= value must match the input id= value exactly",
          hint2: '<label for="email">Email Address</label> then <input id="email" type="email">',
          hint3: '<label for="email">Email Address</label><input id="email" type="email">',
          walkthrough: ['Write: <label for="email">Email Address</label>', 'Then: <input', 'Add id: id="email"', 'Add type: type="email"', 'Close: >', 'Full answer: <label for="email">Email Address</label><input id="email" type="email">'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            const hasLabel = /<label[^>]*for="email"[^>]*>\s*email address\s*<\/label>/.test(n);
            const hasInput = /<input[^>]*id="email"[^>]*type="email"[^>]*>/.test(n) || /<input[^>]*type="email"[^>]*id="email"[^>]*>/.test(n);
            if (hasLabel && hasInput) return "pass";
            if (!/<label/.test(n)) return "wrong_tag";
            if (!/<input/.test(n)) return "wrong_tag";
            return "generic";
          },
        },
      },
      {
        heading: "Full Comms Array Schematic",
        body: "Here is what a real signup or contact form looks like under the hood. Every form you have ever filled out on the internet — login pages, checkout forms, survey forms — is built with exactly these pieces:",
        codeBlock: `<form>\n  <label for="name">Your Name:</label>\n  <input id="name" type="text" placeholder="Enter your name">\n\n  <label for="email">Your Email:</label>\n  <input id="email" type="email" placeholder="Enter your email">\n\n  <button type="submit">Send Rescue Request</button>\n</form>`,
        miniChallenge: null,
      },
    ],
    bossChallenge: {
      id: "boss6", xp: 60,
      instruction: ["🛸 Activate the comms array!", 'Write a <form> containing a label with for="username" that says: Username', 'Then an input with id="username" and type="text"', "Then a <button> that says: Submit"],
      hint1: "Four things — form wrapping a label, input, and button",
      hint2: '<form><label for="username">Username</label><input id="username" type="text"><button>Submit</button></form>',
      hint3: '<form><label for="username">Username</label><input id="username" type="text"><button>Submit</button></form>',
      walkthrough: [
        "Open the form: <form>",
        'Add the label: <label for="username">Username</label>',
        'Add the input: <input id="username" type="text">',
        "Add the button: <button>Submit</button>",
        "Close the form: </form>",
        'Full answer: <form><label for="username">Username</label><input id="username" type="text"><button>Submit</button></form>',
      ],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasForm = /<form>[\s\S]*<\/form>/.test(n);
        const hasLabel = /<label[^>]*for="username"[^>]*>\s*username\s*<\/label>/.test(n);
        const hasInput = /<input[^>]*id="username"[^>]*type="text"[^>]*>/.test(n) || /<input[^>]*type="text"[^>]*id="username"[^>]*>/.test(n);
        const hasButton = /<button[^>]*>\s*submit\s*<\/button>/.test(n);
        if (hasForm && hasLabel && hasInput && hasButton) return "pass";
        if (!hasForm) return "wrong_tag";
        if (!hasLabel) return "wrong_tag";
        if (!hasInput) return "wrong_tag";
        return "wrong_tag";
      },
    },
  },

  ,
  {
    id: 7,
    title: "Upgrade the Life Pod Controls",
    subtitle: "Forms Part 2",
    badge: "🎛️",
    badgeName: "Controls Core",
    shipPart: "CONTROLS MODULE",
    storyIntro: "Comms array online! Your life pod control panel needs more advanced inputs — dropdowns, multi-line text fields, and a proper submit button so survivors can send detailed rescue requests.",
    theory: [
      {
        heading: "Install the Dropdown Selector",
        body: "A <select> is a multiple choice question — the user can only pick one answer from a predefined list. Think of it like one of those little spinning wheels on a form where you pick your birth year. Each choice is an <option> tag inside the <select>. The text inside the option is what the user sees. You can also add a value attribute — that is the behind-the-scenes code that gets sent when the form submits, which can be different from what the user sees.",
        anatomy: [
          { text: "<select>", color: "#00f5c4", highlight: "#00f5c4", label: "<select>", explain: "Opens the dropdown menu" },
          { text: "<option", color: "#ffe94d", highlight: "#ffe94d", label: "<option", explain: "Each choice gets its own option tag" },
          { text: 'value="mars"', color: "#39ff14", highlight: "#39ff14", label: 'value="mars"', explain: "The value sent when selected — not shown to the user" },
          { text: ">Mars</option>", color: "#ffe94d", highlight: "#ffe94d", label: ">text</option>", explain: "The text the user actually sees" },
          { text: "</select>", color: "#00f5c4", highlight: "#00f5c4", label: "</select>", explain: "Closes the dropdown" },
        ],
        miniChallenge: {
          id: "m7a", xp: 25,
          instruction: "Install the selector! Write a <select> with two options: Earth and Mars",
          hint1: "Put two <option> tags inside a <select> tag",
          hint2: "<select><option>Earth</option><option>Mars</option></select>",
          hint3: "<select><option>Earth</option><option>Mars</option></select>",
          walkthrough: ["Open: <select>", "Add: <option>Earth</option>", "Add: <option>Mars</option>", "Close: </select>", "Full answer: <select><option>Earth</option><option>Mars</option></select>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<select>[\s\S]*<option[^>]*>[\s\S]*earth[\s\S]*<\/option>[\s\S]*<option[^>]*>[\s\S]*mars[\s\S]*<\/option>[\s\S]*<\/select>/.test(n)) return "pass";
            if (!/<select/.test(n)) return "wrong_tag";
            if (!/<option/.test(n)) return "no_li";
            if (/<select/.test(n) && !/<\/select>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Activate the Message Decoder",
        body: "A <textarea> is the big empty box on a form that says Additional Comments — you can type as much as you want and it grows as you type. Unlike a regular <input> which is just one line, a textarea gives you room to write a whole paragraph. It needs a closing tag because you can put default text between the tags if you want something to appear in the box before the user types.",
        anatomy: [
          { text: "<textarea ", color: "#00f5c4", highlight: "#00f5c4", label: "<textarea", explain: "Opens the multi-line text input" },
          { text: 'placeholder="Describe your situation"', color: "#39ff14", highlight: "#39ff14", label: "placeholder", explain: "Hint text shown before the user types" },
          { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the opening tag" },
          { text: "</textarea>", color: "#00f5c4", highlight: "#00f5c4", label: "</textarea>", explain: "Closes the textarea — unlike input, this needs a closing tag!" },
        ],
        miniChallenge: {
          id: "m7b", xp: 25,
          instruction: 'Activate the decoder! Write a <textarea> with placeholder="Describe your emergency"',
          hint1: "Unlike input, textarea has a closing tag",
          hint2: '<textarea placeholder="..."></textarea>',
          hint3: '<textarea placeholder="Describe your emergency"></textarea>',
          walkthrough: ['Open: <textarea', 'Add placeholder: placeholder="Describe your emergency"', 'Close opening tag: >', 'Add closing tag: </textarea>', 'Full answer: <textarea placeholder="Describe your emergency"></textarea>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<textarea[^>]*placeholder="describe your emergency"[^>]*>[\s\S]*<\/textarea>/.test(n)) return "pass";
            if (!/<textarea/.test(n)) return "wrong_tag";
            if (/<textarea/.test(n) && !/<\/textarea>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Arm the Launch Sequence",
        body: "A submit button is the SEND button on a text message — nothing goes anywhere until you press it. Without it, all the data just sits in the form doing nothing. Add type=\"submit\" to a button inside a form and clicking it instantly collects everything the user typed and sends it. If you leave out the type=\"submit\" part, it is just a regular button that does nothing when clicked.",
        anatomy: [
          { text: "<button ", color: "#00f5c4", highlight: "#00f5c4", label: "<button", explain: "Opens the button tag" },
          { text: 'type="submit"', color: "#ffe94d", highlight: "#ffe94d", label: 'type="submit"', explain: "Makes this button submit the whole form when clicked" },
          { text: ">Send Rescue Request</button>", color: "#c8f0ff", highlight: "#39ff14", label: ">text</button>", explain: "The text on the button" },
        ],
        miniChallenge: {
          id: "m7c", xp: 20,
          instruction: 'Arm the launch sequence! Write a button with type="submit" that says: Launch Rescue',
          hint1: 'Add type="submit" inside the opening button tag',
          hint2: '<button type="submit">...</button>',
          hint3: '<button type="submit">Launch Rescue</button>',
          walkthrough: ['Open: <button', 'Add: type="submit"', 'Close: >', 'Add text: Launch Rescue', 'Close: </button>', 'Full answer: <button type="submit">Launch Rescue</button>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<button[^>]*type="submit"[^>]*>\s*launch rescue\s*<\/button>/.test(n)) return "pass";
            if (!/<button/.test(n)) return "wrong_tag";
            if (/<button/.test(n) && !/<\/button>/.test(n)) return "no_close";
            return "wrong_text";
          },
        },
      },
      {
        heading: "Full Control Panel Schematic",
        body: "Put it all together and here is what a real contact or survey form looks like — the kind you see on every website when someone asks for feedback or wants you to fill out a questionnaire:",
        codeBlock: `<form>\n  <label for="planet">Destination:</label>\n  <select id="planet">\n    <option>Earth</option>\n    <option>Mars</option>\n  </select>\n\n  <label for="msg">Your Message:</label>\n  <textarea id="msg" placeholder="Describe your situation"></textarea>\n\n  <button type="submit">Send Rescue Request</button>\n</form>`,
        miniChallenge: null,
      },
    ],
    bossChallenge: {
      id: "boss7", xp: 60,
      instruction: ["🛸 Engage the life pod controls!", "Write a <select> with two options: Yes and No", 'Write a <textarea> with placeholder: Tell us more', 'Write a <button type="submit"> that says: Send'],
      hint1: "Three tags — select with options, textarea, then submit button",
      hint2: '<select><option>Yes</option><option>No</option></select><textarea placeholder="Tell us more"></textarea><button type="submit">Send</button>',
      hint3: '<select><option>Yes</option><option>No</option></select><textarea placeholder="Tell us more"></textarea><button type="submit">Send</button>',
      walkthrough: [
        "Write the dropdown: <select><option>Yes</option><option>No</option></select>",
        'Write the textarea: <textarea placeholder="Tell us more"></textarea>',
        'Write the button: <button type="submit">Send</button>',
      ],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasSelect = /<select>[\s\S]*<option[^>]*>[\s\S]*yes[\s\S]*<\/option>[\s\S]*<option[^>]*>[\s\S]*no[\s\S]*<\/option>[\s\S]*<\/select>/.test(n);
        const hasTextarea = /<textarea[^>]*placeholder="tell us more"[^>]*>[\s\S]*<\/textarea>/.test(n);
        const hasButton = /<button[^>]*type="submit"[^>]*>\s*send\s*<\/button>/.test(n);
        if (hasSelect && hasTextarea && hasButton) return "pass";
        if (!hasSelect) return "wrong_tag";
        if (!hasTextarea) return "wrong_tag";
        return "wrong_tag";
      },
    },
  },
  {
    id: 8,
    title: "Reconstruct the Data Matrix",
    subtitle: "Tables",
    badge: "📊",
    badgeName: "Matrix Core",
    shipPart: "MATRIX MODULE",
    storyIntro: "Life pod ready! Your ship data is raw numbers with no structure. Tables organize data into rows and columns — exactly what you need for your crew manifest.",
    theory: [
      {
        heading: "Initialize the Data Grid",
        body: "A table is like a spreadsheet — rows going left to right, columns going top to bottom. The whole thing is wrapped in <table>. Each row is a <tr> — think of it as one horizontal strip across the table. Inside each row, each individual box of data is a <td>. So the pattern is always: table on the outside, tr for each row, td for each cell inside that row.",
        anatomy: [
          { text: "<table>", color: "#00f5c4", highlight: "#00f5c4", label: "<table>", explain: "Opens the table — wraps the entire grid" },
          { text: "<tr>", color: "#ffe94d", highlight: "#ffe94d", label: "<tr>", explain: "Opens a row — tr stands for table row" },
          { text: "<td>Cell 1</td>", color: "#39ff14", highlight: "#39ff14", label: "<td>", explain: "A single cell — td stands for table data" },
          { text: "<td>Cell 2</td>", color: "#39ff14", highlight: "#39ff14", label: "<td>", explain: "Another cell in the same row" },
          { text: "</tr>", color: "#ffe94d", highlight: "#ffe94d", label: "</tr>", explain: "Closes THIS row" },
          { text: "</table>", color: "#00f5c4", highlight: "#00f5c4", label: "</table>", explain: "Closes the whole table" },
        ],
        miniChallenge: {
          id: "m8a", xp: 25,
          instruction: "Initialize the grid! Write a <table> with one <tr> containing two <td> cells: Name and Age",
          hint1: "table wraps tr, tr wraps td cells",
          hint2: "<table><tr><td>Name</td><td>Age</td></tr></table>",
          hint3: "<table><tr><td>Name</td><td>Age</td></tr></table>",
          walkthrough: ["Open: <table>", "Open a row: <tr>", "Add cell 1: <td>Name</td>", "Add cell 2: <td>Age</td>", "Close row: </tr>", "Close table: </table>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<table>[\s\S]*<tr>[\s\S]*<td>[\s\S]*name[\s\S]*<\/td>[\s\S]*<td>[\s\S]*age[\s\S]*<\/td>[\s\S]*<\/tr>[\s\S]*<\/table>/.test(n)) return "pass";
            if (!/<table/.test(n)) return "wrong_tag";
            if (!/<tr/.test(n)) return "no_li";
            if (!/<td/.test(n)) return "no_li";
            if (/<table/.test(n) && !/<\/table>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Upload the Column Headers",
        body: "Every spreadsheet has that bold grey row at the very top that labels each column — Name, Age, Status, whatever. In HTML that is a <th> instead of a <td>. Th stands for table header. The browser automatically makes it bold and centered so it stands out from the regular data. Everything else works exactly the same as a regular row — it is still inside a <tr>, you just swap <td> for <th>.",
        anatomy: [
          { text: "<tr>", color: "#ffe94d", highlight: "#ffe94d", label: "<tr>", explain: "Opens the header row" },
          { text: "<th>Name</th>", color: "#ff9f43", highlight: "#ff9f43", label: "<th>", explain: "Header cell — automatically bold and centered. Th = table header" },
          { text: "<th>Status</th>", color: "#ff9f43", highlight: "#ff9f43", label: "<th>", explain: "Another header cell for the next column" },
          { text: "</tr>", color: "#ffe94d", highlight: "#ffe94d", label: "</tr>", explain: "Closes the header row" },
        ],
        miniChallenge: {
          id: "m8b", xp: 25,
          instruction: "Upload the headers! Write a <tr> containing two <th> cells: Planet and Status",
          hint1: "th is just like td but for headers — bold and centered automatically",
          hint2: "<tr><th>Planet</th><th>Status</th></tr>",
          hint3: "<tr><th>Planet</th><th>Status</th></tr>",
          walkthrough: ["Open a row: <tr>", "Add header 1: <th>Planet</th>", "Add header 2: <th>Status</th>", "Close: </tr>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<tr>[\s\S]*<th>[\s\S]*planet[\s\S]*<\/th>[\s\S]*<th>[\s\S]*status[\s\S]*<\/th>[\s\S]*<\/tr>/.test(n)) return "pass";
            if (!/<tr/.test(n)) return "wrong_tag";
            if (!/<th/.test(n)) return "no_li";
            if (/<tr/.test(n) && !/<\/tr>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Run Full Matrix Diagnostics",
        body: "Here is what a real data table looks like — the kind you would see on a sports stats page, a pricing comparison, or a flight schedule. Headers across the top, rows of data below:",
        codeBlock: `<table>\n  <tr>\n    <th>Name</th>\n    <th>Planet</th>\n    <th>Status</th>\n  </tr>\n  <tr>\n    <td>Commander Zyx</td>\n    <td>Kepler-22b</td>\n    <td>MIA</td>\n  </tr>\n  <tr>\n    <td>Engineer Blorp</td>\n    <td>Mars</td>\n    <td>Active</td>\n  </tr>\n</table>`,
        miniChallenge: {
          id: "m8c", xp: 25,
          instruction: "Run diagnostics! Write a table with headers: Crew and Role — then one data row: Zyx and Pilot",
          hint1: "You need th for headers and td for data, all inside tr rows inside table",
          hint2: "<table><tr><th>Crew</th><th>Role</th></tr><tr><td>Zyx</td><td>Pilot</td></tr></table>",
          hint3: "<table><tr><th>Crew</th><th>Role</th></tr><tr><td>Zyx</td><td>Pilot</td></tr></table>",
          walkthrough: ["Open: <table>", "Header row: <tr><th>Crew</th><th>Role</th></tr>", "Data row: <tr><td>Zyx</td><td>Pilot</td></tr>", "Close: </table>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            const hasHeaders = /<th>[\s\S]*crew[\s\S]*<\/th>[\s\S]*<th>[\s\S]*role[\s\S]*<\/th>/.test(n);
            const hasData = /<td>[\s\S]*zyx[\s\S]*<\/td>[\s\S]*<td>[\s\S]*pilot[\s\S]*<\/td>/.test(n);
            const hasTable = /<table>[\s\S]*<\/table>/.test(n);
            if (hasTable && hasHeaders && hasData) return "pass";
            if (!/<table/.test(n)) return "wrong_tag";
            if (!/<th/.test(n)) return "no_li";
            if (!/<td/.test(n)) return "no_li";
            return "generic";
          },
        },
      },
    ],
    bossChallenge: {
      id: "boss8", xp: 60,
      instruction: ["🛸 Reconstruct the data matrix!", "Write a table with headers: Item and Count", "Add two data rows: Oxygen Tanks / 3 and Escape Pods / 1"],
      hint1: "table with two th headers and two tr data rows each with two td cells",
      hint2: "<table><tr><th>Item</th><th>Count</th></tr><tr><td>Oxygen Tanks</td><td>3</td></tr><tr><td>Escape Pods</td><td>1</td></tr></table>",
      hint3: "<table><tr><th>Item</th><th>Count</th></tr><tr><td>Oxygen Tanks</td><td>3</td></tr><tr><td>Escape Pods</td><td>1</td></tr></table>",
      walkthrough: [
        "Open: <table>",
        "Header row: <tr><th>Item</th><th>Count</th></tr>",
        "Data row 1: <tr><td>Oxygen Tanks</td><td>3</td></tr>",
        "Data row 2: <tr><td>Escape Pods</td><td>1</td></tr>",
        "Close: </table>",
      ],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasHeaders = /<th>[\s\S]*item[\s\S]*<\/th>[\s\S]*<th>[\s\S]*count[\s\S]*<\/th>/.test(n);
        const hasRow1 = /<td>[\s\S]*oxygen tanks[\s\S]*<\/td>[\s\S]*<td>[\s\S]*3[\s\S]*<\/td>/.test(n);
        const hasRow2 = /<td>[\s\S]*escape pods[\s\S]*<\/td>[\s\S]*<td>[\s\S]*1[\s\S]*<\/td>/.test(n);
        const hasTable = /<table>[\s\S]*<\/table>/.test(n);
        if (hasTable && hasHeaders && hasRow1 && hasRow2) return "pass";
        if (!/<table/.test(n)) return "wrong_tag";
        if (!/<th/.test(n)) return "no_li";
        return "generic";
      },
    },
  },

  ,
  {
    id: 9,
    title: "Decode the Alien Broadcast",
    subtitle: "Semantic HTML",
    badge: "📰",
    badgeName: "Broadcast Core",
    shipPart: "BROADCAST MODULE",
    storyIntro: "Data matrix online! Alien broadcasts are coming in but they have no structure — just a wall of content with no labels. Semantic HTML tags tell the browser exactly what each piece of content IS, so it can be organized, searched, and understood by anyone.",
    theory: [
      {
        heading: "Intercept the Article Signal",
        body: "An <article> is a self-contained piece of content that makes sense on its own — like a blog post, a news story, or a product review. If you could copy it to another website and it would still make sense by itself, it is probably an article. Think of it like a newspaper clipping — the story works whether it is in the paper or pinned to your fridge.",
        anatomy: [
          { text: "<article>", color: "#00f5c4", highlight: "#00f5c4", label: "<article>", explain: "Opens a self-contained piece of content — like one blog post or news story" },
          { text: "<h2>Breaking News</h2> <p>Ship located in Sector 7.</p>", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "The full content of the article — heading, paragraphs, images, whatever it needs" },
          { text: "</article>", color: "#00f5c4", highlight: "#00f5c4", label: "</article>", explain: "Closes THIS article — everything inside stands alone as one complete piece" },
        ],
        miniChallenge: {
          id: "m9a", xp: 20,
          instruction: "Intercept the signal! Write an <article> containing an h2 that says: Breaking News and a paragraph that says: Ship found",
          hint1: "Put both the h2 and p inside the article tags",
          hint2: "<article><h2>Breaking News</h2><p>Ship found</p></article>",
          hint3: "<article><h2>Breaking News</h2><p>Ship found</p></article>",
          walkthrough: ["Open: <article>", "Add heading: <h2>Breaking News</h2>", "Add paragraph: <p>Ship found</p>", "Close: </article>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<article>[\s\S]*<h2>[\s\S]*breaking news[\s\S]*<\/h2>[\s\S]*<p>[\s\S]*ship found[\s\S]*<\/p>[\s\S]*<\/article>/.test(n)) return "pass";
            if (!/<article/.test(n)) return "wrong_tag";
            if (/<article/.test(n) && !/<\/article>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Triangulate the Section Beam",
        body: "A <section> is a themed chunk of a page — like a chapter in a book. While an article is a complete standalone piece, a section is just one part of something bigger. Think of your webpage like a house — the whole house is the page, each room is a section. The living room is one section, the kitchen is another. Neither makes sense ripped out of the house, but together they make up the whole thing.",
        anatomy: [
          { text: "<section>", color: "#ffe94d", highlight: "#ffe94d", label: "<section>", explain: "Opens a themed chunk of the page — one room in the house" },
          { text: "<h2>Our Mission</h2> <p>We explore the galaxy.</p>", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "Everything that belongs to this section of the page" },
          { text: "</section>", color: "#ffe94d", highlight: "#ffe94d", label: "</section>", explain: "Closes THIS section — the next section starts fresh" },
        ],
        miniChallenge: {
          id: "m9b", xp: 20,
          instruction: "Triangulate the beam! Write a <section> containing an h2 that says: Our Crew and a paragraph that says: We are a team of explorers",
          hint1: "Put both tags inside the section tags",
          hint2: "<section><h2>Our Crew</h2><p>We are a team of explorers</p></section>",
          hint3: "<section><h2>Our Crew</h2><p>We are a team of explorers</p></section>",
          walkthrough: ["Open: <section>", "Add heading: <h2>Our Crew</h2>", "Add paragraph: <p>We are a team of explorers</p>", "Close: </section>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<section>[\s\S]*<h2>[\s\S]*our crew[\s\S]*<\/h2>[\s\S]*<p>[\s\S]*we are a team of explorers[\s\S]*<\/p>[\s\S]*<\/section>/.test(n)) return "pass";
            if (!/<section/.test(n)) return "wrong_tag";
            if (/<section/.test(n) && !/<\/section>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Scan the Peripheral Data Stream",
        body: "An <aside> is content that sits alongside the main content but is not essential to it — like a sidebar on a news website with related articles, or a fun fact box in a textbook. If you removed it, the main content would still make complete sense. Think of it like the margin notes you write in a book — interesting, relevant, but not the main story.",
        anatomy: [
          { text: "<aside>", color: "#a98dff", highlight: "#a98dff", label: "<aside>", explain: "Opens side content — related but not essential to the main story" },
          { text: "<p>Did you know: Sector 7 has 3 moons.</p>", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "A fun fact, related link, or extra info that supports but does not replace the main content" },
          { text: "</aside>", color: "#a98dff", highlight: "#a98dff", label: "</aside>", explain: "Closes THIS aside" },
        ],
        miniChallenge: {
          id: "m9c", xp: 20,
          instruction: "Scan the data stream! Write an <aside> containing a paragraph that says: Fun fact: HTML was invented in 1991",
          hint1: "Just like a div but labeled as side content",
          hint2: "<aside><p>Fun fact: HTML was invented in 1991</p></aside>",
          hint3: "<aside><p>Fun fact: HTML was invented in 1991</p></aside>",
          walkthrough: ["Open: <aside>", "Add paragraph: <p>Fun fact: HTML was invented in 1991</p>", "Close: </aside>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<aside>[\s\S]*<p>[\s\S]*fun fact[\s\S]*html[\s\S]*1991[\s\S]*<\/p>[\s\S]*<\/aside>/.test(n)) return "pass";
            if (!/<aside/.test(n)) return "wrong_tag";
            if (/<aside/.test(n) && !/<\/aside>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Calibrate the Visual Sensors",
        body: "A <figure> wraps an image together with its caption. The caption goes inside a <figcaption> tag. Think of it like a framed photo on the wall — the frame holds both the photo AND the little label underneath that says what it is. Before figure existed, images and their captions were just floating separately with no connection between them.",
        anatomy: [
          { text: "<figure>", color: "#39ff14", highlight: "#39ff14", label: "<figure>", explain: "Wraps an image and its caption together as one unit" },
          { text: "<img src=\"ship.jpg\" alt=\"crashed ship\">\n  ", color: "#00f5c4", highlight: "#00f5c4", label: "<img>", explain: "The image itself — same as always" },
          { text: "<figcaption>", color: "#ff9f43", highlight: "#ff9f43", label: "<figcaption>", explain: "Opens the caption — the descriptive text shown under the image" },
          { text: "Crash site</figcaption>", color: "#c8f0ff", highlight: "#39ff14", label: "caption text", explain: "What the caption actually says" },
          { text: "</figure>", color: "#39ff14", highlight: "#39ff14", label: "</figure>", explain: "Closes the figure — image and caption are now one packaged unit" },
        ],
        miniChallenge: {
          id: "m9d", xp: 25,
          instruction: 'Calibrate the sensors! Write a <figure> containing an img with src="alien.jpg" and alt="alien" plus a <figcaption> that says: An alien spotted on Earth',
          hint1: "figure wraps both the img and the figcaption together",
          hint2: '<figure><img src="alien.jpg" alt="alien"><figcaption>An alien spotted on Earth</figcaption></figure>',
          hint3: '<figure><img src="alien.jpg" alt="alien"><figcaption>An alien spotted on Earth</figcaption></figure>',
          walkthrough: ['Open: <figure>', 'Add image: <img src="alien.jpg" alt="alien">', 'Add caption: <figcaption>An alien spotted on Earth</figcaption>', 'Close: </figure>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            const hasFigure = /<figure>[\s\S]*<\/figure>/.test(n);
            const hasImg = /<img[^>]*src="alien\.jpg"[^>]*alt="alien"[^>]*>/.test(n) || /<img[^>]*alt="alien"[^>]*src="alien\.jpg"[^>]*>/.test(n);
            const hasCaption = /<figcaption>[\s\S]*an alien spotted on earth[\s\S]*<\/figcaption>/.test(n);
            if (hasFigure && hasImg && hasCaption) return "pass";
            if (!/<figure/.test(n)) return "wrong_tag";
            if (!/<img/.test(n)) return "wrong_tag";
            if (!/<figcaption/.test(n)) return "wrong_tag";
            return "generic";
          },
        },
      },
    ],
    bossChallenge: {
      id: "boss9", xp: 70,
      instruction: ["🛸 Decode the full broadcast!", "Write an <article> containing an h2 that says: Mission Report", "Inside the article add a <section> with a paragraph that says: All systems nominal", "After the section add an <aside> with a paragraph that says: Sector 7 is 4 light years away"],
      hint1: "article wraps everything — section and aside both go inside the article",
      hint2: "<article><h2>Mission Report</h2><section><p>All systems nominal</p></section><aside><p>Sector 7 is 4 light years away</p></aside></article>",
      hint3: "<article><h2>Mission Report</h2><section><p>All systems nominal</p></section><aside><p>Sector 7 is 4 light years away</p></aside></article>",
      walkthrough: [
        "Open the article: <article>",
        "Add the heading: <h2>Mission Report</h2>",
        "Add the section: <section><p>All systems nominal</p></section>",
        "Add the aside: <aside><p>Sector 7 is 4 light years away</p></aside>",
        "Close the article: </article>",
      ],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasArticle = /<article>[\s\S]*<\/article>/.test(n);
        const hasH2 = /<h2>[\s\S]*mission report[\s\S]*<\/h2>/.test(n);
        const hasSection = /<section>[\s\S]*all systems nominal[\s\S]*<\/section>/.test(n);
        const hasAside = /<aside>[\s\S]*sector 7 is 4 light years away[\s\S]*<\/aside>/.test(n);
        if (hasArticle && hasH2 && hasSection && hasAside) return "pass";
        if (!hasArticle) return "wrong_tag";
        if (!hasH2) return "wrong_text";
        if (!hasSection) return "wrong_tag";
        if (!hasAside) return "wrong_tag";
        return "generic";
      },
    },
  },
  {
    id: 10,
    title: "Restore the Holographic Projector",
    subtitle: "Media",
    badge: "📺",
    badgeName: "Projector Core",
    shipPart: "PROJECTOR MODULE",
    storyIntro: "Broadcast decoded! Your holographic projector is offline — you can not play any video or audio transmissions from home. Learn how to embed media so your distress signal can include a video message to Earth.",
    theory: [
      {
        heading: "Boot the Video Transmitter",
        body: "The <video> tag embeds a video directly on your page. The src attribute points to your video file and controls adds the play, pause, and volume buttons — without controls the video just sits there with nothing to click. Other useful attributes you'll use regularly: autoplay starts the video automatically, loop replays it when it ends, muted starts it silent (browsers actually REQUIRE muted for autoplay to work — they block audio autoplay to stop pages from blasting noise at you), and poster sets a thumbnail image shown before the video plays. Is this everything? Almost — when you get to JavaScript you'll learn to build custom video players with your own buttons and controls. But for 90% of real projects, what you're learning right now is all you need.",
        anatomy: [
          { text: "<video ", color: "#00f5c4", highlight: "#00f5c4", label: "<video", explain: "Opens the video player tag" },
          { text: 'src="rescue.mp4" ', color: "#ffe94d", highlight: "#ffe94d", label: 'src="rescue.mp4"', explain: "The address of the video file — just like src on an image" },
          { text: "controls", color: "#39ff14", highlight: "#39ff14", label: "controls", explain: "Adds play, pause, and volume buttons — without this the user cannot control the video" },
          { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the opening tag" },
          { text: "</video>", color: "#00f5c4", highlight: "#00f5c4", label: "</video>", explain: "Closes the video tag — unlike img, video needs a closing tag" },
        ],
        miniChallenge: {
          id: "m10a", xp: 25,
          instruction: 'Boot the transmitter! Write a <video> tag with src="message.mp4" and the controls attribute',
          hint1: "controls is just a word on its own — no = or quotes needed",
          hint2: '<video src="message.mp4" controls></video>',
          hint3: '<video src="message.mp4" controls></video>',
          walkthrough: ['Open: <video', 'Add src: src="message.mp4"', 'Add controls: controls', 'Close opening tag: >', 'Add closing tag: </video>', 'Full answer: <video src="message.mp4" controls></video>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<video[^>]*src="message\.mp4"[^>]*controls[^>]*>[\s\S]*<\/video>/.test(n) ||
                /<video[^>]*controls[^>]*src="message\.mp4"[^>]*>[\s\S]*<\/video>/.test(n)) return "pass";
            if (!/<video/.test(n)) return "wrong_tag";
            if (!(/src/.test(n))) return "no_src";
            if (!(/controls/.test(n))) return "no_alt";
            if (/<video/.test(n) && !/<\/video>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Activate the Audio Receiver",
        body: "The <audio> tag works exactly like <video> but for sound only — no picture, just audio. Same attributes: src for the file, controls for the playback buttons, autoplay, loop, muted. Everything you just learned about video applies here too. Will you need more than this? Eventually yes — JavaScript lets you trigger sounds on button clicks, sync audio with animations, and build full custom music players. But the <audio> tag itself is complete as-is for embedding podcasts, sound effects, and music players on any page.",
        anatomy: [
          { text: "<audio ", color: "#ffe94d", highlight: "#ffe94d", label: "<audio", explain: "Opens the audio player tag — works just like video but for sound" },
          { text: 'src="signal.mp3" ', color: "#39ff14", highlight: "#39ff14", label: 'src="signal.mp3"', explain: "The address of the audio file" },
          { text: "controls", color: "#00f5c4", highlight: "#00f5c4", label: "controls", explain: "Adds play, pause, and volume — same as on video" },
          { text: "></audio>", color: "#ffe94d", highlight: "#ffe94d", label: "></audio>", explain: "Close opening tag and add closing tag" },
        ],
        miniChallenge: {
          id: "m10b", xp: 25,
          instruction: 'Activate the receiver! Write an <audio> tag with src="distress.mp3" and controls',
          hint1: "Same as video but swap the tag name to audio",
          hint2: '<audio src="distress.mp3" controls></audio>',
          hint3: '<audio src="distress.mp3" controls></audio>',
          walkthrough: ['Open: <audio', 'Add src: src="distress.mp3"', 'Add controls', 'Close: ></audio>', 'Full answer: <audio src="distress.mp3" controls></audio>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<audio[^>]*src="distress\.mp3"[^>]*controls[^>]*>[\s\S]*<\/audio>/.test(n) ||
                /<audio[^>]*controls[^>]*src="distress\.mp3"[^>]*>[\s\S]*<\/audio>/.test(n)) return "pass";
            if (!/<audio/.test(n)) return "wrong_tag";
            if (!(/src/.test(n))) return "no_src";
            if (!(/controls/.test(n))) return "no_alt";
            if (/<audio/.test(n) && !/<\/audio>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Open the Wormhole Window",
        body: "An <iframe> is a window inside your webpage that shows an entirely different webpage inside it — like a TV inside your TV. This is exactly how YouTube videos appear on news sites and blogs, and how Google Maps gets embedded on restaurant websites. The src is the URL of what you want to show. Width and height control the size — and they can be written in any order since attribute order never matters in HTML. Some common sizes to know: YouTube embeds use width='560' height='315', Google Maps uses width='600' height='450', and width='100%' height='400' works well on mobile. One thing to know: not every website allows itself to be embedded — many block it for security reasons. YouTube, Google Maps, and most services that provide embed codes are specifically designed to be embedded.",
        anatomy: [
          { text: "<iframe ", color: "#a98dff", highlight: "#a98dff", label: "<iframe", explain: "Opens an embedded window — iframe stands for inline frame" },
          { text: 'src="https://youtube.com/embed/abc"', color: "#39ff14", highlight: "#39ff14", label: 'src="..."', explain: "The address of the page to show inside the window" },
          { text: " width=\"560\" height=\"315\"", color: "#ffe94d", highlight: "#ffe94d", label: "width & height", explain: "How big the window is in pixels — you control the size" },
          { text: "></iframe>", color: "#a98dff", highlight: "#a98dff", label: "></iframe>", explain: "Closes the iframe — always needs a closing tag" },
        ],
        miniChallenge: {
          id: "m10c", xp: 25,
          instruction: 'Open the wormhole! Write an <iframe> with src="https://example.com" and width="400" and height="300"',
          hint1: "iframe needs a src, width, height, and a closing tag",
          hint2: '<iframe src="https://example.com" width="400" height="300"></iframe>',
          hint3: '<iframe src="https://example.com" width="400" height="300"></iframe>',
          walkthrough: ['Open: <iframe', 'Add src: src="https://example.com"', 'Add width: width="400"', 'Add height: height="300"', 'Close: ></iframe>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<iframe[^>]*src="https:\/\/example\.com"[^>]*width="400"[^>]*height="300"[^>]*>[\s\S]*<\/iframe>/.test(n) ||
                /<iframe[^>]*src="https:\/\/example\.com"[^>]*>[\s\S]*<\/iframe>/.test(n) && /width="400"/.test(n) && /height="300"/.test(n)) return "pass";
            if (!/<iframe/.test(n)) return "wrong_tag";
            if (!(/src/.test(n))) return "no_src";
            if (/<iframe/.test(n) && !/<\/iframe>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Full Projector System Online",
        body: "Here is what a complete media page looks like with all three tags working together. Notice how simple the HTML actually is — three tags, each doing one job. The browser handles all the complexity of the actual players. When you get to CSS you'll learn how to style these players, resize them responsively, and position them exactly where you want on the page:",
        codeBlock: `<h1>Mission Transmissions</h1>\n\n<h2>Video Message</h2>\n<video src="message.mp4" controls></video>\n\n<h2>Audio Log</h2>\n<audio src="log.mp3" controls></audio>\n\n<h2>Live Feed</h2>\n<iframe\n  src="https://example.com/feed"\n  width="560"\n  height="315">\n</iframe>`,
        miniChallenge: null,
      },
    ],
    bossChallenge: {
      id: "boss10", xp: 70,
      instruction: ["🛸 Restore the holographic projector!", 'Write a <video> with src="clip.mp4" and controls', 'Write an <audio> with src="sound.mp3" and controls', 'Write an <iframe> with src="https://example.com" width="560" and height="315"'],
      hint1: "Three separate media tags one after another — video, audio, then iframe",
      hint2: '<video src="clip.mp4" controls></video>  <audio src="sound.mp3" controls></audio>  <iframe src="https://example.com" width="560" height="315"></iframe>',
      hint3: '<video src="clip.mp4" controls></video><audio src="sound.mp3" controls></audio><iframe src="https://example.com" width="560" height="315"></iframe>',
      walkthrough: [
        'Write the video: <video src="clip.mp4" controls></video>',
        'Write the audio: <audio src="sound.mp3" controls></audio>',
        'Write the iframe: <iframe src="https://example.com" width="560" height="315"></iframe>',
        "Put all three one after another",
      ],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasVideo = /<video[^>]*src="clip\.mp4"[^>]*controls[^>]*>[\s\S]*<\/video>/.test(n) || /<video[^>]*controls[^>]*src="clip\.mp4"[^>]*>[\s\S]*<\/video>/.test(n);
        const hasAudio = /<audio[^>]*src="sound\.mp3"[^>]*controls[^>]*>[\s\S]*<\/audio>/.test(n) || /<audio[^>]*controls[^>]*src="sound\.mp3"[^>]*>[\s\S]*<\/audio>/.test(n);
        const hasIframe = /<iframe[^>]*src="https:\/\/example\.com"[^>]*>[\s\S]*<\/iframe>/.test(n);
        if (hasVideo && hasAudio && hasIframe) return "pass";
        if (!hasVideo) return "wrong_tag";
        if (!hasAudio) return "wrong_tag";
        if (!hasIframe) return "wrong_tag";
        return "generic";
      },
    },
  },

  ,
  {
    id: 11,
    title: "Boot the Navigation Computer",
    subtitle: "Meta & Head",
    badge: "🧠",
    badgeName: "Nav Brain",
    shipPart: "NAV BRAIN MODULE",
    storyIntro: "Projector online! Your navigation computer has no instructions for how to present itself to the galaxy search networks. The head section is like the control panel label — invisible to passengers but essential for the ship to function correctly.",
    theory: [
      {
        heading: "Crack Open the Control Panel",
        body: "Every HTML page has two main sections. The body is everything users SEE — text, images, buttons, all of it. The head is everything the browser READS but never shows on screen — the title in the browser tab, instructions for search engines, links to stylesheets. Think of it like a blueprint inside the wall. Passengers never see it but the whole building depends on it. Is the head section really necessary? Technically a page works without it — but it will have no title, Google won't understand it properly, and it might display broken characters. In real professional work you always include it. Will you learn more about head later? Yes — when you get to CSS you'll add link tags in the head to connect your stylesheet, and in JavaScript you'll add script tags. The head section gets busier as your projects grow.",
        anatomy: [
          { text: "<!DOCTYPE html>", color: "#ffe94d", highlight: "#ffe94d", label: "<!DOCTYPE html>", explain: "Always the very first line of every HTML file. Tells the browser this is modern HTML5. Never skip this." },
          { text: "\n<html>", color: "#00f5c4", highlight: "#00f5c4", label: "<html>", explain: "The root element that wraps the entire page." },
          { text: "\n<head>", color: "#a98dff", highlight: "#a98dff", label: "<head>", explain: "Opens the invisible control panel — everything in here helps the browser and search engines understand the page." },
          { text: "\n</head>\n<body>", color: "#00f5c4", highlight: "#00f5c4", label: "</head><body>", explain: "Close head, open body. Everything visible goes in body." },
        ],
        miniChallenge: {
          id: "m11a", xp: 20,
          instruction: "Crack it open! Write a basic HTML page shell with DOCTYPE, html, head, and body tags",
          hint1: "DOCTYPE first, then html wrapping head and body",
          hint2: "<!DOCTYPE html><html><head></head><body></body></html>",
          hint3: "<!DOCTYPE html><html><head></head><body></body></html>",
          walkthrough: [
            "First line: <!DOCTYPE html>",
            "Open: <html>",
            "Add: <head></head>",
            "Add: <body></body>",
            "Close: </html>",
          ],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<!doctype html>/.test(n) && /<html/.test(n) && /<head>/.test(n) && /<body>/.test(n)) return "pass";
            if (!/<html/.test(n)) return "wrong_tag";
            if (!/<head/.test(n)) return "wrong_tag";
            if (!/<body/.test(n)) return "wrong_tag";
            return "generic";
          },
        },
      },
      {
        heading: "Upload the Charset Encoder",
        body: "The charset meta tag tells the browser what character encoding to use — basically what alphabet and symbol set to expect. UTF-8 is the universal standard that covers every character from every language on Earth including emojis, special punctuation, and mathematical symbols. Without it, characters like é, ñ, 中, or even some quote marks can show up as garbled symbols. Is UTF-8 the only option? There are other encodings like UTF-16 and ISO-8859-1 but you will essentially never use them. UTF-8 is the correct answer 100% of the time. Just always write it exactly like this and never think about it again — it's one of those things you copy-paste into every single project for the rest of your career.",
        anatomy: [
          { text: "<meta ", color: "#00f5c4", highlight: "#00f5c4", label: "<meta", explain: "Meta tags give the browser invisible instructions — no closing tag needed" },
          { text: "charset=\"UTF-8\"", color: "#ffe94d", highlight: "#ffe94d", label: "charset", explain: "Tells the browser to expect every character from every language on Earth" },
          { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the meta tag — no closing tag needed" },
        ],
        miniChallenge: {
          id: "m11b", xp: 20,
          instruction: "Upload the encoder! Write a meta tag with charset set to UTF-8",
          hint1: "Meta tags are void elements — no closing tag",
          hint2: '<meta charset="UTF-8">',
          hint3: '<meta charset="UTF-8">',
          walkthrough: ['Write: <meta charset="UTF-8">'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<meta[^>]*charset="utf-8"[^>]*>/.test(n)) return "pass";
            if (!/<meta/.test(n)) return "wrong_tag";
            return "generic";
          },
        },
      },
      {
        heading: "Calibrate the Mobile Scanner",
        body: "The viewport meta tag is the single most important line for making your page work on phones. Without it, mobile browsers assume your page is designed for a desktop and zoom way out — making everything tiny and unreadable. This one line tells the browser to match the screen width of whatever device is viewing the page and start at normal zoom. Will you need to customize this later? Sometimes yes — certain apps need specific viewport settings for things like preventing user zoom or targeting specific device widths. But the line you're learning right now is the correct default for literally every website and app you will ever build. When you get to CSS you'll learn responsive design which works hand-in-hand with this tag to make layouts that adapt beautifully to any screen size.",
        anatomy: [
          { text: "<meta ", color: "#00f5c4", highlight: "#00f5c4", label: "<meta", explain: "Another meta tag" },
          { text: "name=\"viewport\" ", color: "#ffe94d", highlight: "#ffe94d", label: "name=viewport", explain: "Identifies this as the viewport setting" },
          { text: "content=\"width=device-width, initial-scale=1.0\"", color: "#39ff14", highlight: "#39ff14", label: "content", explain: "Match the page width to the device screen at normal zoom" },
          { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the tag" },
        ],
        miniChallenge: {
          id: "m11c", xp: 25,
          instruction: 'Calibrate the scanner! Write a viewport meta tag with content="width=device-width, initial-scale=1.0"',
          hint1: "Two attributes — name and content",
          hint2: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
          hint3: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
          walkthrough: ['Write: <meta name="viewport" content="width=device-width, initial-scale=1.0">'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<meta[^>]*name="viewport"[^>]*>/.test(n) && /device-width/.test(n)) return "pass";
            if (!/<meta/.test(n)) return "wrong_tag";
            return "generic";
          },
        },
      },
      {
        heading: "Set the Mission Title",
        body: "The <title> tag controls the text shown in the browser tab — that little label at the top of your browser window. It's also the clickable blue headline that appears in Google search results, which makes it more important than most beginners realize. A well-written title can be the difference between someone clicking your link or scrolling past it. Keep it under 60 characters, be specific, and put the most important words first. Is there more to learn about titles? In professional SEO (Search Engine Optimization) there are strategies around title length, keyword placement, and formatting — but the tag itself is exactly what you're learning now. The complexity is in the words you choose, not the HTML.",
        anatomy: [
          { text: "<title>", color: "#ff9f43", highlight: "#ff9f43", label: "<title>", explain: "Opens the title — goes inside head, never body" },
          { text: "Signal Lost", color: "#c8f0ff", highlight: "#39ff14", label: "page title", explain: "This exact text appears in the browser tab and Google search results" },
          { text: "</title>", color: "#ff9f43", highlight: "#ff9f43", label: "</title>", explain: "Closes the title tag" },
        ],
        miniChallenge: {
          id: "m11d", xp: 20,
          instruction: "Set the mission title! Write a title tag that says: My Alien Page",
          hint1: "Title works just like h1 but goes in head",
          hint2: "<title>My Alien Page</title>",
          hint3: "<title>My Alien Page</title>",
          walkthrough: ["Write: <title>My Alien Page</title>"],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<title>[\s\S]*my alien page[\s\S]*<\/title>/.test(n)) return "pass";
            if (!/<title/.test(n)) return "wrong_tag";
            if (/<title/.test(n) && !/<\/title>/.test(n)) return "no_close";
            return "wrong_text";
          },
        },
      },
      {
        heading: "Full Navigation Computer Schematic",
        body: "Here is the complete boilerplate that every single webpage on the internet starts with — the full head section plus a basic body:",
        codeBlock: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Signal Lost</title>\n</head>\n<body>\n  <h1>DISTRESS SIGNAL</h1>\n  <p>Help! Ship down in Sector 7.</p>\n</body>\n</html>",
        miniChallenge: null,
      },
    ],
    bossChallenge: {
      id: "boss11", xp: 70,
      instruction: ["🛸 Boot the navigation computer!", "Write a complete page with DOCTYPE and html tags", "Inside head: add charset UTF-8 meta, viewport meta, and a title that says: Rescue Mission", "Inside body: add an h1 that says: Help Needed and a paragraph that says: Ship crashed in Sector 7"],
      hint1: "DOCTYPE first, then html with head and body — metas and title in head, content in body",
      hint2: '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Rescue Mission</title></head><body><h1>Help Needed</h1><p>Ship crashed in Sector 7</p></body></html>',
      hint3: '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Rescue Mission</title></head><body><h1>Help Needed</h1><p>Ship crashed in Sector 7</p></body></html>',
      walkthrough: [
        "Start: <!DOCTYPE html><html>",
        "Open head: <head>",
        'Add: <meta charset="UTF-8">',
        'Add: <meta name="viewport" content="width=device-width, initial-scale=1.0">',
        "Add: <title>Rescue Mission</title>",
        "Close head open body: </head><body>",
        "Add: <h1>Help Needed</h1>",
        "Add: <p>Ship crashed in Sector 7</p>",
        "Close: </body></html>",
      ],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasDoctype = /<!doctype html>/.test(n);
        const hasCharset = /<meta[^>]*charset="utf-8"[^>]*>/.test(n);
        const hasViewport = /<meta[^>]*viewport[^>]*>/.test(n);
        const hasTitle = /<title>[\s\S]*rescue mission[\s\S]*<\/title>/.test(n);
        const hasH1 = /<h1>[\s\S]*help needed[\s\S]*<\/h1>/.test(n);
        const hasP = /<p>[\s\S]*ship crashed[\s\S]*<\/p>/.test(n);
        if (hasDoctype && hasCharset && hasViewport && hasTitle && hasH1 && hasP) return "pass";
        if (!hasDoctype) return "wrong_tag";
        if (!hasCharset) return "no_src";
        if (!hasViewport) return "no_src";
        if (!hasTitle) return "wrong_tag";
        if (!hasH1) return "wrong_tag";
        return "wrong_tag";
      },
    },
  },
  {
    id: 12,
    title: "Repair the Universal Translator",
    subtitle: "Accessibility",
    badge: "♿",
    badgeName: "Translator Core",
    shipPart: "TRANSLATOR MODULE",
    storyIntro: "Nav computer online! Your universal translator is damaged — your distress signal cannot reach all beings. Accessibility means making your webpage work for everyone, including people who are blind, use keyboards, or need extra help understanding your content.",
    theory: [
      {
        heading: "Teach the Translator to Speak",
        body: "A screen reader is software that reads webpages out loud for people who are blind or have low vision. It reads every single element on the page in order. If your image has no alt text, it literally says the word 'image' and moves on — completely useless to someone who can't see it. You already learned the alt attribute back in Mission 2. Now you understand WHY it matters. Is descriptive alt text really that important? Yes — and not just for blind users. Alt text also shows up when images fail to load, it helps Google understand your images for search ranking, and it's legally required in many countries for public-facing websites. Will you learn more about accessibility later? Yes — Mission 12 covers aria-label and role attributes which go even deeper. And in JavaScript you'll learn to manage focus and keyboard navigation for fully accessible interactive components.",
        anatomy: [
          { text: "<img ", color: "#00f5c4", highlight: "#00f5c4", label: "<img", explain: "An image tag" },
          { text: "src=\"ship.jpg\" ", color: "#ffe94d", highlight: "#ffe94d", label: "src", explain: "Where the image lives" },
          { text: "alt=\"A crashed alien spaceship in a desert at sunset\"", color: "#39ff14", highlight: "#39ff14", label: "descriptive alt", explain: "Screen readers speak this. Be specific — not just spaceship but describe what you actually see." },
          { text: ">", color: "#00f5c4", highlight: "#00f5c4", label: ">", explain: "Closes the tag" },
        ],
        miniChallenge: {
          id: "m12a", xp: 20,
          instruction: 'Write an image with src="rescue.jpg" and a descriptive alt: A rescue team arriving at a crash site',
          hint1: "alt should describe the image in plain words — be specific",
          hint2: '<img src="rescue.jpg" alt="A rescue team arriving at a crash site">',
          hint3: '<img src="rescue.jpg" alt="A rescue team arriving at a crash site">',
          walkthrough: ['Write: <img src="rescue.jpg" alt="A rescue team arriving at a crash site">'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<img[^>]*src="rescue\.jpg"[^>]*alt="a rescue team arriving at a crash site"[^>]*>/.test(n) ||
                /<img[^>]*alt="a rescue team arriving at a crash site"[^>]*src="rescue\.jpg"[^>]*>/.test(n)) return "pass";
            if (!/<img/.test(n)) return "wrong_tag";
            if (!(/alt/.test(n))) return "no_alt";
            return "generic";
          },
        },
      },
      {
        heading: "Install the Label Decoder",
        body: "Sometimes interactive elements have no visible text — like an X button to close a modal, a hamburger menu icon, or a magnifying glass for search. A screen reader hitting one of these would just say 'button' which tells a blind user absolutely nothing about what it does. aria-label is an invisible label that only screen readers can see. Sighted users see the icon, blind users hear the label spoken aloud. Is aria-label the only way to label things for accessibility? No — there's also aria-labelledby which points to an existing element as the label, and aria-describedby which adds a longer description. But aria-label is the most common and the one you'll use most often. Will you learn more? In professional frontend development accessibility is a deep topic. But knowing alt, aria-label, and role puts you ahead of the majority of developers working today.",
        anatomy: [
          { text: "<button ", color: "#00f5c4", highlight: "#00f5c4", label: "<button", explain: "A button that shows only an icon" },
          { text: "aria-label=\"Close menu\"", color: "#ffe94d", highlight: "#ffe94d", label: "aria-label", explain: "Screen readers speak this instead of the button content" },
          { text: ">✕</button>", color: "#c8f0ff", highlight: "#39ff14", label: ">icon</button>", explain: "Sighted users see ✕. Blind users hear Close menu button." },
        ],
        miniChallenge: {
          id: "m12b", xp: 25,
          instruction: 'Write a button with aria-label="Send distress signal" that shows the text: SOS',
          hint1: "aria-label goes inside the opening button tag like any attribute",
          hint2: '<button aria-label="Send distress signal">SOS</button>',
          hint3: '<button aria-label="Send distress signal">SOS</button>',
          walkthrough: ['Write: <button aria-label="Send distress signal">SOS</button>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<button[^>]*aria-label="send distress signal"[^>]*>[\s\S]*sos[\s\S]*<\/button>/.test(n)) return "pass";
            if (!/<button/.test(n)) return "wrong_tag";
            if (!(/aria-label/.test(n))) return "no_href";
            if (/<button/.test(n) && !/<\/button>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Activate the Role Identifier",
        body: "The role attribute tells screen readers what an element IS when the HTML tag alone doesn't communicate it clearly enough. A <div> has zero meaning by itself — but add role='alert' and screen readers know to announce it immediately and urgently when it appears on screen. Other useful roles include 'navigation', 'search', 'dialog', and 'status'. Should you use role everywhere? No — this is important. If you use semantic HTML tags properly (header, nav, main, footer, article, section) you rarely need role at all because those tags already carry meaning. Role is a fallback for when you're stuck using a generic div or span. The golden rule: use the right semantic tag first, reach for role only when you can't. This will all make more sense as you keep building real pages.",
        anatomy: [
          { text: "<div ", color: "#00f5c4", highlight: "#00f5c4", label: "<div", explain: "A generic div with no meaning on its own" },
          { text: "role=\"alert\"", color: "#ffe94d", highlight: "#ffe94d", label: "role=alert", explain: "Tells screen readers: announce this immediately when it appears" },
          { text: ">Hull breach detected!</div>", color: "#c8f0ff", highlight: "#39ff14", label: ">content</div>", explain: "Screen readers announce this instantly when it shows up on screen" },
        ],
        miniChallenge: {
          id: "m12c", xp: 25,
          instruction: 'Write a div with role="alert" containing: Engine failure detected',
          hint1: "role goes inside the opening div tag",
          hint2: '<div role="alert">Engine failure detected</div>',
          hint3: '<div role="alert">Engine failure detected</div>',
          walkthrough: ['Write: <div role="alert">Engine failure detected</div>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<div[^>]*role="alert"[^>]*>[\s\S]*engine failure detected[\s\S]*<\/div>/.test(n)) return "pass";
            if (!/<div/.test(n)) return "wrong_tag";
            if (!(/role/.test(n))) return "no_href";
            if (/<div/.test(n) && !/<\/div>/.test(n)) return "no_close";
            return "generic";
          },
        },
      },
      {
        heading: "Full Translator Schematic",
        body: "Here is what an accessible page looks like — every element labeled, every image described, every interactive element understandable by screen readers:",
        codeBlock: "<header>\n  <h1>Signal Lost</h1>\n  <button aria-label=\"Open navigation menu\">☰</button>\n</header>\n\n<main>\n  <img src=\"crash.jpg\" alt=\"An alien spacecraft crashed in a field at night\">\n\n  <div role=\"alert\">\n    <p>Warning: Oxygen levels critical</p>\n  </div>\n\n  <form>\n    <label for=\"name\">Your Name:</label>\n    <input id=\"name\" type=\"text\">\n    <button type=\"submit\" aria-label=\"Submit rescue request\">Send</button>\n  </form>\n</main>",
        miniChallenge: null,
      },
    ],
    bossChallenge: {
      id: "boss12", xp: 70,
      instruction: ["🛸 Repair the universal translator!", "Write a header with an h1 that says: Mission Control", 'Write a button with aria-label: Toggle navigation that shows the text: Menu', 'Write an img with src: crew.jpg and alt: Three astronauts in spacesuits walking toward a rocket', 'Write a div with role: alert containing: All systems go'],
      hint1: "Four elements — header with h1, button with aria-label, img with descriptive alt, div with role",
      hint2: '<header><h1>Mission Control</h1></header><button aria-label="Toggle navigation">☰</button><img src="crew.jpg" alt="Three astronauts in spacesuits walking toward a rocket"><div role="alert">All systems go</div>',
      hint3: '<header><h1>Mission Control</h1></header><button aria-label="Toggle navigation">☰</button><img src="crew.jpg" alt="Three astronauts in spacesuits walking toward a rocket"><div role="alert">All systems go</div>',
      walkthrough: [
        "Write: <header><h1>Mission Control</h1></header>",
        'Write: <button aria-label="Toggle navigation">☰</button>',
        'Write: <img src="crew.jpg" alt="Three astronauts in spacesuits walking toward a rocket">',
        'Write: <div role="alert">All systems go</div>',
      ],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasHeader = /<header>[\s\S]*mission control[\s\S]*<\/header>/.test(n);
        const hasButton = /<button[^>]*aria-label="toggle navigation"[^>]*>/.test(n);
        const hasImg = /<img[^>]*src="crew\.jpg"[^>]*>/.test(n) && /three astronauts/.test(n);
        const hasAlert = /<div[^>]*role="alert"[^>]*>[\s\S]*all systems go[\s\S]*<\/div>/.test(n);
        if (hasHeader && hasButton && hasImg && hasAlert) return "pass";
        if (!hasHeader) return "wrong_tag";
        if (!hasButton) return "wrong_tag";
        if (!hasImg) return "wrong_tag";
        return "wrong_tag";
      },
    },
  },

  ,
  {
    id: 13,
    title: "Decode the Hidden Messages",
    subtitle: "Comments & Special Characters",
    badge: "💬",
    badgeName: "Decoder Core",
    shipPart: "DECODER MODULE",
    storyIntro: "Universal translator online! Your ship is receiving hidden messages embedded in the alien broadcast — invisible notes that only developers can see. You also need to display some characters that HTML normally treats as code. Time to learn how to hide messages and display special symbols.",
    theory: [
      {
        heading: "Plant the Hidden Transmitter",
        body: "An HTML comment is a note you write in your code that the browser completely ignores — it never shows up on the page. Comments are invisible to users but visible to anyone reading the source code. Developers use them to leave notes for themselves, explain confusing sections, or temporarily disable code without deleting it. Think of it like writing notes in pencil in the margins of a book — readers of the book never see them, but you can flip back and read them anytime. Is this the only use? No — comments are also used by teams to communicate, by teachers to annotate student code, and by developers to track what still needs to be built. You will use comments constantly in real projects.",
        anatomy: [
          { text: "<!--", color: "#ffe94d", highlight: "#ffe94d", label: "<!--", explain: "Opens the comment — everything after this is hidden from the browser" },
          { text: " This is a note only developers can see ", color: "#7b78a0", highlight: "#7b78a0", label: "comment text", explain: "Whatever you write here is completely invisible to users — the browser ignores it entirely" },
          { text: "-->", color: "#ffe94d", highlight: "#ffe94d", label: "-->", explain: "Closes the comment — everything after this is visible again" },
        ],
        miniChallenge: {
          id: "m13a", xp: 20,
          instruction: "Plant the transmitter! Write a comment that says: This is my first comment",
          hint1: "Start with <!-- and end with -->",
          hint2: "<!-- ... -->",
          hint3: "<!-- This is my first comment -->",
          walkthrough: ["Open: <!--", "Write your note: This is my first comment", "Close: -->", "Full answer: <!-- This is my first comment -->"],
          smartCheck: (v) => {
            const n = v.toLowerCase();
            if (!n.trim()) return "empty";
            if (/<!--[\s\S]*this is my first comment[\s\S]*-->/.test(n)) return "pass";
            if (/<!--/.test(n) && !(/-->/.test(n))) return "no_close";
            if (!(/<!--/.test(n))) return "wrong_tag";
            return "generic";
          },
        },
      },
      {
        heading: "Disable the Rogue System",
        body: "One of the most useful things you can do with comments is temporarily disable a piece of code without deleting it. Wrap any HTML in comment tags and the browser acts like it does not exist. Then when you want it back, just remove the comment. This is called commenting out code and every developer does it constantly. It is much safer than deleting something you might need again later.",
        anatomy: [
          { text: "<!-- ", color: "#ffe94d", highlight: "#ffe94d", label: "<!--", explain: "Opens the comment — this entire button is now disabled" },
          { text: "<button>Old Button</button>", color: "#7b78a0", highlight: "#7b78a0", label: "disabled code", explain: "This button exists in the code but the browser ignores it completely" },
          { text: " -->", color: "#ffe94d", highlight: "#ffe94d", label: "-->", explain: "Closes the comment — the button is hidden but not deleted" },
        ],
        miniChallenge: {
          id: "m13b", xp: 20,
          instruction: "Disable the rogue system! Write a comment that wraps and disables this button: <button>Old Button</button>",
          hint1: "Put <!-- before the button and --> after it",
          hint2: "<!-- <button>Old Button</button> -->",
          hint3: "<!-- <button>Old Button</button> -->",
          walkthrough: ["Open comment: <!--", "Add the button: <button>Old Button</button>", "Close comment: -->", "Full answer: <!-- <button>Old Button</button> -->"],
          smartCheck: (v) => {
            const n = v.toLowerCase();
            if (!n.trim()) return "empty";
            if (/<!--[\s\S]*<button>[\s\S]*old button[\s\S]*<\/button>[\s\S]*-->/.test(n)) return "pass";
            if (/<!--/.test(n) && !(/-->/.test(n))) return "no_close";
            if (!(/<!--/.test(n))) return "wrong_tag";
            return "generic";
          },
        },
      },
      {
        heading: "Translate the Alien Symbols",
        body: "Some characters have special meaning in HTML — like < and > which the browser reads as tag brackets. If you want to actually DISPLAY those characters on the page, you have to use special codes called HTML entities. Each entity starts with & and ends with ;. The most important ones: &amp; displays as &, &lt; displays as <, &gt; displays as >, &copy; displays as the copyright symbol ©, and &nbsp; inserts a space that never collapses or breaks across lines. Will you use these constantly? The < and > ones you will use whenever you want to show code examples on a page. &amp; and &copy; come up often in professional work. &nbsp; is everywhere in real codebases.",
        anatomy: [
          { text: "&lt;", color: "#00f5c4", highlight: "#00f5c4", label: "&lt;", explain: "Displays the < character — without this the browser thinks it is a tag opening" },
          { text: "h1", color: "#c8f0ff", highlight: "#39ff14", label: "tag name", explain: "Regular text" },
          { text: "&gt;", color: "#00f5c4", highlight: "#00f5c4", label: "&gt;", explain: "Displays the > character — the closing bracket" },
          { text: "Hello", color: "#c8f0ff", highlight: "#39ff14", label: "text", explain: "The content" },
          { text: "&lt;/h1&gt;", color: "#00f5c4", highlight: "#00f5c4", label: "&lt;/h1&gt;", explain: "Using entities to display the closing tag as text on the page" },
        ],
        miniChallenge: {
          id: "m13c", xp: 25,
          instruction: "Translate the symbols! Write a paragraph that displays: 2 & 2 = 4 — using &amp; for the ampersand",
          hint1: "Use &amp; wherever you want to show the & symbol",
          hint2: "<p>2 &amp; 2 = 4</p>",
          hint3: "<p>2 &amp; 2 = 4</p>",
          walkthrough: ["Open: <p>", "Write: 2 ", "Add ampersand entity: &amp;", "Continue: 2 = 4", "Close: </p>", "Full answer: <p>2 &amp; 2 = 4</p>"],
          smartCheck: (v) => {
            const n = v.toLowerCase();
            if (!n.trim()) return "empty";
            if (/<p>[\s\S]*2[\s\S]*&amp;[\s\S]*2[\s\S]*=[\s\S]*4[\s\S]*<\/p>/.test(n)) return "pass";
            if (!/<p/.test(n)) return "wrong_tag";
            if (!(/&amp;/.test(n))) return "wrong_tag";
            return "generic";
          },
        },
      },
      {
        heading: "Full Decoder Schematic",
        body: "Here is what comments and special characters look like in a real page — developers use both constantly. Notice how the commented code is completely invisible in the preview even though it exists in the source:",
        codeBlock: `<!-- Navigation will go here later -->
<header>
  <h1>Signal Lost &copy; 2026</h1>
  <!-- <button>Old Login</button> -->
  <button>New Login</button>
</header>

<main>
  <p>Use the &lt;h1&gt; tag for main headings.</p>
  <p>Tom &amp; Jerry is a classic show.</p>
  <p>Price:&nbsp;$9.99</p>
</main>`,
        miniChallenge: null,
      },
    ],
    bossChallenge: {
      id: "boss13", xp: 70,
      instruction: ["🛸 Decode the full transmission!", "Write a comment at the top that says: Page header section", "Write a header with an h1 that says: Welcome & Hello using &amp; for the ampersand", "Write a paragraph that shows the text: Use the <p> tag — using &lt; and &gt; around the p"],
      hint1: "Comment first, then header with entity, then paragraph with entities",
      hint2: "<!-- Page header section --><header><h1>Welcome &amp; Hello</h1></header><p>Use the &lt;p&gt; tag</p>",
      hint3: "<!-- Page header section --><header><h1>Welcome &amp; Hello</h1></header><p>Use the &lt;p&gt; tag</p>",
      walkthrough: [
        "Write the comment: <!-- Page header section -->",
        "Write the header: <header><h1>Welcome &amp; Hello</h1></header>",
        "Write the paragraph: <p>Use the &lt;p&gt; tag</p>",
      ],
      smartCheck: (v) => {
        const n = v.toLowerCase();
        if (!n.trim()) return "empty";
        const hasComment = /<!--[\s\S]*page header section[\s\S]*-->/.test(n);
        const hasAmp = /<h1>[\s\S]*welcome[\s\S]*&amp;[\s\S]*hello[\s\S]*<\/h1>/.test(n);
        const hasEntity = /<p>[\s\S]*&lt;p&gt;[\s\S]*<\/p>/.test(n) || /<p>[\s\S]*&lt;p[\s\S]*<\/p>/.test(n);
        if (hasComment && hasAmp && hasEntity) return "pass";
        if (!hasComment) return "wrong_tag";
        if (!hasAmp) return "wrong_tag";
        if (!hasEntity) return "wrong_tag";
        return "generic";
      },
    },
  },
  {
    id: 14,
    title: "Patch the Visual Interface",
    subtitle: "HTML + CSS Intro",
    badge: "🎨",
    badgeName: "Visual Core",
    shipPart: "VISUAL MODULE",
    storyIntro: "Decoder online! Your ship visual interface is grey and lifeless — all the HTML you have learned creates structure but no visual style. CSS is the language that makes things look good. This mission is a preview — you will learn CSS properly in your next adventure, but right now you need just enough to understand how HTML and CSS connect.",
    theory: [
      {
        heading: "Boot the Visual Subsystem",
        body: "HTML builds the structure of a page. CSS styles it. Think of HTML as the skeleton of a building — walls, floors, rooms. CSS is the interior design — paint colors, furniture, lighting. They are two completely separate languages that work together. HTML lives in .html files. CSS lives in .css files. They connect through a link tag in the head section. Right now you will learn inline CSS — style written directly on an HTML element using the style attribute. It is not the professional way to do it but it is the fastest way to see CSS in action and understand how it works.",
        anatomy: [
          { text: "<p ", color: "#00f5c4", highlight: "#00f5c4", label: "<p", explain: "A regular paragraph tag" },
          { text: 'style="', color: "#ffe94d", highlight: "#ffe94d", label: 'style="', explain: "Opens the style attribute — CSS goes inside here" },
          { text: "color: red;", color: "#ff4d6d", highlight: "#ff4d6d", label: "color: red;", explain: "One CSS rule — property: value; — this makes the text red" },
          { text: '"', color: "#ffe94d", highlight: "#ffe94d", label: '"', explain: "Closes the style attribute" },
          { text: ">Hello</p>", color: "#c8f0ff", highlight: "#39ff14", label: ">content</p>", explain: "The paragraph content — it will appear in red" },
        ],
        miniChallenge: {
          id: "m14a", xp: 20,
          instruction: 'Boot the visual system! Write a paragraph that says: Signal Restored — with style="color: green;"',
          hint1: 'Add style="color: green;" inside the opening p tag',
          hint2: '<p style="color: green;">Signal Restored</p>',
          hint3: '<p style="color: green;">Signal Restored</p>',
          walkthrough: ['Open: <p', 'Add style: style="color: green;"', 'Close opening tag: >', 'Add text: Signal Restored', 'Close: </p>', 'Full answer: <p style="color: green;">Signal Restored</p>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<p[^>]*style="[^"]*color:\s*green[^"]*"[^>]*>[\s\S]*signal restored[\s\S]*<\/p>/.test(n)) return "pass";
            if (!/<p/.test(n)) return "wrong_tag";
            if (!(/style/.test(n))) return "no_src";
            if (!(/green/.test(n))) return "wrong_text";
            return "generic";
          },
        },
      },
      {
        heading: "Calibrate the Style Properties",
        body: "CSS rules always follow the same pattern: property: value; — the property is WHAT you want to change and the value is WHAT you want to change it to. You can stack multiple CSS rules inside one style attribute by separating them with semicolons. The most common properties you will use: color changes text color, background-color changes the background, font-size changes text size (use px for pixels), font-weight: bold makes text bold, text-align: center centers text, and padding adds space inside an element. Will you learn more? Yes — there are hundreds of CSS properties. But these six cover a huge percentage of what you see on real websites.",
        anatomy: [
          { text: '<h1 style="', color: "#00f5c4", highlight: "#00f5c4", label: "<h1 style=", explain: "An h1 with a style attribute" },
          { text: "color: cyan;", color: "#00f5c4", highlight: "#00f5c4", label: "color", explain: "Changes the text color to cyan" },
          { text: " background-color: black;", color: "#39ff14", highlight: "#39ff14", label: "background-color", explain: "Changes the background color behind the text" },
          { text: ' font-size: 32px;"', color: "#ffe94d", highlight: "#ffe94d", label: "font-size", explain: "Sets the text size to 32 pixels — px means pixels" },
          { text: ">SIGNAL LOST</h1>", color: "#c8f0ff", highlight: "#39ff14", label: ">content</h1>", explain: "The heading content with all three styles applied" },
        ],
        miniChallenge: {
          id: "m14b", xp: 25,
          instruction: 'Calibrate the properties! Write an h1 that says: Mission Control — with style="color: white; background-color: black;"',
          hint1: "Multiple CSS properties go in the same style attribute separated by semicolons",
          hint2: '<h1 style="color: white; background-color: black;">Mission Control</h1>',
          hint3: '<h1 style="color: white; background-color: black;">Mission Control</h1>',
          walkthrough: ['Open: <h1', 'Add style: style="color: white; background-color: black;"', 'Close: >', 'Add text: Mission Control', 'Close: </h1>'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<h1[^>]*style="[^"]*color:\s*white[^"]*"[^>]*>[\s\S]*mission control[\s\S]*<\/h1>/.test(n) && /background-color:\s*black/.test(n)) return "pass";
            if (!/<h1/.test(n)) return "wrong_tag";
            if (!(/style/.test(n))) return "no_src";
            return "generic";
          },
        },
      },
      {
        heading: "Link the Style Engine",
        body: "Inline styles are quick but messy — imagine adding style attributes to every single element on a 100-page website. That is why CSS normally lives in its own separate file called a stylesheet. You connect it to your HTML with a single link tag in the head section. Then one stylesheet controls the look of every page on your site. Change the stylesheet once and every page updates instantly. This is the professional way. The class and id attributes on HTML elements are how the stylesheet knows which elements to style — you will learn both properly in Neon Collapse. For now just understand that they exist.",
        anatomy: [
          { text: '<link ', color: "#a98dff", highlight: "#a98dff", label: "<link", explain: "A link tag in the head section — connects external files to your HTML" },
          { text: 'rel="stylesheet" ', color: "#ffe94d", highlight: "#ffe94d", label: 'rel="stylesheet"', explain: "Tells the browser this is a CSS stylesheet — rel stands for relationship" },
          { text: 'href="style.css"', color: "#39ff14", highlight: "#39ff14", label: 'href="style.css"', explain: "The filename of your CSS file — just like href on a link tag" },
          { text: ">", color: "#a98dff", highlight: "#a98dff", label: ">", explain: "Closes the tag — link is a void element, no closing tag needed" },
        ],
        miniChallenge: {
          id: "m14c", xp: 25,
          instruction: 'Link the style engine! Write a link tag that connects a stylesheet called: main.css',
          hint1: 'rel="stylesheet" and href points to your CSS file',
          hint2: '<link rel="stylesheet" href="main.css">',
          hint3: '<link rel="stylesheet" href="main.css">',
          walkthrough: ['Write: <link', 'Add rel: rel="stylesheet"', 'Add href: href="main.css"', 'Close: >'],
          smartCheck: (v) => {
            const n = stripContentPunctuation(v.toLowerCase());
            if (!n.trim()) return "empty";
            if (/<link[^>]*rel="stylesheet"[^>]*href="main\.css"[^>]*>/.test(n) || /<link[^>]*href="main\.css"[^>]*rel="stylesheet"[^>]*>/.test(n)) return "pass";
            if (!/<link/.test(n)) return "wrong_tag";
            if (!(/stylesheet/.test(n))) return "no_src";
            if (!(/main\.css/.test(n))) return "wrong_text";
            return "generic";
          },
        },
      },
      {
        heading: "Full Visual Interface Schematic",
        body: "Here is what inline CSS looks like in action — and a preview of how a real stylesheet would connect. Play with the colors and sizes in the editor and watch them change live. This is the beginning of what CSS can do. In Neon Collapse you will go much deeper:",
        codeBlock: `<!DOCTYPE html>
<html>
<head>
  <title>Signal Lost</title>
  <link rel="stylesheet" href="style.css">
</head>
<body style="background-color: #020b18; color: #eae6ff;">

  <h1 style="color: #00f5c4; font-size: 48px; text-align: center;">
    SIGNAL LOST
  </h1>

  <p style="color: #7b78a0; text-align: center;">
    Crash-landed near Earth. Learning HTML to get home.
  </p>

  <button style="background-color: #39ff14; color: black; padding: 10px 24px;">
    Send Distress Signal
  </button>

</body>
</html>`,
        miniChallenge: null,
      },
    ],
    bossChallenge: {
      id: "boss14", xp: 80,
      instruction: ["🛸 Patch the visual interface!", "Write an h1 that says: Alien Transmission with style making the text cyan and font-size 36px", "Write a paragraph that says: Signal strength: 100% with style making the background-color black and color white", "Write a button that says: Boost Signal with style making the background-color green"],
      hint1: "Three elements each with their own style attribute — h1, p, and button",
      hint2: '<h1 style="color: cyan; font-size: 36px;">Alien Transmission</h1><p style="background-color: black; color: white;">Signal strength: 100%</p><button style="background-color: green;">Boost Signal</button>',
      hint3: '<h1 style="color: cyan; font-size: 36px;">Alien Transmission</h1><p style="background-color: black; color: white;">Signal strength: 100%</p><button style="background-color: green;">Boost Signal</button>',
      walkthrough: [
        'Write: <h1 style="color: cyan; font-size: 36px;">Alien Transmission</h1>',
        'Write: <p style="background-color: black; color: white;">Signal strength: 100%</p>',
        'Write: <button style="background-color: green;">Boost Signal</button>',
      ],
      smartCheck: (v) => {
        const n = stripContentPunctuation(v.toLowerCase());
        if (!n.trim()) return "empty";
        const hasH1 = /<h1[^>]*style="[^"]*cyan[^"]*"[^>]*>[\s\S]*alien transmission[\s\S]*<\/h1>/.test(n) || /<h1[^>]*>[\s\S]*alien transmission[\s\S]*<\/h1>/.test(n) && /cyan/.test(n);
        const hasP = /<p[^>]*style="[^"]*"[^>]*>[\s\S]*signal strength[\s\S]*<\/p>/.test(n) && /background-color:\s*black/.test(n);
        const hasButton = /<button[^>]*style="[^"]*green[^"]*"[^>]*>[\s\S]*boost signal[\s\S]*<\/button>/.test(n);
        if (hasH1 && hasP && hasButton) return "pass";
        if (!hasH1) return "wrong_tag";
        if (!hasP) return "wrong_tag";
        if (!hasButton) return "wrong_tag";
        return "generic";
      },
    },
  },

];


// ── BUG IN THE SYSTEM CHALLENGES ─────────────────────────────
const BUG_CHALLENGES = [
  {
    id: "bug1",
    number: 1,
    title: "Bug in the System #1",
    subtitle: "Missions 1 — 3",
    unlocksAfter: [1, 2, 3], // mission IDs that must be complete
    xp: 150,
    instruction: [
      "🛸 System corruption detected — full diagnostic required!",
      "Write an h1 that says: My Alien Page",
      "Write a paragraph that says: I crashed on Earth",
      "Write an unordered list with two items: Need food and Need fuel",
      "Write a button that says: Send Help",
    ],
    hint1: "You need four separate tags — h1, p, ul with two li items, and a button",
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
    subtitle: "Missions 1 — 6",
    unlocksAfter: [1, 2, 3, 4, 5, 6],
    xp: 200,
    instruction: [
      "🛸 Multiple systems corrupted — rebuild the distress page!",
      "Write a <header> with an h1 that says: Distress Signal",
      "Write a <main> containing a paragraph with the word: URGENT in bold",
      "After the paragraph add a <br> then write: All crew accounted for in italic",
      "Add an unordered list with two items: Fuel depleted and Engine offline",
      "Add a link to https://earth.com that says: Contact Earth",
      "Write a <footer> with a paragraph that says: Transmission from Sector 7",
    ],
    hint1: "header, main with content, then footer — semantic layout wrapping everything",
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
    subtitle: "Missions 1 — 9",
    unlocksAfter: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    xp: 250,
    instruction: [
      "🛸 Critical system failure — rebuild the full crew manifest!",
      "Write a <header> with an h1 that says: Crew Manifest",
      "Write a <main> containing an <article> with an h2 that says: Active Crew",
      "Inside the article add a table with headers: Name and Status",
      "Add two data rows: Commander Zyx / Active and Engineer Blorp / MIA",
      "After the article add an <aside> with a paragraph that says: Last updated: Stardate 2026",
      "Write a <form> with a label for name that says: Your Name and an input with id name and type text and a submit button that says: Join Crew",
      "Write a <footer> with a paragraph that says: Signal Lost — Sector 7",
    ],
    hint1: "This one is long — take it section by section. Header, then main with article and aside, then form, then footer",
    hint2: "Build it piece by piece — header first, then main, then form, then footer",
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
      "Write footer: <footer><p>Signal Lost — Sector 7</p></footer>",
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

// ── MISTAKES MUSEUM ───────────────────────────────────────────
const MISTAKES = [
  { title: "The Forgotten Slash", bad: "<p>Hello<p>", good: "<p>Hello</p>", explain: "The closing tag needs a forward slash / before the tag name. Without it the browser thinks you're opening TWO paragraphs!" },
  { title: "The Naked Attribute", bad: '<a href=https://google.com>Link</a>', good: '<a href="https://google.com">Link</a>', explain: 'Attribute values must always be wrapped in quotes. No quotes = the browser gets confused about where the address ends.' },
  { title: "The Runaway Tag", bad: "< p>Hello</p>", good: "<p>Hello</p>", explain: "There's a space after the < symbol. Tags can't have spaces right after the opening bracket — the browser won't recognize it!" },
  { title: "The Missing Bracket", bad: "<p Hello</p>", good: "<p>Hello</p>", explain: "The > at the end of the opening tag is missing. Every opening tag needs a > to close it or the browser can't tell where the tag ends." },
  { title: "The Mismatched Twins", bad: "<h1>Title</h2>", good: "<h1>Title</h1>", explain: "The opening tag is h1 but the closing tag is h2. They must always match — opening and closing tags are a pair!" },
  { title: "The Ghost Image", bad: '<img src="photo.jpg">', good: '<img src="photo.jpg" alt="a photo">', explain: "Missing the alt attribute. Alt text describes the image for people who can't see it — always include it!" },
];

// ── SMART FEEDBACK ────────────────────────────────────────────
const FEEDBACK = {
  empty: "fire up those engines! type your answer in the box above ☝️",
  no_close: "almost! every opening tag needs a closing tag — don't forget the </tag> at the end",
  wrong_tag: "check the tag name — make sure you're using the right one for this mission",
  wrong_text: "the tag looks right, but check what's written between your tags — it needs to match exactly",
  no_href: "you've got the <a> tag, but it needs an href attribute — try: href=\"...\"",
  wrong_href: "check your href — make sure the web address matches exactly, including the https://",
  no_src: "your <img> tag needs a src attribute — try: src=\"...\"",
  no_alt: "your <img> tag needs an alt attribute too — try: alt=\"description\"",
  missing_h2: "looks like the h2 heading is missing — you need both a heading and a link",
  missing_link: "the heading looks good! now add the <a> link below it",
  no_ul: "you need a <ul> tag on the outside to make a bullet list",
  no_ol: "you need an <ol> tag for a numbered list",
  used_ul: "close! but this mission wants a numbered list — swap <ul> for <ol>",
  no_li: "you've got the list tag, but you need <li> tags inside it for each item",
  generic: "not quite — remember: one missing character can break everything! check spaces, quotes, and tag names carefully",
};

// ── XP / SIGNAL BAR ──────────────────────────────────────────
function SignalBar({ current, max }) {
  const pct = Math.min((current / max) * 100, 100);
  return (
    <div style={{ background: C.surface, borderRadius: 99, height: 8, overflow: "hidden", border: `1px solid ${C.border}` }}>
      <div style={{
        width: `${pct}%`, height: "100%",
        background: `linear-gradient(90deg, ${C.accent}, ${C.alien})`,
        borderRadius: 99, transition: "width 0.6s cubic-bezier(.4,0,.2,1)",
        boxShadow: C.glowAlien,
      }} />
    </div>
  );
}

// ── LIVE PREVIEW ──────────────────────────────────────────────
function LivePreview({ html }) {
  const iframeRef = useRef(null);
  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;
    try {
      doc.open();
      doc.write(`<html><head><style>
        body{font-family:system-ui,sans-serif;padding:12px;color:#1a1828;background:#f0fff8;margin:0;}
        h1,h2,h3{margin:0 0 6px;color:#020b18;}p{margin:0 0 6px;}a{color:#7c5cfc;}
        ul,ol{margin:0 0 6px;padding-left:20px;}li{margin-bottom:2px;}
        button{background:#00b894;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:14px;}
        strong{font-weight:700;}em{font-style:italic;}hr{border:none;border-top:2px solid #ccc;margin:8px 0;}
        input,select,textarea{border:1px solid #ccc;padding:6px 10px;border-radius:4px;font-size:14px;margin:4px 0;display:block;width:100%;box-sizing:border-box;}
        label{font-size:14px;font-weight:600;margin-top:8px;display:block;}
        form{background:#f0f0f0;padding:12px;border-radius:6px;}
        table{border-collapse:collapse;width:100%;margin:4px 0;}
        td,th{border:1px solid #ccc;padding:6px 10px;text-align:left;}
        th{background:#e0e0e0;font-weight:700;}
        div,header,main,footer,nav,section{display:block;}
      </style></head><body>${html}</body></html>`);
      doc.close();
    } catch (e) {}
  }, [html]);
  return (
    <div>
      <p style={{ margin: "0 0 6px", color: C.accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 2 }}>📡 Transmission Preview</p>
      <iframe ref={iframeRef} title="preview" style={{ width: "100%", height: 130, border: `1px solid ${C.accent}44`, borderRadius: 8, background: "#f0fff8" }} sandbox="allow-same-origin" />
    </div>
  );
}

// ── CHALLENGE CARD ────────────────────────────────────────────
function ChallengeCard({ challenge, onPass, alreadyDone }) {
  const [val, setVal] = useState("");
  const [status, setStatus] = useState(alreadyDone ? "pass" : "idle");
  const [attempts, setAttempts] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [walkthroughStep, setWalkthroughStep] = useState(0);

  const check = () => {
    const result = challenge.smartCheck(val);
    if (result === "pass") {
      setStatus("pass"); setFeedbackMsg("");
      if (!alreadyDone) onPass(challenge.xp);
    } else {
      setStatus("fail"); setAttempts((a) => a + 1);
      setFeedbackMsg(FEEDBACK[result] || FEEDBACK.generic);
    }
  };

  const getHint = () => {
    if (attempts === 0) return null;
    if (attempts === 1) return challenge.hint1;
    if (attempts === 2) return challenge.hint2;
    return challenge.hint3;
  };

  const borderColor = status === "pass" ? C.alien : status === "fail" ? C.red : C.border;
  const hint = getHint();

  const highlightLine = (text) => {
    const tagPattern = /(<\/?[a-z][a-z0-9]*(?:\s[^>]*)?>|[a-z][a-z0-9-]+="[^"]*")/gi;
    const parts = [];
    let last = 0;
    let match;
    let key = 0;
    while ((match = tagPattern.exec(text)) !== null) {
      if (match.index > last) parts.push(<span key={key++}>{text.slice(last, match.index)}</span>);
      parts.push(<code key={key++} style={{ color: C.alien, background: C.alienDim, padding: "1px 5px", borderRadius: 4, fontFamily: FONTS.mono, fontSize: 13 }}>{match[0]}</code>);
      last = match.index + match[0].length;
    }
    if (last < text.length) parts.push(<span key={key++}>{text.slice(last)}</span>);
    return parts.length > 0 ? <>{parts}</> : text;
  };

  return (
    <div style={{ background: C.card, border: `1.5px solid ${borderColor}`, borderRadius: 12, padding: 20, marginBottom: 16, transition: "border-color 0.3s", boxSizing: "border-box", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          {Array.isArray(challenge.instruction) ? (
            <div>
              {challenge.instruction.map((line, i) => {
                if (i === 0) {
                  // Strip leading emoji from opener
                  const cleanOpener = line.replace(/^[\u{1F300}-\u{1FFFF}\u{2600}-\u{27FF}\s]+/gu, '');
                  return (
                    <div key={i} style={{ marginBottom: 8 }}>
                      <span style={{ color: C.gold, fontWeight: 700, fontSize: 14, fontFamily: FONTS.heading, letterSpacing: 0.5 }}>{cleanOpener}</span>
                    </div>
                  );
                }
                return (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: i < challenge.instruction.length - 1 ? 6 : 0 }}>
                    <span style={{ flexShrink: 0 }}>{ALIEN_BULLETS[i % ALIEN_BULLETS.length]}</span>
                    <span style={{ color: C.textPrimary, fontWeight: 600, fontSize: 14, lineHeight: 1.5 }}>{highlightLine(line)}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {/* split themed opener from task on ! */}
              {(() => {
                const text = challenge.instruction;
                const bangIdx = text.indexOf("! ");
                if (bangIdx !== -1) {
                  const opener = text.substring(0, bangIdx + 1);
                  const task = text.substring(bangIdx + 2);
                  return (
                    <>
                      <div style={{ marginBottom: 8 }}>
                        <span style={{ color: C.gold, fontWeight: 700, fontSize: 14, fontFamily: FONTS.heading, letterSpacing: 0.5 }}>{opener}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <span style={{ flexShrink: 0 }}>{ALIEN_BULLETS[1]}</span>
                        <span style={{ color: C.textPrimary, fontWeight: 600, fontSize: 14, lineHeight: 1.5 }}>{highlightLine(task)}</span>
                      </div>
                    </>
                  );
                }
                return <p style={{ margin: 0, color: C.textPrimary, fontWeight: 600, fontSize: 14, lineHeight: 1.5 }}>{highlightLine(text)}</p>;
              })()}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginLeft: 12, flexShrink: 0 }}>
          <span style={{ color: C.gold, fontSize: 12, fontWeight: 700, background: C.goldDim, padding: "2px 8px", borderRadius: 99 }}>+{challenge.xp} SP</span>
          <button
            onClick={() => { setVal(""); setStatus("idle"); setFeedbackMsg(""); setAttempts(0); setShowWalkthrough(false); setWalkthroughStep(0); }}
            title="Reset challenge"
            style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: "50%", width: 26, height: 26, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, lineHeight: 1 }}
          >↺</button>
        </div>
      </div>

      <textarea
          value={val}
          onChange={(e) => { setVal(e.target.value); setStatus("idle"); setFeedbackMsg(""); }}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              const start = e.target.selectionStart;
              const end = e.target.selectionEnd;
              const newVal = val.substring(0, start) + "  " + val.substring(end);
              setVal(newVal);
              setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = start + 2; }, 0);
            }
          }}
          placeholder="// enter transmission code here…"
          disabled={status === "pass"}
          style={{
            width: "100%", boxSizing: "border-box", height: 80,
            background: C.tagBg, color: C.tagText, border: `1px solid ${C.accent}44`,
            borderRadius: 8, padding: "10px 12px",
            fontFamily: FONTS.mono,
            fontSize: 13, resize: "vertical", outline: "none", marginBottom: 12,
            lineHeight: 1.6,
          }}
        />

      <div style={{ marginBottom: 12 }}>
        <LivePreview html={val} />
      </div>

      {/* tiny mistakes reminder */}
      {attempts >= 2 && status !== "pass" && (
        <div style={{ background: C.surface, border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "8px 12px", marginBottom: 10 }}>
          <p style={{ color: C.accent, margin: "0 0 4px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>⚠️ Transmission Interference</p>
          <p style={{ color: C.textMuted, margin: 0, fontSize: 12, lineHeight: 1.5 }}>
            In code, ONE wrong character can break everything. Check for: a missing <code style={{ background: C.tagBg, color: C.tagText, padding: "1px 4px", borderRadius: 3 }}>"</code> quote, an extra space, a missing <code style={{ background: C.tagBg, color: C.tagText, padding: "1px 4px", borderRadius: 3 }}>&gt;</code>, or a typo in the tag name.
          </p>
        </div>
      )}

      {status === "fail" && feedbackMsg && (
        <div style={{ background: C.redDim, border: `1px solid ${C.red}44`, borderRadius: 8, padding: "8px 12px", marginBottom: 10 }}>
          <p style={{ color: C.red, margin: 0, fontSize: 13 }}>❌ {feedbackMsg}</p>
        </div>
      )}

      {hint && status !== "pass" && (
        <div style={{ background: C.goldDim, border: `1px solid ${C.gold}44`, borderRadius: 8, padding: "8px 12px", marginBottom: 10 }}>
          <p style={{ color: C.gold, margin: 0, fontSize: 13 }}>
            📡 {attempts === 1 ? "Signal Nudge" : attempts === 2 ? "Hint Beam" : "Full Transmission"}: {hint}
          </p>
        </div>
      )}

      {attempts >= 1 && status !== "pass" && !showWalkthrough && (
        <button onClick={() => { setShowWalkthrough(true); setWalkthroughStep(0); }}
          style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", marginBottom: 10, display: "block" }}>
          🆘 Lost in space — walk me through it
        </button>
      )}

      {showWalkthrough && status !== "pass" && (
        <div style={{ background: C.accentDim, border: `1px solid ${C.accent}44`, borderRadius: 10, padding: 14, marginBottom: 10 }}>
          <p style={{ color: C.accent, fontWeight: 700, margin: "0 0 8px", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Step {walkthroughStep + 1} of {challenge.walkthrough.length}</p>
          <p style={{ color: C.textPrimary, margin: "0 0 12px", fontSize: 13, fontFamily: FONTS.mono, wordBreak: "break-all", lineHeight: 1.6 }}>{challenge.walkthrough[walkthroughStep]}</p>
          <div style={{ display: "flex", gap: 8 }}>
            {walkthroughStep > 0 && (
              <button onClick={() => setWalkthroughStep((s) => s - 1)}
                style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 7, padding: "5px 12px", fontSize: 12, cursor: "pointer" }}>← Back</button>
            )}
            {walkthroughStep < challenge.walkthrough.length - 1 ? (
              <button onClick={() => setWalkthroughStep((s) => s + 1)}
                style={{ background: C.accent, color: C.bg, border: "none", borderRadius: 7, padding: "5px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Next →</button>
            ) : (
              <button onClick={() => setShowWalkthrough(false)}
                style={{ background: C.alien, color: C.bg, border: "none", borderRadius: 7, padding: "5px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Got it — initiate attempt! 🛸</button>
            )}
          </div>
        </div>
      )}

      {status === "pass" ? (
        <p style={{ color: C.alien, margin: 0, fontWeight: 700, fontSize: 14 }}>✓ Signal confirmed! System repaired!</p>
      ) : (
        <button onClick={check} style={{ background: C.accent, color: C.bg, border: "none", borderRadius: 8, padding: "9px 22px", fontWeight: 800, fontSize: 12, cursor: "pointer", letterSpacing: 2, fontFamily: FONTS.heading }}>
          TRANSMIT ▶
        </button>
      )}
    </div>
  );
}

// ── DRILL VARIATIONS ─────────────────────────────────────────
// Each mini challenge concept gets extra practice reps with different content
const DRILLS = {
  m1a: [ // tags concept — using h1 as example
    { instruction: "Write an h1 tag for a haunted house attraction called: Nightmare Manor", check: (v) => /<h1>\s*nightmare manor\s*<\/h1>/i.test(v), answer: "<h1>Nightmare Manor</h1>" },
    { instruction: "Write an h1 tag for your favorite restaurant — make up a name!", check: (v) => /<h1>[^<]+<\/h1>/i.test(v), answer: "<h1>Taco Palace</h1>" },
    { instruction: "Write an h2 tag for a section called: Today's Specials", check: (v) => /<h2>\s*today's specials\s*<\/h2>/i.test(v) || /<h2>\s*today's specials\s*<\/h2>/i.test(v), answer: "<h2>Today's Specials</h2>" },
  ],
  m1b: [ // headings concept
    { instruction: "Write an h1 for a superhero origin story called: The Rise of Voltage", check: (v) => /<h1>\s*the rise of voltage\s*<\/h1>/i.test(v), answer: "<h1>The Rise of Voltage</h1>" },
    { instruction: "Write an h2 for a recipe section called: Ingredients", check: (v) => /<h2>\s*ingredients\s*<\/h2>/i.test(v), answer: "<h2>Ingredients</h2>" },
    { instruction: "Write an h3 for a subsection called: Serving Suggestions", check: (v) => /<h3>\s*serving suggestions\s*<\/h3>/i.test(v), answer: "<h3>Serving Suggestions</h3>" },
  ],
  m1c: [ // paragraphs concept
    { instruction: "Write a paragraph introducing yourself as an alien visiting Earth for the first time", check: (v) => /<p>[^<]+<\/p>/i.test(v), answer: "<p>Greetings Earthlings. I have traveled 40 light years to visit your planet.</p>" },
    { instruction: "Write a paragraph describing your favorite food — make it sound delicious", check: (v) => /<p>[^<]+<\/p>/i.test(v), answer: "<p>Nothing beats a perfectly crispy slice of pepperoni pizza fresh from the oven.</p>" },
    { instruction: "Write a paragraph warning someone about a danger ahead", check: (v) => /<p>[^<]+<\/p>/i.test(v), answer: "<p>Warning: the bridge ahead is unstable. Proceed with extreme caution.</p>" },
  ],
  m2a: [ // links concept
    { instruction: 'Write a link to https://spotify.com that says: Listen Now', check: (v) => /<a[^>]*href="https:\/\/spotify\.com"[^>]*>\s*listen now\s*<\/a>/i.test(v), answer: '<a href="https://spotify.com">Listen Now</a>' },
    { instruction: 'Write a link to https://wikipedia.org that says: Learn More', check: (v) => /<a[^>]*href="https:\/\/wikipedia\.org"[^>]*>\s*learn more\s*<\/a>/i.test(v), answer: '<a href="https://wikipedia.org">Learn More</a>' },
    { instruction: 'Write a link to https://youtube.com that says: Watch the Tutorial', check: (v) => /<a[^>]*href="https:\/\/youtube\.com"[^>]*>\s*watch the tutorial\s*<\/a>/i.test(v), answer: '<a href="https://youtube.com">Watch the Tutorial</a>' },
  ],
  m2b: [ // images concept
    { instruction: 'Write an image of a puppy with src="puppy.jpg" and alt="A golden puppy sleeping on a blanket"', check: (v) => /<img[^>]*src="puppy\.jpg"[^>]*>|<img[^>]*alt=[^>]*puppy[^>]*>/i.test(v), answer: '<img src="puppy.jpg" alt="A golden puppy sleeping on a blanket">' },
    { instruction: 'Write an image of a mountain with src="mountain.jpg" and a descriptive alt', check: (v) => /<img[^>]*src="mountain\.jpg"[^>]*alt="[^"]+"[^>]*>|<img[^>]*alt="[^"]+"[^>]*src="mountain\.jpg"[^>]*>/i.test(v), answer: '<img src="mountain.jpg" alt="A snowy mountain peak at sunrise">' },
  ],
  m2c: [ // combining concept
    { instruction: 'Write an h2 that says: My Favorite Sites — then a link to https://netflix.com that says: Watch Movies', check: (v) => /<h2>[\s\S]*my favourite sites[\s\S]*<\/h2>/i.test(v) || /<h2>[\s\S]*my favorite sites[\s\S]*<\/h2>/i.test(v) && /<a[^>]*href="https:\/\/netflix\.com"[^>]*>/i.test(v), answer: '<h2>My Favorite Sites</h2><a href="https://netflix.com">Watch Movies</a>' },
    { instruction: 'Write an image of a logo with src="logo.png" and alt="Company logo" — then a link that says: Visit our site to https://example.com', check: (v) => /<img[^>]*src="logo\.png"[^>]*>/i.test(v) && /<a[^>]*href="https:\/\/example\.com"[^>]*>/i.test(v), answer: '<img src="logo.png" alt="Company logo"><a href="https://example.com">Visit our site</a>' },
  ],
  m3a: [ // ul concept
    { instruction: "Write a bullet list of 3 things you would pack for a camping trip", check: (v) => /<ul>[\s\S]*<li>[^<]+<\/li>[\s\S]*<li>[^<]+<\/li>[\s\S]*<li>[^<]+<\/li>[\s\S]*<\/ul>/i.test(v), answer: "<ul><li>Tent</li><li>Sleeping bag</li><li>Flashlight</li></ul>" },
    { instruction: "Write a bullet list of your top 2 favorite movies — make them up if you want!", check: (v) => /<ul>[\s\S]*<li>[^<]+<\/li>[\s\S]*<li>[^<]+<\/li>[\s\S]*<\/ul>/i.test(v), answer: "<ul><li>The Matrix</li><li>Interstellar</li></ul>" },
  ],
  m3b: [ // ol concept
    { instruction: "Write a numbered list of 3 steps to make a sandwich", check: (v) => /<ol>[\s\S]*<li>[^<]+<\/li>[\s\S]*<li>[^<]+<\/li>[\s\S]*<li>[^<]+<\/li>[\s\S]*<\/ol>/i.test(v), answer: "<ol><li>Get two slices of bread</li><li>Add your fillings</li><li>Put it together and eat</li></ol>" },
    { instruction: "Write a numbered list of 2 steps to start a car", check: (v) => /<ol>[\s\S]*<li>[^<]+<\/li>[\s\S]*<li>[^<]+<\/li>[\s\S]*<\/ol>/i.test(v), answer: "<ol><li>Insert the key</li><li>Turn the ignition</li></ol>" },
  ],
  m3c: [ // button concept
    { instruction: "Write a button for an online store that says: Add to Cart", check: (v) => /<button>\s*add to cart\s*<\/button>/i.test(v), answer: "<button>Add to Cart</button>" },
    { instruction: "Write a button for a newsletter signup that says: Subscribe", check: (v) => /<button>\s*subscribe\s*<\/button>/i.test(v), answer: "<button>Subscribe</button>" },
    { instruction: "Write a button for a dangerous action that says: Delete Account", check: (v) => /<button>\s*delete account\s*<\/button>/i.test(v), answer: "<button>Delete Account</button>" },
  ],
  m4a: [ // strong — builds on p, h tags, lists from m1-3
    { instruction: "Write a paragraph about a product sale where the word FREE is bold", check: (v) => /<p>[\s\S]*<\/p>/i.test(v) && /<strong>[\s\S]*free[\s\S]*<\/strong>/i.test(v), answer: "<p>Get a <strong>FREE</strong> gift with every order over $50.</p>" },
    { instruction: "Write an h2 then a paragraph where the word DANGER is bold", check: (v) => /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<p>[\s\S]*<strong>[\s\S]*<\/strong>[\s\S]*<\/p>/i.test(v), answer: "<h2>Safety Warning</h2><p>This area is <strong>DANGEROUS</strong>. Proceed with caution.</p>" },
    { instruction: "Write a bullet list of 3 phone features where the word NEW is bold before one of them", check: (v) => /<ul>[\s\S]*<\/ul>/i.test(v) && /<strong>[\s\S]*new[\s\S]*<\/strong>/i.test(v), answer: "<ul><li>5000mAh battery</li><li><strong>NEW</strong> 200MP camera</li><li>Waterproof</li></ul>" },
  ],
  m4b: [ // em — builds on p, lists, links from m1-3
    { instruction: "Write a paragraph about a movie where the title is italic", check: (v) => /<p>[\s\S]*<em>[\s\S]*<\/em>[\s\S]*<\/p>/i.test(v), answer: "<p>My favorite film is <em>Interstellar</em> — I have watched it 6 times.</p>" },
    { instruction: "Write a bullet list of 3 books where all titles are italic", check: (v) => /<ul>[\s\S]*<\/ul>/i.test(v) && (v.match(/<em>/gi) || []).length >= 3, answer: "<ul><li><em>Dune</em></li><li><em>1984</em></li><li><em>The Alchemist</em></li></ul>" },
    { instruction: "Write a link to https://imdb.com where the link text is an italic movie title", check: (v) => /<a[^>]*href="https:\/\/imdb\.com"[^>]*>[\s\S]*<em>[\s\S]*<\/em>[\s\S]*<\/a>/i.test(v), answer: '<a href="https://imdb.com"><em>The Dark Knight</em></a>' },
  ],
  m4c: [ // nesting — builds on p, headings from m1-2
    { instruction: "Write a paragraph with a breaking news alert where the headline is both bold and italic", check: (v) => /<p>[\s\S]*<\/p>/i.test(v) && /<strong>[\s\S]*<em>[\s\S]*<\/em>[\s\S]*<\/strong>/i.test(v), answer: "<p><strong><em>BREAKING:</em></strong> Scientists discover life on Europa.</p>" },
    { instruction: "Write an h2 then a paragraph where the most important phrase is bold and italic", check: (v) => /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<strong>[\s\S]*<em>[\s\S]*<\/em>[\s\S]*<\/strong>/i.test(v), answer: "<h2>Limited Offer</h2><p>This deal is <strong><em>absolutely insane</em></strong> — do not miss it.</p>" },
  ],
  m4d: [ // br/hr — builds on headings, paragraphs, lists from m1-3
    { instruction: "Write a heading, a paragraph, then an hr divider, then another paragraph", check: (v) => /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<hr/i.test(v) && (v.match(/<p>/gi) || []).length >= 2, answer: "<h2>Chapter One</h2><p>The adventure begins.</p><hr><p>Little did they know...</p>" },
    { instruction: "Write an address block — name, br, street, br, city — all in one paragraph", check: (v) => /<p>[\s\S]*<\/p>/i.test(v) && (v.match(/<br/gi) || []).length >= 2, answer: "<p>John Smith<br>123 Main Street<br>Houston TX</p>" },
  ],
  m5a: [ // div — builds on headings, paragraphs, lists, links from m1-4
    { instruction: ["Defrag the cargo hold!", "Write a <div> wrapper", "Inside add an <h2> heading with a title", "Add a <p> paragraph preview", "Add an <a> link that says: Read More"], check: (v) => /<div>[\s\S]*<\/div>/i.test(v) && /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<p>[\s\S]*<\/p>/i.test(v) && /<a[\s\S]*<\/a>/i.test(v), answer: '<div><h2>5 Tips for Better Sleep</h2><p>Sleep experts reveal the secrets to waking up refreshed.</p><a href="#">Read More</a></div>' },
    { instruction: ["Reroute ship power!", "Write a <div> wrapper", "Inside add an <h2> product name", "Add a <p> description", "Add a <ul> with 3 feature <li> items"], check: (v) => /<div>[\s\S]*<\/div>/i.test(v) && /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<p>[\s\S]*<\/p>/i.test(v) && /<ul>[\s\S]*<\/ul>/i.test(v), answer: "<div><h2>AirPods Pro</h2><p>The best wireless earbuds ever made.</p><ul><li>Noise cancellation</li><li>30hr battery</li><li>Spatial audio</li></ul></div>" },
  ],
  m5b: [ // span — builds on paragraphs, bold, italic from m1-4
    { instruction: ["Scan the data stream!", "Write a <p> about stocks", "Wrap the price in a <span>", "Make the word UP bold with <strong>"], check: (v) => /<p>[\s\S]*<\/p>/i.test(v) && /<span>[\s\S]*<\/span>/i.test(v) && /<strong>[\s\S]*up[\s\S]*<\/strong>/i.test(v), answer: "<p>Tesla is at <span>$248.50</span> — <strong>UP</strong> 3% today.</p>" },
    { instruction: ["Calibrate the sensors!", "Write a <p> about a recipe", "Wrap the temperature in a <span>", "Make the dish name italic with <em>"], check: (v) => /<p>[\s\S]*<\/p>/i.test(v) && /<span>[\s\S]*<\/span>/i.test(v) && /<em>[\s\S]*<\/em>/i.test(v), answer: "<p>Bake your <em>lasagna</em> at <span>375°F</span> for 45 minutes.</p>" },
  ],
  m5c: [ // semantic layout — builds on headings, paragraphs, links, lists from m1-4
    { instruction: ["Seal the lower decks!", "Write a <footer>", "Inside add a <ul> with 3 <a> links", "Add a <p> with copyright text"], check: (v) => /<footer>[\s\S]*<\/footer>/i.test(v) && /<ul>[\s\S]*<\/ul>/i.test(v), answer: "<footer><ul><li><a href='#'>About</a></li><li><a href='#'>Contact</a></li><li><a href='#'>Privacy</a></li></ul><p>© 2026 NewsHQ</p></footer>" },
    { instruction: ["Activate the bridge!", "Write a <header>", "Inside add an <h1> with the site name", "Add a paragraph with a short site description"], check: (v) => /<header>[\s\S]*<\/header>/i.test(v) && /<h1>[\s\S]*<\/h1>/i.test(v) && /<p>[\s\S]*<\/p>/i.test(v), answer: "<header><h1>CoolSite</h1><p>The best site on the internet.</p></header>" },
  ],
  m5d: [ // full layout — builds on everything from m1-5
    { instruction: ["Full hull diagnostic!", "Write a <header> with an <h1> name and a paragraph tagline", "Write a <main> with an <h2> and <p> description", "Write a <footer> with opening hours"], check: (v) => /<header>[\s\S]*<\/header>/i.test(v) && /<main>[\s\S]*<\/main>/i.test(v) && /<footer>[\s\S]*<\/footer>/i.test(v), answer: "<header><h1>Taco Palace</h1><p>Fresh tacos since 2010</p></header><main><h2>Our Menu</h2><p>Made fresh daily.</p></main><footer><p>Open Mon-Sun 11am-10pm</p></footer>" },
    { instruction: ["Deploy the portfolio module!", "Write a <main>", "Inside add an <h2> and a <p> about yourself", "Add a <ul> with 3 skill <li> items"], check: (v) => /<main>[\s\S]*<\/main>/i.test(v) && /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<p>[\s\S]*<\/p>/i.test(v) && /<ul>[\s\S]*<\/ul>/i.test(v), answer: "<main><h2>About Me</h2><p>Web developer based in Houston TX.</p><ul><li>HTML</li><li>CSS</li><li>JavaScript</li></ul></main>" },
  ],
  m6a: [ // form — builds on headings, paragraphs, buttons from m1-5
    { instruction: ["Initiate job protocol!", "Write a <form>", "Inside add an <h2> and a <p> description", "Add a <button> that says: Apply Now"], check: (v) => /<form>[\s\S]*<\/form>/i.test(v) && /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<button>[\s\S]*<\/button>/i.test(v), answer: "<form><h2>Join Our Team</h2><p>Fill out the form below to apply.</p><button>Apply Now</button></form>" },
    { instruction: ["Open comms channel!", "Write a <main> containing a <form>", "Inside the form add an <h2>", "Add a <button> that says: Send Message"], check: (v) => /<main>[\s\S]*<\/main>/i.test(v) && /<form>[\s\S]*<\/form>/i.test(v), answer: "<main><form><h2>Contact Us</h2><button>Send Message</button></form></main>" },
  ],
  m6b: [ // input — builds on forms, headings, buttons from m1-6a
    { instruction: ["Register new crew member!", "Write a <form> with an <h2>", "Add an <input type='text'> for name", "Add an <input type='email'> for email", "Add a <button type='submit'>"], check: (v) => /<form>[\s\S]*<\/form>/i.test(v) && /<input[^>]*type="text"[^>]*>/i.test(v) && /<input[^>]*type="email"[^>]*>/i.test(v) && /<button/i.test(v), answer: '<form><h2>Sign Up</h2><input type="text" placeholder="Full name"><input type="email" placeholder="Email"><button type="submit">Join</button></form>' },
    { instruction: ["Reboot security systems!", "Write an <input type='email'> for the email", "Add an <input type='password'> for new password", "Add another <input type='password'> to confirm"], check: (v) => /<input[^>]*type="email"[^>]*>[\s\S]*<input[^>]*type="password"[^>]*>[\s\S]*<input[^>]*type="password"[^>]*>/i.test(v), answer: '<input type="email" placeholder="Your email"><input type="password" placeholder="New password"><input type="password" placeholder="Confirm password">' },
  ],
  m6c: [ // label+input — builds on forms, headings, buttons from m1-6b
    { instruction: ["Access the mainframe!", "Write a <label> and <input type='email'> for email", "Write a <label> and <input type='password'> for password", "Add a <button type='submit'> to log in"], check: (v) => /<label[^>]*for="[\w-]+"[^>]*>[\s\S]*<\/label>[\s\S]*<input[^>]*id="[\w-]+"[\s\S]*<label[^>]*for="[\w-]+"[^>]*>[\s\S]*<\/label>[\s\S]*<input[^>]*id="[\w-]+"[\s\S]*<button/i.test(v), answer: '<label for="email">Email</label><input id="email" type="email"><label for="pass">Password</label><input id="pass" type="password"><button type="submit">Log In</button>' },
    { instruction: ["Register alien crew!", "Write a <label> and <input type='text'> for name", "Write a <label> and <input type='date'> for birthday"], check: (v) => /<label[\s\S]*<\/label>[\s\S]*<input[\s\S]*<label[\s\S]*<\/label>[\s\S]*<input[^>]*type="date"[^>]*>/i.test(v), answer: '<label for="name">Your Name</label><input id="name" type="text"><label for="bday">Birthday</label><input id="bday" type="date">' },
  ],
  m7a: [ // select — builds on labels, forms, headings, buttons from m1-6c
    { instruction: ["Configure the food replicator!", "Write a <form>", "Add a <label> and <select> with Small, Medium, Large <option> items", "Add a <button type='submit'> to order"], check: (v) => /<form>[\s\S]*<\/form>/i.test(v) && /<label[\s\S]*<\/label>/i.test(v) && /<select>[\s\S]*<\/select>/i.test(v) && /<button/i.test(v), answer: '<form><label for="size">Size:</label><select id="size"><option>Small</option><option>Medium</option><option>Large</option></select><button type="submit">Order</button></form>' },
    { instruction: ["Calibrate ship settings!", "Write a <label> and <select> for language with English and Spanish <option> items", "Write a <label> and <select> for theme with Light and Dark <option> items"], check: (v) => /<select>[\s\S]*<\/select>[\s\S]*<select>[\s\S]*<\/select>/i.test(v), answer: '<label for="lang">Language</label><select id="lang"><option>English</option><option>Spanish</option></select><label for="theme">Theme</label><select id="theme"><option>Light</option><option>Dark</option></select>' },
  ],
  m7b: [ // textarea — builds on labels, forms, headings, buttons from m1-7a
    { instruction: ["Open a support channel!", "Write a <form> with an <h2>", "Add a <label> and <textarea> for the issue", "Add a <button type='submit'>"], check: (v) => /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<label[\s\S]*<\/label>/i.test(v) && /<textarea[\s\S]*<\/textarea>/i.test(v) && /<button/i.test(v), answer: '<h2>Submit a Ticket</h2><label for="issue">Describe your issue:</label><textarea id="issue" placeholder="What went wrong?"></textarea><button type="submit">Submit</button>' },
    { instruction: ["Transmit crew feedback!", "Write a <label> and <input type='text'> for name", "Write a <label> and <textarea> for the review", "Add a <button type='submit'>"], check: (v) => /<input[^>]*type="text"[^>]*>/i.test(v) && /<textarea[\s\S]*<\/textarea>/i.test(v) && /<button/i.test(v), answer: '<label for="name">Your Name</label><input id="name" type="text"><label for="review">Your Review</label><textarea id="review" placeholder="Share your thoughts"></textarea><button type="submit">Post Review</button>' },
  ],
  m7c: [ // submit — builds on complete forms from m1-7b
    { instruction: ["Broadcast to the fleet!", "Write a <form>", "Add a <label> and <input type='email'>", "Add a <button type='submit'> that says: Join 50,000 Subscribers"], check: (v) => /<label[\s\S]*<\/label>/i.test(v) && /<input[^>]*type="email"[^>]*>/i.test(v) && /<button[^>]*type="submit"[^>]*>[\s\S]*<\/button>/i.test(v), answer: '<form><label for="email">Email</label><input id="email" type="email" placeholder="you@email.com"><button type="submit">Join 50,000 Subscribers</button></form>' },
    { instruction: ["Fund the rescue mission!", "Write a <label> and <input type='number'> for amount", "Add a <label> and <select> with One-time and Monthly <option> items", "Add a <button type='submit'> that says: Donate Now"], check: (v) => /<input[^>]*type="number"[^>]*>/i.test(v) && /<select>[\s\S]*<\/select>/i.test(v) && /<button[^>]*type="submit"[^>]*>/i.test(v), answer: '<label for="amount">Amount ($)</label><input id="amount" type="number" placeholder="25"><label for="freq">Frequency</label><select id="freq"><option>One-time</option><option>Monthly</option></select><button type="submit">Donate Now</button>' },
  ],
  m8a: [ // table tr td — builds on headings, semantic layout from m1-7
    { instruction: ["Initialize the scoreboard!", "Write an <h2> that says: Leaderboard", "Write a <table> with one <tr> row", "Inside add two <td> cells for name and score"], check: (v) => /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<table>[\s\S]*<\/table>/i.test(v) && (v.match(/<td>/gi) || []).length >= 2, answer: "<h2>Leaderboard</h2><table><tr><td>SpaceAce</td><td>99,400</td></tr></table>" },
    { instruction: ["Access the film archive!", "Write a <main>", "Inside add a <table>", "Add 2 <tr> rows each with two <td> cells for movie title and year"], check: (v) => /<main>[\s\S]*<\/main>/i.test(v) && /<table>[\s\S]*<\/table>/i.test(v) && (v.match(/<tr>/gi) || []).length >= 2, answer: "<main><table><tr><td>Inception</td><td>2010</td></tr><tr><td>Parasite</td><td>2019</td></tr></table></main>" },
  ],
  m8b: [ // th headers — builds on full tables, semantic layout from m1-8a
    { instruction: ["Upload the schedule matrix!", "Write a <table>", "Add a header <tr> with three <th> cells: Time, Subject, Room", "Add 2 data <tr> rows with three <td> cells each"], check: (v) => /<table>[\s\S]*<\/table>/i.test(v) && /time/i.test(v) && (v.match(/<th>/gi) || []).length >= 3 && /<td>/i.test(v), answer: "<table><tr><th>Time</th><th>Subject</th><th>Room</th></tr><tr><td>9am</td><td>HTML</td><td>Lab 3</td></tr><tr><td>11am</td><td>CSS</td><td>Lab 4</td></tr></table>" },
    { instruction: ["Deploy the pricing matrix!", "Write a <main> with an <h2>", "Write a <table> with header <th> cells: Plan and Price", "Add 2 data <tr> rows with <td> cells"], check: (v) => /<main>[\s\S]*<\/main>/i.test(v) && /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<table>[\s\S]*<\/table>/i.test(v) && /<th>/i.test(v), answer: "<main><h2>Our Plans</h2><table><tr><th>Plan</th><th>Price</th></tr><tr><td>Free</td><td>$0</td></tr><tr><td>Pro</td><td>$12/mo</td></tr></table></main>" },
  ],
  m8c: [ // full tables — builds on everything from m1-8b
    { instruction: ["Reconstruct the recipe database!", "Write a <header> with the recipe name", "Write a <main> with a <table> — headers: Ingredient and Amount — with 3 data rows", "Add an <ol> with numbered cooking steps"], check: (v) => /<table>[\s\S]*<\/table>/i.test(v) && /<th>/i.test(v) && /<ol>[\s\S]*<\/ol>/i.test(v), answer: "<header><h1>Classic Carbonara</h1></header><main><table><tr><th>Ingredient</th><th>Amount</th></tr><tr><td>Pasta</td><td>200g</td></tr><tr><td>Eggs</td><td>3</td></tr><tr><td>Pancetta</td><td>100g</td></tr></table><ol><li>Boil pasta</li><li>Fry pancetta</li><li>Mix and serve</li></ol></main>" },
  ],
  m9a: [ // article — builds on headings, paragraphs, lists, bold/italic from m1-8
    { instruction: ["Intercept the product signal!", "Write an <article>", "Inside add an <h2> title and <p> description", "Add a <ul> with 3 feature <li> items"], check: (v) => /<article>[\s\S]*<\/article>/i.test(v) && /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<p>[\s\S]*<\/p>/i.test(v) && /<ul>[\s\S]*<\/ul>/i.test(v), answer: "<article><h2>iPhone 17 Announced</h2><p>Apple unveiled its most powerful iPhone yet.</p><ul><li>A19 chip</li><li>48MP camera</li><li>All-day battery</li></ul></article>" },
    { instruction: ["Decode the news broadcast!", "Write an <article> with an <h2> and <p>", "Make a key phrase in the paragraph <strong>", "Add an <aside> with a related fact paragraph"], check: (v) => /<article>[\s\S]*<\/article>/i.test(v) && /<strong>[\s\S]*<\/strong>/i.test(v) && /<aside>[\s\S]*<\/aside>/i.test(v), answer: "<article><h2>Climate Report</h2><p>Scientists warn of <strong>record temperatures</strong> ahead.</p></article><aside><p>Fact: 2025 was the hottest year ever recorded.</p></aside>" },
  ],
  m9b: [ // section — builds on semantic layout, headings, paragraphs, lists from m1-9a
    { instruction: ["Triangulate dual signals!", "Write a <section> for About with an <h2> and <p>", "Write a second <section> for Services with an <h2> and <ul> of 3 items"], check: (v) => (v.match(/<section>/gi) || []).length >= 2 && /<ul>[\s\S]*<\/ul>/i.test(v), answer: "<section><h2>About</h2><p>We build amazing websites.</p></section><section><h2>Services</h2><ul><li>Design</li><li>Development</li><li>SEO</li></ul></section>" },
    { instruction: ["Activate dual beam array!", "Write a <main>", "Inside add a hero <section> with an <h1> and <p>", "Add a features <section> with an <h2> and <ul> of 3 <li> items"], check: (v) => /<main>[\s\S]*<\/main>/i.test(v) && (v.match(/<section>/gi) || []).length >= 2 && /<ul>[\s\S]*<\/ul>/i.test(v), answer: "<main><section><h1>Build Faster</h1><p>The tool developers love.</p></section><section><h2>Features</h2><ul><li>Fast</li><li>Reliable</li><li>Beautiful</li></ul></section></main>" },
  ],
  m9c: [ // aside — builds on articles, sections, semantic layout from m1-9b
    { instruction: ["Scan the nutrition database!", "Write an <article> with an <h2> and <p>", "Add an <aside> with a fact where the key number is <strong>"], check: (v) => /<aside>[\s\S]*<\/aside>/i.test(v) && /<strong>[\s\S]*<\/strong>/i.test(v), answer: "<article><h2>Eat More Vegetables</h2><p>Experts recommend 5 servings of vegetables per day.</p></article><aside><p>Fact: <strong>90%</strong> of Americans do not eat enough vegetables.</p></aside>" },
    { instruction: ["Access the cooking module!", "Write a <main>", "Inside add a <section> with an <h2> and <p>", "Add an <aside> with a cooking tip paragraph"], check: (v) => /<main>[\s\S]*<\/main>/i.test(v) && /<section>[\s\S]*<\/section>/i.test(v) && /<aside>[\s\S]*<\/aside>/i.test(v), answer: "<main><section><h2>Spaghetti Bolognese</h2><p>A classic Italian comfort food.</p></section><aside><p>Tip: Always salt your pasta water generously.</p></aside></main>" },
  ],
  m9d: [ // figure+figcaption — builds on articles, sections, images from m1-9c
    { instruction: ["Deploy the visual sensors!", "Write an <article> with an <h2>", "Add a <figure> with an <img> and descriptive <figcaption>", "Add a <p> about the topic"], check: (v) => /<article>[\s\S]*<\/article>/i.test(v) && /<figure>[\s\S]*<\/figure>/i.test(v) && /<figcaption>[\s\S]*<\/figcaption>/i.test(v), answer: '<article><h2>Capturing the Wild</h2><figure><img src="lion.jpg" alt="A lion resting in tall savanna grass at sunset"><figcaption>A male lion at sunset in the Serengeti</figcaption></figure><p>Wildlife photography requires patience and skill.</p></article>' },
    { instruction: ["Scan two planetary surfaces!", "Write a <main>", "Add a <figure> with <img> and <figcaption> for one city", "Add a second <figure> with <img> and <figcaption> for another city"], check: (v) => /<main>[\s\S]*<\/main>/i.test(v) && (v.match(/<figure>/gi) || []).length >= 2 && (v.match(/<figcaption>/gi) || []).length >= 2, answer: '<main><figure><img src="tokyo.jpg" alt="Tokyo skyline at night"><figcaption>Tokyo, Japan</figcaption></figure><figure><img src="nyc.jpg" alt="New York City from Central Park"><figcaption>New York City, USA</figcaption></figure></main>' },
  ],
  m10a: [ // video — builds on figures, sections, articles, headings from m1-9d
    { instruction: ["Restore the holographic archive!", "Write an <article> with an <h2>", "Add a <figure> containing a <video> with controls", "Add a <p> about the film"], check: (v) => /<article>[\s\S]*<\/article>/i.test(v) && /<video[\s\S]*<\/video>/i.test(v) && /controls/i.test(v), answer: '<article><h2>Short Film: Lost Signal</h2><figure><video src="film.mp4" controls></video><figcaption>Watch the full short film</figcaption></figure><p>Directed by emerging filmmaker Zara Kim.</p></article>' },
    { instruction: ["Boot the hero projection!", "Write a <section> with an <h1>", "Add a <video> with autoplay loop and muted attributes", "Add a <p> tagline below the video"], check: (v) => /<section>[\s\S]*<\/section>/i.test(v) && /<video[\s\S]*<\/video>/i.test(v) && /autoplay/i.test(v) && /muted/i.test(v), answer: '<section><h1>Welcome to the Future</h1><video src="hero.mp4" autoplay loop muted></video><p>Technology that changes everything.</p></section>' },
  ],
  m10b: [ // audio — builds on articles, figures, sections from m1-10a
    { instruction: ["Tune the audio receiver!", "Write a <section> with an <h2>", "Add an <audio> player with controls", "Add a <p> describing the episode"], check: (v) => /<section>[\s\S]*<\/section>/i.test(v) && /<audio[\s\S]*<\/audio>/i.test(v) && /controls/i.test(v), answer: '<section><h2>Episode 42: The Future of AI</h2><audio src="ep42.mp3" controls></audio><p>In this episode we explore how AI is reshaping every industry.</p></section>' },
    { instruction: ["Review the transmission log!", "Write an <article> with an <h2> where the album title is <em>", "Add an <audio> preview with controls", "Add a <p> review where the rating is <strong>"], check: (v) => /<article>[\s\S]*<\/article>/i.test(v) && /<audio[\s\S]*<\/audio>/i.test(v) && /<strong>[\s\S]*<\/strong>/i.test(v), answer: '<article><h2><em>Utopia</em> by Travis Scott</h2><audio src="preview.mp3" controls></audio><p>A genre-defining masterpiece. Rating: <strong>9.5/10</strong></p></article>' },
  ],
  m10c: [ // iframe — builds on sections, headings, paragraphs, figures from m1-10b
    { instruction: ["Open the navigation window!", "Write a <section> with an <h2>", "Add a <p> with the address", "Embed a Google Map using an <iframe>"], check: (v) => /<section>[\s\S]*<\/section>/i.test(v) && /<h[1-6]>[\s\S]*<\/h[1-6]>/i.test(v) && /<iframe[\s\S]*<\/iframe>/i.test(v), answer: '<section><h2>Find Us</h2><p>123 Main Street, Houston TX</p><iframe src="https://maps.google.com/embed" width="600" height="450"></iframe></section>' },
    { instruction: ["Stream the training signal!", "Write an <h2> for the tutorial title", "Embed a YouTube video using an <iframe>", "Add a <ul> with 3 <li> items covering what the video teaches"], check: (v) => /<iframe[\s\S]*youtube[\s\S]*<\/iframe>/i.test(v) && /<ul>[\s\S]*<\/ul>/i.test(v), answer: '<h2>HTML Crash Course</h2><iframe src="https://youtube.com/embed/abc" width="560" height="315"></iframe><ul><li>How to write tags</li><li>Building forms</li><li>Semantic layout</li></ul>' },
  ],

  m11a: [
    { instruction: "Write a page shell for a pizza website — DOCTYPE, html, head, and body", check: (v) => /<!doctype html>/i.test(v) && /<html/i.test(v) && /<head>/i.test(v) && /<body>/i.test(v), answer: "<!DOCTYPE html><html><head></head><body></body></html>" },
    { instruction: "Write a page shell for your personal portfolio", check: (v) => /<!doctype html>/i.test(v) && /<html/i.test(v) && /<\/html>/i.test(v), answer: "<!DOCTYPE html><html><head></head><body></body></html>" },
  ],
  m11b: [
    { instruction: "Write the charset meta tag that handles every language on Earth", check: (v) => /<meta[^>]*charset="utf-8"[^>]*>/i.test(v), answer: '<meta charset="UTF-8">' },
    { instruction: "Write the charset meta tag for a website that needs to display Chinese characters", check: (v) => /<meta[^>]*charset="utf-8"[^>]*>/i.test(v), answer: '<meta charset="UTF-8">' },
  ],
  m11c: [
    { instruction: "Write a viewport meta tag for a mobile cooking app", check: (v) => /<meta[^>]*name="viewport"[^>]*>/i.test(v) && /device-width/i.test(v), answer: '<meta name="viewport" content="width=device-width, initial-scale=1.0">' },
    { instruction: "Write a description meta tag for a travel blog about Japan", check: (v) => /<meta[^>]*name="description"[^>]*>/i.test(v) && /japan/i.test(v), answer: '<meta name="description" content="A travel blog about exploring Japan">' },
  ],
  m11d: [
    { instruction: "Write a title tag for a coffee shop called The Daily Grind", check: (v) => /<title>[\s\S]*daily grind[\s\S]*<\/title>/i.test(v), answer: "<title>The Daily Grind Coffee Shop</title>" },
    { instruction: "Write a title tag for a YouTube-style video about cooking pasta", check: (v) => /<title>[\s\S]*<\/title>/i.test(v) && /pasta|cook/i.test(v), answer: "<title>How to Cook Perfect Pasta Every Time</title>" },
  ],
  m12a: [
    { instruction: 'Write an image of a sunset with src="sunset.jpg" and a vivid descriptive alt', check: (v) => /<img[^>]*src="sunset\.jpg"[^>]*alt="[^"]{10,}"[^>]*>/i.test(v) || /<img[^>]*alt="[^"]{10,}"[^>]*src="sunset\.jpg"[^>]*>/i.test(v), answer: '<img src="sunset.jpg" alt="A vibrant orange and pink sunset over a calm ocean">' },
    { instruction: "Write an image of your favorite food with a mouthwatering alt description", check: (v) => /<img[^>]*alt="[^"]{10,}"[^>]*>/i.test(v), answer: '<img src="pizza.jpg" alt="A hot pepperoni pizza fresh out of the oven with melted cheese">' },
  ],
  m12b: [
    { instruction: 'Write a button with aria-label: Close dialog that shows an X', check: (v) => /<button[^>]*aria-label="close dialog"[^>]*>/i.test(v), answer: '<button aria-label="Close dialog">X</button>' },
    { instruction: 'Write a button with aria-label: Search the website that shows the text: Search', check: (v) => /<button[^>]*aria-label="search the website"[^>]*>/i.test(v), answer: '<button aria-label="Search the website">Search</button>' },
  ],
  m12c: [
    { instruction: 'Write a div with role="status" containing: Saving your progress', check: (v) => /<div[^>]*role="status"[^>]*>[\s\S]*saving[\s\S]*<\/div>/i.test(v), answer: '<div role="status">Saving your progress</div>' },
    { instruction: 'Write a div with role="alert" containing: Connection lost please try again', check: (v) => /<div[^>]*role="alert"[^>]*>[\s\S]*connection lost[\s\S]*<\/div>/i.test(v), answer: '<div role="alert">Connection lost please try again</div>' },
  ],

  m13a: [
    { instruction: "Write a comment explaining what the next section of code does — pretend it is a navigation menu", check: (v) => /<!--[\s\S]*nav[\s\S]*-->/.test(v.toLowerCase()), answer: "<!-- Navigation menu goes here -->" },
    { instruction: "Write a comment with a reminder to yourself: Add contact form here later", check: (v) => /<!--[\s\S]*contact[\s\S]*-->/.test(v.toLowerCase()), answer: "<!-- Add contact form here later -->" },
  ],
  m13b: [
    { instruction: "Comment out this old heading to disable it: <h1>Old Title</h1>", check: (v) => /<!--[\s\S]*<h1>[\s\S]*old title[\s\S]*<\/h1>[\s\S]*-->/i.test(v), answer: "<!-- <h1>Old Title</h1> -->" },
    { instruction: "Comment out this paragraph to hide it: <p>Coming soon</p>", check: (v) => /<!--[\s\S]*<p>[\s\S]*coming soon[\s\S]*<\/p>[\s\S]*-->/i.test(v), answer: "<!-- <p>Coming soon</p> -->" },
  ],
  m13c: [
    { instruction: "Write a paragraph that shows: Coffee & Tea using &amp; for the ampersand", check: (v) => /<p>[\s\S]*coffee[\s\S]*&amp;[\s\S]*tea[\s\S]*<\/p>/i.test(v), answer: "<p>Coffee &amp; Tea</p>" },
    { instruction: "Write a paragraph showing the copyright notice: Copyright &copy; 2026 SignalLost", check: (v) => /<p>[\s\S]*&copy;[\s\S]*<\/p>/i.test(v), answer: "<p>Copyright &copy; 2026 SignalLost</p>" },
    { instruction: "Write a paragraph that shows HTML code as text: The &lt;p&gt; tag is for paragraphs", check: (v) => /<p>[\s\S]*&lt;p&gt;[\s\S]*<\/p>/i.test(v) || /<p>[\s\S]*&lt;p[\s\S]*<\/p>/i.test(v), answer: "<p>The &lt;p&gt; tag is for paragraphs</p>" },
  ],
  m14a: [
    { instruction: "Write a paragraph that says: Warning — with style making the text red", check: (v) => /<p[^>]*style="[^"]*color:\s*red[^"]*"[^>]*>/i.test(v), answer: '<p style="color: red;">Warning</p>' },
    { instruction: "Write an h2 that says: Success — with style making the text green", check: (v) => /<h2[^>]*style="[^"]*color:\s*green[^"]*"[^>]*>/i.test(v), answer: '<h2 style="color: green;">Success</h2>' },
    { instruction: "Write a paragraph with any text and style making the background-color yellow", check: (v) => /<p[^>]*style="[^"]*background-color:\s*yellow[^"]*"[^>]*>/i.test(v), answer: '<p style="background-color: yellow;">Highlighted text</p>' },
  ],
  m14b: [
    { instruction: "Write an h1 with style setting font-size to 48px and text-align to center", check: (v) => /<h1[^>]*style="[^"]*font-size:\s*48px[^"]*"[^>]*>/i.test(v) && /text-align:\s*center/i.test(v), answer: '<h1 style="font-size: 48px; text-align: center;">Signal Lost</h1>' },
    { instruction: "Write a button with style making it have a green background and white text", check: (v) => /<button[^>]*style="[^"]*background-color:\s*green[^"]*"[^>]*>/i.test(v) && /color:\s*white/i.test(v), answer: '<button style="background-color: green; color: white;">Click Me</button>' },
  ],
  m14c: [
    { instruction: "Write a link tag connecting a stylesheet called: app.css", check: (v) => /<link[^>]*rel="stylesheet"[^>]*href="app\.css"[^>]*>/i.test(v) || /<link[^>]*href="app\.css"[^>]*rel="stylesheet"[^>]*>/i.test(v), answer: '<link rel="stylesheet" href="app.css">' },
    { instruction: "Write a full page head section with charset meta, viewport meta, title, and a link to style.css", check: (v) => /<head>[\s\S]*<meta[^>]*charset[\s\S]*<meta[^>]*viewport[\s\S]*<title>[\s\S]*<\/title>[\s\S]*<link[^>]*stylesheet[\s\S]*<\/head>/i.test(v), answer: '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>My Page</title><link rel="stylesheet" href="style.css"></head>' },
  ],

};

const MIN_DRILLS = 2; // minimum reps before Move On unlocks

// ── DRILL ZONE ────────────────────────────────────────────────
function DrillZone({ challengeId, onReady }) {
  const drills = DRILLS[challengeId] || [];
  const [current, setCurrent] = useState(0);
  const [val, setVal] = useState("");
  const [status, setStatus] = useState("idle");
  const [reps, setReps] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (!drills.length) onReady();
  }, []);

  if (!drills.length) return null;

  const drill = drills[current % drills.length];
  const confident = reps >= MIN_DRILLS;

  const check = () => {
    if (drill.check(val.toLowerCase())) {
      setStatus("pass");
      setReps((r) => r + 1);
    } else {
      setStatus("fail");
    }
  };

  const next = () => {
    setCurrent((c) => c + 1);
    setVal("");
    setStatus("idle");
    setShowAnswer(false);
  };

  return (
    <div style={{ background: C.surface, border: `1px solid ${C.accent}33`, borderRadius: 12, padding: 16, marginTop: 8 }}>
      {/* header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <div style={{ color: C.alien, fontSize: 15, fontWeight: 800, letterSpacing: 2, fontFamily: FONTS.heading }}>OPTIONAL</div>
          <div style={{ color: C.accent, fontSize: 10, textTransform: "uppercase", letterSpacing: 2, marginTop: 2 }}>🔁 Extra Practice — do as many as you like</div>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {Array.from({ length: MIN_DRILLS }).map((_, i) => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: "50%",
              background: i < reps ? C.alien : C.border,
              boxShadow: i < reps ? C.glowAlien : "none",
              transition: "all 0.3s",
            }} />
          ))}
          <span style={{ color: C.textMuted, fontSize: 11, marginLeft: 6 }}>{reps}/{MIN_DRILLS} reps</span>
        </div>
      </div>

      {/* drill instruction */}
      {(() => {
        const highlightDrill = (text) => {
          const tagPattern = /(<\/?[a-z][a-z0-9]*(?:\s[^>]*)?>|[a-z][a-z0-9-]+="[^"]*")/gi;
          const parts = [];
          let last = 0, match, key = 0;
          while ((match = tagPattern.exec(text)) !== null) {
            if (match.index > last) parts.push(<span key={key++}>{text.slice(last, match.index)}</span>);
            parts.push(<code key={key++} style={{ color: C.alien, background: C.alienDim, padding: "1px 4px", borderRadius: 4, fontFamily: FONTS.mono, fontSize: 13 }}>{match[0]}</code>);
            last = match.index + match[0].length;
          }
          if (last < text.length) parts.push(<span key={key++}>{text.slice(last)}</span>);
          return parts.length > 0 ? <>{parts}</> : text;
        };

        if (Array.isArray(drill.instruction)) {
          return (
            <div style={{ marginBottom: 10 }}>
              {drill.instruction.map((line, i) => {
                if (i === 0) return (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <span style={{ color: C.gold, fontWeight: 700, fontSize: 14, fontFamily: FONTS.heading, letterSpacing: 0.5 }}>{line}</span>
                  </div>
                );
                return (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                    <span style={{ flexShrink: 0 }}>{ALIEN_BULLETS[i % ALIEN_BULLETS.length]}</span>
                    <span style={{ color: C.textPrimary, fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>{highlightDrill(line)}</span>
                  </div>
                );
              })}
            </div>
          );
        }
        return <p style={{ color: C.textPrimary, fontSize: 14, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.4 }}>{highlightDrill(drill.instruction)}</p>;
      })()}

      <div style={{ position: "relative", marginBottom: 8 }}>
        <textarea
          value={val}
          onChange={(e) => { setVal(e.target.value); setStatus("idle"); setShowAnswer(false); }}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              const start = e.target.selectionStart;
              const end = e.target.selectionEnd;
              const newVal = val.substring(0, start) + "  " + val.substring(end);
              setVal(newVal);
              setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = start + 2; }, 0);
            }
          }}
          placeholder="// practice here…"
          disabled={status === "pass"}
          style={{
            width: "100%", boxSizing: "border-box", height: 68,
            background: C.tagBg, color: C.tagText, border: `1px solid ${C.accent}33`,
            borderRadius: 8, padding: "8px 12px", fontFamily: FONTS.mono,
            fontSize: 13, resize: "vertical", outline: "none", lineHeight: 1.6,
          }}
        />
      </div>

      {/* live preview */}
      <div style={{ marginBottom: 10 }}>
        <LivePreview html={val} />
      </div>

      {status === "fail" && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
          <p style={{ color: C.red, margin: 0, fontSize: 13, flex: 1 }}>❌ Not quite — check your tag and content</p>
          <button onClick={() => setShowAnswer(true)} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 6, padding: "3px 10px", fontSize: 11, cursor: "pointer", whiteSpace: "nowrap" }}>Show answer</button>
        </div>
      )}

      {showAnswer && (
        <div style={{ background: C.tagBg, border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "8px 12px", marginBottom: 8 }}>
          <p style={{ color: C.accent, margin: 0, fontSize: 12, fontFamily: FONTS.mono }}>{drill.answer}</p>
        </div>
      )}

      {status === "pass" ? (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: C.alien, margin: 0, fontWeight: 700, fontSize: 13 }}>✓ Nice work! +1 rep</p>
          <button onClick={next} style={{ background: C.accent, color: C.bg, border: "none", borderRadius: 7, padding: "6px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            {current + 1 < drills.length ? "Next drill →" : "Again →"}
          </button>
        </div>
      ) : (
        <button onClick={check} style={{ background: C.accent, color: C.bg, border: "none", borderRadius: 8, padding: "7px 18px", fontWeight: 800, fontSize: 12, cursor: "pointer", letterSpacing: 1, fontFamily: FONTS.heading }}>
          TRANSMIT ▶
        </button>
      )}

      <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
        <div style={{ background: C.card, borderRadius: 99, height: 6, overflow: "hidden", marginBottom: 10 }}>
          <div style={{
            width: `${Math.min((reps / MIN_DRILLS) * 100, 100)}%`, height: "100%",
            background: `linear-gradient(90deg, ${C.accent}, ${C.alien})`,
            borderRadius: 99, transition: "width 0.5s ease",
            boxShadow: reps >= MIN_DRILLS ? C.glowAlien : "none",
          }} />
        </div>
        <button
          onClick={onReady}
          style={{
            width: "100%", padding: "10px",
            background: reps >= MIN_DRILLS ? C.alien : C.accent,
            color: C.bg,
            border: "none", borderRadius: 8,
            fontWeight: 800, fontSize: 12, letterSpacing: 2,
            cursor: "pointer",
            fontFamily: FONTS.heading,
            transition: "all 0.4s",
            boxShadow: reps >= MIN_DRILLS ? C.glowAlien : "none",
          }}>
          {reps >= MIN_DRILLS ? "FEELING CONFIDENT → NEXT CONCEPT 🛸" : "SKIP DRILLS → NEXT CONCEPT →"}
        </button>
      </div>
    </div>
  );
}

// ── FREESTYLE MODE ────────────────────────────────────────────
const FREESTYLE_TEMPLATES = [
  { label: "Blank", code: "" },
  { label: "Basic Page", code: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello World</h1>\n    <p>Start coding here...</p>\n  </body>\n</html>` },
  { label: "Form", code: `<form>\n  <label for="name">Name:</label>\n  <input id="name" type="text" placeholder="Your name">\n\n  <label for="email">Email:</label>\n  <input id="email" type="email" placeholder="Your email">\n\n  <button type="submit">Submit</button>\n</form>` },
  { label: "Table", code: `<table>\n  <tr>\n    <th>Name</th>\n    <th>Role</th>\n  </tr>\n  <tr>\n    <td>Commander Zyx</td>\n    <td>Pilot</td>\n  </tr>\n</table>` },
  { label: "Article", code: `<article>\n  <h2>Mission Report</h2>\n  <p>All systems nominal.</p>\n  <aside>\n    <p>Fun fact: Sector 7 has 3 moons.</p>\n  </aside>\n</article>` },
];

function FreestyleMode({ onClose }) {
  const [code, setCode] = useState("");
  const [template, setTemplate] = useState(0);
  const iframeRef = useRef(null);

  useEffect(() => {
    setCode(FREESTYLE_TEMPLATES[template].code);
  }, [template]);

  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;
    try {
      doc.open();
      doc.write(`<html><head><style>
        body{font-family:system-ui,sans-serif;padding:16px;color:#1a1828;background:#f8fff4;margin:0;}
        h1,h2,h3{margin:0 0 8px;}p{margin:0 0 8px;}a{color:#7c5cfc;}
        ul,ol{margin:0 0 8px;padding-left:20px;}li{margin-bottom:3px;}
        button{background:#00b894;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:14px;}
        strong{font-weight:700;}em{font-style:italic;}hr{border:none;border-top:2px solid #ccc;margin:10px 0;}
        input,select,textarea{border:1px solid #ccc;padding:6px 10px;border-radius:4px;font-size:14px;margin:4px 0;display:block;width:100%;box-sizing:border-box;}
        label{font-size:14px;font-weight:600;margin-top:8px;display:block;}
        form{background:#f0f0f0;padding:12px;border-radius:6px;margin-bottom:8px;}
        table{border-collapse:collapse;width:100%;margin:4px 0;}
        td,th{border:1px solid #ccc;padding:6px 10px;text-align:left;}
        th{background:#e0e0e0;font-weight:700;}
        header,nav,main,footer,section,article,aside{display:block;margin-bottom:8px;}
        header{background:#e8f4fd;padding:10px;border-radius:4px;}
        nav{background:#fef9e7;padding:8px;border-radius:4px;}
        main{background:#f9f9f9;padding:10px;border-radius:4px;}
        footer{background:#f0f0f0;padding:8px;border-radius:4px;font-size:12px;}
        aside{background:#fff3e0;padding:8px;border-radius:4px;border-left:3px solid #ff9f43;}
        figure{margin:0 0 8px;}figcaption{font-size:12px;color:#666;margin-top:4px;}
        video,audio,iframe{max-width:100%;display:block;margin:4px 0;}
      </style></head><body>${code}</body></html>`);
      doc.close();
    } catch(e) {}
  }, [code]);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONTS.body, position: "relative" }}>
      <Stars />
      <div style={{ position: "relative", zIndex: 1, padding: "20px 16px 40px", maxWidth: 580, margin: "0 auto", boxSizing: "border-box", color: C.textPrimary }}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <button onClick={onClose} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>← Ship</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: C.accent, textTransform: "uppercase", letterSpacing: 3, fontFamily: FONTS.mono }}>Open Channel</div>
            <div style={{ fontWeight: 700, fontSize: 17, fontFamily: FONTS.heading, color: C.alien, letterSpacing: 1 }}>FREE TRANSMISSION</div>
          </div>
        </div>

        <p style={{ color: C.textMuted, fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>
          No rules. No challenges. Just code whatever you want and see it appear live. 🛸
        </p>

        {/* template picker */}
        <div style={{ marginBottom: 12 }}>
          <p style={{ color: C.accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 8px", fontFamily: FONTS.mono }}>Start with a template:</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {FREESTYLE_TEMPLATES.map((t, i) => (
              <button key={i} onClick={() => setTemplate(i)} style={{
                background: template === i ? C.accent : C.card,
                color: template === i ? C.bg : C.textMuted,
                border: `1px solid ${template === i ? C.accent : C.border}`,
                borderRadius: 20, padding: "5px 14px", cursor: "pointer",
                fontSize: 12, fontWeight: template === i ? 700 : 400,
                transition: "all 0.2s",
              }}>{t.label}</button>
            ))}
          </div>
        </div>

        {/* editor */}
        <div style={{ marginBottom: 4 }}>
          <p style={{ color: C.accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 6px", fontFamily: FONTS.mono }}>Your code:</p>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                const start = e.target.selectionStart;
                const end = e.target.selectionEnd;
                const newVal = code.substring(0, start) + "  " + code.substring(end);
                setCode(newVal);
                setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = start + 2; }, 0);
              }
            }}
            placeholder="// type your HTML here..."
            style={{
              width: "100%", boxSizing: "border-box", height: 220,
              background: C.tagBg, color: C.tagText,
              border: `1px solid ${C.accent}44`, borderRadius: 10,
              padding: "12px 14px", fontFamily: FONTS.mono,
              fontSize: 13, resize: "vertical", outline: "none", lineHeight: 1.7,
            }}
          />
        </div>

        {/* live preview */}
        <div>
          <p style={{ color: C.accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 6px", fontFamily: FONTS.mono }}>📡 Live transmission preview:</p>
          <iframe ref={iframeRef} title="freestyle-preview" style={{
            width: "100%", height: 320, border: `1px solid ${C.accent}44`,
            borderRadius: 10, background: "#f8fff4",
          }} sandbox="allow-same-origin" />
        </div>
      </div>
    </div>
  );
}

// ── FULL CHEAT SHEET DATA ─────────────────────────────────────
const CHEAT_SHEET = [
  {
    category: "HTML Tags",
    icon: "🏷️",
    color: "#00f5c4",
    items: [
      { name: "<h1> – <h6>", desc: "Headings — h1 biggest, h6 smallest" },
      { name: "<p>", desc: "Paragraph — a block of regular text" },
      { name: "<a href=\"...\">", desc: "Link — href sets the destination address" },
      { name: "<img src=\"...\" alt=\"...\">", desc: "Image — src is the file, alt is the description" },
      { name: "<ul> / <ol>", desc: "Bullet list / numbered list" },
      { name: "<li>", desc: "List item — goes inside ul or ol" },
      { name: "<button>", desc: "Clickable button" },
      { name: "<div>", desc: "Generic block container — no special meaning" },
      { name: "<span>", desc: "Generic inline wrapper — sits inside text" },
      { name: "<strong>", desc: "Bold text — for important words" },
      { name: "<em>", desc: "Italic text — for emphasis" },
      { name: "<br>", desc: "Line break — no closing tag needed" },
      { name: "<hr>", desc: "Horizontal dividing line — no closing tag needed" },
    ],
  },
  {
    category: "Page Structure",
    icon: "🏗️",
    color: "#ffe94d",
    items: [
      { name: "<header>", desc: "Top of the page — logo, title, nav" },
      { name: "<nav>", desc: "Navigation links — menus and site links" },
      { name: "<main>", desc: "Primary content — only one per page" },
      { name: "<footer>", desc: "Bottom of page — copyright, links" },
      { name: "<section>", desc: "A themed chunk of the page — like a chapter" },
      { name: "<article>", desc: "Self-contained content — blog post, news story" },
      { name: "<aside>", desc: "Side content — related but not essential" },
      { name: "<figure>", desc: "Wraps an image with its caption" },
      { name: "<figcaption>", desc: "The caption text under a figure" },
    ],
  },
  {
    category: "Forms",
    icon: "📋",
    color: "#ff9f43",
    items: [
      { name: "<form>", desc: "Wraps all form fields — groups and submits them together" },
      { name: "<input type=\"text\">", desc: "Single line text field" },
      { name: "<input type=\"email\">", desc: "Email field — checks for @ symbol" },
      { name: "<input type=\"password\">", desc: "Password field — hides what you type" },
      { name: "<input type=\"number\">", desc: "Number field — shows up/down arrows" },
      { name: "<input type=\"checkbox\">", desc: "Checkbox — tick box" },
      { name: "<input type=\"radio\">", desc: "Radio button — pick one from a group" },
      { name: "<input type=\"date\">", desc: "Date picker" },
      { name: "<label for=\"...\">", desc: "Labels an input — for= must match input id=" },
      { name: "<textarea>", desc: "Multi-line text input — needs closing tag" },
      { name: "<select>", desc: "Dropdown menu" },
      { name: "<option>", desc: "One choice inside a select dropdown" },
      { name: "<button type=\"submit\">", desc: "Submits the form — the SEND button" },
    ],
  },
  {
    category: "Media",
    icon: "📺",
    color: "#a98dff",
    items: [
      { name: "<video src=\"...\" controls>", desc: "Video player — controls adds play/pause buttons" },
      { name: "<audio src=\"...\" controls>", desc: "Audio player — works just like video" },
      { name: "<iframe src=\"...\">", desc: "Embedded window — shows another page inside yours" },
    ],
  },
  {
    category: "Tables",
    icon: "📊",
    color: "#39ff14",
    items: [
      { name: "<table>", desc: "Wraps the entire table" },
      { name: "<tr>", desc: "Table row — one horizontal strip" },
      { name: "<td>", desc: "Table data cell — one box in a row" },
      { name: "<th>", desc: "Table header cell — bold and centered automatically" },
      { name: "<thead>", desc: "Groups the header rows" },
      { name: "<tbody>", desc: "Groups the data rows" },
    ],
  },
  {
    category: "Common Attributes",
    icon: "⚙️",
    color: "#00f5c4",
    items: [
      { name: "href=\"...\"", desc: "Link destination — used on <a> tags" },
      { name: "src=\"...\"", desc: "File source — used on img, video, audio, iframe, script" },
      { name: "alt=\"...\"", desc: "Image description — for accessibility and broken images" },
      { name: "id=\"...\"", desc: "Unique identifier — only one element can have each id" },
      { name: "class=\"...\"", desc: "Group label — multiple elements can share a class" },
      { name: "type=\"...\"", desc: "Sets the type — used on input and button tags" },
      { name: "placeholder=\"...\"", desc: "Hint text shown in empty input fields" },
      { name: "value=\"...\"", desc: "The actual data value — what gets sent on submit" },
      { name: "name=\"...\"", desc: "Field name — identifies data when form is submitted" },
      { name: "for=\"...\"", desc: "Links a label to its input — must match the input id" },
      { name: "controls", desc: "Adds play/pause buttons to video and audio" },
      { name: "width=\"...\" height=\"...\"", desc: "Sets size in pixels — used on img, video, iframe" },
      { name: "target=\"_blank\"", desc: "Opens link in a new tab — used on <a> tags" },
    ],
  },
  {
    category: "Special Characters",
    icon: "✨",
    color: "#ffe94d",
    items: [
      { name: "&amp;", desc: "Displays as & — use instead of & in text" },
      { name: "&lt;", desc: "Displays as < — use when you want to show a tag in text" },
      { name: "&gt;", desc: "Displays as > — closing angle bracket in text" },
      { name: "&nbsp;", desc: "Non-breaking space — a space that won't collapse" },
      { name: "&copy;", desc: "Displays as © — copyright symbol" },
      { name: "&trade;", desc: "Displays as ™ — trademark symbol" },
      { name: "&reg;", desc: "Displays as ® — registered trademark symbol" },
    ],
  },
  {
    category: "Page Boilerplate",
    icon: "📄",
    color: "#ff4d6d",
    items: [
      { name: "<!DOCTYPE html>", desc: "Always the very first line — tells browser this is HTML5" },
      { name: "<html lang=\"en\">", desc: "Root element — wraps the entire page" },
      { name: "<head>", desc: "Invisible page info — title, styles, meta tags" },
      { name: "<meta charset=\"UTF-8\">", desc: "Character encoding — makes special characters work" },
      { name: "<meta name=\"viewport\" content=\"width=device-width\">", desc: "Makes the page work properly on mobile screens" },
      { name: "<title>", desc: "Text shown in the browser tab" },
      { name: "<link rel=\"stylesheet\" href=\"style.css\">", desc: "Links a CSS file to style your page" },
      { name: "<script src=\"app.js\">", desc: "Links a JavaScript file to make your page interactive" },
      { name: "<body>", desc: "Everything visible on the page goes in here" },
    ],
  },
  {
    category: "Common Mistakes",
    icon: "⚠️",
    color: "#ff4d6d",
    items: [
      { name: "Missing closing tag", desc: "<p>text  →  forgot </p> at the end" },
      { name: "No quotes on attributes", desc: "href=google.com  →  should be href=\"google.com\"" },
      { name: "Space inside tag name", desc: "< p>  →  no space after the < bracket" },
      { name: "Mismatched tags", desc: "<h1>Title</h2>  →  opening and closing must match" },
      { name: "Missing alt on images", desc: "<img src=\"x.jpg\">  →  always add alt=\"description\"" },
      { name: "Wrong nesting order", desc: "<strong><em>text</strong></em>  →  close inner tags first" },
      { name: "& instead of &amp;", desc: "Writing & in text  →  use &amp; instead" },
    ],
  },
];

function FullCheatSheet({ onClose }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [search, setSearch] = useState("");
  const cat = CHEAT_SHEET[activeCategory];

  const filtered = search.trim()
    ? CHEAT_SHEET.flatMap(c => c.items.map(item => ({ ...item, category: c.category, color: c.color })))
        .filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.desc.toLowerCase().includes(search.toLowerCase()))
    : cat.items.map(item => ({ ...item, color: cat.color }));

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONTS.body, position: "relative" }}>
      <Stars />
      <div style={{ position: "relative", zIndex: 1, padding: "20px 16px 48px", maxWidth: 580, margin: "0 auto", boxSizing: "border-box", color: C.textPrimary }}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <button onClick={onClose} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>← Ship</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: C.accent, textTransform: "uppercase", letterSpacing: 3, fontFamily: FONTS.mono }}>Transmission Codex</div>
            <div style={{ fontWeight: 700, fontSize: 17, fontFamily: FONTS.heading, color: C.accent, letterSpacing: 1 }}>FULL CHEAT SHEET</div>
          </div>
        </div>

        {/* search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search tags, attributes, anything..."
          style={{
            width: "100%", boxSizing: "border-box",
            background: C.card, color: C.textPrimary,
            border: `1px solid ${C.accent}44`, borderRadius: 10,
            padding: "10px 14px", fontFamily: FONTS.body,
            fontSize: 14, outline: "none", marginBottom: 14,
          }}
        />

        {/* category tabs */}
        {!search && (
          <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 14 }}>
            {CHEAT_SHEET.map((c, i) => (
              <button key={i} onClick={() => setActiveCategory(i)} style={{
                background: activeCategory === i ? `${c.color}22` : C.card,
                border: `1.5px solid ${activeCategory === i ? c.color : C.border}`,
                color: activeCategory === i ? c.color : C.textMuted,
                borderRadius: 20, padding: "5px 12px", cursor: "pointer",
                fontSize: 11, whiteSpace: "nowrap",
                fontWeight: activeCategory === i ? 700 : 400,
                transition: "all 0.2s", flexShrink: 0,
              }}>{c.icon} {c.category}</button>
            ))}
          </div>
        )}

        {/* items */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
          {filtered.map((item, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, alignItems: "flex-start",
              padding: "12px 16px",
              borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : "none",
            }}>
              <code style={{
                background: C.tagBg, color: item.color,
                padding: "3px 8px", borderRadius: 6, fontSize: 11,
                fontFamily: FONTS.mono, whiteSpace: "nowrap", flexShrink: 0,
                border: `1px solid ${item.color}33`, maxWidth: "45%",
                overflow: "hidden", textOverflow: "ellipsis",
              }}>{item.name}</code>
              <div style={{ flex: 1 }}>
                {search && <div style={{ fontSize: 10, color: item.color, marginBottom: 2, textTransform: "uppercase", letterSpacing: 1 }}>{item.category}</div>}
                <span style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.5 }}>{item.desc}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: 24, textAlign: "center", color: C.textMuted }}>Nothing found for "{search}"</div>
          )}
        </div>

        <p style={{ color: C.textMuted, fontSize: 11, textAlign: "center", marginTop: 16 }}>
          ~30 tags cover 95% of all webpages ever written 🛸
        </p>
      </div>
    </div>
  );
}

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

// ── TAG REFERENCE MODAL ───────────────────────────────────────
function TagReferenceModal({ onClose }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const cat = TAG_REFERENCE[activeCategory];

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)",
      zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center",
      padding: "0", boxSizing: "border-box",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: C.surface, border: `1px solid ${C.accent}66`,
        borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 580,
        maxHeight: "85vh", overflow: "hidden", display: "flex", flexDirection: "column",
        boxShadow: C.glowAccent,
      }}>
        {/* header */}
        <div style={{ padding: "16px 20px 12px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: C.accent, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", fontFamily: FONTS.mono }}>Quick Reference</div>
            <div style={{ color: C.textPrimary, fontWeight: 800, fontSize: 17, fontFamily: FONTS.heading, letterSpacing: 1 }}>HTML TAG CHEAT SHEET</div>
          </div>
          <button onClick={onClose} style={{ background: C.card, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 13 }}>✕</button>
        </div>

        {/* category tabs — scrollable */}
        <div style={{ display: "flex", gap: 6, padding: "10px 16px", overflowX: "auto", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
          {TAG_REFERENCE.map((c, i) => (
            <button key={i} onClick={() => setActiveCategory(i)} style={{
              background: activeCategory === i ? cat.color + "22" : C.card,
              border: `1.5px solid ${activeCategory === i ? cat.color : C.border}`,
              color: activeCategory === i ? cat.color : C.textMuted,
              borderRadius: 20, padding: "5px 12px", cursor: "pointer",
              fontSize: 11, whiteSpace: "nowrap", fontWeight: activeCategory === i ? 700 : 400,
              transition: "all 0.2s",
            }}>{c.category}</button>
          ))}
        </div>

        {/* tag list */}
        <div style={{ overflowY: "auto", padding: "12px 16px 24px", flex: 1 }}>
          {cat.tags.map((t, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, alignItems: "flex-start",
              padding: "10px 0", borderBottom: i < cat.tags.length - 1 ? `1px solid ${C.border}` : "none",
            }}>
              <code style={{
                background: C.tagBg, color: cat.color,
                padding: "3px 8px", borderRadius: 6, fontSize: 12,
                fontFamily: FONTS.mono, whiteSpace: "nowrap", flexShrink: 0,
                border: `1px solid ${cat.color}33`,
              }}>{t.tag}</code>
              <span style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.5, paddingTop: 2 }}>{t.desc}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: "10px 16px", borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
          <p style={{ color: C.textMuted, fontSize: 11, margin: 0 }}>~30 tags cover 95% of all webpages ever written 🛸</p>
        </div>
      </div>
    </div>
  );
}

// ── PAGE LAYOUT WIREFRAME ─────────────────────────────────────
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

function PageWireframe() {
  const [active, setActive] = useState(null);
  const sec = active !== null ? WIREFRAME_SECTIONS[active] : null;

  return (
    <div style={{ margin: "16px 0" }}>
      <p style={{ color: C.textMuted, fontSize: 12, margin: "0 0 10px" }}>👆 Tap any section to see what goes inside it</p>

      {/* wireframe */}
      <div style={{ border: `2px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
        {WIREFRAME_SECTIONS.map((s, i) => (
          <div
            key={i}
            onClick={() => setActive(active === i ? null : i)}
            style={{
              height: s.height,
              background: active === i ? `${s.color}30` : `${s.color}10`,
              borderBottom: i < WIREFRAME_SECTIONS.length - 1 ? `1px solid ${C.border}` : "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s",
              borderLeft: active === i ? `4px solid ${s.color}` : "4px solid transparent",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <code style={{ color: s.color, fontFamily: FONTS.mono, fontSize: 12, display: "block", marginBottom: 2 }}>{s.tag}</code>
              <span style={{ color: active === i ? s.color : C.textMuted, fontSize: 10, textTransform: "uppercase", letterSpacing: 2 }}>{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* info panel */}
      {sec && (
        <div style={{ background: `${sec.color}12`, border: `1.5px solid ${sec.color}44`, borderRadius: 10, padding: 14 }}>
          <code style={{ color: sec.color, fontFamily: FONTS.mono, fontSize: 14, fontWeight: 700 }}>{sec.tag}</code>
          <p style={{ color: C.textPrimary, fontSize: 13, margin: "8px 0 10px", lineHeight: 1.6 }}>{sec.desc}</p>
          <pre style={{ background: C.tagBg, border: `1px solid ${sec.color}33`, borderRadius: 8, padding: "10px 12px", fontFamily: FONTS.mono, fontSize: 12, color: sec.color, whiteSpace: "pre-wrap", margin: 0 }}>{sec.example}</pre>
        </div>
      )}
    </div>
  );
}

// ── THEORY SLIDE ──────────────────────────────────────────────
function TheorySlide({ slide, slideKey }) {
  return (
    <div>
      <h3 style={{ color: C.accent, margin: "0 0 10px", fontSize: 17, letterSpacing: 0.5, fontFamily: FONTS.heading }}>{slide.heading}</h3>
      <p style={{ color: C.textPrimary, margin: "0 0 16px", lineHeight: 1.75, fontSize: 16 }}>{slide.body}</p>
      {slide.wireframe && <PageWireframe />}
      {slide.anatomy && <TagAnatomy parts={slide.anatomy} slideKey={slideKey} />}
      {slide.codeBlock && <InteractiveCodeBlock code={slide.codeBlock} />}
    </div>
  );
}

// ── CERTIFICATE SCREEN ────────────────────────────────────────
function Certificate({ signalPower, parts, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20, boxSizing: "border-box",
    }}>
      <div style={{
        background: C.surface, border: `2px solid ${C.alien}`, borderRadius: 20,
        padding: 32, maxWidth: 440, width: "100%", textAlign: "center",
        boxShadow: C.glowAlien,
      }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>🛸</div>
        <div style={{ color: C.accent, fontSize: 11, letterSpacing: 4, textTransform: "uppercase", marginBottom: 8 }}>Official Transmission</div>
        <h2 style={{ color: C.alien, fontSize: 24, margin: "0 0 8px", fontWeight: 900, fontFamily: FONTS.heading, letterSpacing: 2 }}>SIGNAL RESTORED</h2>
        <p style={{ color: C.textMuted, margin: "0 0 24px", lineHeight: 1.6 }}>
          This certifies that the bearer has successfully repaired their ship's communication systems and transmitted a distress signal to Earth using HTML.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, color: C.gold }}>{signalPower}</div>
            <div style={{ fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>Signal Power</div>
          </div>
          <div>
            <div style={{ fontSize: 24 }}>{parts.join(" ")}</div>
            <div style={{ fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>Ship Parts</div>
          </div>
        </div>
        <div style={{ background: C.alienDim, border: `1px solid ${C.alien}44`, borderRadius: 10, padding: "10px 16px", marginBottom: 20 }}>
          <p style={{ color: C.alien, margin: 0, fontSize: 12, letterSpacing: 1 }}>
            "One small tag for an alien, one giant webpage for alienkind." 🌌
          </p>
        </div>
        <button onClick={onClose} style={{ background: C.alien, color: C.bg, border: "none", borderRadius: 10, padding: "12px 28px", fontWeight: 800, fontSize: 11, cursor: "pointer", letterSpacing: 2, fontFamily: FONTS.heading }}>
          RETURN TO SHIP
        </button>
      </div>
    </div>
  );
}

// ── MISTAKES MUSEUM SCREEN ────────────────────────────────────
function Museum({ onClose }) {
  const [active, setActive] = useState(0);
  const m = MISTAKES[active];
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.textPrimary, fontFamily: FONTS.body, padding: "20px 16px 48px", maxWidth: 580, margin: "0 auto", boxSizing: "border-box", position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <button onClick={onClose} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>← Ship</button>
        <div>
          <div style={{ fontSize: 10, color: C.accent, textTransform: "uppercase", letterSpacing: 2 }}>Alien Research Lab</div>
          <div style={{ fontWeight: 700, fontSize: 17, color: C.textPrimary, fontFamily: FONTS.heading, letterSpacing: 1 }}>Mistakes Museum 🏛️</div>
        </div>
      </div>
      <p style={{ color: C.textMuted, fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
        Even the best human coders make these mistakes. Study them so you don't have to learn the hard way. 👾
      </p>

      {/* nav dots */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {MISTAKES.map((_, i) => (
          <div key={i} onClick={() => setActive(i)} style={{
            width: 10, height: 10, borderRadius: "50%", cursor: "pointer",
            background: active === i ? C.accent : C.border,
            boxShadow: active === i ? C.glowAccent : "none",
            transition: "all 0.2s",
          }} />
        ))}
      </div>

      <div style={{ background: C.card, border: `1.5px solid ${C.accent}44`, borderRadius: 14, padding: 20 }}>
        <div style={{ color: C.accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 }}>Exhibit {active + 1} of {MISTAKES.length}</div>
        <h3 style={{ color: C.gold, margin: "0 0 16px", fontSize: 18 }}>💀 {m.title}</h3>

        <div style={{ marginBottom: 12 }}>
          <p style={{ color: C.red, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 6px" }}>❌ Wrong</p>
          <pre style={{ background: C.tagBg, border: `1px solid ${C.red}44`, borderRadius: 8, padding: "10px 12px", fontFamily: FONTS.mono, fontSize: 13, color: C.red, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{m.bad}</pre>
        </div>
        <div style={{ marginBottom: 16 }}>
          <p style={{ color: C.alien, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 6px" }}>✓ Correct</p>
          <pre style={{ background: C.tagBg, border: `1px solid ${C.alien}44`, borderRadius: 8, padding: "10px 12px", fontFamily: FONTS.mono, fontSize: 13, color: C.alien, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{m.good}</pre>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px" }}>
          <p style={{ color: C.textMuted, margin: 0, fontSize: 13, lineHeight: 1.6 }}>🔬 {m.explain}</p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
          <button onClick={() => setActive((a) => Math.max(0, a - 1))} disabled={active === 0}
            style={{ background: active === 0 ? C.border : C.surface, color: active === 0 ? C.textMuted : C.textPrimary, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 16px", cursor: active === 0 ? "default" : "pointer", fontSize: 13 }}>← Prev</button>
          <button onClick={() => setActive((a) => Math.min(MISTAKES.length - 1, a + 1))} disabled={active === MISTAKES.length - 1}
            style={{ background: active === MISTAKES.length - 1 ? C.border : C.accent, color: active === MISTAKES.length - 1 ? C.textMuted : C.bg, border: "none", borderRadius: 8, padding: "7px 16px", cursor: active === MISTAKES.length - 1 ? "default" : "pointer", fontSize: 13, fontWeight: 700 }}>Next →</button>
        </div>
      </div>
    </div>
  );
}

// ── BUG CHALLENGE CARD ───────────────────────────────────────
function BugChallengeCard({ bug, onPass, alreadyDone }) {
  const [val, setVal] = useState("");
  const [status, setStatus] = useState(alreadyDone ? "pass" : "idle");
  const [attempts, setAttempts] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [walkthroughStep, setWalkthroughStep] = useState(0);

  const check = () => {
    const result = bug.smartCheck(val);
    if (result === "pass") {
      setStatus("pass"); setFeedbackMsg("");
      if (!alreadyDone) onPass(bug.xp);
    } else {
      setStatus("fail"); setAttempts((a) => a + 1);
      setFeedbackMsg(FEEDBACK[result] || FEEDBACK.generic);
    }
  };

  const getHint = () => {
    if (attempts === 0) return null;
    if (attempts === 1) return bug.hint1;
    if (attempts === 2) return bug.hint2;
    return bug.hint3;
  };

  const hint = getHint();
  const borderColor = status === "pass" ? C.alien : status === "fail" ? C.red : C.gold;

  const highlightLine = (text) => {
    const tagPattern = /(<\/?[a-z][a-z0-9]*(?:\s[^>]*)?>|[a-z][a-z0-9-]+="[^"]*")/gi;
    const parts = [];
    let last = 0;
    let match;
    let key = 0;
    while ((match = tagPattern.exec(text)) !== null) {
      if (match.index > last) parts.push(<span key={key++}>{text.slice(last, match.index)}</span>);
      parts.push(<code key={key++} style={{ color: C.alien, background: C.alienDim, padding: "1px 5px", borderRadius: 4, fontFamily: FONTS.mono, fontSize: 12 }}>{match[0]}</code>);
      last = match.index + match[0].length;
    }
    if (last < text.length) parts.push(<span key={key++}>{text.slice(last)}</span>);
    return parts.length > 0 ? <>{parts}</> : text;
  };

  return (
    <div style={{ background: C.card, border: `2px solid ${borderColor}`, borderRadius: 14, padding: 20, marginBottom: 16, boxSizing: "border-box" }}>
      {/* header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ color: C.gold, fontSize: 10, textTransform: "uppercase", letterSpacing: 3, fontFamily: FONTS.mono, marginBottom: 4 }}>⚡ {bug.subtitle}</div>
          <div style={{ color: C.gold, fontWeight: 900, fontSize: 16, fontFamily: FONTS.heading, letterSpacing: 1, marginBottom: 10 }}>{bug.title}</div>
          {Array.isArray(bug.instruction) && bug.instruction.map((line, i) => {
            if (i === 0) return (
              <div key={i} style={{ marginBottom: 8 }}>
                <span style={{ color: C.gold, fontWeight: 700, fontSize: 14, fontFamily: FONTS.heading, letterSpacing: 0.5 }}>{line.replace(/^[\u{1F300}-\u{1FFFF}\u{2600}-\u{27FF}\s]+/gu, '')}</span>
              </div>
            );
            return (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                <span style={{ flexShrink: 0 }}>{ALIEN_BULLETS[i % ALIEN_BULLETS.length]}</span>
                <span style={{ color: C.textPrimary, fontWeight: 600, fontSize: 13, lineHeight: 1.5 }}>{highlightLine(line)}</span>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, marginLeft: 12, flexShrink: 0 }}>
          <span style={{ color: C.gold, fontSize: 12, fontWeight: 700, background: C.goldDim, padding: "2px 8px", borderRadius: 99 }}>+{bug.xp} SP</span>
          <button onClick={() => { setVal(""); setStatus("idle"); setFeedbackMsg(""); setAttempts(0); setShowWalkthrough(false); setWalkthroughStep(0); }}
            style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: "50%", width: 26, height: 26, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>↺</button>
        </div>
      </div>

      {/* textarea */}
      <textarea
        value={val}
        onChange={(e) => { setVal(e.target.value); setStatus("idle"); setFeedbackMsg(""); }}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault();
            const start = e.target.selectionStart;
            const newVal = val.substring(0, start) + "  " + val.substring(e.target.selectionEnd);
            setVal(newVal);
            setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = start + 2; }, 0);
          }
        }}
        placeholder="// enter your full transmission here..."
        disabled={status === "pass"}
        style={{
          width: "100%", boxSizing: "border-box", height: 160,
          background: C.tagBg, color: C.tagText, border: `1px solid ${C.gold}44`,
          borderRadius: 8, padding: "10px 12px", fontFamily: FONTS.mono,
          fontSize: 13, resize: "vertical", outline: "none", marginBottom: 12, lineHeight: 1.7,
        }}
      />

      {/* live preview */}
      <div style={{ marginBottom: 12 }}>
        <p style={{ margin: "0 0 6px", color: C.gold, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, fontFamily: FONTS.mono }}>📡 Transmission Preview</p>
        <LivePreview html={val} />
      </div>

      {/* tiny mistakes reminder */}
      {attempts >= 2 && status !== "pass" && (
        <div style={{ background: C.surface, border: `1px solid ${C.gold}33`, borderRadius: 8, padding: "8px 12px", marginBottom: 10 }}>
          <p style={{ color: C.gold, margin: "0 0 4px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>⚠️ In code, ONE wrong character breaks everything</p>
          <p style={{ color: C.textMuted, margin: 0, fontSize: 12, lineHeight: 1.5 }}>Check for: missing closing tags, wrong text, missing quotes around attributes</p>
        </div>
      )}

      {/* feedback */}
      {status === "fail" && feedbackMsg && (
        <div style={{ background: C.redDim, border: `1px solid ${C.red}44`, borderRadius: 8, padding: "8px 12px", marginBottom: 10 }}>
          <p style={{ color: C.red, margin: 0, fontSize: 13 }}>❌ {feedbackMsg}</p>
        </div>
      )}

      {/* hints */}
      {hint && status !== "pass" && (
        <div style={{ background: C.goldDim, border: `1px solid ${C.gold}44`, borderRadius: 8, padding: "8px 12px", marginBottom: 10 }}>
          <p style={{ color: C.gold, margin: 0, fontSize: 13 }}>
            📡 {attempts === 1 ? "Signal Nudge" : attempts === 2 ? "Hint Beam" : "Full Transmission"}: {hint}
          </p>
        </div>
      )}

      {/* walkthrough */}
      {attempts >= 2 && status !== "pass" && !showWalkthrough && (
        <button onClick={() => { setShowWalkthrough(true); setWalkthroughStep(0); }}
          style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", marginBottom: 10, display: "block" }}>
          🆘 Lost in space — walk me through it
        </button>
      )}

      {showWalkthrough && status !== "pass" && (
        <div style={{ background: C.goldDim, border: `1px solid ${C.gold}44`, borderRadius: 10, padding: 14, marginBottom: 10 }}>
          <p style={{ color: C.gold, fontWeight: 700, margin: "0 0 8px", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Step {walkthroughStep + 1} of {bug.walkthrough.length}</p>
          <p style={{ color: C.textPrimary, margin: "0 0 12px", fontSize: 13, fontFamily: FONTS.mono, wordBreak: "break-all", lineHeight: 1.6 }}>{bug.walkthrough[walkthroughStep]}</p>
          <div style={{ display: "flex", gap: 8 }}>
            {walkthroughStep > 0 && (
              <button onClick={() => setWalkthroughStep((s) => s - 1)}
                style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 7, padding: "5px 12px", fontSize: 12, cursor: "pointer" }}>← Back</button>
            )}
            {walkthroughStep < bug.walkthrough.length - 1 ? (
              <button onClick={() => setWalkthroughStep((s) => s + 1)}
                style={{ background: C.gold, color: C.bg, border: "none", borderRadius: 7, padding: "5px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Next →</button>
            ) : (
              <button onClick={() => setShowWalkthrough(false)}
                style={{ background: C.alien, color: C.bg, border: "none", borderRadius: 7, padding: "5px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Got it! 💪</button>
            )}
          </div>
        </div>
      )}

      {status === "pass" ? (
        <div style={{ textAlign: "center", padding: "12px 0" }}>
          <div style={{ fontSize: 36, marginBottom: 6 }}>🐛⚡</div>
          <p style={{ color: C.alien, margin: 0, fontWeight: 800, fontSize: 15, fontFamily: FONTS.heading, letterSpacing: 1 }}>BUG CRUSHED!</p>
          <p style={{ color: C.textMuted, margin: "4px 0 0", fontSize: 12 }}>+{bug.xp} Signal Power earned</p>
        </div>
      ) : (
        <button onClick={check} style={{ background: C.gold, color: C.bg, border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 800, fontSize: 12, cursor: "pointer", letterSpacing: 2, fontFamily: FONTS.heading }}>
          TRANSMIT ▶
        </button>
      )}
    </div>
  );
}

// ── DAILY CHALLENGE CARD ──────────────────────────────────────
function DailyCard({ done, onComplete }) {
  const [val, setVal] = useState("");
  const [status, setStatus] = useState(done ? "pass" : "idle");
  const [attempts, setAttempts] = useState(0);
  const [msg, setMsg] = useState("");

  const check = () => {
    const result = DAILY.smartCheck(val);
    if (result === "pass") { setStatus("pass"); if (!done) onComplete(DAILY.xp); }
    else { setStatus("fail"); setAttempts((a) => a + 1); setMsg(FEEDBACK[result] || FEEDBACK.generic); }
  };

  return (
    <div style={{ background: C.card, border: `1.5px solid ${C.gold}66`, borderRadius: 14, padding: 20, marginBottom: 20, boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div>
          <div style={{ color: C.gold, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, marginBottom: 2 }}>⚡ Daily Transmission</div>
          <div style={{ color: C.textPrimary, fontSize: 14, fontWeight: 600 }}>{DAILY.instruction.replace("⚡ Daily Transmission: ", "")}</div>
        </div>
        <span style={{ color: C.gold, fontWeight: 800, background: C.goldDim, padding: "3px 10px", borderRadius: 99, fontSize: 12, whiteSpace: "nowrap", marginLeft: 10 }}>+{DAILY.xp} SP</span>
      </div>
      {status !== "pass" ? (
        <>
          <textarea value={val} onChange={(e) => { setVal(e.target.value); setStatus("idle"); setMsg(""); }}
            placeholder="// enter today's transmission…"
            style={{ width: "100%", boxSizing: "border-box", height: 60, background: C.tagBg, color: C.tagText, border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "8px 12px", fontFamily: FONTS.mono, fontSize: 13, resize: "none", outline: "none", marginBottom: 8 }} />
          {status === "fail" && msg && <p style={{ color: C.red, margin: "0 0 8px", fontSize: 13 }}>❌ {msg}</p>}
          {attempts >= 2 && <p style={{ color: C.gold, margin: "0 0 8px", fontSize: 12 }}>💡 Hint: {attempts === 2 ? DAILY.hint2 : DAILY.hint3}</p>}
          <button onClick={check} style={{ background: C.gold, color: C.bg, border: "none", borderRadius: 8, padding: "8px 20px", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>TRANSMIT ▶</button>
        </>
      ) : (
        <p style={{ color: C.alien, margin: 0, fontWeight: 700 }}>✓ Daily transmission sent! +{DAILY.xp} Signal Power</p>
      )}
    </div>
  );
}

// ── INLINE TAB COMPONENTS ────────────────────────────────────
function FreestyleInline() {
  const [code, setCode] = useState("");
  const [template, setTemplate] = useState(0);
  const iframeRef = useRef(null);

  useEffect(() => { setCode(FREESTYLE_TEMPLATES[template].code); }, [template]);

  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;
    try {
      doc.open();
      doc.write(`<html><head><style>
        body{font-family:system-ui,sans-serif;padding:16px;color:#1a1828;background:#f8fff4;margin:0;}
        h1,h2,h3{margin:0 0 8px;}p{margin:0 0 8px;}a{color:#7c5cfc;}
        ul,ol{margin:0 0 8px;padding-left:20px;}li{margin-bottom:3px;}
        button{background:#00b894;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;}
        strong{font-weight:700;}em{font-style:italic;}hr{border:none;border-top:2px solid #ccc;margin:10px 0;}
        input,select,textarea{border:1px solid #ccc;padding:6px 10px;border-radius:4px;font-size:14px;margin:4px 0;display:block;width:100%;box-sizing:border-box;}
        label{font-size:14px;font-weight:600;margin-top:8px;display:block;}
        form{background:#f0f0f0;padding:12px;border-radius:6px;margin-bottom:8px;}
        table{border-collapse:collapse;width:100%;margin:4px 0;}td,th{border:1px solid #ccc;padding:6px 10px;text-align:left;}th{background:#e0e0e0;font-weight:700;}
        header{background:#e8f4fd;padding:10px;border-radius:4px;margin-bottom:8px;}
        nav{background:#fef9e7;padding:8px;border-radius:4px;margin-bottom:8px;}
        main{background:#f9f9f9;padding:10px;border-radius:4px;margin-bottom:8px;}
        footer{background:#f0f0f0;padding:8px;border-radius:4px;font-size:12px;}
        aside{background:#fff3e0;padding:8px;border-radius:4px;border-left:3px solid #ff9f43;margin-bottom:8px;}
        figure{margin:0 0 8px;}figcaption{font-size:12px;color:#666;margin-top:4px;}
      </style></head><body>${code}</body></html>`);
      doc.close();
    } catch(e) {}
  }, [code]);

  return (
    <div style={{ padding: "0 16px" }}>
      {/* templates */}
      <div style={{ marginBottom: 12 }}>
        <p style={{ color: C.accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 8px", fontFamily: FONTS.mono }}>Start with a template:</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {FREESTYLE_TEMPLATES.map((t, i) => (
            <button key={i} onClick={() => setTemplate(i)} style={{
              background: template === i ? C.accent : C.card,
              color: template === i ? C.bg : C.textMuted,
              border: `1px solid ${template === i ? C.accent : C.border}`,
              borderRadius: 20, padding: "5px 14px", cursor: "pointer",
              fontSize: 12, fontWeight: template === i ? 700 : 400,
            }}>{t.label}</button>
          ))}
        </div>
      </div>
      {/* editor */}
      <p style={{ color: C.accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 6px", fontFamily: FONTS.mono }}>Your code:</p>
      <textarea value={code} onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            const newVal = code.substring(0, start) + "  " + code.substring(end);
            setCode(newVal);
            setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = start + 2; }, 0);
          }
        }}
        placeholder="// type your HTML here..."
        style={{ width: "100%", boxSizing: "border-box", height: 200, background: C.tagBg, color: C.tagText, border: `1px solid ${C.accent}44`, borderRadius: 10, padding: "12px 14px", fontFamily: FONTS.mono, fontSize: 13, resize: "vertical", outline: "none", lineHeight: 1.7, marginBottom: 12 }} />
      {/* preview */}
      <p style={{ color: C.accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 6px", fontFamily: FONTS.mono }}>📡 Live preview:</p>
      <iframe ref={iframeRef} title="freestyle" style={{ width: "100%", height: 280, border: `1px solid ${C.accent}44`, borderRadius: 10, background: "#f8fff4" }} sandbox="allow-same-origin" />
    </div>
  );
}

function CodexInline() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [search, setSearch] = useState("");
  const cat = CHEAT_SHEET[activeCategory];
  const filtered = search.trim()
    ? CHEAT_SHEET.flatMap(c => c.items.map(item => ({ ...item, category: c.category, color: c.color }))).filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.desc.toLowerCase().includes(search.toLowerCase()))
    : cat.items.map(item => ({ ...item, color: cat.color }));

  return (
    <div style={{ padding: "0 16px" }}>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Search tags, attributes, anything..."
        style={{ width: "100%", boxSizing: "border-box", background: C.card, color: C.textPrimary, border: `1px solid ${C.accent}44`, borderRadius: 10, padding: "10px 14px", fontFamily: FONTS.body, fontSize: 14, outline: "none", marginBottom: 12 }} />
      {!search && (
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 12 }}>
          {CHEAT_SHEET.map((c, i) => (
            <button key={i} onClick={() => setActiveCategory(i)} style={{
              background: activeCategory === i ? `${c.color}22` : C.card,
              border: `1.5px solid ${activeCategory === i ? c.color : C.border}`,
              color: activeCategory === i ? c.color : C.textMuted,
              borderRadius: 20, padding: "5px 12px", cursor: "pointer",
              fontSize: 11, whiteSpace: "nowrap", fontWeight: activeCategory === i ? 700 : 400, flexShrink: 0,
            }}>{c.icon} {c.category}</button>
          ))}
        </div>
      )}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
        {filtered.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 16px", borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : "none" }}>
            <code style={{ background: C.tagBg, color: item.color, padding: "3px 8px", borderRadius: 6, fontSize: 11, fontFamily: FONTS.mono, whiteSpace: "nowrap", flexShrink: 0, border: `1px solid ${item.color}33`, maxWidth: "45%", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</code>
            <div style={{ flex: 1 }}>
              {search && <div style={{ fontSize: 10, color: item.color, marginBottom: 2, textTransform: "uppercase", letterSpacing: 1 }}>{item.category}</div>}
              <span style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.5 }}>{item.desc}</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ padding: 24, textAlign: "center", color: C.textMuted }}>Nothing found for "{search}"</div>}
      </div>
      <p style={{ color: C.textMuted, fontSize: 11, textAlign: "center", marginTop: 16 }}>~30 tags cover 95% of all webpages ever written 🛸</p>
    </div>
  );
}

function MuseumInline() {
  const [active, setActive] = useState(0);
  const m = MISTAKES[active];
  return (
    <div style={{ padding: "0 16px" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {MISTAKES.map((_, i) => (
          <div key={i} onClick={() => setActive(i)} style={{ width: 10, height: 10, borderRadius: "50%", cursor: "pointer", background: active === i ? C.accent : C.border, boxShadow: active === i ? C.glowAccent : "none", transition: "all 0.2s", flexShrink: 0 }} />
        ))}
      </div>
      <div style={{ background: C.card, border: `1.5px solid ${C.accent}44`, borderRadius: 14, padding: 20 }}>
        <div style={{ color: C.accent, fontSize: 10, textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 }}>Exhibit {active + 1} of {MISTAKES.length}</div>
        <h3 style={{ color: C.gold, margin: "0 0 16px", fontSize: 18, fontFamily: FONTS.heading }}>💀 {m.title}</h3>
        <div style={{ marginBottom: 12 }}>
          <p style={{ color: C.red, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 6px" }}>❌ Wrong</p>
          <pre style={{ background: C.tagBg, border: `1px solid ${C.red}44`, borderRadius: 8, padding: "10px 12px", fontFamily: FONTS.mono, fontSize: 13, color: C.red, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{m.bad}</pre>
        </div>
        <div style={{ marginBottom: 16 }}>
          <p style={{ color: C.alien, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 6px" }}>✓ Correct</p>
          <pre style={{ background: C.tagBg, border: `1px solid ${C.alien}44`, borderRadius: 8, padding: "10px 12px", fontFamily: FONTS.mono, fontSize: 13, color: C.alien, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{m.good}</pre>
        </div>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px" }}>
          <p style={{ color: C.textMuted, margin: 0, fontSize: 13, lineHeight: 1.6 }}>🔬 {m.explain}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
          <button onClick={() => setActive((a) => Math.max(0, a - 1))} disabled={active === 0}
            style={{ background: active === 0 ? C.border : C.surface, color: active === 0 ? C.textMuted : C.textPrimary, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 16px", cursor: active === 0 ? "default" : "pointer", fontSize: 13 }}>← Prev</button>
          <button onClick={() => setActive((a) => Math.min(MISTAKES.length - 1, a + 1))} disabled={active === MISTAKES.length - 1}
            style={{ background: active === MISTAKES.length - 1 ? C.border : C.accent, color: active === MISTAKES.length - 1 ? C.textMuted : C.bg, border: "none", borderRadius: 8, padding: "7px 16px", cursor: active === MISTAKES.length - 1 ? "default" : "pointer", fontSize: 13, fontWeight: 700 }}>Next →</button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────
export default function SignalLost() {
  const [screen, setScreen] = useState("home");
  const [activeLevel, setActiveLevel] = useState(null);
  const [theoryStep, setTheoryStep] = useState(0);
  const theoryStepRef = useRef(0);
  const [theoryDone, setTheoryDone] = useState(false);
  const [drillReady, setDrillReady] = useState(false);
  const [signalPower, setSignalPower] = useState(0);
  const [earnedSP, setEarnedSP] = useState(0);
  const [passedChallenges, setPassedChallenges] = useState({});
  const [missionComplete, setMissionComplete] = useState(false);
  const [shipParts, setShipParts] = useState([]);
  const [showCert, setShowCert] = useState(false);
  const [dailyDone, setDailyDone] = useState(false);
  const [showRef, setShowRef] = useState(false);
  const [passedBugs, setPassedBugs] = useState({});
  const [activeBug, setActiveBug] = useState(null);
  const [activeTab, setActiveTab] = useState("missions");
  const [loaded, setLoaded] = useState(false);

  // ── LOAD saved progress on mount ─────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const result = await window.storage.get("signal-lost-progress");
        if (result?.value) {
          const saved = JSON.parse(result.value);
          if (saved.passedChallenges) setPassedChallenges(saved.passedChallenges);
          if (saved.signalPower) setSignalPower(saved.signalPower);
          if (saved.shipParts) setShipParts(saved.shipParts);
          if (saved.dailyDone) setDailyDone(saved.dailyDone);
          if (saved.passedBugs) setPassedBugs(saved.passedBugs);
        }
      } catch (e) {
        // no saved data yet — start fresh
      }
      setLoaded(true);
    };
    load();
  }, []);

  // ── SAVE progress whenever key state changes ──────────────────
  useEffect(() => {
    if (!loaded) return;
    const save = async () => {
      try {
        await window.storage.set("signal-lost-progress", JSON.stringify({
          passedChallenges, signalPower, shipParts, dailyDone, passedBugs,
        }));
      } catch (e) {}
    };
    save();
  }, [passedChallenges, signalPower, shipParts, dailyDone, loaded]);

  const mission = activeLevel !== null ? MISSIONS[activeLevel] : null;

  const allMissionChallengeIds = (m) => {
    if (!m || !m.theory || !m.bossChallenge) return [];
    return [
      ...m.theory.filter(s => s.miniChallenge).map(s => s.miniChallenge.id),
      m.bossChallenge.id,
    ];
  };
  const allMissionsDone = MISSIONS.every((m) => allMissionChallengeIds(m).every((id) => passedChallenges[id]));

  const scrollToTop = () => {
    const el = document.getElementById("level-top");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startMission = (idx) => {
    setActiveLevel(idx);
    setTheoryStep(0);
    theoryStepRef.current = 0;
    setTheoryDone(false);
    setDrillReady(false);
    setEarnedSP(0);
    setMissionComplete(false);
    setScreen("level");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 50);
  };

  const handlePass = (challengeId, pts) => {
    if (passedChallenges[challengeId]) return;
    setPassedChallenges((p) => ({ ...p, [challengeId]: true }));
    setSignalPower((x) => x + pts); setEarnedSP((e) => e + pts);
  };

  const handleDailyComplete = (pts) => {
    setDailyDone(true);
    setSignalPower((x) => x + pts);
  };

  useEffect(() => {
    if (!mission || !theoryDone) return;
    const ids = allMissionChallengeIds(mission);
    const allDone = ids.every((id) => passedChallenges[id]);
    if (allDone && !missionComplete) {
      setMissionComplete(true);
      if (!shipParts.includes(mission.badge)) setShipParts((b) => [...b, mission.badge]);
    }
  }, [passedChallenges, theoryDone, mission, missionComplete, shipParts]);

  // ALL hooks done — now safe to do conditional renders
  if (!loaded) {
    return (
      <div style={{ minHeight: "100vh", background: "#020b18", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#00f5c4", fontFamily: "'Orbitron', sans-serif", fontSize: 13, letterSpacing: 4, textTransform: "uppercase" }}>
          Loading ship systems...
        </div>
      </div>
    );
  }

  // MUSEUM
  if (screen === "museum") return <><Stars /><Museum onClose={() => setScreen("home")} /></>;

  // BUG CHALLENGE SCREEN
  if (activeBug) return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONTS.body, position: "relative" }}>
      <Stars />
      <div style={{ position: "relative", zIndex: 1, padding: "20px 16px 60px", maxWidth: 580, margin: "0 auto", boxSizing: "border-box", color: C.textPrimary }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <button onClick={() => setActiveBug(null)} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>← Ship</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: C.red, textTransform: "uppercase", letterSpacing: 2, fontFamily: FONTS.mono }}>⚡ {activeBug.subtitle}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: C.textPrimary, fontFamily: FONTS.heading, letterSpacing: 1 }}>{activeBug.title}</div>
          </div>
          <div style={{ color: C.gold, fontWeight: 800, fontSize: 14, background: C.goldDim, padding: "3px 10px", borderRadius: 99 }}>+{activeBug.xp} SP</div>
        </div>
        <BugChallengeCard
          key={activeBug.id}
          bug={activeBug}
          alreadyDone={!!passedBugs[activeBug.id]}
          onPass={(pts) => {
            if (!passedBugs[activeBug.id]) {
              setPassedBugs(p => ({ ...p, [activeBug.id]: true }));
              setSignalPower(x => x + pts);
            }
          }}
        />
        {passedBugs[activeBug.id] && (
          <button onClick={() => setActiveBug(null)} style={{ background: C.alien, color: C.bg, border: "none", borderRadius: 8, padding: "10px 28px", fontWeight: 800, fontSize: 11, cursor: "pointer", letterSpacing: 2, fontFamily: FONTS.heading, boxShadow: C.glowAlien, display: "block", margin: "0 auto" }}>
            RETURN TO SHIP →
          </button>
        )}
      </div>
    </div>
  );

  // LEVEL / MISSION
  if (screen === "level" && mission) {
    const currentSlide = mission.theory[theoryStep];
    const miniDone = currentSlide?.miniChallenge ? !!passedChallenges[currentSlide.miniChallenge.id] : true;
    const allSlidesDone = mission.theory.every(s => !s.miniChallenge || passedChallenges[s.miniChallenge.id]);
    // canAdvance requires both mini challenge passed AND drill zone completed (or no drills exist)
    const hasDrills = currentSlide?.miniChallenge && (DRILLS[currentSlide.miniChallenge.id]?.length > 0);
    // canAdvance only needs miniDone — drills are optional
    const canAdvance = !currentSlide?.miniChallenge || miniDone;

    return (
      <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONTS.body, position: "relative" }}>
        <Stars />
        <div id="level-top" style={{ position: "relative", zIndex: 1, padding: "20px 16px 60px", maxWidth: 580, margin: "0 auto", boxSizing: "border-box", color: C.textPrimary }}>
          {/* header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <button onClick={() => setScreen("home")} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, whiteSpace: "nowrap" }}>← Ship</button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, color: C.accent, textTransform: "uppercase", letterSpacing: 2 }}>Mission {mission.id} — {mission.shipPart}</div>
              <div style={{ fontWeight: 700, fontSize: 16, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: C.textPrimary }}>{mission.title}</div>
            </div>
            <button onClick={() => setShowRef(true)} style={{ background: C.card, border: `1px solid ${C.accent}44`, color: C.accent, borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 11, whiteSpace: "nowrap", fontFamily: FONTS.mono }}>📋 Tags</button>
            <div style={{ color: C.gold, fontWeight: 800, fontSize: 14, whiteSpace: "nowrap", background: C.goldDim, padding: "3px 10px", borderRadius: 99 }}>+{earnedSP} SP</div>
          </div>
          {showRef && <TagReferenceModal onClose={() => setShowRef(false)} />}

          {/* story intro */}
          <div style={{ background: C.accentDim, border: `1px solid ${C.accent}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 20 }}>
            <p style={{ color: C.accent, margin: 0, fontSize: 13, lineHeight: 1.6 }}>👾 {mission.storyIntro}</p>
          </div>

          {!theoryDone ? (
            <>
              {/* theory slide */}
              <div style={{ background: C.card, border: `1px solid ${C.accent}33`, borderRadius: 14, padding: 20, marginBottom: 16, boxSizing: "border-box", overflow: "hidden" }}>
                <p style={{ color: C.accent, fontSize: 10, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 14px" }}>
                  Briefing {theoryStep + 1} of {mission.theory.length}
                </p>
                <TheorySlide slide={currentSlide} slideKey={`${activeLevel}-${theoryStep}`} />
              </div>

              {/* mini challenge — shown right below the theory */}
              {currentSlide.miniChallenge && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ color: C.red, fontSize: 15, fontWeight: 800, letterSpacing: 2, fontFamily: FONTS.heading }}>REQUIRED REPAIR</div>
                    <div style={{ color: C.accent, fontSize: 10, textTransform: "uppercase", letterSpacing: 2, marginTop: 2 }}>⚡ Complete this to advance</div>
                  </div>
                  <ChallengeCard
                    key={currentSlide.miniChallenge.id}
                    challenge={currentSlide.miniChallenge}
                    alreadyDone={!!passedChallenges[currentSlide.miniChallenge.id]}
                    onPass={(pts) => handlePass(currentSlide.miniChallenge.id, pts)}
                  />
                  {/* drill zone appears after mini challenge is passed */}
                  {miniDone && !drillReady && (
                    <DrillZone
                      key={`drill-${currentSlide.miniChallenge.id}`}
                      challengeId={currentSlide.miniChallenge.id}
                      onReady={() => {
                        const currentStep = theoryStepRef.current;
                        const totalSlides = mission.theory.length;
                        const next = currentStep + 1;
                        if (next < totalSlides) {
                          theoryStepRef.current = next;
                          setTheoryStep(next);
                          setDrillReady(false);
                        } else {
                          setTheoryDone(true);
                          setDrillReady(false);
                        }
                        setTimeout(() => scrollToTop(), 50);
                      }}
                    />
                  )}
                </div>
              )}

              {/* nav buttons — Next only unlocks after drill is ready */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <button onClick={() => { const s = Math.max(0, theoryStep - 1); theoryStepRef.current = s; setTheoryStep(s); setDrillReady(false); scrollToTop(); }}
                  disabled={theoryStep === 0}
                  style={{ background: theoryStep === 0 ? C.border : C.surface, color: theoryStep === 0 ? C.textMuted : C.textPrimary, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 16px", cursor: theoryStep === 0 ? "default" : "pointer", fontSize: 13 }}>
                  ← Prev
                </button>
                {theoryStep < mission.theory.length - 1 ? (
                  <button
                    onClick={() => { if (canAdvance) { const s = theoryStep + 1; theoryStepRef.current = s; setTheoryStep(s); setDrillReady(false); scrollToTop(); } }}
                    style={{
                      background: canAdvance ? C.accent : C.border,
                      color: canAdvance ? C.bg : C.textMuted,
                      border: "none", borderRadius: 8, padding: "8px 18px",
                      cursor: canAdvance ? "pointer" : "not-allowed",
                      fontWeight: 700, fontSize: 13, letterSpacing: 1,
                      transition: "all 0.2s",
                    }}>
                    {canAdvance ? "NEXT →" : "Pass the challenge to continue"}
                  </button>
                ) : (
                  <button
                    onClick={() => { if (canAdvance) { setTheoryDone(true); scrollToTop(); } }}
                    style={{
                      background: canAdvance ? C.alien : C.border,
                      color: canAdvance ? C.bg : C.textMuted,
                      border: "none", borderRadius: 8, padding: "8px 18px",
                      cursor: canAdvance ? "pointer" : "not-allowed",
                      fontWeight: 800, fontSize: 11, letterSpacing: 2,
                      boxShadow: canAdvance ? C.glowAlien : "none",
                      fontFamily: FONTS.heading, transition: "all 0.2s",
                    }}>
                    {canAdvance ? "FINAL REPAIR 🛸" : "Pass the challenge first"}
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div style={{ background: C.goldDim, border: `1px solid ${C.gold}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 16 }}>
                <p style={{ color: C.gold, margin: 0, fontSize: 13, lineHeight: 1.6 }}>
                  🏆 All concepts learned! Now for the final repair — this one combines everything from this mission.
                </p>
              </div>
              <ChallengeCard
                key={mission.bossChallenge.id}
                challenge={mission.bossChallenge}
                alreadyDone={!!passedChallenges[mission.bossChallenge.id]}
                onPass={(pts) => handlePass(mission.bossChallenge.id, pts)}
              />
              {missionComplete && (
                <div style={{ background: `linear-gradient(135deg, ${C.accent}18, ${C.alien}18)`, border: `2px solid ${C.alien}`, borderRadius: 14, padding: 24, textAlign: "center", marginTop: 8, boxShadow: C.glowAlien }}>
                  <div style={{ fontSize: 52, marginBottom: 8 }}>🛸</div>
                  <h2 style={{ margin: "0 0 6px", color: C.alien, fontSize: 20, fontFamily: FONTS.heading, letterSpacing: 1 }}>System Restored!</h2>
                  <p style={{ color: C.textMuted, margin: "0 0 16px", fontSize: 14 }}>
                    <strong style={{ color: C.gold }}>{mission.badgeName}</strong> {mission.badge} recovered and installed!
                  </p>
                  <button onClick={() => { setScreen("home"); window.scrollTo({ top: 0, behavior: "instant" }); }} style={{ background: C.alien, color: C.bg, border: "none", borderRadius: 8, padding: "10px 28px", fontWeight: 800, fontSize: 11, cursor: "pointer", letterSpacing: 2, boxShadow: C.glowAlien, fontFamily: FONTS.heading }}>
                    RETURN TO SHIP →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // HOME / SHIP DASHBOARD
  const TABS = [
    { id: "missions", label: "Missions", icon: "🛸" },
    { id: "freestyle", label: "Freestyle", icon: "⚡" },
    { id: "codex", label: "Codex", icon: "📡" },
    { id: "museum", label: "Museum", icon: "🏛️" },
  ];

  const renderTab = () => {
    // MISSIONS TAB
    if (activeTab === "missions") return (
      <div style={{ paddingBottom: 80 }}>
        {/* hero */}
        <div style={{ textAlign: "center", padding: "32px 16px 20px" }}>
          <div style={{ color: C.accent, fontSize: 10, letterSpacing: 6, textTransform: "uppercase", marginBottom: 10, fontFamily: FONTS.mono }}>🛸 Emergency Broadcast System</div>
          <h1 style={{ fontFamily: FONTS.heading, fontSize: 48, fontWeight: 900, margin: "0 0 4px", letterSpacing: 8, lineHeight: 1.1, color: C.accent, textShadow: `0 0 20px ${C.accent}, 0 0 40px ${C.accent}88` }}>SIGNAL</h1>
          <h1 style={{ fontFamily: FONTS.heading, fontSize: 48, fontWeight: 900, margin: "0 0 16px", letterSpacing: 8, lineHeight: 1.1, color: C.alien, textShadow: `0 0 20px ${C.alien}, 0 0 40px ${C.alien}88` }}>LOST</h1>
          <p style={{ color: C.textMuted, fontSize: 14, margin: "0 auto 20px", maxWidth: 300, lineHeight: 1.6 }}>
            Crash-landed near Earth. Learn HTML to repair your ship and send a distress signal home. 👾
          </p>

          {/* ship status */}
          <div style={{ display: "inline-flex", gap: 20, background: C.surface, border: `1px solid ${C.accent}44`, borderRadius: 14, padding: "12px 24px", boxShadow: C.glowAccent }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: C.gold }}>{signalPower}</div>
              <div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>Signal Power</div>
            </div>
            <div style={{ width: 1, background: C.border }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20 }}>{shipParts.length > 0 ? shipParts.join(" ") : "—"}</div>
              <div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>Ship Parts</div>
            </div>
            <div style={{ width: 1, background: C.border }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20 }}>{allMissionsDone ? "🟢" : "🔴"}</div>
              <div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>Signal</div>
            </div>
          </div>
        </div>

        <div style={{ padding: "0 16px" }}>
          {/* daily challenge */}
          <DailyCard done={dailyDone} onComplete={handleDailyComplete} />

          {/* missions label */}
          <div style={{ color: C.accent, fontSize: 10, textTransform: "uppercase", letterSpacing: 3, marginBottom: 12, fontFamily: FONTS.mono }}>— Ship Repair Missions —</div>

          {/* mission cards */}
          {MISSIONS.map((m, i) => {
            const done = allMissionChallengeIds(m).every((id) => passedChallenges[id]);
            const allIds = allMissionChallengeIds(m);
            const earnedCount = allIds.filter(id => passedChallenges[id]).length;
            const totalCount = allIds.length;

            // find bug challenge that unlocks after this mission
            const BUG_MAP = { 3: BUG_CHALLENGES[0], 6: BUG_CHALLENGES[1], 9: BUG_CHALLENGES[2] };
            const bugAfter = BUG_MAP[m.id] || null;
            const bugUnlocked = bugAfter
              ? Object.keys(passedChallenges).filter(k => k.startsWith('boss') || k.startsWith('m')).length >=
                bugAfter.unlocksAfter.length * 4
              : false;

            return (
              <div key={m.id}>
                <div
                  style={{ background: C.card, border: `1.5px solid ${done ? C.alien : C.border}`, borderRadius: 14, padding: 18, marginBottom: 10, cursor: "pointer", transition: "all 0.2s", boxSizing: "border-box", boxShadow: done ? C.glowAlien : "none" }}
                  onClick={() => startMission(i)}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = done ? C.alien : C.accent; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = done ? C.alien : C.border; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 10, color: C.accent, textTransform: "uppercase", letterSpacing: 2, marginBottom: 3, fontFamily: FONTS.mono }}>Mission {m.id} · {m.shipPart}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary, marginBottom: 2, fontFamily: FONTS.heading, letterSpacing: 0.5 }}>{m.title}</div>
                      <div style={{ fontSize: 12, color: C.textMuted }}>{m.subtitle}</div>
                    </div>
                    <div style={{ fontSize: 26, marginLeft: 12 }}>{done ? "✅" : m.badge}</div>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <SignalBar current={earnedCount} max={totalCount} />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                      <span style={{ fontSize: 11, color: C.textMuted }}>{done ? "✓ System Restored" : "Awaiting repair..."}</span>
                      <span style={{ fontSize: 11, color: C.textMuted }}>{earnedCount}/{totalCount} repairs</span>
                    </div>
                  </div>
                </div>

                {/* Bug in the System card — clickable like missions */}
                {bugAfter && (
                  <div key={bugAfter.id}
                    onClick={() => bugUnlocked && setActiveBug(bugAfter)}
                    style={{
                      background: C.card,
                      border: `1.5px solid ${passedBugs[bugAfter.id] ? C.alien : bugUnlocked ? C.red : C.border}`,
                      borderRadius: 14, padding: 18, marginBottom: 10,
                      cursor: bugUnlocked ? "pointer" : "default",
                      transition: "all 0.2s", boxSizing: "border-box",
                      boxShadow: passedBugs[bugAfter.id] ? C.glowAlien : bugUnlocked ? `0 0 12px ${C.red}44` : "none",
                      opacity: bugUnlocked ? 1 : 0.5,
                    }}
                    onMouseEnter={(e) => { if (bugUnlocked) e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, color: passedBugs[bugAfter.id] ? C.alien : bugUnlocked ? C.red : C.textMuted, textTransform: "uppercase", letterSpacing: 2, marginBottom: 3, fontFamily: FONTS.mono }}>
                          {bugUnlocked ? (passedBugs[bugAfter.id] ? "✓ Bug Crushed" : "⚡ " + bugAfter.subtitle) : "🔒 " + bugAfter.subtitle}
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary, fontFamily: FONTS.heading, letterSpacing: 0.5 }}>{bugAfter.title}</div>
                        <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>
                          {bugUnlocked ? `+${bugAfter.xp} Signal Power` : `Complete missions ${bugAfter.unlocksAfter.slice(-3).join(", ")} to unlock`}
                        </div>
                      </div>
                      <div style={{ fontSize: 28, marginLeft: 12 }}>
                        {passedBugs[bugAfter.id] ? "✅" : bugUnlocked ? "🐛" : "🔒"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* certificate */}
          {allMissionsDone && (
            <div onClick={() => setShowCert(true)} style={{ background: `linear-gradient(135deg, ${C.accent}18, ${C.alien}18)`, border: `2px solid ${C.alien}`, borderRadius: 14, padding: 18, cursor: "pointer", textAlign: "center", boxShadow: C.glowAlien, marginTop: 8 }}>
              <div style={{ fontSize: 32, marginBottom: 6 }}>🏆</div>
              <div style={{ color: C.alien, fontWeight: 800, fontSize: 13, letterSpacing: 2, fontFamily: FONTS.heading }}>CLAIM YOUR CERTIFICATE</div>
              <div style={{ color: C.textMuted, fontSize: 12, marginTop: 4 }}>All systems restored!</div>
            </div>
          )}

          <p style={{ color: C.textMuted, fontSize: 12, marginTop: 20, textAlign: "center" }}>More ship systems coming 🛸</p>

          {/* reset */}
          <button onClick={async () => {
            try { await window.storage.delete("signal-lost-progress"); } catch(e) {}
            setPassedChallenges({}); setSignalPower(0); setShipParts([]); setDailyDone(false); setPassedBugs({});
          }} style={{ marginTop: 12, background: "transparent", border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 16px", fontSize: 11, cursor: "pointer", display: "block", margin: "12px auto 0" }}>
            ↺ Reset Progress
          </button>
        </div>
      </div>
    );

    // FREESTYLE TAB
    if (activeTab === "freestyle") return (
      <div style={{ paddingBottom: 80 }}>
        <div style={{ padding: "24px 16px 0" }}>
          <div style={{ fontSize: 10, color: C.alien, textTransform: "uppercase", letterSpacing: 3, fontFamily: FONTS.mono, marginBottom: 4 }}>Open Channel</div>
          <h2 style={{ fontFamily: FONTS.heading, color: C.alien, fontSize: 22, margin: "0 0 8px", letterSpacing: 2, textShadow: `0 0 12px ${C.alien}88` }}>FREE TRANSMISSION</h2>
          <p style={{ color: C.textMuted, fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>No rules. No challenges. Just code whatever you want and see it appear live. 🛸</p>
        </div>
        <FreestyleInline />
      </div>
    );

    // CODEX TAB
    if (activeTab === "codex") return (
      <div style={{ paddingBottom: 80 }}>
        <div style={{ padding: "24px 16px 0" }}>
          <div style={{ fontSize: 10, color: C.accent, textTransform: "uppercase", letterSpacing: 3, fontFamily: FONTS.mono, marginBottom: 4 }}>Transmission Codex</div>
          <h2 style={{ fontFamily: FONTS.heading, color: C.accent, fontSize: 22, margin: "0 0 8px", letterSpacing: 2 }}>FULL CHEAT SHEET</h2>
          <p style={{ color: C.textMuted, fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>Every tag, attribute, and special character. Searchable. Always here when you need it. 📡</p>
        </div>
        <CodexInline />
      </div>
    );

    // MUSEUM TAB
    if (activeTab === "museum") return (
      <div style={{ paddingBottom: 80 }}>
        <div style={{ padding: "24px 16px 0" }}>
          <div style={{ fontSize: 10, color: C.gold, textTransform: "uppercase", letterSpacing: 3, fontFamily: FONTS.mono, marginBottom: 4 }}>Alien Research Lab</div>
          <h2 style={{ fontFamily: FONTS.heading, color: C.gold, fontSize: 22, margin: "0 0 8px", letterSpacing: 2 }}>MISTAKES MUSEUM</h2>
          <p style={{ color: C.textMuted, fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>Even the best human coders make these mistakes. Study them so you don't have to. 👾</p>
        </div>
        <MuseumInline />
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONTS.body, position: "relative" }}>
      <Stars />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 580, margin: "0 auto", color: C.textPrimary }}>
        {renderTab()}
      </div>

      {/* bottom tab bar */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        background: C.surface, borderTop: `1px solid ${C.accent}33`,
        display: "flex", justifyContent: "space-around", alignItems: "center",
        padding: "10px 0 14px", boxShadow: `0 -4px 20px rgba(0,0,0,0.5)`,
      }}>
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            background: "transparent", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            padding: "0 16px", flex: 1,
          }}>
            <div style={{
              fontSize: 22,
              filter: activeTab === tab.id ? "none" : "grayscale(80%) opacity(50%)",
              transition: "all 0.2s",
              transform: activeTab === tab.id ? "scale(1.2)" : "scale(1)",
            }}>{tab.icon}</div>
            <div style={{
              fontSize: 10, fontFamily: FONTS.mono, letterSpacing: 1,
              textTransform: "uppercase",
              color: activeTab === tab.id ? C.accent : C.textMuted,
              fontWeight: activeTab === tab.id ? 700 : 400,
              transition: "all 0.2s",
            }}>{tab.label}</div>
            {activeTab === tab.id && (
              <div style={{ width: 20, height: 2, background: C.accent, borderRadius: 99, boxShadow: C.glowAccent }} />
            )}
          </button>
        ))}
      </div>

      {showCert && <Certificate signalPower={signalPower} parts={shipParts} onClose={() => setShowCert(false)} />}
      {showRef && <TagReferenceModal onClose={() => setShowRef(false)} />}
    </div>
  );
}

