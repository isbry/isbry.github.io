import { motion } from "framer-motion";
import { facets } from "../data/facets.js";
import Cube from "../components/cube/Cube.jsx";
import FacetCard from "../components/cube/FacetCard.jsx";
import Button from "../components/ui/Button.jsx";
import Icon from "../components/ui/Icon.jsx";

export default function Hero({ activeIndex, setActiveIndex, scrollToSection }) {
  const active = facets[activeIndex] || facets[0];

  return (
    <section
      id="home"
      className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-8 px-6 lg:px-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-8"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
          <Icon name="trophy" className="h-4 w-4 text-amber-500" />
          Solving systems, one layer at a time
        </div>

        <div className="space-y-5">
          <h1 className="max-w-3xl text-5xl font-black tracking-tight text-slate-950 md:text-6xl lg:text-7xl leading-[1.05]">
            I build reliable platforms with the mindset of a cube solver.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            I'm Brayan Caicedo, a DevOps Engineer focused on cloud infrastructure,
            automation, Kubernetes, and developer experience. This site is my personal
            cube: each face reveals a different part of who I am.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => setActiveIndex((i) => (i + 1) % facets.length)}
          >
            Explore my cube
          </Button>
          <Button
            as="a"
            variant="outline"
            href="https://www.linkedin.com/in/imbry/"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="linkedin" className="mr-2 h-4 w-4" /> LinkedIn
          </Button>
          <Button
            as="a"
            variant="outline"
            href="https://github.com/imbry"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="github" className="mr-2 h-4 w-4" /> GitHub
          </Button>
        </div>
      </motion.div>

      <div className="space-y-6">
        <Cube activeIndex={activeIndex} onSelectFace={setActiveIndex} scrollToSection={scrollToSection} />
        <FacetCard facet={active} isActive />

        {/* Face selector dots */}
        <div className="grid grid-cols-6 gap-3" aria-label="Cube faces">
          {facets.map((facet, index) => (
            <button
              key={facet.id}
              type="button"
              aria-label={`Show ${facet.title}`}
              aria-pressed={activeIndex === index}
              onClick={() => { setActiveIndex(index); scrollToSection(index); }}
              className={`flex h-14 items-center justify-center rounded-2xl border bg-white shadow-sm outline-none transition hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-4 ${
                activeIndex === index
                  ? "border-slate-900 ring-2 ring-slate-900/10"
                  : "border-slate-200"
              }`}
            >
              <span
                className={`block h-5 w-5 rounded-md border border-black/5 ${facet.color}`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
