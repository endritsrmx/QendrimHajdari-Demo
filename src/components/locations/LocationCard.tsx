import { getLocale, getTranslations } from 'next-intl/server';
import type { PracticeLocation } from '@/config/locations';
import { Link } from '@/i18n/navigation';
import { Placeholder } from '@/components/ui/Placeholder';
import { Photo } from '@/components/ui/Photo';
import { Arrow } from '@/components/ui/Arrow';
import { buttonClass } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

export async function LocationCard({
  location,
  index,
  detailed = false,
  headingLevel = 3,
  priority = false,
}: {
  location: PracticeLocation;
  index: number;
  detailed?: boolean;
  headingLevel?: 2 | 3;
  /** first card above the fold on the locations page = LCP image */
  priority?: boolean;
}) {
  const t = await getTranslations('common');
  const tl = await getTranslations('locations');
  const locale = (await getLocale()) as 'sq' | 'en';
  const H = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <article className="group flex h-full flex-col bg-white" data-reveal-item>
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="h-full w-full">
          {location.image ? (
            <div className="relative h-full w-full bg-sand">
              <Photo photo={location.image} locale={locale} priority={priority} sizes="(min-width: 1024px) 45vw, 92vw" />
            </div>
          ) : (
            <Placeholder token={location.imagePlaceholder} label={t('imagePlaceholder')} tone={index % 2 ? 'ivory' : 'sand'} />
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-7 sm:p-10">
        <p className="text-label text-grey">
          {location.city[locale]}, {location.country[locale]}
        </p>
        <H className="text-h3 mt-2">{location.name}</H>

        <dl className="mt-8 grid gap-5 border-t border-line pt-7 text-[0.9375rem]">
          <div className="grid grid-cols-[7.5rem_1fr] gap-4">
            <dt className="text-grey">{t('address')}</dt>
            <dd>{location.address ?? <span className="text-grey">{t('toBeConfirmed')}</span>}</dd>
          </div>
          <div className="grid grid-cols-[7.5rem_1fr] gap-4">
            <dt className="text-grey">{t('hours')}</dt>
            <dd>
              {location.hours ? (
                <ul>
                  {location.hours.map((h, i) => (
                    <li key={i}>
                      {h.days[locale]}: {h.hours}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-grey">{t('toBeConfirmed')}</span>
              )}
            </dd>
          </div>
          {detailed && (
            <>
              <div className="grid grid-cols-[7.5rem_1fr] gap-4">
                <dt className="text-grey">{t('phone')}</dt>
                <dd>
                  {location.phone ? (
                    <a href={`tel:${location.phone.replace(/\s/g, '')}`} className="link-underline-static tap-area tabular-nums">{location.phone}</a>
                  ) : (
                    <span className="text-grey">{t('toBeConfirmed')}</span>
                  )}
                </dd>
              </div>
              <div className="grid grid-cols-[7.5rem_1fr] gap-4">
                <dt className="text-grey">{t('accessibility')}</dt>
                <dd>{location.accessibility?.[locale] ?? <span className="text-grey">{t('toBeConfirmed')}</span>}</dd>
              </div>
            </>
          )}
        </dl>

        <div className="mt-auto flex flex-col items-start gap-x-8 gap-y-4 pt-10 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href={{ pathname: '/book-appointment', query: { location: location.id } }}
            className={cn(buttonClass('primary'), 'w-full text-center sm:w-auto sm:whitespace-nowrap')}
          >
            {t('bookAtLocation')}
            <Arrow />
          </Link>
          <a
            href={location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass('text')}
          >
            <span className="link-underline pb-0.5">{t('getDirections')}</span>
            <span className="sr-only"> – {location.name} {t('opensInNewTab')}</span>
            <Arrow direction="up-right" className="w-4" />
          </a>
        </div>
        {detailed && <p className="mt-5 text-[0.8125rem] text-grey">{tl('mapNote')}</p>}
      </div>
    </article>
  );
}
