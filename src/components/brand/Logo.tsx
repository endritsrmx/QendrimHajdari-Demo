import { cn } from '@/lib/cn';

/**
 * Preliminary brand mark (to be replaced by a client logo if one exists).
 * Monogram: a "Q" ring enclosing an "H", with a bronze Q-tail.
 * Animation: stroke reveal (0.7 s) → wordmark fade (0.5 s, starting at 0.6 s) = 1.1 s total, non-blocking.
 */
export function Monogram({
  className,
  animated = false,
  tone = 'dark',
  title,
}: {
  className?: string;
  animated?: boolean;
  tone?: 'dark' | 'light';
  title?: string;
}) {
  const stroke = tone === 'dark' ? 'var(--color-slate)' : 'var(--color-ivory)';
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn('shrink-0', animated && 'qh-animated', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <circle cx="22" cy="22" r="16.5" stroke={stroke} strokeWidth="1.25" pathLength={1} className="qh-stroke" />
      <path d="M16.5 14.5v15M27.5 14.5v15M16.5 22h11" stroke={stroke} strokeWidth="1.25" pathLength={1} className="qh-stroke qh-stroke-2" />
      <path d="M33.5 33.5 41 41" stroke="var(--color-bronze)" strokeWidth="1.5" strokeLinecap="round" pathLength={1} className="qh-stroke qh-stroke-3" />
    </svg>
  );
}

export function Logo({
  tone = 'dark',
  animated = false,
  showTagline = true,
  taglineHidden = false,
  className,
}: {
  tone?: 'dark' | 'light';
  animated?: boolean;
  showTagline?: boolean;
  /** keeps layout stable – tagline fades instead of unmounting */
  taglineHidden?: boolean;
  className?: string;
}) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <Monogram className="size-9 sm:size-10" animated={animated} tone={tone} />
      <span className={cn('flex flex-col leading-none', animated && 'qh-wordmark')}>
        <span
          className={cn(
            'font-serif text-[1.0625rem] tracking-[0.22em] sm:text-[1.1875rem]',
            tone === 'dark' ? 'text-slate' : 'text-ivory',
          )}
        >
          QËNDRIM HAJDARI
        </span>
        {showTagline && (
          <span
            className={cn(
              'mt-1.5 hidden text-[0.5625rem] font-medium tracking-[0.24em] transition-opacity duration-200 ease-[ease] sm:block',
              taglineHidden && 'opacity-0',
              tone === 'dark' ? 'text-grey' : 'text-sand',
            )}
          >
            ORTHOPAEDIC &amp; TRAUMA SURGERY
          </span>
        )}
      </span>
    </span>
  );
}
