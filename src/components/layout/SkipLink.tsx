export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main-content"
      className="fixed top-3 left-3 z-[200] -translate-y-24 bg-slate px-5 py-3 text-[0.875rem] text-white transition-transform focus:translate-y-0"
    >
      {label}
    </a>
  );
}
