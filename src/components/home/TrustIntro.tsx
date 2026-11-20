import { getLocale, getTranslations } from 'next-intl/server';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';
import { pillars } from '@/content/home';

export async function TrustIntro() {
  const t = await getTranslations('home.trust');
  const locale = (await getLocale()) as 'sq' | 'en';
  return (
    <Section labelledBy="trust-title">
      <div className="container-x">
        <div className="grid-12 gap-y-8">
          <div className="col-span-4 lg:col-span-6">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h2 id="trust-title" className="text-h2 mt-7" data-reveal="text">
              {t('title')}
            </h2>
          </div>
          <p className="text-lead col-span-4 self-end text-grey lg:col-span-5 lg:col-start-8" data-reveal="fade">
            {t('text')}
          </p>
        </div>
        <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-3 lg:gap-12" data-reveal="stagger" data-reveal-duration="0.65">
          {pillars.map((p, i) => (
            <div key={i} data-reveal-item>
              <div className="h-px w-full bg-line" data-reveal="divider" />
              <div className="mt-7 flex items-baseline gap-5">
                <span className="text-[0.75rem] font-medium tracking-[0.14em] text-bronze-deep tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-h3">{p.title[locale]}</h3>
                  <p className="mt-3 max-w-sm text-grey">{p.text[locale]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
