import { motion } from "framer-motion";
import { facets, cubeStops } from "../../data/facets.js";
import CubeFace from "./CubeFace.jsx";

// The six slots of the cube. cubeStops says which facet goes in which slot.
const SLOTS = [
  "translateZ(var(--half))",
  "rotateY(90deg) translateZ(var(--half))",
  "rotateX(90deg) translateZ(var(--half))",
  "rotateX(-90deg) translateZ(var(--half))",
  "rotateY(180deg) translateZ(var(--half))",
  "rotateY(-90deg) translateZ(var(--half))",
];

// rotateX and rotateY are motion values owned by the page, so the cube can
// follow the scroll position. sizeClass sets --s, the edge length.
export default function Cube({ rotateX, rotateY, activeIndex, onSelectFace, sizeClass, shadow = true }) {
  return (
    <div
      className={`relative flex items-center justify-center ${sizeClass}`}
      style={{
        width: "calc(var(--s) * 1.5)",
        height: "calc(var(--s) * 1.5)",
        perspective: "calc(var(--s) * 4.5)",
        "--half": "calc(var(--s) / 2)",
      }}
    >
      {shadow && (
        <span
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
          style={{
            bottom: "1%",
            width: "calc(var(--s) * 1.1)",
            height: "calc(var(--s) * 0.16)",
            background: "radial-gradient(closest-side, rgba(5,19,29,0.2), rgba(5,19,29,0))",
          }}
        />
      )}
      <motion.div
        className="relative"
        style={{ width: "var(--s)", height: "var(--s)", transformStyle: "preserve-3d", rotateX, rotateY }}
      >
        {facets.map((facet, index) => (
          <CubeFace
            key={facet.id}
            facet={facet}
            index={index}
            transform={SLOTS[cubeStops[index].face]}
            active={activeIndex === index}
            onSelect={onSelectFace}
          />
        ))}
      </motion.div>
    </div>
  );
}
