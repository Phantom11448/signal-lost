import React, { useState } from 'react';
import { C } from '../constants/colors.js';
import { FONTS } from '../constants/fonts.js';
import { FEEDBACK } from '../constants/feedback.js';
import { DAILY } from '../data/daily.js';

function DailyCard({ done, onComplete }) {
  const [val, setVal] = useState("");
  const [status, setStatus] = useState(done ? "pass" : "idle");
  const [attempts, setAttempts] = useState(0);
  const [msg, setMsg] = useState("");

  const check = () => {
    const result = DAILY.smartCheck(val);
    if (result === "pass") { setStatus("pass"); if (!done) onComplete(DAILY.xp); }
    else { setStatus("fail"); setAttempts((a) => a + 1); setMsg(FEEDBACK[result] || FEEDBACK.generic); }
  };

  return (
    <div style={{ background: C.card, border: `1.5px solid ${C.gold}66`, borderRadius: 14, padding: 20, marginBottom: 20, boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div>
          <div style={{ color: C.gold, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, marginBottom: 2 }}>âš¡ Daily Transmission</div>
          <div style={{ color: C.textPrimary, fontSize: 14, fontWeight: 600 }}>{DAILY.instruction.replace("âš¡ Daily Transmission: ", "")}</div>
        </div>
        <span style={{ color: C.gold, fontWeight: 800, background: C.goldDim, padding: "3px 10px", borderRadius: 99, fontSize: 12, whiteSpace: "nowrap", marginLeft: 10 }}>+{DAILY.xp} SP</span>
      </div>
      {status !== "pass" ? (
        <>
          <textarea value={val} onChange={(e) => { setVal(e.target.value); setStatus("idle"); setMsg(""); }}
            placeholder="// enter today's transmissionâ€¦"
            style={{ width: "100%", boxSizing: "border-box", height: 60, background: C.tagBg, color: C.tagText, border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "8px 12px", fontFamily: FONTS.mono, fontSize: 13, resize: "none", outline: "none", marginBottom: 8 }} />
          {status === "fail" && msg && <p style={{ color: C.red, margin: "0 0 8px", fontSize: 13 }}>âŒ {msg}</p>}
          {attempts >= 2 && <p style={{ color: C.gold, margin: "0 0 8px", fontSize: 12 }}>ðŸ’¡ Hint: {attempts === 2 ? DAILY.hint2 : DAILY.hint3}</p>}
          <button onClick={check} style={{ background: C.gold, color: C.bg, border: "none", borderRadius: 8, padding: "8px 20px", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>TRANSMIT â–¶</button>
        </>
      ) : (
        <p style={{ color: C.alien, margin: 0, fontWeight: 700 }}>âœ“ Daily transmission sent! +{DAILY.xp} Signal Power</p>
      )}
    </div>
  );
}

export { DailyCard };
