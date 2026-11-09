export default function HighlightRow({ highlight, onOpen }) {
  const { label, role, detail, modal } = highlight;

  const text = (
    <span className="min-w-0 flex-1">
      <span className="font-bold">{label}</span>
      {role && <span className="font-medium text-[var(--muted)]">, {role}</span>}
      <span className="mt-0.5 block text-[15px] font-medium leading-snug text-[var(--muted)]">{detail}</span>
    </span>
  );

  if (!modal) {
    return (
      <li>
        <div className="flex items-center gap-4 rounded-[14px] border-[3px] border-[#111] bg-[var(--paper)] px-4 py-3.5">{text}</div>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => onOpen(modal)}
        className="box-sm press flex w-full items-center gap-4 bg-[var(--paper)] px-4 py-3.5 text-left"
      >
        {text}
        <span className="shrink-0 text-sm font-extrabold">Open</span>
      </button>
    </li>
  );
}
