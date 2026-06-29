import React, { useRef, useEffect } from 'react';
import { C } from '../constants/colors.js';

function LivePreview({ html }) {
  const iframeRef = useRef(null);
  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;
    try {
      doc.open();
      doc.write(`<html><head><style>
        body{font-family:system-ui,sans-serif;padding:12px;color:#1a1828;background:#f0fff8;margin:0;}
        h1,h2,h3{margin:0 0 6px;color:#020b18;}p{margin:0 0 6px;}a{color:#7c5cfc;}
        ul,ol{margin:0 0 6px;padding-left:20px;}li{margin-bottom:2px;}
        button{background:#00b894;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:14px;}
        strong{font-weight:700;}em{font-style:italic;}hr{border:none;border-top:2px solid #ccc;margin:8px 0;}
        input,select,textarea{border:1px solid #ccc;padding:6px 10px;border-radius:4px;font-size:14px;margin:4px 0;display:block;width:100%;box-sizing:border-box;}
        label{font-size:14px;font-weight:600;margin-top:8px;display:block;}
        form{background:#f0f0f0;padding:12px;border-radius:6px;}
        table{border-collapse:collapse;width:100%;margin:4px 0;}
        td,th{border:1px solid #ccc;padding:6px 10px;text-align:left;}
        th{background:#e0e0e0;font-weight:700;}
        div,header,main,footer,nav,section{display:block;}
      </style></head><body>${html}</body></html>`);
      doc.close();
    } catch (e) {}
  }, [html]);
  return (
    <div>
      <p style={{ margin: "0 0 6px", color: C.accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 2 }}>ðŸ“¡ Transmission Preview</p>
      <iframe ref={iframeRef} title="preview" style={{ width: "100%", height: 130, border: `1px solid ${C.accent}44`, borderRadius: 8, background: "#f0fff8" }} sandbox="allow-same-origin" />
    </div>
  );
}

export { LivePreview };
