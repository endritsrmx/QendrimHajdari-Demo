import { cn } from '@/lib/cn';

/**
 * Signature detail: the leader-line annotation from the intro drawing –
 * a short hairline ending in a small label. Used for image and illustration captions only.
 */
export function Annotation({
  children,
  className,
  side = 'left',
  tone = 'dark',
}: {
  children: React.ReactNode;
  className?: string;
  /** which side the hairline sits on */
  side?: 'left' | 'right';
  tone?: 'dark' | 'light';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3 text-[0.8125rem] leading-none',
        tone === 'dark' ? 'text-grey' : 'text-sand',
        side === 'right' && 'flex-row-reverse',
        className,
      )}
    >
      <span aria-hidden className="relative h-px w-8 bg-current opacity-60">
        <span className={cn('absolute top-1/2 size-[5px] -translate-y-1/2 rounded-full bg-bronze', side === 'left' ? '-left-0.5' : '-right-0.5')} />
      </span>
      <span>{children}</span>
    </span>
  );
}
