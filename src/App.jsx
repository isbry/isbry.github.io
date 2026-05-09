import { useState, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { facets } from "./data/facets.js";
import Cube from "./components/cube/Cube.jsx";
import Icon from "./components/ui/Icon.jsx";
import HighlightRow from "./components/highlights/HighlightRow.jsx";
import HighlightDrawer from "./components/highlights/HighlightDrawer.jsx";

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openModal, setOpenModal] = useState(null);
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const active = facets[activeIndex];

  const handleSelectFace = useCallback((indexOrUpdater) => {
    setActiveIndex(indexOrUpdater);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-950 relative overflow-x-hidden">

      {/* Ambient glow — left */}
      <div
        className="pointer-events-none fixed left-0 top-0 h-full w-40 transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at left center, rgba(${active.glowColor}, 0.18) 0%, transparent 70%)`,
        }}
      />
      {/* Ambient glow — right */}
      <div
        className="pointer-events-none fixed right-0 top-0 h-full w-40 transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at right center, rgba(${active.glowColor}, 0.18) 0%, transparent 70%)`,
        }}
      />
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 lg:px-12 border-b border-slate-100">
        <span className="text-sm font-semibold tracking-widest text-slate-400 uppercase">Brayan Caicedo</span>
        <div className="flex gap-5 text-sm text-slate-400">
          <a href="https://www.linkedin.com/in/imbry/" target="_blank" rel="noreferrer"
            className="hover:text-slate-950 transition-colors">LinkedIn</a>
          <a href="https://github.com/isbry" target="_blank" rel="noreferrer"
            className="hover:text-slate-950 transition-colors">GitHub</a>
          <a href="mailto:Brayancc9912@gmail.com"
            className="hover:text-slate-950 transition-colors">Email</a>
        </div>
      </header>

      <main className="flex-1 grid lg:grid-cols-[480px_1fr] max-w-6xl mx-auto w-full px-6 lg:px-10 py-12 gap-8 items-start">

        {/* Left col */}
        <div className="flex flex-col items-center lg:sticky lg:top-8 gap-6">

          {/* Header text — constrained to cube width */}
          <div className="text-center space-y-2" style={{ width: "420px" }}>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 leading-tight">
              Six faces. One person.
            </h1>

            {/* Dynamic subtitle only */}
            <AnimatePresence mode="wait">
              <motion.p
                key={active.id + "-subtitle"}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="text-xs text-slate-400 italic"
              >
                "{active.subtitle}"
              </motion.p>
            </AnimatePresence>
          </div>

          <Cube activeIndex={activeIndex} onSelectFace={handleSelectFace} />

          {/* Face dots — mt-0 because gap-6 on parent handles spacing */}
          <div className="flex gap-3" aria-label="Cube faces">
            {facets.map((facet, index) => (
              <button
                key={facet.id}
                type="button"
                aria-label={`Show ${facet.title}`}
                aria-pressed={activeIndex === index}
                onClick={() => setActiveIndex(index)}
                className={`h-5 w-5 rounded-sm border border-black/10 transition-transform hover:scale-125 ${facet.color} ${
                  activeIndex === index ? "ring-2 ring-offset-2 ring-slate-900 scale-125" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right col — facet content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-8"
          >
            {/* Facet header */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-sm ${active.color}`} />
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {active.title}
                </span>
              </div>
              <p className="text-xl font-bold text-slate-950 leading-snug">
                {active.intro}
              </p>
            </div>

            {/* Body */}
            <div className="space-y-4">
              {active.body.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-slate-600 leading-7 text-sm">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Highlights */}
            {active.highlights && active.highlights.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-300">Highlights</p>
                <div className="flex flex-col gap-1.5">
                  {active.highlights.map((h) => (
                    <HighlightRow key={h.label} highlight={h} onOpen={setOpenModal} glowColor={active.glowColor} />
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {active.tags && (
              <div className="flex flex-wrap gap-2">
                {active.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Links */}
            {active.links && active.links.length > 0 && (
              <div className="flex gap-3">
                {active.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:border-slate-400 transition-colors"
                  >
                    <Icon name={link.icon} className="h-3.5 w-3.5" />
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-slate-100 text-center px-6 py-5 text-xs text-slate-300">
        © {currentYear} Brayan Caicedo · Designed around curiosity, systems, and cubes.
      </footer>

      <HighlightDrawer modal={openModal} onClose={() => setOpenModal(null)} glowColor={active.glowColor} />
    </div>
  );
}
