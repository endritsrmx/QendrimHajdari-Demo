import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Section } from '@/components/ui/Section';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Illustration } from '@/components/ui/Illustration';
import { articles } from '@/content/articles';
import { getTreatmentById } from '@/content/treatments';
import { filterRenderable } from '@/lib/content';

export async function EducationSection() {
  const t = await getTranslations('home.education');
  const tc = await getTranslations('common');
  const locale = (await getLocale()) as 'sq' | 'en';
  const items = filterRenderable(articles);
  if (items.length === 0) return null;

  return (
    <Section labelledBy="education-title">
      <div className="container-x">
        <h2 id="education-title" className="text-h2 max-w-[18ch]" data-reveal="text">
          {t('title')}
        </h2>
        <ul className="mt-14 grid gap-10 md:grid-cols-3 lg:mt-20 lg:gap-8" data-reveal="stagger">
          {items.map((a) => {
            const tr = getTreatmentById(a.relatedTreatment);
            return (
              <li key={a.id} data-reveal-item>
                <article className="group relative flex h-full flex-col">
                  <div className="aspect-[4/3] overflow-hidden">
                    <div className="h-full w-full">
                      <Illustration id={tr?.illustration ?? 'knee-consultation'} label={a.title[locale]} caption={tc('illustration')} />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-4 text-[0.75rem] text-grey">
                    <span>{tc('minRead', { minutes: a.readingTime })}</span>
                    <StatusBadge status={a.status} />
                  </div>
                  <h3 className="text-h3 mt-4">{a.title[locale]}</h3>
                  <p className="mt-3 text-[0.9375rem] text-grey">{a.excerpt[locale]}</p>
                  {tr && (
                    <Link
                      href={{ pathname: '/treatments/[slug]', params: { slug: tr.slug[locale] } }}
                      className="mt-6 inline-flex min-h-11 items-center gap-3 text-[0.8125rem] font-medium after:absolute after:inset-0 after:content-['']"
                    >
                      <span className="link-underline">{tc('learnMore')}</span>
                    </Link>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
