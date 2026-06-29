import React, { useState, useEffect, useRef } from 'react';
import { C } from '../constants/colors.js';
import { FONTS } from '../constants/fonts.js';
import { FREESTYLE_TEMPLATES } from '../data/freestyleTemplates.js';

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

export { FreestyleInline };
