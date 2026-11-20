'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Link, usePathname } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/routing';
import { translateTreatmentSlug } from '@/content/treatment-slugs';
import { cn } from '@/lib/cn';

const LABELS: Record<Locale, { short: string; long: string }> = {
  sq: { short: 'SQ', long: 'Shqip' },
  en: { short: 'EN', long: 'English' },
};

/** Opens the equivalent page in the other language (incl. translated treatment slugs). */
export function LanguageSwitcher({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams<{ slug?: string }>();
  const t = useTranslations('nav');

  const hrefFor = (target: Locale) => {
    if (pathname === '/treatments/[slug]' && params.slug) {
      const slug = translateTreatmentSlug(decodeURIComponent(params.slug), locale, target);
      return slug ? { pathname, params: { slug } } : '/treatments';
    }
    return pathname as Exclude<typeof pathname, '/treatments/[slug]'>;
  };

  return (
    <ul className={cn('flex items-center gap-1 text-[0.75rem] font-medium tracking-[0.14em]', className)} aria-label={t('language')}>
      {locales.map((l, i) => {
        const active = l === locale;
        return (
          <li key={l} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden className={tone === 'dark' ? 'text-line' : 'text-slate-soft'}>/</span>}
            {active ? (
              <span
                aria-current="true"
                lang={l}
                className={cn('inline-flex min-h-11 min-w-9 items-center justify-center', tone === 'dark' ? 'text-slate' : 'text-ivory')}
              >
                <span className="sr-only">{LABELS[l].long}</span>
                <span aria-hidden className="border-b border-bronze pb-0.5">{LABELS[l].short}</span>
              </span>
            ) : (
              <Link
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                href={hrefFor(l) as any}
                locale={l}
                hrefLang={l}
                lang={l}
                aria-label={t('switchTo', { language: LABELS[l].long })}
                className={cn(
                  'inline-flex min-h-11 min-w-9 items-center justify-center transition-colors',
                  tone === 'dark' ? 'text-grey hover:text-slate' : 'text-sand hover:text-ivory',
                )}
              >
                {LABELS[l].short}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
