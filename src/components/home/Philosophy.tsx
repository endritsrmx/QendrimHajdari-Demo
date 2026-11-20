import { getLocale, getTranslations } from 'next-intl/server';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Photo } from '@/components/ui/Photo';
import { media } from '@/content/media';
import { Section } from '@/components/ui/Section';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { philosophy } from '@/content/home';
import { filterRenderable } from '@/lib/content';

export async function Philosophy({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const t = await getTranslations('home.philosophy');
  const locale = (await getLocale()) as 'sq' | 'en';
  const items = filterRenderable(philosophy);
  const H = headingLevel === 2 ? 'h2' : 'h3';
  const Hi = headingLevel === 2 ? 'h3' : 'h4';

  return (
    <Section labelledBy="philosophy-title">
      <div className="container-x">
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <H id="philosophy-title" className="text-h1 mt-7 max-w-[18ch]" data-reveal="text">
          {t('title')}
        </H>
        <div className="grid-12 mt-16 gap-y-12 lg:mt-24">
          <div className="relative col-span-4 aspect-[4/5] overflow-hidden lg:col-span-5" data-reveal="image">
            <div className="relative h-full w-full bg-slate" data-reveal-zoom>
              <Photo photo={media.surgeryInProgress} locale={locale} sizes="(min-width: 1024px) 40vw, 92vw" />
            </div>
          </div>
          <ol
            className="col-span-4 flex flex-col justify-center lg:col-span-6 lg:col-start-7"
            data-reveal="stagger"
            data-reveal-x="-24"
            data-reveal-duration="0.7"
            data-reveal-ease="power3.out"
          >
            {items.map((p) => (
              <li key={p.number} data-reveal-item className="relative border-l border-line py-8 pl-8 lg:pl-12">
                <span aria-hidden className="absolute top-8 -left-px h-10 w-px bg-bronze" />
                <span className="text-[0.75rem] font-medium tracking-[0.16em] text-bronze-deep tabular-nums">{p.number}</span>
                <Hi className="text-h3 mt-3">{p.title[locale]}</Hi>
                <p className="mt-4 max-w-md text-grey">{p.text[locale]}</p>
                <StatusBadge status={p.status} className="mt-4" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
