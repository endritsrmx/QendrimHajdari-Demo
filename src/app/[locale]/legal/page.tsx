import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { LegalBody } from '@/components/layout/LegalPage';
import { legalSections } from '@/content/legal';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, title: t('legal.title'), description: t('legal.description'), pathname: '/legal', siteName: t('siteName') });
}

export default async function LegalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('legal');
  const tn = await getTranslations('nav');
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} crumbs={[{ label: tn('legal') }]} />
      <LegalBody sections={legalSections} locale={locale} draftNote={t('draft')} />
    </>
  );
}
