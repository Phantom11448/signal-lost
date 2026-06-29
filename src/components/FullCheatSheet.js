import React, { useState } from 'react';
import { C } from '../constants/colors.js';
import { FONTS } from '../constants/fonts.js';
import { Stars } from './Stars.js';
import { CHEAT_SHEET } from '../data/cheatSheet.js';

function FullCheatSheet({ onClose }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [search, setSearch] = useState("");
  const cat = CHEAT_SHEET[activeCategory];

  const filtered = search.trim()
    ? CHEAT_SHEET.flatMap(c => c.items.map(item => ({ ...item, category: c.category, color: c.color })))
        .filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.desc.toLowerCase().includes(search.toLowerCase()))
    : cat.items.map(item => ({ ...item, color: cat.color }));

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONTS.body, position: "relative" }}>
      <Stars />
      <div style={{ position: "relative", zIndex: 1, padding: "20px 16px 48px", maxWidth: 580, margin: "0 auto", boxSizing: "border-box", color: C.textPrimary }}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <button onClick={onClose} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>← Ship</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: C.accent, textTransform: "uppercase", letterSpacing: 3, fontFamily: FONTS.mono }}>Transmission Codex</div>
            <div style={{ fontWeight: 700, fontSize: 17, fontFamily: FONTS.heading, color: C.accent, letterSpacing: 1 }}>FULL CHEAT SHEET</div>
          </div>
        </div>

        {/* search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search tags, attributes, anything..."
          style={{
            width: "100%", boxSizing: "border-box",
            background: C.card, color: C.textPrimary,
            border: `1px solid ${C.accent}44`, borderRadius: 10,
            padding: "10px 14px", fontFamily: FONTS.body,
            fontSize: 14, outline: "none", marginBottom: 14,
          }}
        />

        {/* category tabs */}
        {!search && (
          <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 14 }}>
            {CHEAT_SHEET.map((c, i) => (
              <button key={i} onClick={() => setActiveCategory(i)} style={{
                background: activeCategory === i ? `${c.color}22` : C.card,
                border: `1.5px solid ${activeCategory === i ? c.color : C.border}`,
                color: activeCategory === i ? c.color : C.textMuted,
                borderRadius: 20, padding: "5px 12px", cursor: "pointer",
                fontSize: 11, whiteSpace: "nowrap",
                fontWeight: activeCategory === i ? 700 : 400,
                transition: "all 0.2s", flexShrink: 0,
              }}>{c.icon} {c.category}</button>
            ))}
          </div>
        )}

        {/* items */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
          {filtered.map((item, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, alignItems: "flex-start",
              padding: "12px 16px",
              borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : "none",
            }}>
              <code style={{
                background: C.tagBg, color: item.color,
                padding: "3px 8px", borderRadius: 6, fontSize: 11,
                fontFamily: FONTS.mono, whiteSpace: "nowrap", flexShrink: 0,
                border: `1px solid ${item.color}33`, maxWidth: "45%",
                overflow: "hidden", textOverflow: "ellipsis",
              }}>{item.name}</code>
              <div style={{ flex: 1 }}>
                {search && <div style={{ fontSize: 10, color: item.color, marginBottom: 2, textTransform: "uppercase", letterSpacing: 1 }}>{item.category}</div>}
                <span style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.5 }}>{item.desc}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: 24, textAlign: "center", color: C.textMuted }}>Nothing found for "{search}"</div>
          )}
        </div>

        <p style={{ color: C.textMuted, fontSize: 11, textAlign: "center", marginTop: 16 }}>
          ~30 tags cover 95% of all webpages ever written 🛸
        </p>
      </div>
    </div>
  );
}

export { FullCheatSheet };
