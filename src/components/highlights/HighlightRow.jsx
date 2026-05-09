import { useState } from "react";

export default function HighlightRow({ highlight, onOpen, glowColor }) {
  const [hovered, setHovered] = useState(false);
  const [company, role] = highlight.label.split(" - ");
  const isClickable = !!highlight.modal;

  if (isClickable) {
    return (
      <button
        type="button"
        onClick={() => onOpen(highlight.modal)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full flex items-center justify-between gap-4 px-4 py-3 bg-slate-50 transition-all duration-200 cursor-pointer text-left rounded-2xl border"
        style={{
          borderColor: hovered && glowColor ? `rgba(${glowColor}, 0.5)` : "#f1f5f9",
          backgroundColor: hovered ? `rgba(${glowColor}, 0.04)` : undefined,
        }}
      >
        <div className="shrink-0">
          <span className="text-xs font-semibold text-slate-700">{company}</span>
          {role && <span className="text-xs text-slate-400"> - {role}</span>}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 text-right">{highlight.detail}</span>
          <span
            className="text-sm leading-none transition-colors duration-200"
            style={{ color: hovered && glowColor ? `rgba(${glowColor}, 0.8)` : "#cbd5e1" }}
          >
            ›
          </span>
        </div>
      </button>
    );
  }

  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
      <div className="shrink-0">
        <span className="text-xs font-semibold text-slate-700">{company}</span>
        {role && <span className="text-xs text-slate-400"> - {role}</span>}
      </div>
      <span className="text-xs text-slate-400 text-right">{highlight.detail}</span>
    </div>
  );
}
