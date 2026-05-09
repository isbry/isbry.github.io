import { forwardRef } from "react";
import Icon from "../components/ui/Icon.jsx";
import { facets } from "../data/facets.js";

const WritingSection = forwardRef(function WritingSection(_, ref) {
  const facet = facets[5];
  return (
    <section
      ref={ref}
      id={facet.id}
      className={`border-l-4 ${facet.borderColor} bg-white py-20`}
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-10 flex items-center gap-4">
          <div className={`rounded-2xl border border-black/5 p-3 shadow-sm ${facet.color}`}>
            <Icon name={facet.icon} className="h-6 w-6 text-slate-950" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{facet.title}</p>
            <h2 className="text-3xl font-black text-slate-950">Writing</h2>
          </div>
        </div>

        <p className="mb-4 max-w-2xl text-lg leading-8 text-slate-600">
          Writing is how I think out loud. I write in Spanish and English — about systems, learning, and the space between engineering and being human.
        </p>
        <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-500">
          No niche. No schedule. Just honest thinking, published when it's ready.
        </p>

        {/* Email capture */}
        <div className="mt-8 flex max-w-sm gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10"
          />
          <button type="button" className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
            Notify me
          </button>
        </div>
        <p className="mt-3 text-xs text-slate-400">No spam. Just a heads-up when I publish.</p>
      </div>
    </section>
  );
});

export default WritingSection;
