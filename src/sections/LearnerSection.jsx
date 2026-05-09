import { forwardRef } from "react";
import Icon from "../components/ui/Icon.jsx";
import { facets } from "../data/facets.js";
import { learnerArc } from "../data/cv.js";

const LearnerSection = forwardRef(function LearnerSection(_, ref) {
  const facet = facets[2];
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
            <h2 className="text-3xl font-black text-slate-950">I learn by pivoting</h2>
          </div>
        </div>

        <p className="mb-12 max-w-2xl text-lg leading-8 text-slate-600">
          Most people have one career. I've had three — and I'm not done pivoting.
        </p>

        {/* Learning arc — horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Desktop connecting line */}
          <div className="absolute left-0 right-0 top-8 hidden border-t-2 border-dashed border-slate-200 lg:block" />

          <div className="grid gap-8 lg:grid-cols-3">
            {learnerArc.map((step, i) => (
              <div key={step.label} className="relative flex flex-col gap-3">
                {/* Mobile connector */}
                {i < learnerArc.length - 1 && (
                  <div className="absolute left-5 top-14 h-8 w-0.5 border-l-2 border-dashed border-slate-200 lg:hidden" />
                )}
                {/* Number circle */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 bg-white font-black text-slate-950 shadow-sm">
                  {i + 1}
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <p className="font-bold text-slate-950">{step.label}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{step.institution}</p>
                  <p className="mt-0.5 text-xs font-semibold text-yellow-500">{step.period}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600 italic">{step.insight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default LearnerSection;
