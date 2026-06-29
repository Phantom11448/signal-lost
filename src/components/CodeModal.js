import React from 'react';
import { C } from '../constants/colors.js';
import { FONTS } from '../constants/fonts.js';

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

export { CodeModal };
