export default function Button({ children, className = "", variant = "solid", as = "button", ...props }) {
  const Tag = as;
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-4";
  const variants = {
    solid: "bg-slate-950 text-white shadow-lg shadow-slate-950/10 hover:bg-slate-800",
    outline: "border border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50",
    ghost: "px-3 text-slate-600 hover:bg-slate-100 hover:text-slate-950",
  };

  return (
    <Tag className={`${base} ${variants[variant] || variants.solid} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
