import { cn } from '@/lib/cn';
import { Monogram } from '@/components/brand/Logo';

/**
 * Clearly declared image placeholder – used until real, approved photography is supplied.
 * Never replaced by AI imagery that could be mistaken for the doctor, the practice or patients.
 */
export function Placeholder({
  token,
  label,
  className,
  tone = 'sand',
  ratio,
}: {
  token: string;
  label: string;
  className?: string;
  tone?: 'sand' | 'ivory' | 'slate';
  ratio?: string;
}) {
  const bg = {
    sand: 'bg-sand text-grey',
    ivory: 'bg-hover text-grey',
    slate: 'bg-slate-soft text-sand',
  }[tone];
  return (
    <div
      role="img"
      aria-label={`${label}: ${token}`}
      className={cn('relative isolate flex h-full w-full items-end overflow-hidden', bg, className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {/* subtle architectural line pattern */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in srgb, currentColor 12%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, currentColor 12%, transparent) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <Monogram className="absolute top-1/2 left-1/2 size-[22%] max-h-40 max-w-40 min-w-14 -translate-x-1/2 -translate-y-1/2 opacity-25" tone={tone === 'slate' ? 'light' : 'dark'} />
      <span className="m-4 inline-flex flex-col gap-0.5 bg-white/70 px-3 py-2 font-mono text-[0.6875rem] tracking-wide text-slate backdrop-blur-sm sm:m-5">
        <span className="font-sans text-[0.625rem] text-grey">{label}</span>
        {token}
      </span>
    </div>
  );
}
