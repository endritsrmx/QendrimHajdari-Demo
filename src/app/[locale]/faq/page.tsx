import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata, absoluteUrl } from '@/lib/seo';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/layout/PageHero';
import { Accordion } from '@/components/ui/Accordion';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { MedicalNotice } from '@/components/ui/MedicalNotice';
import { BookingCta } from '@/components/home/BookingCta';
import { generalFaq } from '@/content/faq';
import { treatments } from '@/content/treatments';
import { filterRenderable, isPublicStatus } from '@/lib/content';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, title: t('faq.title'), description: t('faq.description'), pathname: '/faq', siteName: t('siteName') });
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('faq');
  const tn = await getTranslations('nav');
  const general = filterRenderable(generalFaq);
  const byTreatment = filterRenderable(treatments)
    .map((tr) => ({ tr, faqs: filterRenderable(tr.faq) }))
    .filter((x) => x.faqs.length > 0);
  // FAQPage markup only for approved answers
  const approved = [...generalFaq, ...treatments.flatMap((tr) => tr.faq)].filter((f) => isPublicStatus(f.status));

  const toItems = (list: typeof generalFaq) =>
    list.map((f) => ({
      id: f.id,
      title: f.question[locale],
      content: <p>{f.answer[locale]}</p>,
      badge: isPublicStatus(f.status) ? undefined : <StatusBadge status={f.status} />,
    }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: tn('home'), url: absoluteUrl(locale, '/') },
            { name: tn('faq'), url: absoluteUrl(locale, '/faq') },
          ]),
          ...(approved.length > 0 ? [faqSchema(approved.map((f) => ({ question: f.question[locale], answer: f.answer[locale] })))] : []),
        ]}
      />
      <PageHero eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} crumbs={[{ label: tn('faq') }]} />
      <section className="bg-ivory pb-[var(--section-y)]">
        <div className="container-x grid-12 gap-y-16">
          <div className="col-span-4 lg:col-span-3">
            <h2 className="text-h3">{t('general')}</h2>
          </div>
          <Accordion className="col-span-4 lg:col-span-8 lg:col-start-5" items={toItems(general)} />
          {byTreatment.length > 0 && (
            <>
              <div className="col-span-4 lg:col-span-3">
                <h2 className="text-h3">{t('byTreatment')}</h2>
              </div>
              <div className="col-span-4 space-y-12 lg:col-span-8 lg:col-start-5">
                {byTreatment.map(({ tr, faqs }) => (
                  <div key={tr.id}>
                    <p className="text-label mb-4 text-grey">{tr.title[locale]}</p>
                    <Accordion items={toItems(faqs)} />
                  </div>
                ))}
              </div>
            </>
          )}
          <MedicalNotice className="col-span-4 lg:col-span-8 lg:col-start-5" />
        </div>
      </section>
      <BookingCta />
    </>
  );
}
