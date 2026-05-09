import { forwardRef } from "react";
import Icon from "../components/ui/Icon.jsx";
import { facets } from "../data/facets.js";
import { jobs, certs } from "../data/cv.js";

const DevOpsSection = forwardRef(function DevOpsSection(_, ref) {
  const facet = facets[0];
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
            <h2 className="text-3xl font-black text-slate-950">The work</h2>
          </div>
        </div>

        {/* Metric cards */}
        <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "30%", label: "Faster deployments" },
            { value: "£10k/mo", label: "Infrastructure savings" },
            { value: "99.5%", label: "Uptime guaranteed" },
            { value: "4M+", label: "Users on our platform" },
          ].map((m) => (
            <div key={m.label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-4xl font-black text-slate-950">{m.value}</p>
              <p className="mt-1 text-sm text-slate-500">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Job cards */}
        <div className="mb-10 grid gap-6 lg:grid-cols-2">
          {jobs.map((job) => (
            <div key={job.company} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-3">
                <p className="text-lg font-bold text-slate-950">{job.company}</p>
                <p className="text-sm font-semibold text-slate-600">{job.role}</p>
                <p className="mt-0.5 text-xs text-slate-400">{job.period} · {job.location}</p>
              </div>
              <ul className="space-y-2">
                {job.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cert chips */}
        <div className="flex flex-wrap gap-2">
          {certs.map((cert) => (
            <span
              key={cert.name}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              {cert.name}
              <span className="font-normal text-slate-400">· {cert.issuer} · {cert.period}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
});

export default DevOpsSection;
