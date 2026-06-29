import React, { useState } from 'react';
import { C } from '../constants/colors.js';
import { FONTS } from '../constants/fonts.js';
import { WIREFRAME_SECTIONS } from '../data/tagReference.js';

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

export { PageWireframe };
