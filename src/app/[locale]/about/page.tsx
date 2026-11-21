import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { buildMetadata, absoluteUrl } from '@/lib/seo';
import { breadcrumbSchema, physicianSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Photo } from '@/components/ui/Photo';
import { Annotation } from '@/components/ui/Annotation';
import { media } from '@/content/media';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { DoctorBio } from '@/components/home/DoctorBio';
import { Philosophy } from '@/components/home/Philosophy';
import { LocationsSection } from '@/components/home/LocationsSection';
import { BookingCta } from '@/components/home/BookingCta';
import { doctor } from '@/content/doctor';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, title: t('about.title'), description: t('about.description'), pathname: '/about', siteName: t('siteName') });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');
  const tn = await getTranslations('nav');

  const listSections: { title: string; items: string[] | null }[] = [
    { title: t('educationTitle'), items: doctor.education?.map((e) => `${e.title} – ${e.institution} (${e.year})`) ?? null },
    { title: t('qualificationsTitle'), items: doctor.qualifications },
    { title: t('trainingTitle'), items: doctor.furtherTraining },
    { title: t('membershipsTitle'), items: doctor.memberships },
  ];

  return (
    <>
      <JsonLd
        data={[
          physicianSchema(locale, absoluteUrl(locale, '/about')),
          breadcrumbSchema([
            { name: tn('home'), url: absoluteUrl(locale, '/') },
            { name: tn('about'), url: absoluteUrl(locale, '/about') },
          ]),
        ]}
      />

      {/* 1 · Editorial hero with portrait */}
      <section aria-labelledby="page-title" className="bg-ivory pt-32 pb-20 lg:pt-44 lg:pb-32">
        <div className="container-x">
          <div data-reveal="fade" data-reveal-start="top 100%">
            <Breadcrumbs items={[{ label: tn('about') }]} />
          </div>
          <div className="grid-12 mt-14 items-end gap-y-12 lg:mt-20">
            <div className="col-span-4 lg:col-span-6">
              <h1 id="page-title" className="text-display" data-reveal="lines" data-reveal-delay="0.1" data-reveal-start="top 100%">
                <span className="reveal-mask"><span>Dr. Qëndrim</span></span>
                <span className="reveal-mask"><span>Hajdari</span></span>
              </h1>
              <p className="text-lead mt-8 max-w-lg text-grey" data-reveal="fade" data-reveal-delay="0.4" data-reveal-start="top 100%">
                {t('lead')}
              </p>
            </div>
            <div className="relative col-span-4 lg:col-span-5 lg:col-start-8">
              <div aria-hidden className="absolute -top-8 -right-[var(--gutter)] -bottom-8 left-1/3 bg-sand" />
              <div className="relative aspect-[4/5] overflow-hidden" data-reveal="image" data-reveal-delay="0.2" data-reveal-start="top 100%">
                <div className="relative h-full w-full bg-sand" data-reveal-zoom>
                  <Photo photo={media.portraitWhiteCoat} locale={locale} priority sizes="(min-width: 1024px) 40vw, 92vw" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · Personal introduction */}
      <section aria-labelledby="intro-title" className="section-y bg-white">
        <div className="container-x grid-12 gap-y-8">
          <div className="col-span-4 lg:col-span-4">
            <h2 id="intro-title" className="text-h2" data-reveal="text">{t('introTitle')}</h2>
          </div>
          <div className="col-span-4 self-end lg:col-span-7 lg:col-start-6" data-reveal="fade">
            <DoctorBio />
          </div>
        </div>
      </section>

      {/* 3 · Medical career – vertical timeline (shown once verified entries exist; until then the
             qualification blocks below already state that details follow after verification) */}
      {doctor.careerVerified && (
      <section aria-labelledby="career-title" className="section-y bg-ivory">
        <div className="container-x grid-12 gap-y-10">
          <div className="col-span-4 lg:col-span-4">
            <h2 id="career-title" className="text-h2" data-reveal="text">{t('careerTitle')}</h2>
          </div>
          <ol className="relative col-span-4 lg:col-span-7 lg:col-start-6" data-scrub-trigger data-reveal="stagger">
            <div aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line">
              <div className="h-full w-full origin-top bg-slate" data-scrub-line="y" />
            </div>
            {doctor.career.map((c, i) => (
              <li key={i} data-reveal-item className="relative pb-12 pl-12 last:pb-0">
                <span aria-hidden className="absolute top-1.5 left-0 flex size-[15px] items-center justify-center rounded-full border border-slate bg-ivory">
                  <span className="size-[5px] rounded-full bg-bronze" />
                </span>
                <p className="text-[0.8125rem] text-grey tabular-nums">{c.year}</p>
                <h3 className="text-h3 mt-2 break-words">{c.title}</h3>
                <p className="mt-2 text-grey">{c.institution}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      )}

      {/* Clinical practice – editorial photo sequence */}
      <section aria-labelledby="gallery-title" className="section-y bg-sand">
        <div className="container-x">
          <h2 id="gallery-title" className="text-h2 max-w-[18ch]" data-reveal="text">
            {t('galleryTitle')}
          </h2>
          <div className="grid-12 mt-14 gap-y-12 lg:mt-20">
            {[
              { photo: media.orScrubsPortrait, caption: t('captionTheatre'), cls: 'col-span-4 lg:col-span-5', ratio: 'aspect-[3/4]' },
              { photo: media.orTeamScrubs, caption: t('captionTeam'), cls: 'col-span-4 lg:col-span-4 lg:mt-32', ratio: 'aspect-[3/4]' },
              { photo: media.workshopKnee, caption: t('captionTraining'), cls: 'col-span-4 lg:col-span-3 lg:self-end', ratio: 'aspect-[11/12]' },
            ].map(({ photo, caption, cls, ratio }) => (
              <figure key={photo.src} className={cls}>
                <div className={`relative overflow-hidden ${ratio}`} data-reveal="image">
                  <div className="relative h-full w-full bg-sand" data-reveal-zoom>
                    <Photo photo={photo} locale={locale} sizes="(min-width: 1024px) 34vw, 92vw" />
                  </div>
                </div>
                <figcaption className="mt-4">
                  <Annotation>{caption}</Annotation>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 4–7 · Education, qualifications, further training, memberships */}
      <section aria-label={`${t('educationTitle')}, ${t('qualificationsTitle')}`} className="section-y bg-white">
        <div className="container-x grid gap-x-12 gap-y-14 md:grid-cols-2">
          {listSections.map((s) => (
            <div key={s.title} data-reveal="fade">
              <div className="h-px w-full bg-line" data-reveal="divider" />
              <h2 className="text-h3 mt-7">{s.title}</h2>
              {s.items && s.items.length > 0 ? (
                <ul className="mt-5 space-y-2 text-grey">
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-grey">{t('pendingVerification')}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8 · Philosophy */}
      <Philosophy />
      {/* 9 · Locations */}
      <LocationsSection />
      {/* 10 · Booking CTA */}
      <BookingCta />
    </>
  );
}
