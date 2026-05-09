import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { facets } from "../data/facets.js";
import Icon from "./ui/Icon.jsx";

export default function Nav({ activeIndex, scrollToSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-6 lg:px-10" aria-label="Main navigation">
      {/* Logo */}
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        className="flex items-center gap-3 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-4"
      >
        <span className="grid h-10 w-10 grid-cols-2 grid-rows-2 gap-1 rounded-xl bg-slate-950 p-1 shadow-lg" aria-hidden="true">
          <span className="rounded bg-red-500" />
          <span className="rounded bg-blue-500" />
          <span className="rounded bg-yellow-400" />
          <span className="rounded bg-green-500" />
        </span>
        <span>
          <span className="block text-sm font-bold leading-none">Brayan Caicedo</span>
          <span className="block text-xs text-slate-500">DevOps Engineer</span>
        </span>
      </a>

      {/* Desktop nav */}
      <div className="hidden items-center gap-1 md:flex">
        {facets.map((facet, i) => (
          <button
            key={facet.id}
            type="button"
            onClick={() => scrollToSection(i)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
              activeIndex === i
                ? "font-bold text-slate-950"
                : "font-normal text-slate-500 hover:text-slate-950 hover:bg-slate-100"
            }`}
          >
            <span
              className={`rounded-full transition-all duration-200 ${facet.dotColor} ${
                activeIndex === i ? "h-2 w-2" : "h-1.5 w-1.5"
              }`}
            />
            {facet.title}
          </button>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        type="button"
        className="flex items-center justify-center rounded-xl p-2 text-slate-600 hover:bg-slate-100 md:hidden"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        <Icon name="menu" className="h-5 w-5" />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur"
          >
            <div className="flex h-full flex-col px-6 py-6">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl p-2 text-slate-600 hover:bg-slate-100"
                  aria-label="Close menu"
                >
                  <Icon name="x" className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-8 flex flex-col gap-2">
                {facets.map((facet, i) => (
                  <button
                    key={facet.id}
                    type="button"
                    onClick={() => { scrollToSection(i); setMenuOpen(false); }}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-base transition-all ${
                      activeIndex === i
                        ? "bg-slate-100 font-bold text-slate-950"
                        : "font-normal text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className={`rounded-full transition-all duration-200 ${facet.dotColor} ${activeIndex === i ? "h-3 w-3" : "h-2 w-2"}`} />
                    {facet.title}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
