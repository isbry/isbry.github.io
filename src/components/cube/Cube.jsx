import { motion, useTransform } from "framer-motion";
import { facets, cubeStops } from "../../data/facets.js";
import CubeFace from "./CubeFace.jsx";

// The six slots of the cube, with the outward normal of each slot in CSS
// space (x right, y down, z towards the viewer). cubeStops says which facet
// goes in which slot.
const SLOTS = [
  { transform: "translateZ(var(--half))", normal: [0, 0, 1] },
  { transform: "rotateY(90deg) translateZ(var(--half))", normal: [1, 0, 0] },
  { transform: "rotateX(90deg) translateZ(var(--half))", normal: [0, -1, 0] },
  { transform: "rotateX(-90deg) translateZ(var(--half))", normal: [0, 1, 0] },
  { transform: "rotateY(180deg) translateZ(var(--half))", normal: [0, 0, -1] },
  { transform: "rotateY(-90deg) translateZ(var(--half))", normal: [-1, 0, 0] },
];

// Light comes from the top left, slightly in front of the cube.
const LIGHT = (() => {
  const v = [-0.3, -0.6, 0.75];
  const n = Math.hypot(...v);
  return v.map((c) => c / n);
})();

const RAD = Math.PI / 180;

// How much a face catches the light once the cube is rotated by
// rotateX(a) rotateY(b), which is the order the transform is applied in.
function lightOn([nx, ny, nz], a, b) {
  const ca = Math.cos(a * RAD);
  const sa = Math.sin(a * RAD);
  const cb = Math.cos(b * RAD);
  const sb = Math.sin(b * RAD);
  const x = nx * cb + nz * sb;
  const y0 = ny;
  const z0 = -nx * sb + nz * cb;
  const y = y0 * ca - z0 * sa;
  const z = y0 * sa + z0 * ca;
  return Math.max(0, x * LIGHT[0] + y * LIGHT[1] + z * LIGHT[2]);
}

function LitFace({ facet, index, rotateX, rotateY, onSelect }) {
  const slot = SLOTS[cubeStops[index].face];
  const shade = useTransform([rotateX, rotateY], ([a, b]) => 0.38 * Math.pow(1 - lightOn(slot.normal, a, b), 1.4));
  const sheen = useTransform([rotateX, rotateY], ([a, b]) => Math.pow(lightOn(slot.normal, a, b), 4) * 0.6);
  return (
    <CubeFace facet={facet} index={index} transform={slot.transform} shade={shade} sheen={sheen} onSelect={onSelect} />
  );
}

// rotateX and rotateY are motion values owned by the page, so the cube can
// follow the scroll position. sizeClass sets --s, the edge length.
export default function Cube({ rotateX, rotateY, onSelectFace, sizeClass, shadow = true }) {
  return (
    <div
      className={`relative flex items-center justify-center ${sizeClass}`}
      style={{
        width: "calc(var(--s) * 1.55)",
        height: "calc(var(--s) * 1.55)",
        perspective: "calc(var(--s) * 6)",
        "--half": "calc(var(--s) / 2)",
      }}
    >
      {shadow && (
        <span
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 rounded-[50%] blur-md"
          style={{
            bottom: "0%",
            width: "calc(var(--s) * 1.05)",
            height: "calc(var(--s) * 0.14)",
            background: "radial-gradient(closest-side, rgba(17,19,23,0.28), rgba(17,19,23,0))",
          }}
        />
      )}
      <motion.div
        className="relative"
        style={{ width: "var(--s)", height: "var(--s)", transformStyle: "preserve-3d", rotateX, rotateY }}
      >
        {facets.map((facet, index) => (
          <LitFace key={facet.id} facet={facet} index={index} rotateX={rotateX} rotateY={rotateY} onSelect={onSelectFace} />
        ))}
      </motion.div>
    </div>
  );
}
