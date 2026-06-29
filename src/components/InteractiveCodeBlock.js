import React, { useState, useEffect, useRef } from 'react';
import { C } from '../constants/colors.js';
import { FONTS } from '../constants/fonts.js';
import { CodeModal } from './CodeModal.js';

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
        <span style={{ color: C.accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, fontFamily: FONTS.mono }}>ðŸ›¸ Live Schematic â€” edit and see it change</span>
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
          }}>â›¶ FULL</button>
        </div>

        {/* live preview */}
        <div style={{ flex: 1 }}>
          <p style={{ color: C.accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 6px", fontFamily: FONTS.mono }}>ðŸ“¡ Transmission Preview</p>
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

export { InteractiveCodeBlock };
