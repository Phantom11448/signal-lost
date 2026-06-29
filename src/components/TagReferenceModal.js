import React, { useState } from 'react';
import { C } from '../constants/colors.js';
import { FONTS } from '../constants/fonts.js';
import { TAG_REFERENCE } from '../data/tagReference.js';

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
          <button onClick={onClose} style={{ background: C.card, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 13 }}>âœ•</button>
        </div>

        {/* category tabs â€” scrollable */}
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
          <p style={{ color: C.textMuted, fontSize: 11, margin: 0 }}>~30 tags cover 95% of all webpages ever written ðŸ›¸</p>
        </div>
      </div>
    </div>
  );
}

export { TagReferenceModal };
