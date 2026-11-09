import { motion } from "framer-motion";
import { bricks } from "../../data/facets.js";

// One face of the cube in the site's flat sticker style: nine tiles with
// ink outlines. shade is a motion value worked out from the cube's rotation,
// so faces turned away from the light go darker in steps as the cube moves.
export default function CubeFace({ facet, index, transform, shade, onSelect }) {
  const color = bricks[facet.brick].hex;
  const line = "calc(var(--s) * 0.011) solid #111";

  return (
    <button
      type="button"
      aria-label={`Go to ${facet.title}`}
      tabIndex={-1}
      disabled={!onSelect}
      onClick={() => onSelect?.(index)}
      className="absolute inset-0 cursor-pointer overflow-hidden bg-[#111] p-[4%] outline-none disabled:cursor-default"
      style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform, border: line }}
    >
      <span className="grid h-full w-full grid-cols-3 grid-rows-3 gap-[4%]">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="rounded-[12%]" style={{ backgroundColor: color, border: line }} />
        ))}
      </span>
      <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: shade }} />
    </button>
  );
}
