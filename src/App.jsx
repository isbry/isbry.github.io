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

function Logo() {
  // A 2x2 plate seen from above, in four of the cube colours.
  const colors = [bricks.red.hex, bricks.blue.hex, bricks.yellow.hex, bricks.green.hex];
  return (
    <span aria-hidden="true" className="grid h-9 w-9 grid-cols-2 gap-[3px] rounded-[9px] bg-[#05131d] p-[4px]">
      {colors.map((c) => (
        <span key={c} className="flex items-center justify-center rounded-[4px]" style={{ backgroundColor: c, color: c }}>
          <span className="stud block h-[60%] w-[60%]" />
        </span>
      ))}
    </span>
  );
}

// A tiny 3x3 face in the facet's colour, used next to section titles and in the nav.
function FaceMark({ brick, size = "h-5 w-5" }) {
  const b = bricks[brick];
  return (
    <span aria-hidden="true" className={`grid shrink-0 grid-cols-3 gap-[1.5px] rounded-[4px] bg-[#05131d] p-[2px] ${size}`}>
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} className="rounded-[1px]" style={{ backgroundColor: b.hex }} />
      ))}
    </span>
  );
}

function SidesNav({ active, onSelect }) {
  return (
    <nav aria-label="Sides of me" className="w-full max-w-[400px]">
      <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
        {facets.map((facet, index) => {
          const current = index === active;
          return (
            <li key={facet.id}>
              <a
                href={`#${facet.id}`}
                aria-current={current ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(index);
                }}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[15px] leading-tight transition-colors ${
                  current ? "bg-white font-semibold text-[var(--ink)] shadow-[0_1px_0_rgba(5,19,29,0.08)]" : "text-[var(--muted)] hover:bg-white/60 hover:text-[var(--ink)]"
                }`}
              >
                <FaceMark brick={facet.brick} size="h-[18px] w-[18px]" />
                {facet.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function FacetSection({ facet, dimmed, onOpen }) {
  const brick = bricks[facet.brick];
  return (
    <section
      id={facet.id}
      aria-labelledby={`${facet.id}-title`}
      className={`scroll-mt-20 border-t-2 pb-20 pt-8 transition-opacity duration-500 lg:min-h-[66vh] ${dimmed ? "opacity-50 lg:opacity-40" : "opacity-100"}`}
      style={{ borderColor: brick.accent }}
    >
      <header className="flex items-center gap-3">
        <FaceMark brick={facet.brick} />
        <h2 id={`${facet.id}-title`} className="text-2xl font-bold leading-tight tracking-tight">
          {facet.title}
        </h2>
      </header>
      <p className="mt-1 text-[17px] text-[var(--muted)]">{facet.subtitle}</p>

      <div className="mt-8 flex items-start gap-5">
        {facet.photo && (
          <img
            src={facet.photo}
            alt="Brayan Caicedo"
            width="112"
            height="112"
            loading="lazy"
            className="h-24 w-24 shrink-0 rounded-2xl object-cover sm:h-28 sm:w-28"
            style={{ boxShadow: `0 0 0 4px ${brick.accent}` }}
          />
        )}
        <p className="text-[21px] font-semibold leading-snug tracking-tight sm:text-[23px]">{facet.intro}</p>
      </div>

      <div className="mt-6 max-w-[64ch] space-y-4">
        {facet.body.split("\n\n").map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="text-[17px] leading-[1.65] text-[#26323c]">
            {paragraph}
          </p>
        ))}
      </div>

      {facet.highlights?.length > 0 && (
        <ul className="mt-8 border-b border-[var(--line)]">
          {facet.highlights.map((h) => (
            <HighlightRow key={h.label} highlight={h} onOpen={(modal) => onOpen({ ...modal, accent: brick.accent })} accent={brick.accent} />
          ))}
        </ul>
      )}

      {facet.tags && (
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Keywords">
          {facet.tags.map((tag) => (
            <li key={tag} className="rounded-md border border-[var(--line)] bg-white/70 px-2.5 py-1 text-sm text-[#26323c]">
              {tag}
            </li>
          ))}
        </ul>
      )}

      {facet.links?.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {facet.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="inline-flex items-center gap-2 rounded-full border border-[#05131d] px-4 py-2 text-[15px] font-medium transition-colors hover:bg-[#05131d] hover:text-white"
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
    <section id="work" aria-labelledby="work-title" className="mx-auto w-full max-w-[1240px] px-6 pb-20 lg:px-10">
      <div className="rounded-[28px] bg-white px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <h2 id="work-title" className="text-[34px] font-bold leading-tight tracking-tight sm:text-[44px]">
          Things I've built
        </h2>
        <p className="mt-2 max-w-[56ch] text-lg text-[var(--muted)]">
          Recent work and research, in plain words. The numbers are in my CV.
        </p>

        <div className="mt-12 grid gap-x-14 gap-y-12 md:grid-cols-2">
          {work.map((item) => (
            <article key={item.id} className="border-t-2 border-[#05131d] pt-6">
              <h3 className="text-2xl font-bold tracking-tight">{item.name}</h3>
              <p className="mt-1 text-[15px] text-[var(--muted)]">{item.context}</p>
              <p className="mt-4 max-w-[60ch] text-[17px] leading-[1.65] text-[#26323c]">{item.summary}</p>
              <p className="mt-4 text-[15px] text-[var(--muted)]">{item.stack.join(", ")}</p>
              {item.link && (
                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold underline decoration-2 underline-offset-4 hover:decoration-[#F2CD37]"
                >
                  {item.link.label}
                  <Icon name="external" className="h-4 w-4" />
                </a>
              )}
            </article>
          ))}
        </div>
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
      <header className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 py-5 lg:px-10">
        <a href="/" className="flex items-center gap-3 rounded-lg">
          <Logo />
          <span className="text-[17px] font-semibold tracking-tight">Brayan Caicedo</span>
        </a>
        <nav aria-label="Main" className="flex items-center gap-1 text-[15px] sm:gap-2">
          <a href="#work" className="hidden rounded-full px-3 py-2 text-[var(--muted)] hover:text-[var(--ink)] sm:inline-block">
            Work
          </a>
          <a href="#contact" className="hidden rounded-full px-3 py-2 text-[var(--muted)] hover:text-[var(--ink)] sm:inline-block">
            Contact
          </a>
          <a
            href={CV}
            download="Brayan_Caicedo_CV.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-[#05131d] px-4 py-2 font-medium text-white transition-colors hover:bg-[#0055BF]"
          >
            <Icon name="download" className="h-4 w-4" />
            CV
          </a>
        </nav>
      </header>

      <main className="mx-auto grid w-full max-w-[1240px] gap-x-14 px-6 [grid-template-areas:'intro'_'cube'_'sides'] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-10 lg:[grid-template-areas:'cube_intro'_'cube_sides']">
        <section aria-labelledby="name" className="pb-10 pt-6 [grid-area:intro] lg:pb-24 lg:pt-16">
          <h1 id="name" className="text-[56px] font-extrabold leading-[0.92] tracking-[-0.035em] sm:text-[84px] xl:text-[96px]">
            Brayan
            <br />
            Caicedo
          </h1>
          <p className="mt-6 max-w-[34ch] text-[22px] font-medium leading-snug tracking-tight sm:text-[26px]">
            Platform engineer. I build and run the infrastructure AI products depend on, from Kubernetes clusters to GPU fleets.
          </p>
          <p className="mt-4 max-w-[52ch] text-base text-[var(--muted)]">
            Based in Canterbury, UK. Eligible for the UK Graduate visa, no sponsorship required.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={CV}
              download="Brayan_Caicedo_CV.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-[#05131d] px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0055BF]"
            >
              <Icon name="download" className="h-[18px] w-[18px]" />
              Download CV
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#05131d] bg-white/60 px-5 py-3 text-base font-semibold transition-colors hover:bg-white"
            >
              <Icon name="mail" className="h-[18px] w-[18px]" />
              Email me
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full p-3 text-[var(--muted)] transition-colors hover:bg-white/70 hover:text-[var(--ink)]">
              <Icon name="linkedin" className="h-5 w-5" />
            </a>
            <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-full p-3 text-[var(--muted)] transition-colors hover:bg-white/70 hover:text-[var(--ink)]">
              <Icon name="github" className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-12 hidden text-[15px] text-[var(--muted)] lg:block">
            Scroll and the cube turns with you. Each face is a different side of me.
          </p>
        </section>

        <div className="[grid-area:cube] lg:sticky lg:top-0 lg:h-screen lg:self-start">
          <div className="flex h-full flex-col items-center justify-center gap-6 pb-10 lg:pb-0">
            <div ref={heroCubeRef} className="cube-float">
              <Cube
                rotateX={rotateX}
                rotateY={rotateY}
                activeIndex={active}
                onSelectFace={goTo}
                sizeClass="[--s:200px] sm:[--s:250px] lg:[--s:270px] xl:[--s:300px]"
              />
            </div>
            <SidesNav active={active} onSelect={goTo} />
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
        className={`pointer-events-none fixed bottom-4 right-4 z-30 rounded-2xl bg-white/90 p-1 shadow-lg backdrop-blur transition-all duration-300 lg:hidden ${
          showMini ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <Cube rotateX={rotateX} rotateY={rotateY} activeIndex={active} sizeClass="[--s:44px]" shadow={false} />
      </div>

      <WorkSection />

      <footer id="contact" className="mx-auto w-full max-w-[1240px] px-6 pb-12 lg:px-10">
        <div className="rounded-[28px] bg-[#05131d] px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
          <h2 className="max-w-[22ch] text-[34px] font-bold leading-tight tracking-tight sm:text-[44px]">
            Open to platform and AI infrastructure roles in the UK.
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg text-white/70">Email is the quickest way to reach me.</p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-8 inline-block break-all text-[22px] font-semibold underline decoration-[#F2CD37] decoration-2 underline-offset-[6px] sm:text-[30px]"
          >
            {EMAIL}
          </a>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-base text-white/80">
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white">
              <Icon name="linkedin" className="h-4 w-4" /> LinkedIn
            </a>
            <a href={GITHUB} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white">
              <Icon name="github" className="h-4 w-4" /> GitHub
            </a>
            <a href={CV} download="Brayan_Caicedo_CV.pdf" className="inline-flex items-center gap-2 hover:text-white">
              <Icon name="download" className="h-4 w-4" /> CV (PDF)
            </a>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-[var(--muted)]">© {year} Brayan Caicedo</p>
      </footer>

      <HighlightDrawer modal={modal} onClose={closeModal} accent={modal?.accent} />
    </div>
  );
}
