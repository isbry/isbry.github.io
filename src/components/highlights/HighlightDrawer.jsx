import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Icon from "../ui/Icon.jsx";

export default function HighlightDrawer({ modal, onClose, accent }) {
  const closeRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!modal) return undefined;
    const previous = document.activeElement;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [modal, onClose]);

  return (
    <AnimatePresence>
      {modal && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-[#111317]/20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col overflow-y-auto bg-[var(--canvas)] shadow-2xl sm:w-[540px]"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34, mass: 0.8 }}
          >
            <div className="h-1 w-full shrink-0" style={{ backgroundColor: accent }} />
            <div className="flex justify-end px-5 pt-4">
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-[var(--muted)] transition-colors hover:bg-white hover:text-[var(--ink)]"
                aria-label="Close"
              >
                <Icon name="x" className="h-5 w-5" />
              </button>
            </div>

            <div className="px-8 pb-12 sm:px-10">
              <p className="text-base font-medium text-[var(--muted)]">{modal.company}</p>
              <h2 id="drawer-title" className="mt-1 font-serif text-[40px] leading-[1.05]">
                {modal.role}
              </h2>
              <p className="mt-2 text-[15px] text-[var(--muted)]">
                {modal.period}
                {modal.location ? `, ${modal.location}` : ""}
              </p>

              <p className="mt-8 text-[18px] leading-relaxed text-[var(--ink)]">{modal.summary}</p>

              <ul className="mt-8 space-y-4">
                {modal.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-base leading-relaxed text-[var(--body)]">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 text-sm font-medium text-[var(--muted)]">Stack</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {modal.stack.map((tag) => (
                  <li key={tag} className="rounded-full bg-white px-3 py-1 text-[13px] text-[var(--body)] ring-1 ring-[var(--line)]">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
