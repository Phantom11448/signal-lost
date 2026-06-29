import React from 'react';
import { C } from '../constants/colors.js';
import { FONTS } from '../constants/fonts.js';

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
        <div style={{ fontSize: 56, marginBottom: 12 }}>ðŸ›¸</div>
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
            "One small tag for an alien, one giant webpage for alienkind." ðŸŒŒ
          </p>
        </div>
        <button onClick={onClose} style={{ background: C.alien, color: C.bg, border: "none", borderRadius: 10, padding: "12px 28px", fontWeight: 800, fontSize: 11, cursor: "pointer", letterSpacing: 2, fontFamily: FONTS.heading }}>
          RETURN TO SHIP
        </button>
      </div>
    </div>
  );
}

export { Certificate };
