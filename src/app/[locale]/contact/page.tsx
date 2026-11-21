import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { ContactForm } from '@/components/forms/ContactForm';
import { MedicalNotice } from '@/components/ui/MedicalNotice';
import { locations } from '@/config/locations';
import { brand } from '@/config/brand';

type Props = { params: Promise<{ locale: Locale }>; searchParams: Promise<{ location?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, title: t('contact.title'), description: t('contact.description'), pathname: '/contact', siteName: t('siteName') });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('common');

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} crumbs={[{ label: tn('contact') }]} />
      <section className="bg-ivory pb-[var(--section-y)]">
        <div className="container-x grid-12 gap-y-16">
          <aside className="col-span-4 lg:col-span-4">
            <h2 className="text-h3">{t('direct')}</h2>
            <dl className="mt-8 space-y-6 text-[0.9375rem]">
              <div>
                <dt className="text-label text-grey">{tc('phone')}</dt>
                <dd className="mt-1">
                  {brand.phone ? (
                    <a className="link-underline-static tap-area tabular-nums" href={`tel:${brand.phone.replace(/\s/g, '')}`}>{brand.phone}</a>
                  ) : (
                    <span className="text-grey">{tc('toBeConfirmed')}</span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-label text-grey">{tc('email')}</dt>
                <dd className="mt-1">
                  {brand.email ? (
                    <a className="link-underline-static" href={`mailto:${brand.email}`}>{brand.email}</a>
                  ) : (
                    <span className="text-grey">{tc('toBeConfirmed')}</span>
                  )}
                </dd>
              </div>
              {locations.map((l) => (
                <div key={l.id} className="border-t border-line pt-6">
                  <dt className="font-medium">{l.name}</dt>
                  <dd className="mt-1 text-grey">
                    {l.address ?? tc('addressPending')}
                    <br />
                    {l.city[locale]}, {l.country[locale]}
                  </dd>
                </div>
              ))}
            </dl>
            <MedicalNotice className="mt-12" />
          </aside>
          <div className="col-span-4 bg-white p-6 sm:p-10 lg:col-span-7 lg:col-start-6 lg:p-14">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
