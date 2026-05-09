import { useState, useEffect, useRef, createRef } from "react";
import { facets } from "../data/facets.js";

export function useFacetSync() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef(facets.map(() => createRef()));
  const isProgrammaticScroll = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;
        // Find the most visible intersecting entry
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (intersecting.length === 0) return;
        const target = intersecting[0].target;
        const i = sectionRefs.current.findIndex((r) => r.current === target);
        if (i !== -1) setActiveIndex(i);
      },
      { threshold: 0.4, rootMargin: "-10% 0px -10% 0px" }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  function scrollToSection(index) {
    const ref = sectionRefs.current[index];
    if (!ref?.current) return;
    isProgrammaticScroll.current = true;
    setActiveIndex(index);
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 800);
  }

  return {
    activeIndex,
    setActiveIndex,
    sectionRefs: sectionRefs.current,
    scrollToSection,
    isProgrammaticScroll,
  };
}
