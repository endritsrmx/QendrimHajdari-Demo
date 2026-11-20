import { cn } from '@/lib/cn';

/** Thin editorial arrow; shifts 6 px on parent hover (group). */
export function Arrow({ className, direction = 'right' }: { className?: string; direction?: 'right' | 'left' | 'up-right' | 'down' }) {
  const rotate = { right: '', left: 'rotate-180', 'up-right': '-rotate-45', down: 'rotate-90' }[direction];
  return (
    <svg
      viewBox="0 0 24 12"
      fill="none"
      aria-hidden
      className={cn(
        'h-3 w-6 shrink-0 transition-transform duration-[250ms] ease-[var(--ease-out-2)]',
        direction === 'right' && 'group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5',
        direction === 'left' && 'group-hover:-translate-x-1.5',
        rotate,
        className,
      )}
    >
      <path d="M0 6h22M17 1l5 5-5 5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}
