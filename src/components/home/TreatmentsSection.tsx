import { getLocale, getTranslations } from 'next-intl/server';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { TreatmentCarousel } from '@/components/treatments/TreatmentCarousel';
import { treatments } from '@/content/treatments';
import { filterRenderable, isPublicStatus } from '@/lib/content';

export async function TreatmentsSection() {
  const t = await getTranslations('home.treatments');
  const tc = await getTranslations('common');
  const locale = (await getLocale()) as 'sq' | 'en';
  const cards = filterRenderable(treatments).map((tr) => ({
    id: tr.id,
    number: tr.number,
    title: tr.title[locale],
    text: tr.cardText[locale],
    slug: tr.slug[locale],
    illustration: tr.illustration,
    badge: isPublicStatus(tr.status) ? undefined : tc('statusReview'),
  }));

  return (
    <Section tone="sand" labelledBy="treatments-title" className="overflow-hidden">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-4 lg:col-span-8">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h2 id="treatments-title" className="text-h1 mt-7 max-w-[16ch]" data-reveal="text">
              {t('title')}
            </h2>
          </div>
          <div className="col-span-4 lg:col-span-4" data-reveal="fade">
            <p className="text-grey">{t('lead')}</p>
            <ButtonLink href="/treatments" variant="text" className="mt-5">
              {t('all')}
            </ButtonLink>
          </div>
        </div>
        <div className="mt-14 lg:mt-20" data-reveal="fade">
          {cards.length > 0 ? (
            <TreatmentCarousel cards={cards} label={t('carouselLabel')} />
          ) : (
            <p className="text-grey">{tc('contentInReview')}</p>
          )}
        </div>
      </div>
    </Section>
  );
}
