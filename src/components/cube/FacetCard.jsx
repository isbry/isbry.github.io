import Icon from "../ui/Icon.jsx";

export default function FacetCard({ facet, isActive }) {
  return (
    <div
      className={`rounded-3xl border p-6 shadow-xl backdrop-blur transition-all duration-300 ${
        isActive
          ? "border-slate-300 bg-white/90 scale-[1.01]"
          : "border-slate-200 bg-white/70"
      }`}
      aria-live="polite"
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 rounded-2xl border border-black/5 p-3 shadow-sm ${facet.color}`}
        >
          <Icon name={facet.icon} className="h-6 w-6 text-slate-950" />
        </div>
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Current face
          </p>
          <h2 className="text-2xl font-black text-slate-950">{facet.title}</h2>
          <p className="text-sm font-medium text-slate-500">{facet.subtitle}</p>
          <p className="text-slate-600 leading-relaxed">{facet.description}</p>
        </div>
      </div>
    </div>
  );
}
