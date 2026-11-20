import { getTranslations } from 'next-intl/server';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';
import { Placeholder } from '@/components/ui/Placeholder';
import { Section } from '@/components/ui/Section';
import { doctor } from '@/content/doctor';
import { DoctorBio } from '@/components/home/DoctorBio';

export async function AboutTeaser() {
  const t = await getTranslations('home.about');
  const tc = await getTranslations('common');
  return (
    <Section labelledBy="about-title" className="pt-0">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[55fr_45fr] lg:gap-20">
        <div className="relative aspect-[5/6] overflow-hidden lg:aspect-[11/12]" data-reveal="image">
          <div className="absolute -inset-y-8 inset-x-0" data-parallax="30">
            <div className="h-full w-full" data-reveal-zoom>
              {doctor.portrait ? null : <Placeholder token="[PORTRAIT_DOCTOR]" label={tc('imagePlaceholder')} />}
            </div>
          </div>
        </div>
        <div>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h2 id="about-title" className="text-h2 mt-7" data-reveal="text">
            {t('title')}
          </h2>
          <p className="text-h3 mt-6 italic text-grey" data-reveal="fade">
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
