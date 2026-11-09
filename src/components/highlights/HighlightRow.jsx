import Icon from "../ui/Icon.jsx";

export default function HighlightRow({ highlight, onOpen, accent }) {
  const { label, role, detail, modal } = highlight;

  const content = (
    <>
      <span className="min-w-0 flex-1">
        <span className="font-semibold text-[var(--ink)]">{label}</span>
        {role && <span className="text-[var(--muted)]">, {role}</span>}
        <span className="mt-0.5 block text-[15px] leading-snug text-[var(--muted)]">{detail}</span>
      </span>
      {modal && (
        <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-[var(--muted)] transition-colors group-hover:text-[var(--ink)]">
          Details
          <Icon name="chevron" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      )}
    </>
  );

  if (!modal) {
    return <li className="flex items-start gap-4 border-t border-[var(--line)] py-3.5 text-base">{content}</li>;
  }

  return (
    <li className="border-t border-[var(--line)]">
      <button
        type="button"
        onClick={() => onOpen(modal)}
        className="group -mx-3 flex w-[calc(100%+1.5rem)] items-center gap-4 rounded-lg px-3 py-3.5 text-left text-base transition-colors hover:bg-white/70"
        style={{ "--accent": accent }}
      >
        <span aria-hidden="true" className="h-8 w-1 shrink-0 rounded-full bg-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100" />
        {content}
      </button>
    </li>
  );
}
