import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { LegalBody } from '@/components/layout/LegalPage';
import { privacySections } from '@/content/legal';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, title: t('privacy.title'), description: t('privacy.description'), pathname: '/privacy', siteName: t('siteName') });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('privacy');
  const tn = await getTranslations('nav');
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} crumbs={[{ label: tn('privacy') }]} />
      <LegalBody sections={privacySections} locale={locale} draftNote={t('draft')} />
    </>
  );
}
