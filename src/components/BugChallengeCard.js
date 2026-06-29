import React, { useState } from 'react';
import { C } from '../constants/colors.js';
import { FONTS } from '../constants/fonts.js';
import { FEEDBACK, ALIEN_BULLETS } from '../constants/feedback.js';
import { LivePreview } from './LivePreview.js';

function BugChallengeCard({ bug, onPass, alreadyDone }) {
  const [val, setVal] = useState("");
  const [status, setStatus] = useState(alreadyDone ? "pass" : "idle");
  const [attempts, setAttempts] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [walkthroughStep, setWalkthroughStep] = useState(0);

  const check = () => {
    const result = bug.smartCheck(val);
    if (result === "pass") {
      setStatus("pass"); setFeedbackMsg("");
      if (!alreadyDone) onPass(bug.xp);
    } else {
      setStatus("fail"); setAttempts((a) => a + 1);
      setFeedbackMsg(FEEDBACK[result] || FEEDBACK.generic);
    }
  };

  const getHint = () => {
    if (attempts === 0) return null;
    if (attempts === 1) return bug.hint1;
    if (attempts === 2) return bug.hint2;
    return bug.hint3;
  };

  const hint = getHint();
  const borderColor = status === "pass" ? C.alien : status === "fail" ? C.red : C.gold;

  const highlightLine = (text) => {
    const tagPattern = /(<\/?[a-z][a-z0-9]*(?:\s[^>]*)?>|[a-z][a-z0-9-]+="[^"]*")/gi;
    const parts = [];
    let last = 0;
    let match;
    let key = 0;
    while ((match = tagPattern.exec(text)) !== null) {
      if (match.index > last) parts.push(<span key={key++}>{text.slice(last, match.index)}</span>);
      parts.push(<code key={key++} style={{ color: C.alien, background: C.alienDim, padding: "1px 5px", borderRadius: 4, fontFamily: FONTS.mono, fontSize: 12 }}>{match[0]}</code>);
      last = match.index + match[0].length;
    }
    if (last < text.length) parts.push(<span key={key++}>{text.slice(last)}</span>);
    return parts.length > 0 ? <>{parts}</> : text;
  };

  return (
    <div style={{ background: C.card, border: `2px solid ${borderColor}`, borderRadius: 14, padding: 20, marginBottom: 16, boxSizing: "border-box" }}>
      {/* header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ color: C.gold, fontSize: 10, textTransform: "uppercase", letterSpacing: 3, fontFamily: FONTS.mono, marginBottom: 4 }}>âš¡ {bug.subtitle}</div>
          <div style={{ color: C.gold, fontWeight: 900, fontSize: 16, fontFamily: FONTS.heading, letterSpacing: 1, marginBottom: 10 }}>{bug.title}</div>
          {Array.isArray(bug.instruction) && bug.instruction.map((line, i) => {
            if (i === 0) return (
              <div key={i} style={{ marginBottom: 8 }}>
                <span style={{ color: C.gold, fontWeight: 700, fontSize: 14, fontFamily: FONTS.heading, letterSpacing: 0.5 }}>{line.replace(/^[\u{1F300}-\u{1FFFF}\u{2600}-\u{27FF}\s]+/gu, '')}</span>
              </div>
            );
            return (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                <span style={{ flexShrink: 0 }}>{ALIEN_BULLETS[i % ALIEN_BULLETS.length]}</span>
                <span style={{ color: C.textPrimary, fontWeight: 600, fontSize: 13, lineHeight: 1.5 }}>{highlightLine(line)}</span>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, marginLeft: 12, flexShrink: 0 }}>
          <span style={{ color: C.gold, fontSize: 12, fontWeight: 700, background: C.goldDim, padding: "2px 8px", borderRadius: 99 }}>+{bug.xp} SP</span>
          <button onClick={() => { setVal(""); setStatus("idle"); setFeedbackMsg(""); setAttempts(0); setShowWalkthrough(false); setWalkthroughStep(0); }}
            style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: "50%", width: 26, height: 26, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>â†º</button>
        </div>
      </div>

      {/* textarea */}
      <textarea
        value={val}
        onChange={(e) => { setVal(e.target.value); setStatus("idle"); setFeedbackMsg(""); }}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault();
            const start = e.target.selectionStart;
            const newVal = val.substring(0, start) + "  " + val.substring(e.target.selectionEnd);
            setVal(newVal);
            setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = start + 2; }, 0);
          }
        }}
        placeholder="// enter your full transmission here..."
        disabled={status === "pass"}
        style={{
          width: "100%", boxSizing: "border-box", height: 160,
          background: C.tagBg, color: C.tagText, border: `1px solid ${C.gold}44`,
          borderRadius: 8, padding: "10px 12px", fontFamily: FONTS.mono,
          fontSize: 13, resize: "vertical", outline: "none", marginBottom: 12, lineHeight: 1.7,
        }}
      />

      {/* live preview */}
      <div style={{ marginBottom: 12 }}>
        <p style={{ margin: "0 0 6px", color: C.gold, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, fontFamily: FONTS.mono }}>ðŸ“¡ Transmission Preview</p>
        <LivePreview html={val} />
      </div>

      {/* tiny mistakes reminder */}
      {attempts >= 2 && status !== "pass" && (
        <div style={{ background: C.surface, border: `1px solid ${C.gold}33`, borderRadius: 8, padding: "8px 12px", marginBottom: 10 }}>
          <p style={{ color: C.gold, margin: "0 0 4px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>âš ï¸ In code, ONE wrong character breaks everything</p>
          <p style={{ color: C.textMuted, margin: 0, fontSize: 12, lineHeight: 1.5 }}>Check for: missing closing tags, wrong text, missing quotes around attributes</p>
        </div>
      )}

      {/* feedback */}
      {status === "fail" && feedbackMsg && (
        <div style={{ background: C.redDim, border: `1px solid ${C.red}44`, borderRadius: 8, padding: "8px 12px", marginBottom: 10 }}>
          <p style={{ color: C.red, margin: 0, fontSize: 13 }}>âŒ {feedbackMsg}</p>
        </div>
      )}

      {/* hints */}
      {hint && status !== "pass" && (
        <div style={{ background: C.goldDim, border: `1px solid ${C.gold}44`, borderRadius: 8, padding: "8px 12px", marginBottom: 10 }}>
          <p style={{ color: C.gold, margin: 0, fontSize: 13 }}>
            ðŸ“¡ {attempts === 1 ? "Signal Nudge" : attempts === 2 ? "Hint Beam" : "Full Transmission"}: {hint}
          </p>
        </div>
      )}

      {/* walkthrough */}
      {attempts >= 2 && status !== "pass" && !showWalkthrough && (
        <button onClick={() => { setShowWalkthrough(true); setWalkthroughStep(0); }}
          style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", marginBottom: 10, display: "block" }}>
          ðŸ†˜ Lost in space â€” walk me through it
        </button>
      )}

      {showWalkthrough && status !== "pass" && (
        <div style={{ background: C.goldDim, border: `1px solid ${C.gold}44`, borderRadius: 10, padding: 14, marginBottom: 10 }}>
          <p style={{ color: C.gold, fontWeight: 700, margin: "0 0 8px", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Step {walkthroughStep + 1} of {bug.walkthrough.length}</p>
          <p style={{ color: C.textPrimary, margin: "0 0 12px", fontSize: 13, fontFamily: FONTS.mono, wordBreak: "break-all", lineHeight: 1.6 }}>{bug.walkthrough[walkthroughStep]}</p>
          <div style={{ display: "flex", gap: 8 }}>
            {walkthroughStep > 0 && (
              <button onClick={() => setWalkthroughStep((s) => s - 1)}
                style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 7, padding: "5px 12px", fontSize: 12, cursor: "pointer" }}>â† Back</button>
            )}
            {walkthroughStep < bug.walkthrough.length - 1 ? (
              <button onClick={() => setWalkthroughStep((s) => s + 1)}
                style={{ background: C.gold, color: C.bg, border: "none", borderRadius: 7, padding: "5px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Next â†’</button>
            ) : (
              <button onClick={() => setShowWalkthrough(false)}
                style={{ background: C.alien, color: C.bg, border: "none", borderRadius: 7, padding: "5px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Got it! ðŸ’ª</button>
            )}
          </div>
        </div>
      )}

      {status === "pass" ? (
        <div style={{ textAlign: "center", padding: "12px 0" }}>
          <div style={{ fontSize: 36, marginBottom: 6 }}>ðŸ›âš¡</div>
          <p style={{ color: C.alien, margin: 0, fontWeight: 800, fontSize: 15, fontFamily: FONTS.heading, letterSpacing: 1 }}>BUG CRUSHED!</p>
          <p style={{ color: C.textMuted, margin: "4px 0 0", fontSize: 12 }}>+{bug.xp} Signal Power earned</p>
        </div>
      ) : (
        <button onClick={check} style={{ background: C.gold, color: C.bg, border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 800, fontSize: 12, cursor: "pointer", letterSpacing: 2, fontFamily: FONTS.heading }}>
          TRANSMIT â–¶
        </button>
      )}
    </div>
  );
}

export { BugChallengeCard };
