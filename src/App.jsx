import { useState, useCallback, useEffect, useRef } from "react";
import { useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { facets, bricks, cubeStops } from "./data/facets.js";
import { work } from "./data/work.js";
import Cube from "./components/cube/Cube.jsx";
import Icon from "./components/ui/Icon.jsx";
import HighlightRow from "./components/highlights/HighlightRow.jsx";
import HighlightDrawer from "./components/highlights/HighlightDrawer.jsx";

const EMAIL = "brayancc9912@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/imbry/";
const GITHUB = "https://github.com/isbry";
const CV = "/Brayan_Caicedo_CV.pdf";

// The cube starts scrambled and settles on the first face once the page loads.
const SCRAMBLED = { x: -200, y: 250 };
const SPRING = { stiffness: 70, damping: 18, mass: 1 };
const TILT = { stiffness: 120, damping: 20 };

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const smooth = (t) => t * t * (3 - 2 * t);

// Turns the scroll position into a cube rotation. Each facet section has a stop;
// while a section is in the reading zone the cube rests on its face, and as the
// next section's top crosses the middle of the screen the cube turns towards it.
function useCubeScroll() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const targetX = useMotionValue(SCRAMBLED.x);
  const targetY = useMotionValue(SCRAMBLED.y);
  const springX = useSpring(targetX, SPRING);
  const springY = useSpring(targetY, SPRING);
  const tiltX = useSpring(0, TILT);
  const tiltY = useSpring(0, TILT);
  const rotateX = useTransform([springX, tiltX], ([a, b]) => a + b);
  const rotateY = useTransform([springY, tiltY], ([a, b]) => a + b);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const anchor = window.innerHeight * 0.42;
      const band = Math.min(160, window.innerHeight * 0.18);
      let f = 0;
      for (let i = 1; i < facets.length; i++) {
        const el = document.getElementById(facets[i].id);
        if (!el) continue;
        f += clamp((anchor - el.getBoundingClientRect().top + band) / (2 * band), 0, 1);
      }
      const i = Math.min(Math.floor(f), facets.length - 1);
      const next = Math.min(i + 1, facets.length - 1);
      const t = smooth(f - i);
      const x = cubeStops[i].x + (cubeStops[next].x - cubeStops[i].x) * t;
      const y = cubeStops[i].y + (cubeStops[next].y - cubeStops[i].y) * t;
      targetX.set(x);
      targetY.set(y);
      if (reduce) {
        springX.jump(x);
        springY.jump(y);
      }
      setActive(Math.round(f));
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    // Give the page a beat before the cube unscrambles.
    const intro = setTimeout(update, reduce ? 0 : 250);

    const onPointer = (e) => {
      if (reduce || e.pointerType !== "mouse") return;
      tiltY.set(((e.clientX / window.innerWidth) * 2 - 1) * 9);
      tiltX.set(-((e.clientY / window.innerHeight) * 2 - 1) * 6);
    };
    const onLeave = () => {
      tiltX.set(0);
      tiltY.set(0);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      clearTimeout(intro);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, targetX, targetY, springX, springY, tiltX, tiltY]);

  const goTo = useCallback(
    (index) => {
      document.getElementById(facets[index].id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    },
    [reduce]
  );

  return { active, rotateX, rotateY, goTo };
}

function Dot({ brick, className = "h-2.5 w-2.5" }) {
  const b = bricks[brick];
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 rounded-full ${className}`}
      style={{ backgroundColor: b.hex, boxShadow: brick === "white" ? "inset 0 0 0 1px #c9cdd3" : "none" }}
    />
  );
}

// Six colour dots under the cube, one per face. The current face's name sits underneath.
function SidesNav({ active, onSelect }) {
  return (
    <nav aria-label="Sides of me" className="flex flex-col items-center gap-3">
      <ul className="flex items-center gap-3">
        {facets.map((facet, index) => {
          const current = index === active;
          return (
            <li key={facet.id}>
              <a
                href={`#${facet.id}`}
                aria-label={facet.title}
                aria-current={current ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(index);
                }}
                className="group flex h-7 w-7 items-center justify-center rounded-full"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${current ? "h-3.5 w-3.5" : "h-2.5 w-2.5 opacity-50 group-hover:opacity-100"}`}
                  style={{
                    backgroundColor: bricks[facet.brick].hex,
                    boxShadow: current
                      ? `0 0 0 3px var(--canvas), 0 0 0 4.5px ${bricks[facet.brick].accent}`
                      : facet.brick === "white"
                        ? "inset 0 0 0 1px #c9cdd3"
                        : "none",
                  }}
                />
              </a>
            </li>
          );
        })}
      </ul>
      <p className="text-center text-sm leading-snug" aria-live="polite">
        <span className="font-medium text-[var(--ink)]">{facets[active].title}</span>
        <span className="block text-[var(--muted)]">{facets[active].subtitle}</span>
      </p>
    </nav>
  );
}

function FacetSection({ facet, dimmed, onOpen }) {
  const brick = bricks[facet.brick];
  return (
    <section
      id={facet.id}
      aria-labelledby={`${facet.id}-title`}
      className={`scroll-mt-16 py-16 transition-opacity duration-700 lg:min-h-[72vh] lg:py-20 ${dimmed ? "opacity-40" : "opacity-100"}`}
    >
      <h2 id={`${facet.id}-title`} className="flex items-center gap-2.5 text-[15px] font-medium text-[var(--muted)]">
        <Dot brick={facet.brick} />
        {facet.title}
      </h2>

      <div className="mt-6 flex items-start gap-6">
        {facet.photo && (
          <img
            src={facet.photo}
            alt="Brayan Caicedo"
            width="96"
            height="96"
            loading="lazy"
            className="mt-1 h-20 w-20 shrink-0 rounded-full object-cover sm:h-24 sm:w-24"
          />
        )}
        <p className="font-serif text-[32px] leading-[1.12] tracking-[-0.01em] sm:text-[40px]">{facet.intro}</p>
      </div>

      <div className="mt-8 max-w-[62ch] space-y-5">
        {facet.body.split("\n\n").map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="text-[17px] leading-[1.7] text-[var(--body)]">
            {paragraph}
          </p>
        ))}
      </div>

      {facet.highlights?.length > 0 && (
        <ul className="mt-10 border-b border-[var(--line)]">
          {facet.highlights.map((h) => (
            <HighlightRow key={h.label} highlight={h} onOpen={(modal) => onOpen({ ...modal, accent: brick.accent })} accent={brick.accent} />
          ))}
        </ul>
      )}

      {facet.tags && (
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Keywords">
          {facet.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-white px-3 py-1 text-[13px] text-[var(--body)] ring-1 ring-[var(--line)]">
              {tag}
            </li>
          ))}
        </ul>
      )}

      {facet.links?.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {facet.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[15px] font-medium ring-1 ring-[var(--line)] transition-shadow hover:ring-[var(--ink)]"
            >
              <Icon name={link.icon} className="h-4 w-4" />
              {link.label}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto w-full max-w-[1200px] px-6 py-24 lg:px-10 lg:py-32">
      <h2 id="work-title" className="font-serif text-[44px] leading-none tracking-[-0.01em] sm:text-[60px]">
        Things I've built
      </h2>
      <p className="mt-4 max-w-[52ch] text-[17px] text-[var(--muted)]">Recent work and research, in plain words. The numbers are in my CV.</p>

      <div className="mt-14 grid gap-x-16 gap-y-14 md:grid-cols-2">
        {work.map((item) => (
          <article key={item.id} className="border-t border-[var(--line)] pt-7">
            <h3 className="font-serif text-[30px] leading-tight">{item.name}</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">{item.context}</p>
            <p className="mt-4 max-w-[58ch] text-[16px] leading-[1.7] text-[var(--body)]">{item.summary}</p>
            <p className="mt-4 text-sm text-[var(--muted)]">{item.stack.join(", ")}</p>
            {item.link && (
              <a
                href={item.link.href}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium underline decoration-[var(--line)] decoration-2 underline-offset-[5px] transition-colors hover:decoration-[var(--ink)]"
              >
                {item.link.label}
                <Icon name="external" className="h-3.5 w-3.5" />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const { active, rotateX, rotateY, goTo } = useCubeScroll();
  const [modal, setModal] = useState(null);
  const [ready, setReady] = useState(false);
  const [showMini, setShowMini] = useState(false);
  const heroCubeRef = useRef(null);
  const sidesRef = useRef(null);
  const year = new Date().getFullYear();
  const closeModal = useCallback(() => setModal(null), []);

  // Sections only dim once the script is running, so the prerendered page reads normally.
  useEffect(() => setReady(true), []);

  // On small screens the big cube scrolls away, so a small one follows you
  // in the corner while you're reading the sections.
  useEffect(() => {
    const cube = heroCubeRef.current;
    const sides = sidesRef.current;
    if (!cube || !sides) return undefined;
    const state = { cubeVisible: true, sidesVisible: false };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === cube) state.cubeVisible = e.isIntersecting;
        if (e.target === sides) state.sidesVisible = e.isIntersecting;
      });
      setShowMini(!state.cubeVisible && state.sidesVisible);
    });
    io.observe(cube);
    io.observe(sides);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <header className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-6 lg:px-10">
        <a href="/" className="font-serif text-[24px] leading-none">
          Brayan Caicedo
        </a>
        <nav aria-label="Main" className="flex items-center gap-1 text-[15px] sm:gap-2">
          <a href="#work" className="hidden rounded-full px-3 py-2 text-[var(--muted)] transition-colors hover:text-[var(--ink)] sm:inline-block">
            Work
          </a>
          <a href="#contact" className="hidden rounded-full px-3 py-2 text-[var(--muted)] transition-colors hover:text-[var(--ink)] sm:inline-block">
            Contact
          </a>
          <a
            href={CV}
            download="Brayan_Caicedo_CV.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-medium ring-1 ring-[var(--line)] transition-shadow hover:ring-[var(--ink)]"
          >
            <Icon name="download" className="h-4 w-4" />
            CV
          </a>
        </nav>
      </header>

      <main className="mx-auto grid w-full max-w-[1200px] gap-x-16 px-6 [grid-template-areas:'intro'_'cube'_'sides'] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-10 lg:[grid-template-areas:'cube_intro'_'cube_sides']">
        <section aria-labelledby="name" className="pb-6 pt-10 [grid-area:intro] lg:pb-20 lg:pt-24">
          <h1 id="name" className="font-serif text-[64px] leading-[0.95] tracking-[-0.02em] sm:text-[88px] xl:text-[104px]">
            Brayan Caicedo
          </h1>
          <p className="mt-7 max-w-[36ch] text-[20px] leading-[1.5] text-[var(--ink)] sm:text-[22px]">
            Platform engineer. I build and run the infrastructure AI products depend on, from Kubernetes clusters to GPU fleets.
          </p>
          <p className="mt-4 max-w-[52ch] text-[15px] text-[var(--muted)]">
            Based in Canterbury, UK. Eligible for the UK Graduate visa, no sponsorship required.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={CV}
              download="Brayan_Caicedo_CV.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-85"
            >
              <Icon name="download" className="h-4 w-4" />
              Download CV
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[15px] font-medium ring-1 ring-[var(--line)] transition-shadow hover:ring-[var(--ink)]"
            >
              <Icon name="mail" className="h-4 w-4" />
              Email me
            </a>
            <span className="ml-1 flex items-center gap-1">
              <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full p-2.5 text-[var(--muted)] transition-colors hover:text-[var(--ink)]">
                <Icon name="linkedin" className="h-[18px] w-[18px]" />
              </a>
              <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-full p-2.5 text-[var(--muted)] transition-colors hover:text-[var(--ink)]">
                <Icon name="github" className="h-[18px] w-[18px]" />
              </a>
            </span>
          </div>
        </section>

        <div className="[grid-area:cube] lg:sticky lg:top-0 lg:h-screen lg:self-start">
          <div className="relative flex h-full flex-col items-center justify-center gap-4 pb-6 lg:pb-0">
            {/* Soft light behind the cube, in the colour of the face you're reading.
                One layer per face, cross-faded, because gradients can't be transitioned. */}
            {facets.map((facet, index) => (
              <div
                key={facet.id}
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-[56%] transition-opacity duration-700 sm:h-[640px] sm:w-[640px]"
                style={{
                  opacity: index === active ? 1 : 0,
                  background: `radial-gradient(closest-side, color-mix(in srgb, ${bricks[facet.brick].hex} ${facet.brick === "white" ? 0 : 22}%, transparent), transparent)`,
                }}
              />
            ))}
            <div ref={heroCubeRef} className="cube-float relative">
              <Cube rotateX={rotateX} rotateY={rotateY} onSelectFace={goTo} sizeClass="[--s:190px] sm:[--s:230px] lg:[--s:250px] xl:[--s:270px]" />
            </div>
            <div className="relative">
              <SidesNav active={active} onSelect={goTo} />
            </div>
          </div>
        </div>

        <div ref={sidesRef} className="[grid-area:sides]">
          {facets.map((facet, index) => (
            <FacetSection key={facet.id} facet={facet} dimmed={ready && index !== active} onOpen={setModal} />
          ))}
        </div>
      </main>

      <div
        aria-hidden="true"
        className={`pointer-events-none fixed bottom-3 right-3 z-30 drop-shadow-lg transition-all duration-500 lg:hidden ${
          showMini ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <Cube rotateX={rotateX} rotateY={rotateY} sizeClass="[--s:40px]" shadow={false} />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-10">
        <div className="border-t border-[var(--line)]" />
      </div>

      <WorkSection />

      <footer id="contact" className="mx-auto w-full max-w-[1200px] px-6 pb-14 lg:px-10">
        <div className="border-t border-[var(--line)] pt-20 lg:pt-28">
          <h2 className="max-w-[18ch] font-serif text-[44px] leading-[1.02] tracking-[-0.01em] sm:text-[64px]">
            Open to platform and AI infrastructure roles in the UK.
          </h2>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-10 inline-block break-all text-[20px] font-medium underline decoration-[var(--line)] decoration-2 underline-offset-[8px] transition-colors hover:decoration-[var(--ink)] sm:text-[24px]"
          >
            {EMAIL}
          </a>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 text-sm text-[var(--muted)]">
            <p>© {year} Brayan Caicedo</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href={LINKEDIN} target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--ink)]">
                LinkedIn
              </a>
              <a href={GITHUB} target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--ink)]">
                GitHub
              </a>
              <a href={CV} download="Brayan_Caicedo_CV.pdf" className="transition-colors hover:text-[var(--ink)]">
                CV (PDF)
              </a>
            </div>
          </div>
        </div>
      </footer>

      <HighlightDrawer modal={modal} onClose={closeModal} accent={modal?.accent} />
    </div>
  );
}
