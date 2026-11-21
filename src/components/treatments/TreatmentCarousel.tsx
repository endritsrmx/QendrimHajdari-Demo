'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Illustration } from '@/components/ui/Illustration';
import { Arrow } from '@/components/ui/Arrow';
import type { IllustrationId } from '@/content/types';
import { cn } from '@/lib/cn';

export interface CarouselCard {
  id: string;
  number: string;
  title: string;
  text: string;
  slug: string;
  illustration: IllustrationId;
  badge?: string;
}

export function TreatmentCarousel({ cards, label }: { cards: CarouselCard[]; label: string }) {
  const t = useTranslations('common');
  const [emblaRef, embla] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps', skipSnaps: false });
  const [index, setIndex] = useState(0);
  const [snaps, setSnaps] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const sync = useCallback(() => {
    if (!embla) return;
    setIndex(embla.selectedScrollSnap());
    setSnaps(embla.scrollSnapList().length);
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    const raf = requestAnimationFrame(sync);
    embla.on('select', sync).on('reInit', sync);
    return () => {
      cancelAnimationFrame(raf);
      embla.off('select', sync).off('reInit', sync);
    };
  }, [embla, sync]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      embla?.scrollNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      embla?.scrollPrev();
    }
  };

  const progress = snaps > 1 ? (index + 1) / snaps : 1;

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        className="embla-viewport cursor-grab active:cursor-grabbing focus-visible:outline-offset-8"
        ref={emblaRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        data-cursor="drag"
        aria-describedby="carousel-hint"
      >
        <div className="flex gap-5 lg:gap-8">
          {cards.map((card, i) => (
            <div
              key={card.id}
              role="group"
              aria-roledescription="slide"
              aria-label={t('slideOf', { current: i + 1, total: cards.length })}
              className="min-w-0 shrink-0 grow-0 basis-[84%] sm:basis-[46%] lg:basis-[31%] wide:basis-[28%]"
              onFocusCapture={() => embla?.scrollTo(Math.min(i, (embla?.scrollSnapList().length ?? 1) - 1))}
            >
              <article className="group relative flex h-full flex-col bg-ivory">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div className="h-full w-full transition-transform duration-300 ease-[ease] group-hover:scale-[1.04]">
                    <Illustration id={card.illustration} label={card.title} caption={t('illustration')} tone="white" />
                  </div>
                  {card.badge && (
                    <span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white/90 px-2.5 py-1 text-[0.75rem] text-bronze-deep">
                      <span aria-hidden className="size-1.5 rounded-full bg-bronze" />
                      {card.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 transition-transform duration-300 ease-[ease] sm:p-8 lg:group-hover:-translate-y-1">
                  <h3 className="text-h3">{card.title}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-grey">{card.text}</p>
                  <Link
                    href={{ pathname: '/treatments/[slug]', params: { slug: card.slug } }}
                    className="mt-auto inline-flex min-h-11 items-center gap-3 pt-6 text-[0.8125rem] font-medium text-slate after:absolute after:inset-0 after:content-['']"
                    draggable={false}
                  >
                    <span className="link-underline">{t('exploreTreatment')}</span>
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between gap-6">
        <div className="flex flex-1 items-center gap-6">
          <span className="text-[0.75rem] font-medium text-slate tabular-nums">
            {String(index + 1).padStart(2, '0')} / {String(Math.max(snaps, 1)).padStart(2, '0')}
          </span>
          <div className="relative h-px max-w-xs flex-1 bg-line" aria-hidden>
            <div
              className="absolute inset-0 origin-left bg-slate transition-transform duration-300 ease-[var(--ease-in-out)]"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
          <p id="carousel-hint" className="hidden text-[0.75rem] text-grey lg:block">
            {t('dragHint')}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => embla?.scrollPrev()}
            disabled={!canPrev}
            aria-label={t('previous')}
            className={cn(
              'group inline-flex size-12 items-center justify-center rounded-full border border-slate text-slate transition-colors hover:bg-slate hover:text-white disabled:border-line disabled:text-line disabled:hover:bg-transparent',
            )}
          >
            <Arrow direction="left" className="w-5" />
          </button>
          <button
            type="button"
            onClick={() => embla?.scrollNext()}
            disabled={!canNext}
            aria-label={t('next')}
            className="pressable group inline-flex size-12 items-center justify-center rounded-full border border-slate text-slate hover:bg-slate hover:text-white disabled:border-line disabled:text-line disabled:hover:bg-transparent"
          >
            <Arrow className="w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
