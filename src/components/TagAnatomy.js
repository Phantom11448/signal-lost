import React, { useState, useEffect } from 'react';
import { C } from '../constants/colors.js';
import { FONTS } from '../constants/fonts.js';
import { CodeModal } from './CodeModal.js';

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
        }}>â›¶ FULL</button>
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
      <p style={{ color: C.textMuted, fontSize: 11, marginTop: 6 }}>ðŸ‘¾ tap any part to scan it</p>
      {showModal && <CodeModal code={plainCode} onClose={() => setShowModal(false)} />}
    </div>
  );
}

export { TagAnatomy };
