import { getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/Button';
import { Monogram } from '@/components/brand/Logo';

export async function BookingCta() {
  const t = await getTranslations('home.cta');
  return (
    <section aria-labelledby="cta-title" className="section-y relative overflow-hidden bg-sand">
      <Monogram className="pointer-events-none absolute -right-24 -bottom-24 size-[28rem] opacity-[0.07]" />
      <div className="container-x relative text-center">
        <h2 id="cta-title" className="text-h1 mx-auto max-w-[16ch]" data-reveal="text">
          {t('title')}
        </h2>
        <p className="text-lead mx-auto mt-7 max-w-xl text-grey" data-reveal="fade">
          {t('sub')}
        </p>
        <div className="mt-12" data-reveal="fade">
          <ButtonLink href="/book-appointment">{t('button')}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
