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
            className="fixed inset-0 z-40 bg-[#111]/35"
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
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col overflow-y-auto border-l-[3px] border-[#111] bg-white sm:w-[540px]"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34, mass: 0.8 }}
          >
            <div className="h-4 w-full shrink-0 border-b-[3px] border-[#111]" style={{ backgroundColor: accent }} />
            <div className="flex justify-end px-6 pt-5">
              <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="box-sm press grid h-11 w-11 place-items-center bg-[#FFD43B]">
                <Icon name="x" className="h-5 w-5" />
              </button>
            </div>

            <div className="px-8 pb-14 sm:px-10">
              <p className="font-bold text-[var(--muted)]">{modal.company}</p>
              <h2 id="drawer-title" className="mt-1 text-[38px] font-extrabold leading-none tracking-[-0.04em]">
                {modal.role}
              </h2>
              <p className="mt-4 inline-block rounded-full border-2 border-[#111] px-3 py-1 text-sm font-semibold">
                {modal.period}
                {modal.location ? `, ${modal.location}` : ""}
              </p>

              <p className="mt-7 text-lg font-semibold leading-relaxed">{modal.summary}</p>

              <ul className="mt-6 space-y-3.5">
                {modal.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-base leading-relaxed text-[var(--body)]">
                    <span
                      aria-hidden="true"
                      className="mt-[0.35em] h-3 w-3 shrink-0 rounded-[4px] border-2 border-[#111]"
                      style={{ backgroundColor: accent }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>

              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Stack">
                {modal.stack.map((tag) => (
                  <li key={tag} className="rounded-full border-2 border-[#111] bg-white px-3 py-1 text-[13px] font-semibold">
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
