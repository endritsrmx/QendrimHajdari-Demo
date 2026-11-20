import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata, absoluteUrl } from '@/lib/seo';
import { breadcrumbSchema, clinicSchemas } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/layout/PageHero';
import { LocationCard } from '@/components/locations/LocationCard';
import { MedicalNotice } from '@/components/ui/MedicalNotice';
import { BookingCta } from '@/components/home/BookingCta';
import { locations } from '@/config/locations';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, title: t('locations.title'), description: t('locations.description'), pathname: '/locations', siteName: t('siteName') });
}

export default async function LocationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('locations');
  const tn = await getTranslations('nav');
  return (
    <>
      <JsonLd
        data={[
          ...clinicSchemas(locale),
          breadcrumbSchema([
            { name: tn('home'), url: absoluteUrl(locale, '/') },
            { name: tn('locations'), url: absoluteUrl(locale, '/locations') },
          ]),
        ]}
      />
      <PageHero eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} crumbs={[{ label: tn('locations') }]} />
      <section aria-label={tn('locations')} className="bg-ivory pb-[var(--section-y)]">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8" data-reveal="stagger" data-reveal-duration="0.8">
            {locations.map((l, i) => (
              <LocationCard key={l.id} location={l} index={i} detailed headingLevel={2} />
            ))}
          </div>
          <MedicalNotice className="mt-20 max-w-3xl" />
        </div>
      </section>
      <BookingCta />
    </>
  );
}
