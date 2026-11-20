import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { buildMetadata, absoluteUrl } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/layout/PageHero';
import { Illustration } from '@/components/ui/Illustration';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Arrow } from '@/components/ui/Arrow';
import { MedicalNotice } from '@/components/ui/MedicalNotice';
import { BookingCta } from '@/components/home/BookingCta';
import { treatments } from '@/content/treatments';
import { filterRenderable } from '@/lib/content';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, title: t('treatments.title'), description: t('treatments.description'), pathname: '/treatments', siteName: t('siteName') });
}

export default async function TreatmentsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('treatments');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('common');
  const items = filterRenderable(treatments);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: tn('home'), url: absoluteUrl(locale, '/') },
          { name: tn('treatments'), url: absoluteUrl(locale, '/treatments') },
        ])}
      />
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        lead={t('lead')}
        crumbs={[{ label: tn('treatments') }]}
        aside={<p className="border-l border-bronze pl-5 text-[0.875rem] text-grey">{t('spectrumNote')}</p>}
      />
      <section aria-label={tn('treatments')} className="bg-ivory pb-[var(--section-y)]">
        <div className="container-x">
          {items.length === 0 && <p className="text-grey">{tc('contentInReview')}</p>}
          <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
            {items.map((tr) => (
              <li key={tr.id} data-reveal-item>
                <article className="group relative flex h-full flex-col">
                  <div className="aspect-[4/5] overflow-hidden" data-cursor="view">
                    <div className="h-full w-full transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.04]">
                      <Illustration id={tr.illustration} label={tr.title[locale]} caption={tc('illustration')} />
                    </div>
                  </div>
                  <div className="mt-7 flex items-center justify-between gap-4">
                    <span className="text-[0.75rem] font-medium tracking-[0.16em] text-bronze-deep tabular-nums">{tr.number}</span>
                    <StatusBadge status={tr.status} />
                  </div>
                  <h2 className="text-h3 mt-3">{tr.title[locale]}</h2>
                  <p className="mt-4 text-[0.9375rem] text-grey">{tr.cardText[locale]}</p>
                  <Link
                    href={{ pathname: '/treatments/[slug]', params: { slug: tr.slug[locale] } }}
                    className="mt-auto inline-flex min-h-11 items-center gap-3 pt-6 text-[0.8125rem] font-medium uppercase tracking-[0.14em] after:absolute after:inset-0 after:content-['']"
                  >
                    <span className="link-underline">{tc('exploreTreatment')}</span>
                    <Arrow />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
          <MedicalNotice className="mt-24 max-w-3xl" />
        </div>
      </section>
      <BookingCta />
    </>
  );
}
