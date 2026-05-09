import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HighlightDrawer({ modal, onClose, glowColor }) {
  const accent = glowColor ? `rgba(${glowColor}, 1)` : "#94a3b8";
  const accentSoft = glowColor ? `rgba(${glowColor}, 0.15)` : "transparent";
  useEffect(() => {
    if (!modal) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modal, onClose]);

  return (
    <AnimatePresence>
      {modal && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/20 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            className="fixed inset-y-0 right-0 w-full lg:w-[520px] z-50 bg-white shadow-2xl flex flex-col overflow-y-auto"
            style={{ borderLeft: `2px solid ${accent}` }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.8 }}
          >
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-700 transition-colors text-xl leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Header */}
            <div className="px-8 pt-2 pb-4">
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: accent }}>{modal.company}</p>
              <h2 className="text-2xl font-black text-slate-950">{modal.role}</h2>
              <p className="text-sm text-slate-400 mt-1">{modal.period} · {modal.location}</p>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 mx-8" />

            {/* Summary */}
            <p className="px-8 py-4 text-sm text-slate-600 leading-7 italic">{modal.summary}</p>

            {/* Bullets */}
            <div className="px-8 py-2">
              <p className="text-xs uppercase tracking-widest text-slate-300 mb-3">What I did</p>
              <div className="flex flex-col gap-3">
                {modal.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
                    <span className="text-sm text-slate-600 leading-6">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack */}
            <div className="px-8 py-4">
              <p className="text-xs uppercase tracking-widest text-slate-300 mb-3">Stack</p>
              <div className="flex flex-wrap gap-2">
                {modal.stack.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs border border-slate-200 rounded-full px-3 py-1 text-slate-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
