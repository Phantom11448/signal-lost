import React, { useState } from 'react';
import { C } from '../constants/colors.js';
import { FONTS } from '../constants/fonts.js';
import { CodeModal } from './CodeModal.js';

function CodeBlock({ code }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div style={{ position: "relative", margin: "16px 0" }}>
      <pre style={{
        background: C.tagBg, border: `1px solid ${C.accent}44`, borderRadius: 10,
        padding: "14px 12px", paddingBottom: 36,
        fontFamily: FONTS.mono,
        fontSize: 13, color: C.tagText,
        whiteSpace: "pre-wrap", wordBreak: "break-all",
        overflowX: "hidden", margin: 0, lineHeight: 1.8,
        boxSizing: "border-box", width: "100%",
      }}>{code}</pre>
      <button onClick={() => setShowModal(true)} style={{
        position: "absolute", bottom: 8, right: 8,
        background: C.surface, border: `1px solid ${C.accent}44`,
        color: C.accent, borderRadius: 5, padding: "2px 7px",
        fontSize: 10, cursor: "pointer", letterSpacing: 1,
      }}>⛶ FULL</button>
      {showModal && <CodeModal code={code} onClose={() => setShowModal(false)} />}
    </div>
  );
}

export { CodeBlock };
