import { getLocale, getTranslations } from 'next-intl/server';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import { TestimonialSlider } from '@/components/testimonials/TestimonialSlider';
import { testimonials } from '@/content/testimonials';
import { isPublicStatus } from '@/lib/content';
import { site } from '@/config/site';

/**
 * Only real, consented testimonials are shown. Without them the section is not rendered publicly;
 * in preview mode a clearly marked "not publishable" placeholder is shown instead.
 */
export function getPublishableTestimonials() {
  return testimonials.filter((x) => isPublicStatus(x.status) && x.consentReference);
}

export async function TestimonialsSection() {
  const items = getPublishableTestimonials();
  const show = site.testimonialsPublished && items.length > 0;
  if (!show && !site.contentPreview) return null;

  const t = await getTranslations('home.testimonials');
  const tt = await getTranslations('testimonials');
  const tc = await getTranslations('common');
  const locale = (await getLocale()) as 'sq' | 'en';

  return (
    <Section tone="white" labelledBy="testimonials-title">
      <div className="container-x">
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <h2 id="testimonials-title" className="sr-only">
          {t('title')}
        </h2>
        <div className="mt-10">
          {show ? (
            <TestimonialSlider
              label={t('title')}
              items={items.map((x) => ({ id: x.id, quote: x.quote[locale], attribution: x.attribution[locale] }))}
            />
          ) : (
            <div className="border border-dashed border-bronze-deep/50 p-8 lg:p-12">
              <p className="text-label text-bronze-deep">{tc('notPublished')}</p>
              <p className="text-h3 mt-4 max-w-3xl text-grey">{tt('empty')}</p>
              <p className="mt-4 max-w-2xl text-[0.9375rem] text-grey">{tt('lead')}</p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
