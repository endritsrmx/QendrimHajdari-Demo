'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { locations, type LocationId } from '@/config/locations';
import { bookingConfig, getCalLink, type AppointmentTypeId } from '@/config/booking';
import { buttonClass } from '@/components/ui/Button';
import { Arrow } from '@/components/ui/Arrow';
import type { CalState } from './CalEmbed';
import { cn } from '@/lib/cn';

// The third-party embed is only downloaded after the user's explicit confirmation.
const CalEmbed = dynamic(() => import('./CalEmbed'), { ssr: false });

type Step = 1 | 2 | 3;

export function BookingFlow() {
  const t = useTranslations('booking');
  const locale = useLocale();
  const search = useSearchParams();
  const initial = locations.find((l) => l.id === search.get('location'))?.id ?? null;

  const [step, setStep] = useState<Step>(initial ? 2 : 1);
  const [location, setLocation] = useState<LocationId | null>(initial);
  const [type, setType] = useState<AppointmentTypeId | null>(null);
  const [consent, setConsent] = useState(false);
  const [calState, setCalState] = useState<CalState>('loading');
  const [reloadKey, setReloadKey] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // move focus to the step heading on step change (not on first render)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const onCalState = useCallback((s: CalState) => setCalState(s), []);

  const loc = location ? locations.find((l) => l.id === location)! : null;
  const calLink = location && type ? getCalLink(location, type) : null;

  const steps: { n: Step; label: string; value?: string }[] = [
    { n: 1, label: t('steps.location'), value: loc ? `${loc.name}, ${loc.city[locale as 'sq' | 'en']}` : undefined },
    { n: 2, label: t('steps.type'), value: type ? t('consultation') : undefined },
    { n: 3, label: t('steps.time') },
  ];

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      {/* progress / summary */}
      <ol className="lg:col-span-4" aria-label={t('step', { current: step, total: 3 })}>
        {steps.map((s) => {
          const done = s.n < step;
          const active = s.n === step;
          return (
            <li key={s.n} className="border-t border-line py-5 last:border-b">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-baseline gap-4">
                  <span
                    className={cn(
                      'text-[0.75rem] font-medium tabular-nums transition-colors duration-200',
                      active ? 'text-slate' : done ? 'text-bronze-deep' : 'text-grey/70',
                    )}
                  >
                    0{s.n}
                  </span>
                  <div>
                    <p className={cn('font-medium transition-colors duration-200', active || done ? 'text-slate' : 'text-grey')} aria-current={active ? 'step' : undefined}>
                      {s.label}
                    </p>
                    {s.value && done && <p className="mt-1 text-[0.875rem] text-grey">{s.value}</p>}
                  </div>
                </div>
                {done && (
                  <button
                    type="button"
                    onClick={() => setStep(s.n)}
                    className="pressable inline-flex min-h-11 items-center text-[0.8125rem] text-slate"
                  >
                    <span className="link-underline-static">{t('change')}</span>
                    <span className="sr-only"> – {s.label}</span>
                  </button>
                )}
              </div>
            </li>
          );
        })}
        <li className="pt-6 text-[0.8125rem] text-grey">{t('timezoneNote')}</li>
      </ol>

      <div className="lg:col-span-8">
        <div key={step} className="animate-[step-in_250ms_var(--ease-out)_both]">
          <p className="text-label text-grey">{t('step', { current: step, total: 3 })}</p>

          {step === 1 && (
            <fieldset className="mt-4">
              <legend>
                <h2 ref={headingRef} tabIndex={-1} className="text-h2 outline-none">
                  {t('chooseLocation')}
                </h2>
              </legend>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {locations.map((l) => (
                  <RadioCard
                    key={l.id}
                    name="location"
                    value={l.id}
                    checked={location === l.id}
                    onChange={() => setLocation(l.id)}
                    title={l.name}
                    subtitle={`${l.city[locale as 'sq' | 'en']}, ${l.country[locale as 'sq' | 'en']}`}
                    selectedLabel={t('selected')}
                  />
                ))}
              </div>
              <button type="button" disabled={!location} onClick={() => setStep(2)} className={buttonClass('primary', 'mt-10')}>
                {t('continue')}
                <Arrow />
              </button>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset className="mt-4">
              <legend>
                <h2 ref={headingRef} tabIndex={-1} className="text-h2 outline-none">
                  {t('chooseType')}
                </h2>
              </legend>
              <div className="mt-10 grid gap-4">
                {bookingConfig.appointmentTypes.map((a) => (
                  <RadioCard
                    key={a.id}
                    name="type"
                    value={a.id}
                    checked={type === a.id}
                    onChange={() => setType(a.id)}
                    title={t('consultation')}
                    subtitle={t('consultationText')}
                    selectedLabel={t('selected')}
                  />
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <button type="button" onClick={() => setStep(1)} className={buttonClass('secondary')}>
                  {t('back')}
                </button>
                <button type="button" disabled={!type} onClick={() => setStep(3)} className={buttonClass('primary')}>
                  {t('continue')}
                  <Arrow />
                </button>
              </div>
            </fieldset>
          )}

          {step === 3 && loc && (
            <section className="mt-4" aria-labelledby="booking-step3">
              <h2 id="booking-step3" ref={headingRef} tabIndex={-1} className="text-h2 outline-none">
                {t('steps.time')}
              </h2>

              {!calLink ? (
                <div className="mt-10 border border-dashed border-bronze-deep/50 bg-white p-8 lg:p-10" data-testid="booking-not-configured">
                  <h3 className="text-h3">{t('notConfiguredTitle')}</h3>
                  <p className="mt-4 max-w-xl text-grey">{t('notConfiguredText', { location: loc.name })}</p>
                  <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <Link href="/contact" className={buttonClass('primary')}>
                      {t('alternative')}
                      <Arrow />
                    </Link>
                    {loc.phone && (
                      <a href={`tel:${loc.phone.replace(/\s/g, '')}`} className="link-underline-static tap-area text-[0.9375rem] tabular-nums">
                        {t('callLocation', { phone: loc.phone })}
                      </a>
                    )}
                  </div>
                </div>
              ) : !consent ? (
                <div className="mt-10 bg-white p-8 lg:p-10" data-testid="booking-consent">
                  <h3 className="text-h3">{t('privacyTitle')}</h3>
                  <p className="mt-4 max-w-2xl text-grey">{t('privacyText')}</p>
                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <button type="button" onClick={() => setConsent(true)} className={buttonClass('primary')}>
                      {t('privacyAccept')}
                      <Arrow />
                    </button>
                    <Link href="/privacy" className="link-underline-static text-[0.9375rem]">
                      {t('privacyLink')}
                    </Link>
                  </div>
                </div>
              ) : calState === 'booked' ? (
                <div role="status" className="mt-10 border-l-2 border-slate bg-white p-8 lg:p-10">
                  <h3 className="text-h3">{t('successTitle')}</h3>
                  <p className="mt-4 text-grey">{t('successText')}</p>
                </div>
              ) : (
                <div className="relative mt-10 min-h-[640px] bg-white">
                  {calState === 'loading' && (
                    <div role="status" className="absolute inset-0 z-10 grid place-items-center bg-white">
                      <div className="w-full max-w-md space-y-4 p-8" aria-hidden>
                        <div className="h-5 w-1/2 animate-pulse bg-hover" />
                        <div className="grid grid-cols-7 gap-2">
                          {Array.from({ length: 28 }).map((_, i) => (
                            <div key={i} className="aspect-square animate-pulse bg-hover" style={{ animationDelay: `${(i % 7) * 40}ms` }} />
                          ))}
                        </div>
                      </div>
                      <span className="sr-only">{t('loading')}</span>
                    </div>
                  )}
                  {calState === 'error' ? (
                    <div role="alert" className="p-8 lg:p-10">
                      <p className="text-alert">{t('loadError')}</p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <button type="button" onClick={() => setReloadKey((k) => k + 1)} className={buttonClass('secondary')}>
                          {t('retry')}
                        </button>
                        <Link href="/contact" className={buttonClass('primary')}>
                          {t('alternative')}
                          <Arrow />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <CalEmbed
                      calLink={calLink}
                      namespace={`${loc.id}-${type}`}
                      locale={locale}
                      onStateChange={onCalState}
                      reloadKey={reloadKey}
                    />
                  )}
                </div>
              )}

              <button type="button" onClick={() => setStep(2)} className={buttonClass('text', 'mt-8')}>
                <span className="link-underline pb-0.5">{t('back')}</span>
              </button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function RadioCard({
  name,
  value,
  checked,
  onChange,
  title,
  subtitle,
  selectedLabel,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  subtitle: string;
  selectedLabel: string;
}) {
  return (
    <label
      className={cn(
        'pressable group relative flex min-h-28 cursor-pointer flex-col justify-between gap-6 border bg-white p-6 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-slate',
        checked ? 'border-slate shadow-[inset_0_0_0_1px_var(--color-slate)]' : 'border-line hover:border-grey',
      )}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <span className="flex items-start justify-between gap-4">
        <span>
          <span className="block text-[1.0625rem] font-medium">{title}</span>
          <span className="mt-1 block text-[0.875rem] text-grey">{subtitle}</span>
        </span>
        <span
          aria-hidden
          className={cn(
            'mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-150',
            checked ? 'border-slate' : 'border-line',
          )}
        >
          <span className={cn('size-2.5 rounded-full bg-slate transition-[transform,opacity] duration-150 ease-[var(--ease-out)]', checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0')} />
        </span>
      </span>
      {checked && <span className="sr-only">{selectedLabel}</span>}
    </label>
  );
}
