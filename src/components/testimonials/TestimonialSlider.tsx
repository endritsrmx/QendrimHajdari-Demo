'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Arrow } from '@/components/ui/Arrow';

/** Accessible testimonial slider: buttons + arrow keys, live region, fade transitions. */
export function TestimonialSlider({ items, label }: { items: { id: string; quote: string; attribution: string }[]; label: string }) {
  const t = useTranslations('common');
  const [i, setI] = useState(0);
  if (items.length === 0) return null;
  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);
  const current = items[i]!;
  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
    >
      <figure key={current.id} aria-live="polite" className="animate-[fade-in_250ms_var(--ease-out)]">
        <blockquote className="text-h2 max-w-4xl italic">“{current.quote}”</blockquote>
        <figcaption className="text-label mt-8 text-grey">{current.attribution}</figcaption>
      </figure>
      {items.length > 1 && (
        <div className="mt-10 flex items-center gap-4">
          <button type="button" onClick={() => go(-1)} aria-label={t('previous')} className="group inline-flex size-12 items-center justify-center rounded-full border border-slate">
            <Arrow direction="left" className="w-5" />
          </button>
          <span className="text-[0.75rem] tabular-nums tracking-[0.14em]">{t('slideOf', { current: i + 1, total: items.length })}</span>
          <button type="button" onClick={() => go(1)} aria-label={t('next')} className="group inline-flex size-12 items-center justify-center rounded-full border border-slate">
            <Arrow className="w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
