import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/config/site';
import { PageHero } from '@/components/layout/PageHero';
import { MedicalNotice } from '@/components/ui/MedicalNotice';

type Props = { params: Promise<{ locale: Locale }> };

/**
 * Results page – prepared but NOT public by default (noindex, excluded from navigation & sitemap).
 * Set NEXT_PUBLIC_RESULTS_PUBLISHED=true only after medical, legal and data-protection approval
 * and once real, consented case information has been added.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({
    locale,
    title: t('results.title'),
    description: t('results.description'),
    pathname: '/results',
    noindex: !site.resultsPublished,
    siteName: t('siteName'),
  });
}

export default async function ResultsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('results');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('common');
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} crumbs={[{ label: tn('results') }]} />
      <section className="bg-ivory pb-[var(--section-y)]">
        <div className="container-x max-w-4xl">
          <div className="border border-dashed border-bronze-deep/50 bg-white/60 p-8 lg:p-12">
            <p className="text-label text-bronze-deep">{tc('notPublished')}</p>
            <p className="mt-5 text-grey">{t('notice')}</p>
            <p className="mt-8 text-h3 italic text-grey">{t('empty')}</p>
          </div>
          <MedicalNotice className="mt-14" />
        </div>
      </section>
    </>
  );
}
