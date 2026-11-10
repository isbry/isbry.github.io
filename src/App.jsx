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

const BANDS = ["#3B78F5", "#22B573", "#FF8A34", "#FFD43B"];

// Six colour keys under the cube, one per face. The current one is pressed in.
function SideKeys({ active, onSelect }) {
  return (
    <nav aria-label="Sides of me">
      <ul className="grid grid-cols-6 gap-2.5">
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
                className={`block h-10 w-10 rounded-xl border-[3px] border-[#111] transition-[transform,box-shadow] duration-100 sm:h-11 sm:w-11 ${
                  current ? "translate-x-1 translate-y-1 shadow-none" : "shadow-[4px_4px_0_#111] hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_#111]"
                }`}
                style={{ backgroundColor: bricks[facet.brick].hex }}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function FacetCard({ facet, dimmed, onOpen }) {
  const brick = bricks[facet.brick];
  return (
    <section
      id={facet.id}
      aria-labelledby={`${facet.id}-title`}
      className={`box scroll-mt-8 overflow-hidden bg-white transition-[opacity,transform] duration-500 ${dimmed ? "rotate-[-0.6deg] opacity-45" : "opacity-100"}`}
    >
      <header
        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-[3px] border-[#111] px-6 py-4 sm:px-7"
        style={{ backgroundColor: brick.hex, color: brick.ink }}
      >
        <h2 id={`${facet.id}-title`} className="text-[22px] font-extrabold tracking-[-0.02em]">
          {facet.title}
        </h2>
        <p className="text-sm font-semibold">{facet.subtitle}</p>
      </header>

      <div className="px-6 pb-8 pt-7 sm:px-7">
        <div className="flex items-start gap-5">
          {facet.photo && (
            <img
              src={facet.photo}
              alt="Brayan Caicedo"
              width="96"
              height="96"
              loading="lazy"
              className="box-sm h-20 w-20 shrink-0 -rotate-3 object-cover sm:h-24 sm:w-24"
            />
          )}
          <p className="text-[26px] font-extrabold leading-[1.12] tracking-[-0.03em] sm:text-[32px]">{facet.intro}</p>
        </div>

        <div className="mt-2 max-w-[62ch]">
          {facet.body.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-4 text-[17px] leading-[1.65] text-[var(--body)]">
              {paragraph}
            </p>
          ))}
        </div>

        {facet.highlights?.length > 0 && (
          <ul className="mt-7 space-y-3">
            {facet.highlights.map((h) => (
              <HighlightRow key={h.label} highlight={h} onOpen={(modal) => onOpen({ ...modal, accent: brick.hex })} />
            ))}
          </ul>
        )}

        {facet.tags && (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Keywords">
            {facet.tags.map((tag) => (
              <li key={tag} className="rounded-full border-2 border-[#111] bg-white px-3 py-1 text-[13px] font-semibold">
                {tag}
              </li>
            ))}
          </ul>
        )}

        {facet.links?.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-3">
            {facet.links.map((link) => (
              <a key={link.label} href={link.href} className="box-sm press inline-flex items-center gap-2 bg-[#FFD43B] px-4 py-2.5 font-bold">
                <Icon name={link.icon} className="h-4 w-4" />
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto w-full max-w-[1280px] px-5 pb-10 pt-24 sm:px-10 lg:pt-32">
      <h2 id="work-title" className="text-[52px] font-extrabold leading-[0.95] tracking-[-0.05em] sm:text-[80px]">
        Things I've built
      </h2>
      <p className="mt-4 max-w-[52ch] text-lg font-medium text-[var(--muted)]">Recent work and research, in plain words. The numbers are in my CV.</p>

      <div className="mt-12 grid gap-7 md:grid-cols-2">
        {work.map((item, i) => (
          <article key={item.id} className="box overflow-hidden bg-white">
            <div aria-hidden="true" className="h-[18px] border-b-[3px] border-[#111]" style={{ backgroundColor: BANDS[i % BANDS.length] }} />
            <div className="px-6 pb-7 pt-6 sm:px-7">
              <h3 className="text-[28px] font-extrabold tracking-[-0.03em]">{item.name}</h3>
              <p className="mt-1 text-sm font-semibold text-[var(--muted)]">{item.context}</p>
              <p className="mt-4 text-base leading-[1.65] text-[var(--body)]">{item.summary}</p>
              <p className="mt-4 text-[13px] font-semibold">{item.stack.join(", ")}</p>
              {item.link && (
                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="box-sm press mt-5 inline-flex items-center gap-2 bg-[#FFD43B] px-4 py-2.5 font-extrabold"
                >
                  {item.link.label}
                  <Icon name="external" className="h-4 w-4" />
                </a>
              )}
            </div>
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
  const current = facets[active];

  // Cards only dim once the script is running, so the prerendered page reads normally.
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
      <header className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-6 sm:px-10">
        <a href="/" className="box-sm press bg-[#FFD43B] px-3.5 py-1.5 text-xl font-extrabold tracking-[-0.03em]">
          isbry
        </a>
        <nav aria-label="Main" className="flex items-center gap-1 text-[15px] font-semibold sm:gap-3">
          <a href="#work" className="hidden px-3 py-2 hover:underline hover:decoration-2 hover:underline-offset-4 sm:inline-block">
            Work
          </a>
          <a href="#contact" className="hidden px-3 py-2 hover:underline hover:decoration-2 hover:underline-offset-4 sm:inline-block">
            Contact
          </a>
          <a href={CV} download="Brayan_Caicedo_CV.pdf" className="box-sm press inline-flex items-center gap-2 bg-white px-4 py-2">
            <Icon name="download" className="h-4 w-4" />
            CV
          </a>
        </nav>
      </header>

      <main className="mx-auto grid w-full max-w-[1280px] gap-x-16 px-5 [grid-template-areas:'intro'_'cube'_'sides'] sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:[grid-template-areas:'cube_intro'_'cube_sides']">
        <section aria-labelledby="name" className="pb-4 pt-8 [grid-area:intro] lg:pb-28 lg:pt-16">
          <h1 id="name" className="text-[76px] font-extrabold leading-[0.86] tracking-[-0.055em] sm:text-[112px] xl:text-[132px]">
            Brayan
            <br />
            <span className="box mt-3 inline-block -rotate-2 bg-[#F0524D] px-4 pb-3 text-white">Caicedo</span>
          </h1>
          <p className="mt-9 max-w-[32ch] text-[21px] font-medium leading-[1.45]">
            Platform engineer in Canterbury, UK. I build and run the infrastructure AI products depend on, from Kubernetes clusters to GPU fleets.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a href={CV} download="Brayan_Caicedo_CV.pdf" className="box press inline-flex items-center gap-2 bg-[#FFD43B] px-5 py-3.5 font-extrabold">
              <Icon name="download" className="h-[18px] w-[18px]" />
              Download CV
            </a>
            <a href={`mailto:${EMAIL}`} className="box press inline-flex items-center gap-2 bg-white px-5 py-3.5 font-extrabold">
              <Icon name="mail" className="h-[18px] w-[18px]" />
              Email me
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="box-sm press grid h-12 w-12 place-items-center bg-white">
              <Icon name="linkedin" className="h-5 w-5" />
            </a>
            <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub" className="box-sm press grid h-12 w-12 place-items-center bg-white">
              <Icon name="github" className="h-5 w-5" />
            </a>
          </div>
          <ul className="mt-11 flex flex-wrap gap-3.5" aria-label="A few numbers">
            {[
              ["4M", "users at PayU"],
              ["99.5%", "uptime at LATAM"],
              ["US$10k", "a month saved"],
            ].map(([n, label]) => (
              <li key={n} className="box bg-white px-4 py-3 text-sm font-semibold">
                <span className="block text-[26px] font-extrabold leading-tight tracking-[-0.03em]">{n}</span>
                {label}
              </li>
            ))}
          </ul>
        </section>

        <div className="[grid-area:cube] lg:sticky lg:top-0 lg:h-screen lg:self-start">
          <div className="flex h-full flex-col items-center justify-center gap-8 py-8 lg:py-0">
            <div className="relative">
              <div ref={heroCubeRef} className="cube-float">
                <Cube rotateX={rotateX} rotateY={rotateY} onSelectFace={goTo} sizeClass="[--s:190px] sm:[--s:240px] xl:[--s:270px]" shadow />
              </div>
              {/* Label for the side in front. It pops each time the side changes. */}
              <div aria-hidden="true" className="absolute -left-3 -top-[6%] sm:-left-16 sm:-top-[4%]">
                <p key={current.id} className="box pop inline-flex -rotate-[4deg] items-center gap-2.5 bg-white px-4 py-2.5 text-base font-extrabold sm:text-lg">
                  <span className="h-4 w-4 rounded-[5px] border-[3px] border-[#111]" style={{ backgroundColor: bricks[current.brick].hex }} />
                  {current.title}
                </p>
                <p className="ml-3 mt-2 hidden max-w-[230px] rotate-[3deg] rounded-2xl bg-[#111] px-3 py-1.5 text-[13px] font-semibold leading-snug text-white sm:block">
                  {current.subtitle}
                </p>
              </div>
              <div
                aria-hidden="true"
                className="box absolute -right-3 -top-4 grid h-24 w-24 rotate-12 place-items-center rounded-full bg-[#22B573] text-center text-[13px] font-extrabold leading-tight text-white sm:-right-8 sm:h-28 sm:w-28 sm:text-[15px]"
              >
                CKA
                <br />
                CKAD
                <br />
                KCSA
              </div>
            </div>
            <SideKeys active={active} onSelect={goTo} />
          </div>
        </div>

        <div ref={sidesRef} className="flex flex-col gap-11 pb-10 [grid-area:sides]">
          {facets.map((facet, index) => (
            <FacetCard key={facet.id} facet={facet} dimmed={ready && index !== active} onOpen={setModal} />
          ))}
        </div>
      </main>

      <div
        aria-hidden="true"
        className={`box-sm pointer-events-none fixed bottom-3 right-3 z-30 bg-white p-1 transition-all duration-300 lg:hidden ${
          showMini ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <Cube rotateX={rotateX} rotateY={rotateY} sizeClass="[--s:38px]" shadow={false} />
      </div>

      <WorkSection />

      <footer id="contact" className="mx-auto w-full max-w-[1280px] px-5 pb-12 pt-20 sm:px-10">
        <div className="box bg-[#3B78F5] px-7 py-14 text-white sm:px-14 sm:py-16">
          <h2 className="max-w-[16ch] text-[44px] font-extrabold leading-[0.95] tracking-[-0.05em] sm:text-[72px]">
            Open to platform and AI infrastructure roles in the UK.
          </h2>
          <a href={`mailto:${EMAIL}`} className="box press mt-9 inline-block break-all bg-white px-5 py-4 text-lg font-extrabold text-[#111] sm:px-6 sm:text-[22px]">
            {EMAIL}
          </a>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm font-semibold">
          <p>© {year} Brayan Caicedo</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className="hover:underline hover:decoration-2 hover:underline-offset-4">
              LinkedIn
            </a>
            <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:underline hover:decoration-2 hover:underline-offset-4">
              GitHub
            </a>
            <a href={CV} download="Brayan_Caicedo_CV.pdf" className="hover:underline hover:decoration-2 hover:underline-offset-4">
              CV (PDF)
            </a>
          </div>
        </div>
      </footer>

      <HighlightDrawer modal={modal} onClose={closeModal} accent={modal?.accent} />
    </div>
  );
}
