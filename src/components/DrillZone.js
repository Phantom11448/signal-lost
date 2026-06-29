import React, { useState, useEffect } from 'react';
import { C } from '../constants/colors.js';
import { FONTS } from '../constants/fonts.js';
import { ALIEN_BULLETS } from '../constants/feedback.js';
import { DRILLS, MIN_DRILLS } from '../data/drills.js';
import { LivePreview } from './LivePreview.js';

// â”€â”€ DRILL ZONE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DrillZone({ challengeId, onReady }) {
  const drills = DRILLS[challengeId] || [];
  const [current, setCurrent] = useState(0);
  const [val, setVal] = useState("");
  const [status, setStatus] = useState("idle");
  const [reps, setReps] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (!drills.length) onReady();
  }, []);

  if (!drills.length) return null;

  const drill = drills[current % drills.length];
  const confident = reps >= MIN_DRILLS;

  const check = () => {
    if (drill.check(val.toLowerCase())) {
      setStatus("pass");
      setReps((r) => r + 1);
    } else {
      setStatus("fail");
    }
  };

  const next = () => {
    setCurrent((c) => c + 1);
    setVal("");
    setStatus("idle");
    setShowAnswer(false);
  };

  return (
    <div style={{ background: C.surface, border: `1px solid ${C.accent}33`, borderRadius: 12, padding: 16, marginTop: 8 }}>
      {/* header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div>
          <div style={{ color: C.alien, fontSize: 15, fontWeight: 800, letterSpacing: 2, fontFamily: FONTS.heading }}>OPTIONAL</div>
          <div style={{ color: C.accent, fontSize: 10, textTransform: "uppercase", letterSpacing: 2, marginTop: 2 }}>ðŸ” Extra Practice â€” do as many as you like</div>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {Array.from({ length: MIN_DRILLS }).map((_, i) => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: "50%",
              background: i < reps ? C.alien : C.border,
              boxShadow: i < reps ? C.glowAlien : "none",
              transition: "all 0.3s",
            }} />
          ))}
          <span style={{ color: C.textMuted, fontSize: 11, marginLeft: 6 }}>{reps}/{MIN_DRILLS} reps</span>
        </div>
      </div>

      {/* drill instruction */}
      {(() => {
        const highlightDrill = (text) => {
          const tagPattern = /(<\/?[a-z][a-z0-9]*(?:\s[^>]*)?>|[a-z][a-z0-9-]+="[^"]*")/gi;
          const parts = [];
          let last = 0, match, key = 0;
          while ((match = tagPattern.exec(text)) !== null) {
            if (match.index > last) parts.push(<span key={key++}>{text.slice(last, match.index)}</span>);
            parts.push(<code key={key++} style={{ color: C.alien, background: C.alienDim, padding: "1px 4px", borderRadius: 4, fontFamily: FONTS.mono, fontSize: 13 }}>{match[0]}</code>);
            last = match.index + match[0].length;
          }
          if (last < text.length) parts.push(<span key={key++}>{text.slice(last)}</span>);
          return parts.length > 0 ? <>{parts}</> : text;
        };

        if (Array.isArray(drill.instruction)) {
          return (
            <div style={{ marginBottom: 10 }}>
              {drill.instruction.map((line, i) => {
                if (i === 0) return (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <span style={{ color: C.gold, fontWeight: 700, fontSize: 14, fontFamily: FONTS.heading, letterSpacing: 0.5 }}>{line}</span>
                  </div>
                );
                return (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                    <span style={{ flexShrink: 0 }}>{ALIEN_BULLETS[i % ALIEN_BULLETS.length]}</span>
                    <span style={{ color: C.textPrimary, fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>{highlightDrill(line)}</span>
                  </div>
                );
              })}
            </div>
          );
        }
        return <p style={{ color: C.textPrimary, fontSize: 14, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.4 }}>{highlightDrill(drill.instruction)}</p>;
      })()}

      <div style={{ position: "relative", marginBottom: 8 }}>
        <textarea
          value={val}
          onChange={(e) => { setVal(e.target.value); setStatus("idle"); setShowAnswer(false); }}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              const start = e.target.selectionStart;
              const end = e.target.selectionEnd;
              const newVal = val.substring(0, start) + "  " + val.substring(end);
              setVal(newVal);
              setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = start + 2; }, 0);
            }
          }}
          placeholder="// practice hereâ€¦"
          disabled={status === "pass"}
          style={{
            width: "100%", boxSizing: "border-box", height: 68,
            background: C.tagBg, color: C.tagText, border: `1px solid ${C.accent}33`,
            borderRadius: 8, padding: "8px 12px", fontFamily: FONTS.mono,
            fontSize: 13, resize: "vertical", outline: "none", lineHeight: 1.6,
          }}
        />
      </div>

      {/* live preview */}
      <div style={{ marginBottom: 10 }}>
        <LivePreview html={val} />
      </div>

      {status === "fail" && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
          <p style={{ color: C.red, margin: 0, fontSize: 13, flex: 1 }}>âŒ Not quite â€” check your tag and content</p>
          <button onClick={() => setShowAnswer(true)} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 6, padding: "3px 10px", fontSize: 11, cursor: "pointer", whiteSpace: "nowrap" }}>Show answer</button>
        </div>
      )}

      {showAnswer && (
        <div style={{ background: C.tagBg, border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "8px 12px", marginBottom: 8 }}>
          <p style={{ color: C.accent, margin: 0, fontSize: 12, fontFamily: FONTS.mono }}>{drill.answer}</p>
        </div>
      )}

      {status === "pass" ? (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: C.alien, margin: 0, fontWeight: 700, fontSize: 13 }}>âœ“ Nice work! +1 rep</p>
          <button onClick={next} style={{ background: C.accent, color: C.bg, border: "none", borderRadius: 7, padding: "6px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            {current + 1 < drills.length ? "Next drill â†’" : "Again â†’"}
          </button>
        </div>
      ) : (
        <button onClick={check} style={{ background: C.accent, color: C.bg, border: "none", borderRadius: 8, padding: "7px 18px", fontWeight: 800, fontSize: 12, cursor: "pointer", letterSpacing: 1, fontFamily: FONTS.heading }}>
          TRANSMIT â–¶
        </button>
      )}

      <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
        <div style={{ background: C.card, borderRadius: 99, height: 6, overflow: "hidden", marginBottom: 10 }}>
          <div style={{
            width: `${Math.min((reps / MIN_DRILLS) * 100, 100)}%`, height: "100%",
            background: `linear-gradient(90deg, ${C.accent}, ${C.alien})`,
            borderRadius: 99, transition: "width 0.5s ease",
            boxShadow: reps >= MIN_DRILLS ? C.glowAlien : "none",
          }} />
        </div>
        <button
          onClick={onReady}
          style={{
            width: "100%", padding: "10px",
            background: reps >= MIN_DRILLS ? C.alien : C.accent,
            color: C.bg,
            border: "none", borderRadius: 8,
            fontWeight: 800, fontSize: 12, letterSpacing: 2,
            cursor: "pointer",
            fontFamily: FONTS.heading,
            transition: "all 0.4s",
            boxShadow: reps >= MIN_DRILLS ? C.glowAlien : "none",
          }}>
          {reps >= MIN_DRILLS ? "FEELING CONFIDENT â†’ NEXT CONCEPT ðŸ›¸" : "SKIP DRILLS â†’ NEXT CONCEPT â†’"}
        </button>
      </div>
    </div>
  );
}

export { DrillZone };
