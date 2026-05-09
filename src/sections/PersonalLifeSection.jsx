import { forwardRef } from "react";
import Icon from "../components/ui/Icon.jsx";
import { facets } from "../data/facets.js";
import { personalCards } from "../data/cv.js";

const PersonalLifeSection = forwardRef(function PersonalLifeSection(_, ref) {
  const facet = facets[4];
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
            <h2 className="text-3xl font-black text-slate-950">Beyond the terminal</h2>
          </div>
        </div>

        {/* 3 cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {personalCards.map((card) => {
            const isColombia = card.title.includes("Cali");
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100">
                  <Icon name={card.icon} className="h-5 w-5 text-orange-600" />
                </div>
                <p className="mb-2 font-bold text-slate-950">
                  {isColombia ? "🇨🇴 " : ""}{card.title}
                </p>
                <p className="text-sm leading-6 text-slate-600">{card.copy}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default PersonalLifeSection;
