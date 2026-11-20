import { getTranslations } from 'next-intl/server';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import { LocationCard } from '@/components/locations/LocationCard';
import { locations } from '@/config/locations';

export async function LocationsSection() {
  const t = await getTranslations('home.locations');
  return (
    <Section tone="sand" labelledBy="locations-title">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-4 lg:col-span-7">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h2 id="locations-title" className="text-h2 mt-7" data-reveal="text">
              {t('title')}
            </h2>
          </div>
          <p className="col-span-4 text-grey lg:col-span-4 lg:col-start-9" data-reveal="fade">
            {t('lead')}
          </p>
        </div>
        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-8" data-reveal="stagger" data-reveal-duration="0.8">
          {locations.map((l, i) => (
            <LocationCard key={l.id} location={l} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
