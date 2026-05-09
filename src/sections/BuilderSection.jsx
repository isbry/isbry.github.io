import { forwardRef } from "react";
import Icon from "../components/ui/Icon.jsx";
import { facets } from "../data/facets.js";
import { builderProjects } from "../data/cv.js";

const BuilderSection = forwardRef(function BuilderSection(_, ref) {
  const facet = facets[3];
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
            <h2 className="text-3xl font-black text-slate-950">Things I've built</h2>
          </div>
        </div>

        <p className="mb-10 max-w-2xl text-lg leading-8 text-slate-600">
          I build things to understand them — and sometimes to fix something that was broken.
        </p>

        {/* Project cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {builderProjects.map((project) => {
            const isPersonal = project.context === "Personal";
            return (
              <div
                key={project.name}
                className={`rounded-2xl border p-6 shadow-sm ${
                  isPersonal
                    ? "border-green-200 bg-green-50"
                    : "border-slate-100 bg-white"
                }`}
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <p className="font-bold text-slate-950">{project.name}</p>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      isPersonal
                        ? "bg-green-200 text-green-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {project.context}
                  </span>
                </div>
                <p className="text-sm leading-6 text-slate-600">{project.description}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-sm italic text-slate-400">
          I build more at work than publicly. More personal projects on the way.
        </p>
      </div>
    </section>
  );
});

export default BuilderSection;
