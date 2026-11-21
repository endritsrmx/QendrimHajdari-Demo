'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

/** Animated two-line SVG icon that morphs into a close icon. */
export const MenuButton = forwardRef<
  HTMLButtonElement,
  { open: boolean; onClick: () => void; label: string; controls: string; text: string; className?: string }
>(function MenuButton({ open, onClick, label, controls, text, className }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={label}
      className={cn('group inline-flex min-h-11 min-w-11 items-center justify-center gap-3 text-slate', className)}
    >
      <span className="hidden text-[0.75rem] font-medium lg:inline">{text}</span>
      <svg viewBox="0 0 28 28" className="size-7" aria-hidden>
        <line
          x1="4" y1="11" x2="24" y2="11"
          stroke="currentColor" strokeWidth="1.25"
          className={cn('origin-center transition-transform duration-300 ease-[var(--ease-in-out)]', open && 'translate-y-[3px] rotate-45')}
          style={{ transformBox: 'fill-box' }}
        />
        <line
          x1="8" y1="17" x2="24" y2="17"
          stroke="currentColor" strokeWidth="1.25"
          className={cn(
            'origin-center transition-[transform] duration-300 ease-[var(--ease-in-out)] group-hover:-translate-x-1',
            open && '-translate-y-[3px] -rotate-45 scale-x-125 group-hover:translate-x-0',
          )}
          style={{ transformBox: 'fill-box' }}
        />
      </svg>
    </button>
  );
});
