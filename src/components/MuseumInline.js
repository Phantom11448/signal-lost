import React, { useState } from 'react';
import { C } from '../constants/colors.js';
import { FONTS } from '../constants/fonts.js';
import { MISTAKES } from '../data/mistakes.js';

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

export { MuseumInline };
