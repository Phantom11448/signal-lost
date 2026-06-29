import React from 'react';
import { C } from '../constants/colors.js';

function SignalBar({ current, max }) {
  const pct = Math.min((current / max) * 100, 100);
  return (
    <div style={{ background: C.surface, borderRadius: 99, height: 8, overflow: "hidden", border: `1px solid ${C.border}` }}>
      <div style={{
        width: `${pct}%`, height: "100%",
        background: `linear-gradient(90deg, ${C.accent}, ${C.alien})`,
        borderRadius: 99, transition: "width 0.6s cubic-bezier(.4,0,.2,1)",
        boxShadow: C.glowAlien,
      }} />
    </div>
  );
}

export { SignalBar };
