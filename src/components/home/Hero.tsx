import { getLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Photo } from '@/components/ui/Photo';
import { media } from '@/content/media';
import { ButtonLink } from '@/components/ui/Button';

export async function Hero() {
  const t = await getTranslations('home.hero');
  const locale = (await getLocale()) as Locale;

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-ivory pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="container-x grid-12 min-h-[calc(90svh-9rem)] items-center gap-y-12">
        <div className="col-span-4 lg:col-span-7 lg:pr-8">
          <p className="text-label flex items-center gap-4 text-grey" data-reveal="fade">
            <span aria-hidden className="h-px w-10 bg-bronze" />
            {t('eyebrow')}
          </p>
          <h1 id="hero-title" className="text-display mt-8 text-slate" data-reveal="lines" data-reveal-delay="0.15" data-reveal-start="top 100%">
            <span className="reveal-mask">
              <span>{t('line1')}</span>
            </span>
            <span className="reveal-mask">
              <span className="italic text-slate-soft">{t('line2')}</span>
            </span>
          </h1>
          <p className="text-lead mt-8 max-w-xl text-grey" data-reveal="fade" data-reveal-delay="0.55" data-reveal-start="top 100%">
            {t('sub')}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4" data-reveal="fade" data-reveal-delay="0.7" data-reveal-start="top 100%">
            <ButtonLink href="/book-appointment">{t('primary')}</ButtonLink>
            <ButtonLink href="/treatments" variant="secondary">
              {t('secondary')}
            </ButtonLink>
          </div>
        </div>

        <div className="relative col-span-4 lg:col-span-5">
          {/* organic composition: arch-topped portrait, offset sand plane, bronze hairline */}
          <div aria-hidden className="absolute -top-6 -right-[var(--gutter)] bottom-16 left-[18%] bg-sand lg:-top-10" />
          <div aria-hidden className="absolute top-[12%] -left-6 hidden h-[38%] w-px bg-bronze lg:block" />
          <div
            className="relative mx-auto aspect-[4/5] max-h-[72svh] w-full max-w-[34rem] overflow-hidden rounded-t-[999px]"
            data-reveal="image"
            data-reveal-delay="0.3"
            data-reveal-start="top 100%"
          >
            <div className="absolute -inset-y-8 inset-x-0" data-parallax="30">
              <div className="relative h-full w-full bg-sand" data-reveal-zoom>
                <Photo photo={media.portraitOperatingRoom} locale={locale} priority sizes="(min-width: 1024px) 36vw, 92vw" />
              </div>
            </div>
          </div>
          <p className="relative mt-5 flex items-center justify-end gap-3 text-[0.75rem] uppercase tracking-[0.18em] text-grey" data-reveal="fade" data-reveal-delay="0.9" data-reveal-start="top 100%">
            <span aria-hidden className="h-px w-6 bg-bronze" />
            {t('locations')}
          </p>
        </div>
      </div>
    </section>
  );
}
