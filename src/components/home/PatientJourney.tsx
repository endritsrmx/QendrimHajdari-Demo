import { getTranslations } from 'next-intl/server';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Section } from '@/components/ui/Section';

const STEPS = ['1', '2', '3', '4'] as const;

export async function PatientJourney() {
  const t = await getTranslations('home.journey');
  return (
    <Section labelledBy="journey-title">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-4 lg:col-span-8">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h2 id="journey-title" className="text-h2 mt-7 max-w-[20ch]" data-reveal="text">
              {t('title')}
            </h2>
          </div>
          <p className="col-span-4 text-[0.9375rem] text-grey lg:col-span-4" data-reveal="fade">
            {t('note')}
          </p>
        </div>

        <div className="relative mt-16 lg:mt-24" data-scrub-trigger>
          {/* desktop: horizontal line; mobile: vertical line */}
          <div aria-hidden className="absolute top-[7px] right-0 left-0 hidden h-px bg-line lg:block">
            <div className="h-full w-full origin-left bg-slate" data-scrub-line="x" />
          </div>
          <div aria-hidden className="absolute top-0 bottom-0 left-[7px] w-px bg-line lg:hidden">
            <div className="h-full w-full origin-top bg-slate" data-scrub-line="y" />
          </div>
          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-10" data-reveal="stagger" data-reveal-duration="0.5" data-reveal-stagger="0.08">
            {STEPS.map((s) => (
              <li key={s} data-reveal-item className="relative pl-12 lg:pl-0 lg:pt-14">
                <span aria-hidden className="absolute top-0 left-0 flex size-[15px] items-center justify-center rounded-full border border-slate bg-ivory">
                  <span className="size-[5px] rounded-full bg-bronze" />
                </span>
                <span className="text-[0.75rem] font-medium tracking-[0.16em] text-bronze-deep tabular-nums">0{s}</span>
                <h3 className="text-h3 mt-3">{t(`steps.${s}.title`)}</h3>
                <p className="mt-3 max-w-xs text-[0.9375rem] text-grey">{t(`steps.${s}.text`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
