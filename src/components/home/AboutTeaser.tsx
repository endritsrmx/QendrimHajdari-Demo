import { getLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Photo } from '@/components/ui/Photo';
import { media } from '@/content/media';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { DoctorBio } from '@/components/home/DoctorBio';

export async function AboutTeaser() {
  const t = await getTranslations('home.about');
  const tc = await getTranslations('common');
  const locale = (await getLocale()) as Locale;
  return (
    <Section labelledBy="about-title" className="pt-0">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[55fr_45fr] lg:gap-20">
        <div className="relative aspect-[5/6] overflow-hidden lg:aspect-[11/12]" data-reveal="image">
          <div className="absolute -inset-y-8 inset-x-0" data-parallax="30">
            <div className="relative h-full w-full bg-sand" data-reveal-zoom>
              <Photo photo={media.workshopKnee} locale={locale} sizes="(min-width: 1024px) 50vw, 92vw" />
            </div>
          </div>
        </div>
        <div>
          <h2 id="about-title" className="text-h2" data-reveal="text">
            {t('title')}
          </h2>
          <p className="text-lead mt-6 text-grey" data-reveal="fade">
            {t('subtitle')}
          </p>
          <div className="mt-8" data-reveal="fade">
            <DoctorBio />
          </div>
          <div className="mt-10" data-reveal="fade">
            <ButtonLink href="/about" variant="text">
              {tc('meetDoctor')}
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
