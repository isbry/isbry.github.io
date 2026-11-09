import { motion } from "framer-motion";
import { bricks } from "../../data/facets.js";

// One face of a stickerless cube: nine rounded tiles on a dark core.
// shade and sheen are motion values worked out from the cube's rotation,
// so faces turned away from the light get darker as the cube moves.
export default function CubeFace({ facet, index, transform, shade, sheen, onSelect }) {
  const color = bricks[facet.brick].hex;
  const tile = {
    background: `linear-gradient(150deg, color-mix(in srgb, #fff 26%, ${color}) 0%, ${color} 48%, color-mix(in srgb, #000 10%, ${color}) 100%)`,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.12)",
  };

  return (
    <button
      type="button"
      aria-label={`Go to ${facet.title}`}
      tabIndex={-1}
      disabled={!onSelect}
      onClick={() => onSelect?.(index)}
      className="absolute inset-0 cursor-pointer overflow-hidden rounded-[11%] bg-[#15171c] p-[3.2%] outline-none disabled:cursor-default"
      style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform }}
    >
      <span className="grid h-full w-full grid-cols-3 grid-rows-3 gap-[3.2%]">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="rounded-[14%]" style={tile} />
        ))}
      </span>
      <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: shade }} />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ opacity: sheen, background: "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 55%)" }}
      />
    </button>
  );
}
