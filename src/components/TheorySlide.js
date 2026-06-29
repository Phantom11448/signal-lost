import React from 'react';
import { C } from '../constants/colors.js';
import { FONTS } from '../constants/fonts.js';
import { TagAnatomy } from './TagAnatomy.js';
import { InteractiveCodeBlock } from './InteractiveCodeBlock.js';
import { PageWireframe } from './PageWireframe.js';

function TheorySlide({ slide, slideKey }) {
  return (
    <div>
      <h3 style={{ color: C.accent, margin: "0 0 10px", fontSize: 17, letterSpacing: 0.5, fontFamily: FONTS.heading }}>{slide.heading}</h3>
      <p style={{ color: C.textPrimary, margin: "0 0 16px", lineHeight: 1.75, fontSize: 16 }}>{slide.body.split(/\*\*(.+?)\*\*/g).map((part, i) => i % 2 === 1 ? <span key={i} style={{ color: "#39ff14", fontFamily: FONTS.mono }}>{part}</span> : part)}</p>
      {slide.wireframe && <PageWireframe />}
      {slide.anatomy && <TagAnatomy parts={slide.anatomy} slideKey={slideKey} />}
      {slide.codeBlock && <InteractiveCodeBlock code={slide.codeBlock} />}
    </div>
  );
}

export { TheorySlide };
