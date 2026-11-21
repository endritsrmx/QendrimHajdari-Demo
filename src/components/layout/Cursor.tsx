'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { isFinePointer, prefersReducedMotion } from '@/components/animations/presets';

type Mode = 'default' | 'link' | 'drag' | 'view';

const QUERIES = ['(hover: hover) and (pointer: fine)', '(prefers-reduced-motion: reduce)'];
function subscribe(cb: () => void) {
  const mqs = QUERIES.map((q) => window.matchMedia(q));
  mqs.forEach((m) => m.addEventListener('change', cb));
  return () => mqs.forEach((m) => m.removeEventListener('change', cb));
}

/**
 * Subtle custom cursor – only on real hover/fine-pointer devices.
 * The native cursor stays visible (no usability loss); this adds a soft follower ring.
 */
export function Cursor() {
  const t = useTranslations('cursor');
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('default');
  const enabled = useSyncExternalStore(
    subscribe,
    () => isFinePointer() && !prefersReducedMotion(),
    () => false,
  );

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-cursor');
    return () => document.documentElement.classList.remove('has-cursor');
  }, [enabled]);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      xTo(e.clientX);
      yTo(e.clientY);
      el.style.opacity = '1';
    };
    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const zone = target?.closest<HTMLElement>('[data-cursor]');
      if (zone?.dataset.cursor === 'drag') return setMode('drag');
      if (zone?.dataset.cursor === 'view') return setMode('view');
      if (target?.closest('a, button, [role="button"], label, select, input, textarea')) return setMode('link');
      setMode('default');
    };
    const onLeave = () => (el.style.opacity = '0');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  // one 80px element scaled via transform – never animate width/height
  const scale = { default: 0.35, link: 0.6, drag: 1, view: 1 }[mode];
  const label = mode === 'drag' ? t('drag') : mode === 'view' ? t('view') : '';

  return (
    <div
      ref={ref}
      aria-hidden
      className="cursor-dot pointer-events-none fixed top-0 left-0 z-[100] opacity-0 transition-opacity duration-300"
    >
      <div
        className="relative -mt-10 -ml-10 flex size-20 items-center justify-center transition-transform duration-200 ease-[var(--ease-out)]"
        style={{ transform: `scale(${scale})` }}
      >
        <svg viewBox="0 0 80 80" className="absolute inset-0 size-full overflow-visible">
          <circle
            cx="40"
            cy="40"
            r="39.5"
            vectorEffect="non-scaling-stroke"
            strokeWidth="1"
            className={`transition-[fill,stroke] duration-200 ease-[ease] ${label ? 'fill-slate stroke-slate' : 'fill-transparent stroke-slate/50'}`}
          />
        </svg>
        <span
          className={`relative text-[0.625rem] font-medium text-ivory transition-opacity duration-150 ease-[ease] ${label ? 'opacity-100' : 'opacity-0'}`}
        >
          {label || '·'}
        </span>
      </div>
    </div>
  );
}
