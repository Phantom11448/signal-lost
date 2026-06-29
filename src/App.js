import React, { useState, useEffect, useRef } from 'react';
import { C } from './constants/colors.js';
import { FONTS } from './constants/fonts.js';
import { ALIEN_BULLETS } from './constants/feedback.js';
import { MISSIONS } from './data/missions.js';
import { DRILLS } from './data/drills.js';
import { BUG_CHALLENGES } from './data/bugChallenges.js';
import { Stars } from './components/Stars.js';
import { SignalBar } from './components/SignalBar.js';
import { ChallengeCard } from './components/ChallengeCard.js';
import { DrillZone } from './components/DrillZone.js';
import { TheorySlide } from './components/TheorySlide.js';
import { TagReferenceModal } from './components/TagReferenceModal.js';
import { BugChallengeCard } from './components/BugChallengeCard.js';
import { DailyCard } from './components/DailyCard.js';
import { Certificate } from './components/Certificate.js';
import { Museum } from './components/Museum.js';
import { FreestyleInline } from './components/FreestyleInline.js';
import { CodexInline } from './components/CodexInline.js';
import { MuseumInline } from './components/MuseumInline.js';
export default function SignalLost() {
  const [screen, setScreen] = useState("home");
  const [activeLevel, setActiveLevel] = useState(null);
  const [theoryStep, setTheoryStep] = useState(0);
  const theoryStepRef = useRef(0);
  const [theoryDone, setTheoryDone] = useState(false);
  const [drillReady, setDrillReady] = useState(false);
  const [signalPower, setSignalPower] = useState(0);
  const [earnedSP, setEarnedSP] = useState(0);
  const [passedChallenges, setPassedChallenges] = useState({});
  const [missionComplete, setMissionComplete] = useState(false);
  const [shipParts, setShipParts] = useState([]);
  const [showCert, setShowCert] = useState(false);
  const [dailyDone, setDailyDone] = useState(false);
  const [showRef, setShowRef] = useState(false);
  const [passedBugs, setPassedBugs] = useState({});
  const [activeBug, setActiveBug] = useState(null);
  const [activeTab, setActiveTab] = useState("missions");
  const [loaded, setLoaded] = useState(false);

  // â”€â”€ LOAD saved progress on mount â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    const load = async () => {
      try {
        const result = await window.storage.get("signal-lost-progress");
        if (result?.value) {
          const saved = JSON.parse(result.value);
          if (saved.passedChallenges) setPassedChallenges(saved.passedChallenges);
          if (saved.signalPower) setSignalPower(saved.signalPower);
          if (saved.shipParts) setShipParts(saved.shipParts);
          if (saved.dailyDone) setDailyDone(saved.dailyDone);
          if (saved.passedBugs) setPassedBugs(saved.passedBugs);
        }
      } catch (e) {
        // no saved data yet â€” start fresh
      }
      setLoaded(true);
    };
    load();
  }, []);

  // â”€â”€ SAVE progress whenever key state changes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    if (!loaded) return;
    const save = async () => {
      try {
        await window.storage.set("signal-lost-progress", JSON.stringify({
          passedChallenges, signalPower, shipParts, dailyDone, passedBugs,
        }));
      } catch (e) {}
    };
    save();
  }, [passedChallenges, signalPower, shipParts, dailyDone, loaded]);

  const mission = activeLevel !== null ? MISSIONS[activeLevel] : null;

  const allMissionChallengeIds = (m) => {
    if (!m || !m.theory || !m.bossChallenge) return [];
    return [
      ...m.theory.filter(s => s.miniChallenge).map(s => s.miniChallenge.id),
      m.bossChallenge.id,
    ];
  };
  const allMissionsDone = MISSIONS.every((m) => allMissionChallengeIds(m).every((id) => passedChallenges[id]));

  const scrollToTop = () => {
    const el = document.getElementById("level-top");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startMission = (idx) => {
    setActiveLevel(idx);
    setTheoryStep(0);
    theoryStepRef.current = 0;
    setTheoryDone(false);
    setDrillReady(false);
    setEarnedSP(0);
    setMissionComplete(false);
    setScreen("level");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 50);
  };

  const handlePass = (challengeId, pts) => {
    if (passedChallenges[challengeId]) return;
    setPassedChallenges((p) => ({ ...p, [challengeId]: true }));
    setSignalPower((x) => x + pts); setEarnedSP((e) => e + pts);
  };

  const handleDailyComplete = (pts) => {
    setDailyDone(true);
    setSignalPower((x) => x + pts);
  };

  useEffect(() => {
    if (!mission || !theoryDone) return;
    const ids = allMissionChallengeIds(mission);
    const allDone = ids.every((id) => passedChallenges[id]);
    if (allDone && !missionComplete) {
      setMissionComplete(true);
      if (!shipParts.includes(mission.badge)) setShipParts((b) => [...b, mission.badge]);
    }
  }, [passedChallenges, theoryDone, mission, missionComplete, shipParts]);

  // ALL hooks done â€” now safe to do conditional renders
  if (!loaded) {
    return (
      <div style={{ minHeight: "100vh", background: "#020b18", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#00f5c4", fontFamily: "'Orbitron', sans-serif", fontSize: 13, letterSpacing: 4, textTransform: "uppercase" }}>
          Loading ship systems...
        </div>
      </div>
    );
  }

  // MUSEUM
  if (screen === "museum") return <><Stars /><Museum onClose={() => setScreen("home")} /></>;

  // BUG CHALLENGE SCREEN
  if (activeBug) return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONTS.body, position: "relative" }}>
      <Stars />
      <div style={{ position: "relative", zIndex: 1, padding: "20px 16px 60px", maxWidth: 580, margin: "0 auto", boxSizing: "border-box", color: C.textPrimary }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <button onClick={() => setActiveBug(null)} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>â† Ship</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: C.red, textTransform: "uppercase", letterSpacing: 2, fontFamily: FONTS.mono }}>âš¡ {activeBug.subtitle}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: C.textPrimary, fontFamily: FONTS.heading, letterSpacing: 1 }}>{activeBug.title}</div>
          </div>
          <div style={{ color: C.gold, fontWeight: 800, fontSize: 14, background: C.goldDim, padding: "3px 10px", borderRadius: 99 }}>+{activeBug.xp} SP</div>
        </div>
        <BugChallengeCard
          key={activeBug.id}
          bug={activeBug}
          alreadyDone={!!passedBugs[activeBug.id]}
          onPass={(pts) => {
            if (!passedBugs[activeBug.id]) {
              setPassedBugs(p => ({ ...p, [activeBug.id]: true }));
              setSignalPower(x => x + pts);
            }
          }}
        />
        {passedBugs[activeBug.id] && (
          <button onClick={() => setActiveBug(null)} style={{ background: C.alien, color: C.bg, border: "none", borderRadius: 8, padding: "10px 28px", fontWeight: 800, fontSize: 11, cursor: "pointer", letterSpacing: 2, fontFamily: FONTS.heading, boxShadow: C.glowAlien, display: "block", margin: "0 auto" }}>
            RETURN TO SHIP â†’
          </button>
        )}
      </div>
    </div>
  );

  // LEVEL / MISSION
  if (screen === "level" && mission) {
    const currentSlide = mission.theory[theoryStep];
    const miniDone = currentSlide?.miniChallenge ? !!passedChallenges[currentSlide.miniChallenge.id] : true;
    const allSlidesDone = mission.theory.every(s => !s.miniChallenge || passedChallenges[s.miniChallenge.id]);
    // canAdvance requires both mini challenge passed AND drill zone completed (or no drills exist)
    const hasDrills = currentSlide?.miniChallenge && (DRILLS[currentSlide.miniChallenge.id]?.length > 0);
    // canAdvance only needs miniDone â€” drills are optional
    const canAdvance = !currentSlide?.miniChallenge || miniDone;

    return (
      <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONTS.body, position: "relative" }}>
        <Stars />
        <div id="level-top" style={{ position: "relative", zIndex: 1, padding: "20px 16px 60px", maxWidth: 580, margin: "0 auto", boxSizing: "border-box", color: C.textPrimary }}>
          {/* header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <button onClick={() => setScreen("home")} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, whiteSpace: "nowrap" }}>â† Ship</button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, color: C.accent, textTransform: "uppercase", letterSpacing: 2 }}>Mission {mission.id} â€” {mission.shipPart}</div>
              <div style={{ fontWeight: 700, fontSize: 16, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: C.textPrimary }}>{mission.title}</div>
            </div>
            <button onClick={() => setShowRef(true)} style={{ background: C.card, border: `1px solid ${C.accent}44`, color: C.accent, borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 11, whiteSpace: "nowrap", fontFamily: FONTS.mono }}>ðŸ“‹ Tags</button>
            <div style={{ color: C.gold, fontWeight: 800, fontSize: 14, whiteSpace: "nowrap", background: C.goldDim, padding: "3px 10px", borderRadius: 99 }}>+{earnedSP} SP</div>
          </div>
          {showRef && <TagReferenceModal onClose={() => setShowRef(false)} />}

          {/* story intro */}
          <div style={{ background: C.accentDim, border: `1px solid ${C.accent}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 20 }}>
            <p style={{ color: C.accent, margin: 0, fontSize: 13, lineHeight: 1.6 }}>ðŸ‘¾ {mission.storyIntro}</p>
          </div>

          {!theoryDone ? (
            <>
              {/* theory slide */}
              <div style={{ background: C.card, border: `1px solid ${C.accent}33`, borderRadius: 14, padding: 20, marginBottom: 16, boxSizing: "border-box", overflow: "hidden" }}>
                <p style={{ color: C.accent, fontSize: 10, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 14px" }}>
                  Briefing {theoryStep + 1} of {mission.theory.length}
                </p>
                <TheorySlide slide={currentSlide} slideKey={`${activeLevel}-${theoryStep}`} />
              </div>

              {/* mini challenge â€” shown right below the theory */}
              {currentSlide.miniChallenge && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ color: C.red, fontSize: 15, fontWeight: 800, letterSpacing: 2, fontFamily: FONTS.heading }}>REQUIRED REPAIR</div>
                    <div style={{ color: C.accent, fontSize: 10, textTransform: "uppercase", letterSpacing: 2, marginTop: 2 }}>âš¡ Complete this to advance</div>
                  </div>
                  <ChallengeCard
                    key={currentSlide.miniChallenge.id}
                    challenge={currentSlide.miniChallenge}
                    alreadyDone={!!passedChallenges[currentSlide.miniChallenge.id]}
                    onPass={(pts) => handlePass(currentSlide.miniChallenge.id, pts)}
                  />
                  {/* drill zone appears after mini challenge is passed */}
                  {miniDone && !drillReady && (
                    <DrillZone
                      key={`drill-${currentSlide.miniChallenge.id}`}
                      challengeId={currentSlide.miniChallenge.id}
                      onReady={() => {
                        const currentStep = theoryStepRef.current;
                        const totalSlides = mission.theory.length;
                        const next = currentStep + 1;
                        if (next < totalSlides) {
                          theoryStepRef.current = next;
                          setTheoryStep(next);
                          setDrillReady(false);
                        } else {
                          setTheoryDone(true);
                          setDrillReady(false);
                        }
                        setTimeout(() => scrollToTop(), 50);
                      }}
                    />
                  )}
                </div>
              )}

              {/* nav buttons â€” Next only unlocks after drill is ready */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <button onClick={() => { const s = Math.max(0, theoryStep - 1); theoryStepRef.current = s; setTheoryStep(s); setDrillReady(false); scrollToTop(); }}
                  disabled={theoryStep === 0}
                  style={{ background: theoryStep === 0 ? C.border : C.surface, color: theoryStep === 0 ? C.textMuted : C.textPrimary, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 16px", cursor: theoryStep === 0 ? "default" : "pointer", fontSize: 13 }}>
                  â† Prev
                </button>
                {theoryStep < mission.theory.length - 1 ? (
                  <button
                    onClick={() => { if (canAdvance) { const s = theoryStep + 1; theoryStepRef.current = s; setTheoryStep(s); setDrillReady(false); scrollToTop(); } }}
                    style={{
                      background: canAdvance ? C.accent : C.border,
                      color: canAdvance ? C.bg : C.textMuted,
                      border: "none", borderRadius: 8, padding: "8px 18px",
                      cursor: canAdvance ? "pointer" : "not-allowed",
                      fontWeight: 700, fontSize: 13, letterSpacing: 1,
                      transition: "all 0.2s",
                    }}>
                    {canAdvance ? "NEXT â†’" : "Pass the challenge to continue"}
                  </button>
                ) : (
                  <button
                    onClick={() => { if (canAdvance) { setTheoryDone(true); scrollToTop(); } }}
                    style={{
                      background: canAdvance ? C.alien : C.border,
                      color: canAdvance ? C.bg : C.textMuted,
                      border: "none", borderRadius: 8, padding: "8px 18px",
                      cursor: canAdvance ? "pointer" : "not-allowed",
                      fontWeight: 800, fontSize: 11, letterSpacing: 2,
                      boxShadow: canAdvance ? C.glowAlien : "none",
                      fontFamily: FONTS.heading, transition: "all 0.2s",
                    }}>
                    {canAdvance ? "FINAL REPAIR ðŸ›¸" : "Pass the challenge first"}
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div style={{ background: C.goldDim, border: `1px solid ${C.gold}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 16 }}>
                <p style={{ color: C.gold, margin: 0, fontSize: 13, lineHeight: 1.6 }}>
                  ðŸ† All concepts learned! Now for the final repair â€” this one combines everything from this mission.
                </p>
              </div>
              <ChallengeCard
                key={mission.bossChallenge.id}
                challenge={mission.bossChallenge}
                alreadyDone={!!passedChallenges[mission.bossChallenge.id]}
                onPass={(pts) => handlePass(mission.bossChallenge.id, pts)}
              />
              {missionComplete && (
                <div style={{ background: `linear-gradient(135deg, ${C.accent}18, ${C.alien}18)`, border: `2px solid ${C.alien}`, borderRadius: 14, padding: 24, textAlign: "center", marginTop: 8, boxShadow: C.glowAlien }}>
                  <div style={{ fontSize: 52, marginBottom: 8 }}>ðŸ›¸</div>
                  <h2 style={{ margin: "0 0 6px", color: C.alien, fontSize: 20, fontFamily: FONTS.heading, letterSpacing: 1 }}>System Restored!</h2>
                  <p style={{ color: C.textMuted, margin: "0 0 16px", fontSize: 14 }}>
                    <strong style={{ color: C.gold }}>{mission.badgeName}</strong> {mission.badge} recovered and installed!
                  </p>
                  <button onClick={() => { setScreen("home"); window.scrollTo({ top: 0, behavior: "instant" }); }} style={{ background: C.alien, color: C.bg, border: "none", borderRadius: 8, padding: "10px 28px", fontWeight: 800, fontSize: 11, cursor: "pointer", letterSpacing: 2, boxShadow: C.glowAlien, fontFamily: FONTS.heading }}>
                    RETURN TO SHIP â†’
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // HOME / SHIP DASHBOARD
  const TABS = [
    { id: "missions", label: "Missions", icon: "ðŸ›¸" },
    { id: "freestyle", label: "Freestyle", icon: "âš¡" },
    { id: "codex", label: "Codex", icon: "ðŸ“¡" },
    { id: "museum", label: "Museum", icon: "ðŸ›ï¸" },
  ];

  const renderTab = () => {
    // MISSIONS TAB
    if (activeTab === "missions") return (
      <div style={{ paddingBottom: 80 }}>
        {/* hero */}
        <div style={{ textAlign: "center", padding: "32px 16px 20px" }}>
          <div style={{ color: C.accent, fontSize: 10, letterSpacing: 6, textTransform: "uppercase", marginBottom: 10, fontFamily: FONTS.mono }}>ðŸ›¸ Emergency Broadcast System</div>
          <h1 style={{ fontFamily: FONTS.heading, fontSize: 48, fontWeight: 900, margin: "0 0 4px", letterSpacing: 8, lineHeight: 1.1, color: C.accent, textShadow: `0 0 20px ${C.accent}, 0 0 40px ${C.accent}88` }}>SIGNAL</h1>
          <h1 style={{ fontFamily: FONTS.heading, fontSize: 48, fontWeight: 900, margin: "0 0 16px", letterSpacing: 8, lineHeight: 1.1, color: C.alien, textShadow: `0 0 20px ${C.alien}, 0 0 40px ${C.alien}88` }}>LOST</h1>
          <p style={{ color: C.textMuted, fontSize: 14, margin: "0 auto 20px", maxWidth: 300, lineHeight: 1.6 }}>
            Crash-landed near Earth. Learn HTML to repair your ship and send a distress signal home. ðŸ‘¾
          </p>

          {/* ship status */}
          <div style={{ display: "inline-flex", gap: 20, background: C.surface, border: `1px solid ${C.accent}44`, borderRadius: 14, padding: "12px 24px", boxShadow: C.glowAccent }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: C.gold }}>{signalPower}</div>
              <div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>Signal Power</div>
            </div>
            <div style={{ width: 1, background: C.border }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20 }}>{shipParts.length > 0 ? shipParts.join(" ") : "â€”"}</div>
              <div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>Ship Parts</div>
            </div>
            <div style={{ width: 1, background: C.border }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20 }}>{allMissionsDone ? "ðŸŸ¢" : "ðŸ”´"}</div>
              <div style={{ fontSize: 10, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>Signal</div>
            </div>
          </div>
        </div>

        <div style={{ padding: "0 16px" }}>
          {/* daily challenge */}
          <DailyCard done={dailyDone} onComplete={handleDailyComplete} />

          {/* missions label */}
          <div style={{ color: C.accent, fontSize: 10, textTransform: "uppercase", letterSpacing: 3, marginBottom: 12, fontFamily: FONTS.mono }}>â€” Ship Repair Missions â€”</div>

          {/* mission cards */}
          {MISSIONS.map((m, i) => {
            const done = allMissionChallengeIds(m).every((id) => passedChallenges[id]);
            const allIds = allMissionChallengeIds(m);
            const earnedCount = allIds.filter(id => passedChallenges[id]).length;
            const totalCount = allIds.length;

            // find bug challenge that unlocks after this mission
            const BUG_MAP = { 3: BUG_CHALLENGES[0], 6: BUG_CHALLENGES[1], 9: BUG_CHALLENGES[2] };
            const bugAfter = BUG_MAP[m.id] || null;
            const bugUnlocked = bugAfter
              ? Object.keys(passedChallenges).filter(k => k.startsWith('boss') || k.startsWith('m')).length >=
                bugAfter.unlocksAfter.length * 4
              : false;

            return (
              <div key={m.id}>
                <div
                  style={{ background: C.card, border: `1.5px solid ${done ? C.alien : C.border}`, borderRadius: 14, padding: 18, marginBottom: 10, cursor: "pointer", transition: "all 0.2s", boxSizing: "border-box", boxShadow: done ? C.glowAlien : "none" }}
                  onClick={() => startMission(i)}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = done ? C.alien : C.accent; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = done ? C.alien : C.border; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 10, color: C.accent, textTransform: "uppercase", letterSpacing: 2, marginBottom: 3, fontFamily: FONTS.mono }}>Mission {m.id} Â· {m.shipPart}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary, marginBottom: 2, fontFamily: FONTS.heading, letterSpacing: 0.5 }}>{m.title}</div>
                      <div style={{ fontSize: 12, color: C.textMuted }}>{m.subtitle}</div>
                    </div>
                    <div style={{ fontSize: 26, marginLeft: 12 }}>{done ? "âœ…" : m.badge}</div>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <SignalBar current={earnedCount} max={totalCount} />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                      <span style={{ fontSize: 11, color: C.textMuted }}>{done ? "âœ“ System Restored" : "Awaiting repair..."}</span>
                      <span style={{ fontSize: 11, color: C.textMuted }}>{earnedCount}/{totalCount} repairs</span>
                    </div>
                  </div>
                </div>

                {/* Bug in the System card â€” clickable like missions */}
                {bugAfter && (
                  <div key={bugAfter.id}
                    onClick={() => bugUnlocked && setActiveBug(bugAfter)}
                    style={{
                      background: C.card,
                      border: `1.5px solid ${passedBugs[bugAfter.id] ? C.alien : bugUnlocked ? C.red : C.border}`,
                      borderRadius: 14, padding: 18, marginBottom: 10,
                      cursor: bugUnlocked ? "pointer" : "default",
                      transition: "all 0.2s", boxSizing: "border-box",
                      boxShadow: passedBugs[bugAfter.id] ? C.glowAlien : bugUnlocked ? `0 0 12px ${C.red}44` : "none",
                      opacity: bugUnlocked ? 1 : 0.5,
                    }}
                    onMouseEnter={(e) => { if (bugUnlocked) e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, color: passedBugs[bugAfter.id] ? C.alien : bugUnlocked ? C.red : C.textMuted, textTransform: "uppercase", letterSpacing: 2, marginBottom: 3, fontFamily: FONTS.mono }}>
                          {bugUnlocked ? (passedBugs[bugAfter.id] ? "âœ“ Bug Crushed" : "âš¡ " + bugAfter.subtitle) : "ðŸ”’ " + bugAfter.subtitle}
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary, fontFamily: FONTS.heading, letterSpacing: 0.5 }}>{bugAfter.title}</div>
                        <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>
                          {bugUnlocked ? `+${bugAfter.xp} Signal Power` : `Complete missions ${bugAfter.unlocksAfter.slice(-3).join(", ")} to unlock`}
                        </div>
                      </div>
                      <div style={{ fontSize: 28, marginLeft: 12 }}>
                        {passedBugs[bugAfter.id] ? "âœ…" : bugUnlocked ? "ðŸ›" : "ðŸ”’"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* certificate */}
          {allMissionsDone && (
            <div onClick={() => setShowCert(true)} style={{ background: `linear-gradient(135deg, ${C.accent}18, ${C.alien}18)`, border: `2px solid ${C.alien}`, borderRadius: 14, padding: 18, cursor: "pointer", textAlign: "center", boxShadow: C.glowAlien, marginTop: 8 }}>
              <div style={{ fontSize: 32, marginBottom: 6 }}>ðŸ†</div>
              <div style={{ color: C.alien, fontWeight: 800, fontSize: 13, letterSpacing: 2, fontFamily: FONTS.heading }}>CLAIM YOUR CERTIFICATE</div>
              <div style={{ color: C.textMuted, fontSize: 12, marginTop: 4 }}>All systems restored!</div>
            </div>
          )}

          <p style={{ color: C.textMuted, fontSize: 12, marginTop: 20, textAlign: "center" }}>More ship systems coming ðŸ›¸</p>

          {/* reset */}
          <button onClick={async () => {
            try { await window.storage.delete("signal-lost-progress"); } catch(e) {}
            setPassedChallenges({}); setSignalPower(0); setShipParts([]); setDailyDone(false); setPassedBugs({});
          }} style={{ marginTop: 12, background: "transparent", border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 16px", fontSize: 11, cursor: "pointer", display: "block", margin: "12px auto 0" }}>
            â†º Reset Progress
          </button>
        </div>
      </div>
    );

    // FREESTYLE TAB
    if (activeTab === "freestyle") return (
      <div style={{ paddingBottom: 80 }}>
        <div style={{ padding: "24px 16px 0" }}>
          <div style={{ fontSize: 10, color: C.alien, textTransform: "uppercase", letterSpacing: 3, fontFamily: FONTS.mono, marginBottom: 4 }}>Open Channel</div>
          <h2 style={{ fontFamily: FONTS.heading, color: C.alien, fontSize: 22, margin: "0 0 8px", letterSpacing: 2, textShadow: `0 0 12px ${C.alien}88` }}>FREE TRANSMISSION</h2>
          <p style={{ color: C.textMuted, fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>No rules. No challenges. Just code whatever you want and see it appear live. ðŸ›¸</p>
        </div>
        <FreestyleInline />
      </div>
    );

    // CODEX TAB
    if (activeTab === "codex") return (
      <div style={{ paddingBottom: 80 }}>
        <div style={{ padding: "24px 16px 0" }}>
          <div style={{ fontSize: 10, color: C.accent, textTransform: "uppercase", letterSpacing: 3, fontFamily: FONTS.mono, marginBottom: 4 }}>Transmission Codex</div>
          <h2 style={{ fontFamily: FONTS.heading, color: C.accent, fontSize: 22, margin: "0 0 8px", letterSpacing: 2 }}>FULL CHEAT SHEET</h2>
          <p style={{ color: C.textMuted, fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>Every tag, attribute, and special character. Searchable. Always here when you need it. ðŸ“¡</p>
        </div>
        <CodexInline />
      </div>
    );

    // MUSEUM TAB
    if (activeTab === "museum") return (
      <div style={{ paddingBottom: 80 }}>
        <div style={{ padding: "24px 16px 0" }}>
          <div style={{ fontSize: 10, color: C.gold, textTransform: "uppercase", letterSpacing: 3, fontFamily: FONTS.mono, marginBottom: 4 }}>Alien Research Lab</div>
          <h2 style={{ fontFamily: FONTS.heading, color: C.gold, fontSize: 22, margin: "0 0 8px", letterSpacing: 2 }}>MISTAKES MUSEUM</h2>
          <p style={{ color: C.textMuted, fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>Even the best human coders make these mistakes. Study them so you don't have to. ðŸ‘¾</p>
        </div>
        <MuseumInline />
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONTS.body, position: "relative" }}>
      <Stars />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 580, margin: "0 auto", color: C.textPrimary }}>
        {renderTab()}
      </div>

      {/* bottom tab bar */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        background: C.surface, borderTop: `1px solid ${C.accent}33`,
        display: "flex", justifyContent: "space-around", alignItems: "center",
        padding: "10px 0 14px", boxShadow: `0 -4px 20px rgba(0,0,0,0.5)`,
      }}>
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            background: "transparent", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            padding: "0 16px", flex: 1,
          }}>
            <div style={{
              fontSize: 22,
              filter: activeTab === tab.id ? "none" : "grayscale(80%) opacity(50%)",
              transition: "all 0.2s",
              transform: activeTab === tab.id ? "scale(1.2)" : "scale(1)",
            }}>{tab.icon}</div>
            <div style={{
              fontSize: 10, fontFamily: FONTS.mono, letterSpacing: 1,
              textTransform: "uppercase",
              color: activeTab === tab.id ? C.accent : C.textMuted,
              fontWeight: activeTab === tab.id ? 700 : 400,
              transition: "all 0.2s",
            }}>{tab.label}</div>
            {activeTab === tab.id && (
              <div style={{ width: 20, height: 2, background: C.accent, borderRadius: 99, boxShadow: C.glowAccent }} />
            )}
          </button>
        ))}
      </div>

      {showCert && <Certificate signalPower={signalPower} parts={shipParts} onClose={() => setShowCert(false)} />}
      {showRef && <TagReferenceModal onClose={() => setShowRef(false)} />}
    </div>
  );
}

