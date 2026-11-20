import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { buildMetadata, absoluteUrl } from '@/lib/seo';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Illustration } from '@/components/ui/Illustration';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Accordion } from '@/components/ui/Accordion';
import { ButtonLink } from '@/components/ui/Button';
import { Arrow } from '@/components/ui/Arrow';
import { MedicalNotice } from '@/components/ui/MedicalNotice';
import { BookingCta } from '@/components/home/BookingCta';
import { treatments, getTreatmentBySlug, getTreatmentById } from '@/content/treatments';
import { filterRenderable, isPublicStatus, isRenderable } from '@/lib/content';

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => treatments.map((t) => ({ locale, slug: t.slug[locale] })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const tr = getTreatmentBySlug(locale, decodeURIComponent(slug));
  if (!tr) return {};
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({
    locale,
    title: `${tr.title[locale]} | ${t('treatmentSuffix')}`,
    description: tr.seoDescription[locale],
    hrefFor: (l) => ({ pathname: '/treatments/[slug]', params: { slug: tr.slug[l] } }),
    noindex: !isPublicStatus(tr.status),
    siteName: t('siteName'),
  });
}

const SECTION_KEYS = ['intro', 'anatomy', 'symptoms', 'diagnostics', 'conservative', 'operative', 'aftercare', 'risks', 'faq'] as const;

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-4">
      {items.map((it, i) => (
        <li key={i} className="flex gap-5 text-grey">
          <span aria-hidden className="mt-[0.8em] h-px w-5 shrink-0 bg-bronze" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Block({ id, title, children, note }: { id: string; title: string; children: React.ReactNode; note?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-line py-12 first:border-t-0 first:pt-0 lg:py-16" data-reveal="fade">
      <h2 id={`${id}-title`} className="text-h3">{title}</h2>
      <div className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-grey">{children}</div>
      {note && <p className="mt-6 border-l border-bronze pl-4 text-[0.875rem] text-grey">{note}</p>}
    </section>
  );
}

export default async function TreatmentPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const tr = getTreatmentBySlug(locale, decodeURIComponent(slug));
  if (!tr) notFound();

  const t = await getTranslations('treatments');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('common');
  const renderable = isRenderable(tr.status);
  const faqs = filterRenderable(tr.faq);
  const related = tr.related.map(getTreatmentById).filter((x): x is NonNullable<typeof x> => !!x && isRenderable(x.status));
  const url = absoluteUrl(locale, { pathname: '/treatments/[slug]', params: { slug: tr.slug[locale] } });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: tn('home'), url: absoluteUrl(locale, '/') },
            { name: tn('treatments'), url: absoluteUrl(locale, '/treatments') },
            { name: tr.title[locale], url },
          ]),
          // FAQPage markup only for medically approved FAQ content
          ...(tr.faq.some((f) => isPublicStatus(f.status))
            ? [faqSchema(tr.faq.filter((f) => isPublicStatus(f.status)).map((f) => ({ question: f.question[locale], answer: f.answer[locale] })))]
            : []),
        ]}
      />

      {/* 1 · Treatment hero */}
      <section aria-labelledby="page-title" className="bg-ivory pt-32 pb-16 lg:pt-44 lg:pb-24">
        <div className="container-x">
          <div data-reveal="fade" data-reveal-start="top 100%">
            <Breadcrumbs items={[{ label: tn('treatments'), href: '/treatments' }, { label: tr.title[locale] }]} />
          </div>
          <div className="grid-12 mt-14 items-end gap-y-12 lg:mt-20">
            <div className="col-span-4 lg:col-span-7">
              <div className="flex flex-wrap items-center gap-4" data-reveal="fade" data-reveal-start="top 100%">
                <span className="text-label text-grey">{tn('treatments')} · {tr.number}</span>
                <StatusBadge status={tr.status} />
              </div>
              <h1 id="page-title" className="text-h1 mt-7 hyphens-auto break-words" lang={locale} data-reveal="lines" data-reveal-delay="0.1" data-reveal-start="top 100%">
                <span className="reveal-mask"><span>{tr.title[locale]}</span></span>
              </h1>
              <p className="text-lead mt-8 max-w-2xl text-grey" data-reveal="fade" data-reveal-delay="0.35" data-reveal-start="top 100%">
                {tr.heroLead[locale]}
              </p>
              <div className="mt-10" data-reveal="fade" data-reveal-delay="0.5" data-reveal-start="top 100%">
                <ButtonLink href="/book-appointment">{tc('bookConsultation')}</ButtonLink>
              </div>
            </div>
            <div className="col-span-4 aspect-[4/5] overflow-hidden lg:col-span-4 lg:col-start-9" data-reveal="image" data-reveal-delay="0.2" data-reveal-start="top 100%">
              <Illustration id={tr.illustration} label={tr.title[locale]} caption={tc('illustration')} />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <div className="container-x grid-12 section-y gap-y-12">
          {/* sticky table of contents */}
          <nav aria-label={t('onThisPage')} className="col-span-4 hidden lg:col-span-3 lg:block">
            <div className="sticky top-32">
              <p className="text-label text-grey">{t('onThisPage')}</p>
              <ol className="mt-6 space-y-1 border-l border-line">
                {SECTION_KEYS.filter((k) => k !== 'faq' || faqs.length > 0).map((k) => (
                  <li key={k}>
                    <a href={`#${k}`} className="-ml-px block border-l border-transparent py-1.5 pl-5 text-[0.875rem] text-grey transition-colors hover:border-slate hover:text-slate">
                      {t(`sections.${k}`)}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="col-span-4 lg:col-span-8 lg:col-start-5">
            {!renderable ? (
              <p className="text-grey">{tc('contentInReview')}</p>
            ) : (
              <>
                <Block id="intro" title={t('sections.intro')}><p>{tr.intro[locale]}</p></Block>
                <Block id="anatomy" title={t('sections.anatomy')}><p>{tr.anatomy[locale]}</p></Block>
                <Block id="symptoms" title={t('sections.symptoms')}><List items={tr.symptoms[locale]} /></Block>
                <Block id="diagnostics" title={t('sections.diagnostics')}><List items={tr.diagnostics[locale]} /></Block>
                <Block id="conservative" title={t('sections.conservative')}><List items={tr.conservative[locale]} /></Block>
                <Block id="operative" title={t('sections.operative')} note={`${t('operativeNote')} [SURGICAL_PROCEDURE_DETAILS_APPROVED]`}>
                  <List items={tr.operative[locale]} />
                </Block>
                <Block id="aftercare" title={t('sections.aftercare')} note={t('aftercareNote')}><p>{tr.aftercare[locale]}</p></Block>
                <Block id="risks" title={t('sections.risks')}><List items={tr.risks[locale]} /></Block>
                {faqs.length > 0 && (
                  <section id="faq" aria-labelledby="faq-title" className="scroll-mt-28 border-t border-line py-12 lg:py-16">
                    <h2 id="faq-title" className="text-h3">{t('sections.faq')}</h2>
                    <Accordion
                      className="mt-8"
                      items={faqs.map((f) => ({ id: f.id, title: f.question[locale], content: <p>{f.answer[locale]}</p> }))}
                    />
                  </section>
                )}
              </>
            )}
            <MedicalNotice className="mt-10" />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="section-y bg-ivory">
          <div className="container-x">
            <h2 id="related-title" className="text-h2" data-reveal="text">{t('sections.related')}</h2>
            <ul className="mt-12 border-t border-line" data-reveal="stagger">
              {related.map((r) => (
                <li key={r.id} data-reveal-item className="border-b border-line">
                  <Link
                    href={{ pathname: '/treatments/[slug]', params: { slug: r.slug[locale] } }}
                    className="group flex items-center justify-between gap-6 py-7 transition-colors hover:bg-hover lg:px-4"
                  >
                    <span className="flex items-baseline gap-6">
                      <span className="text-[0.75rem] font-medium tracking-[0.16em] text-bronze-deep tabular-nums">{r.number}</span>
                      <span className="text-h3">{r.title[locale]}</span>
                    </span>
                    <Arrow />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <BookingCta />
    </>
  );
}
