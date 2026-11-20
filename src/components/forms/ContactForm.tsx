'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { contactSchema, type ContactInput } from '@/lib/contact-schema';
import { locations } from '@/config/locations';
import { buttonClass } from '@/components/ui/Button';
import { Arrow } from '@/components/ui/Arrow';
import { Field, inputClass } from './Field';
import { cn } from '@/lib/cn';

type FormValues = z.input<typeof contactSchema>;
type Status = 'idle' | 'submitting' | 'success' | 'error' | 'not_configured' | 'rate_limited';

export function ContactForm({ defaultLocation }: { defaultLocation?: string }) {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');
  const statusRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues, unknown, ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      location: (defaultLocation as FormValues['location']) || undefined,
      message: '',
      privacy: false as unknown as true,
      website: '',
    },
  });

  // time trap: when the form became interactive (checked server-side)
  useEffect(() => {
    setValue('startedAt', Date.now());
  }, [setValue]);

  const err = (key?: string) => (key ? t(`validation.${key}` as 'validation.nameRequired') : undefined);

  const onSubmit = async (data: ContactInput) => {
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string };
      if (res.ok && body.ok) {
        setStatus('success');
        reset();
        setValue('startedAt', Date.now());
      } else if (body.code === 'not_configured') setStatus('not_configured');
      else if (body.code === 'rate_limited') setStatus('rate_limited');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const describedBy = (name: string, hasHint = false) =>
    cn(errors[name as keyof FormValues] && `${name}-error`, hasHint && !errors[name as keyof FormValues] && `${name}-hint`) || undefined;

  const statusMessage: Partial<Record<Status, { text: string; tone: 'ok' | 'warn' }>> = {
    success: { text: t('form.success'), tone: 'ok' },
    error: { text: t('form.error'), tone: 'warn' },
    not_configured: { text: t('form.notConfigured'), tone: 'warn' },
    rate_limited: { text: t('form.rateLimited'), tone: 'warn' },
  };
  const msg = statusMessage[status];

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} noValidate className="grid gap-9" aria-busy={status === 'submitting'}>
      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none empty:hidden">
        {msg && (
          <p
            className={cn(
              'border-l-2 bg-white px-5 py-4 text-[0.9375rem]',
              msg.tone === 'ok' ? 'border-slate text-slate' : 'border-alert text-alert',
            )}
          >
            {msg.text}
          </p>
        )}
      </div>

      {/* honeypot – hidden from users and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="grid gap-9 sm:grid-cols-2">
        <Field id="name" label={t('form.name')} required requiredLabel={t('form.required')} error={err(errors.name?.message)}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={describedBy('name')}
            aria-required
            className={inputClass(!!errors.name)}
            {...register('name')}
          />
        </Field>
        <Field id="email" label={t('form.email')} required requiredLabel={t('form.required')} error={err(errors.email?.message)}>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={describedBy('email')}
            aria-required
            className={inputClass(!!errors.email)}
            {...register('email')}
          />
        </Field>
        <Field id="phone" label={t('form.phone')} error={err(errors.phone?.message)}>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy('phone')}
            className={inputClass(!!errors.phone)}
            {...register('phone')}
          />
        </Field>
        <Field id="location" label={t('form.location')} required requiredLabel={t('form.required')} error={err(errors.location?.message)}>
          <select
            id="location"
            aria-invalid={!!errors.location}
            aria-describedby={describedBy('location')}
            aria-required
            className={cn(inputClass(!!errors.location), 'cursor-pointer appearance-none bg-[length:12px] bg-[right_center] bg-no-repeat')}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5l5 5 5-5' stroke='%23263633' stroke-width='1.2'/%3E%3C/svg%3E\")",
            }}
            defaultValue=""
            {...register('location')}
          >
            <option value="" disabled>
              {t('form.locationPlaceholder')}
            </option>
            {locations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name} – {l.city[locale]}
              </option>
            ))}
            <option value="no-preference">{t('form.noPreference')}</option>
          </select>
        </Field>
      </div>

      <Field
        id="message"
        label={t('form.message')}
        hint={t('form.messageHint')}
        required
        requiredLabel={t('form.required')}
        error={err(errors.message?.message)}
      >
        <textarea
          id="message"
          rows={5}
          maxLength={2000}
          aria-invalid={!!errors.message}
          aria-describedby={describedBy('message', true)}
          aria-required
          className={cn(inputClass(!!errors.message), 'resize-y')}
          {...register('message')}
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-4 text-[0.9375rem] text-grey">
          <input
            type="checkbox"
            aria-invalid={!!errors.privacy}
            aria-describedby={errors.privacy ? 'privacy-error' : undefined}
            className="mt-1 size-5 shrink-0 cursor-pointer accent-[var(--color-slate)]"
            {...register('privacy')}
          />
          <span>
            {t('form.privacy')}{' '}
            <Link href="/privacy" className="link-underline-static text-slate">
              {t('form.privacyLink')}
            </Link>
          </span>
        </label>
        {errors.privacy && (
          <p id="privacy-error" className="mt-2 pl-9 text-[0.8125rem] text-alert">
            {err(errors.privacy.message)}
          </p>
        )}
      </div>

      <div>
        <button type="submit" disabled={status === 'submitting'} className={buttonClass('primary', 'w-full sm:w-auto')}>
          <span className="relative">
            <span className={cn('transition-[opacity,filter] duration-200', status === 'submitting' && 'opacity-0 blur-[2px]')}>
              {t('form.submit')}
            </span>
            {status === 'submitting' && (
              <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap">{t('form.sending')}</span>
            )}
          </span>
          {status === 'submitting' ? (
            <span aria-hidden className="size-4 animate-spin rounded-full border border-white/40 border-t-white [animation-duration:600ms]" />
          ) : (
            <Arrow />
          )}
        </button>
      </div>
    </form>
  );
}
