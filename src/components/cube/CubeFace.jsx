import Icon from "../ui/Icon.jsx";
import { bricks } from "../../data/facets.js";

// One face of the cube: a 3x3 grid of 1x1 Lego plates seen from above.
export default function CubeFace({ facet, index, transform, active, onSelect }) {
  const brick = bricks[facet.brick];

  return (
    <button
      type="button"
      aria-label={`Go to ${facet.title}`}
      tabIndex={-1}
      disabled={!onSelect}
      onClick={() => onSelect?.(index)}
      className="absolute inset-0 cursor-pointer rounded-[14%] bg-[#05131d] p-[4.5%] outline-none disabled:cursor-default"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      <span className="grid h-full w-full grid-cols-3 grid-rows-3 gap-[4%]">
        {Array.from({ length: 9 }).map((_, tile) => (
          <span
            key={tile}
            className="flex items-center justify-center rounded-[16%]"
            style={{
              backgroundColor: brick.hex,
              boxShadow: "inset 0 -3px 0 rgba(0,0,0,0.16), inset 0 2px 0 rgba(255,255,255,0.28)",
              color: brick.hex,
            }}
          >
            {tile === 4 ? (
              <Icon name={facet.icon} className="h-[46%] w-[46%]" style={{ color: brick.ink }} />
            ) : (
              <span className="stud block h-[52%] w-[52%]" />
            )}
          </span>
        ))}
      </span>
    </button>
  );
}
