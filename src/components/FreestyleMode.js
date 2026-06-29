import React, { useState, useEffect, useRef } from 'react';
import { C } from '../constants/colors.js';
import { FONTS } from '../constants/fonts.js';
import { Stars } from './Stars.js';
import { FREESTYLE_TEMPLATES } from '../data/freestyleTemplates.js';

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
          <button onClick={onClose} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>â† Ship</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: C.accent, textTransform: "uppercase", letterSpacing: 3, fontFamily: FONTS.mono }}>Open Channel</div>
            <div style={{ fontWeight: 700, fontSize: 17, fontFamily: FONTS.heading, color: C.alien, letterSpacing: 1 }}>FREE TRANSMISSION</div>
          </div>
        </div>

        <p style={{ color: C.textMuted, fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>
          No rules. No challenges. Just code whatever you want and see it appear live. ðŸ›¸
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
          <p style={{ color: C.accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 6px", fontFamily: FONTS.mono }}>ðŸ“¡ Live transmission preview:</p>
          <iframe ref={iframeRef} title="freestyle-preview" style={{
            width: "100%", height: 320, border: `1px solid ${C.accent}44`,
            borderRadius: 10, background: "#f8fff4",
          }} sandbox="allow-same-origin" />
        </div>
      </div>
    </div>
  );
}

export { FreestyleMode };
