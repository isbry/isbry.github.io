import { forwardRef } from "react";
import Icon from "../components/ui/Icon.jsx";
import { facets } from "../data/facets.js";
import { aiTools, aiTopics } from "../data/cv.js";

const AIExplorerSection = forwardRef(function AIExplorerSection(_, ref) {
  const facet = facets[1];
  return (
    <section
      ref={ref}
      id={facet.id}
      className={`border-l-4 ${facet.borderColor} py-20`}
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-10 flex items-center gap-4">
          <div className={`rounded-2xl border border-black/5 p-3 shadow-sm ${facet.color}`}>
            <Icon name={facet.icon} className="h-6 w-6 text-slate-950" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{facet.title}</p>
            <h2 className="text-3xl font-black text-slate-950">What I'm exploring</h2>
          </div>
        </div>

        {/* Honest intro */}
        <p className="mb-10 max-w-2xl text-lg leading-8 text-slate-600">
          I'm genuinely fascinated by AI — not as a trend to follow, but as a new layer of the infrastructure I already think about. I haven't shipped an AI product yet — I'm in the exploration phase, and I think that's worth documenting.
        </p>

        {/* Two columns */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Tools */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">Tools I use</p>
            <div className="flex flex-wrap gap-2">
              {aiTools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Topics */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">Thinking about</p>
            <ul className="space-y-3">
              {aiTopics.map((topic) => (
                <li key={topic} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="text-blue-400">→</span>
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 text-sm italic text-slate-400">This section will grow as I build more.</p>
      </div>
    </section>
  );
});

export default AIExplorerSection;
