import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata, absoluteUrl } from '@/lib/seo';
import { physicianSchema, clinicSchemas } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Hero } from '@/components/home/Hero';
import { TrustIntro } from '@/components/home/TrustIntro';
import { AboutTeaser } from '@/components/home/AboutTeaser';
import { TreatmentsSection } from '@/components/home/TreatmentsSection';
import { Philosophy } from '@/components/home/Philosophy';
import { LocationsSection } from '@/components/home/LocationsSection';
import { PatientJourney } from '@/components/home/PatientJourney';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { EducationSection } from '@/components/home/EducationSection';
import { BookingCta } from '@/components/home/BookingCta';
import { IntroLoader } from '@/components/intro/IntroLoader';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, title: t('home.title'), description: t('home.description'), pathname: '/', siteName: t('siteName') });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ti = await getTranslations('intro');
  return (
    <>
      <IntroLoader labels={{ acl: ti('acl'), aclShort: ti('aclShort'), meniscus: ti('meniscus'), cartilage: ti('cartilage') }} />
      <JsonLd data={[physicianSchema(locale, absoluteUrl(locale, '/')), ...clinicSchemas(locale)]} />
      <Hero />
      <TrustIntro />
      <AboutTeaser />
      <TreatmentsSection />
      <Philosophy />
      <LocationsSection />
      <PatientJourney />
      <TestimonialsSection />
      <EducationSection />
      <BookingCta />
    </>
  );
}
