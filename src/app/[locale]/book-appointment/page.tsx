import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { BookingFlow } from '@/components/booking/BookingFlow';
import { MedicalNotice } from '@/components/ui/MedicalNotice';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, title: t('book.title'), description: t('book.description'), pathname: '/book-appointment', siteName: t('siteName') });
}

export default async function BookPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('booking');
  const tn = await getTranslations('nav');
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} crumbs={[{ label: tn('book') }]} />
      <section className="bg-ivory pb-[var(--section-y)]">
        <div className="container-x">
          <Suspense fallback={<div className="min-h-96" aria-busy="true" />}>
            <BookingFlow />
          </Suspense>
          <MedicalNotice className="mt-20 max-w-3xl" />
        </div>
      </section>
    </>
  );
}
