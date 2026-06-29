const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;600;700&family=Share+Tech+Mono&display=swap";
document.head.appendChild(fontLink);

export const FONTS = {
  heading: "'Orbitron', sans-serif",
  body: "'Exo 2', system-ui, sans-serif",
  mono: "'Share Tech Mono', 'Courier New', monospace",
};
