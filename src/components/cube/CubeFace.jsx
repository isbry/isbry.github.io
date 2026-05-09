import Icon from "../ui/Icon.jsx";
import { faceTransforms } from "../../data/facets.js";

export default function CubeFace({ facet, index, activeIndex, onSelect }) {
  return (
    <button
      type="button"
      aria-label={`Show ${facet.title}`}
      aria-pressed={activeIndex === index}
      onClick={() => {
        onSelect(index);
      }}
      className="group absolute overflow-hidden rounded-3xl border border-slate-200 bg-white/95 shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-4"
      style={{
        width: "320px",
        height: "320px",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: faceTransforms[index],
      }}
    >
      <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-2 bg-slate-50 p-4">
        {Array.from({ length: 9 }).map((_, tileIndex) => (
          <span
            key={`${facet.id}-${tileIndex}`}
            className={`flex items-center justify-center rounded-xl border border-black/5 shadow-sm ${facet.color}`}
          >
            {tileIndex === 4 ? (
              <Icon name={facet.icon} className="h-10 w-10 text-slate-950/80" />
            ) : null}
          </span>
        ))}
      </div>
      <span className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white/85 px-3 py-2 text-left backdrop-blur">
        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {facet.title}
        </span>
      </span>
    </button>
  );
}
