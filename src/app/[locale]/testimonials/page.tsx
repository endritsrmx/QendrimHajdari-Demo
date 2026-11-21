import type { Metadata } from 'next';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/config/site';
import { PageHero } from '@/components/layout/PageHero';
import { TestimonialSlider } from '@/components/testimonials/TestimonialSlider';
import { getPublishableTestimonials } from '@/components/home/TestimonialsSection';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const publishable = site.testimonialsPublished && getPublishableTestimonials().length > 0;
  return buildMetadata({ locale, title: t('testimonials.title'), description: t('testimonials.description'), pathname: '/testimonials', noindex: !publishable, siteName: t('siteName') });
}

export default async function TestimonialsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('testimonials');
  const tn = await getTranslations('nav');
  const l = (await getLocale()) as Locale;
  const items = site.testimonialsPublished ? getPublishableTestimonials() : [];
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} lead={t('lead')} crumbs={[{ label: tn('testimonials') }]} />
      <section className="bg-ivory pb-[var(--section-y)]">
        <div className="container-x">
          {items.length > 0 ? (
            <TestimonialSlider label={t('title')} items={items.map((x) => ({ id: x.id, quote: x.quote[l], attribution: x.attribution[l] }))} />
          ) : (
            <p className="text-h3 max-w-3xl text-grey">{t('empty')}</p>
          )}
        </div>
      </section>
    </>
  );
}
