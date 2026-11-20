import type { Metadata } from 'next';
import { getPathname } from '@/i18n/navigation';
import { locales, type AppPathname, type Locale } from '@/i18n/routing';
import { site } from '@/config/site';

type Href = Parameters<typeof getPathname>[0]['href'];

/** Absolute URL for an internal pathname in a given locale. */
export function absoluteUrl(locale: Locale, href: Href): string {
  return `${site.url}${getPathname({ locale, href })}`;
}

/**
 * Canonical + hreflang alternates. `hrefFor` lets dynamic routes provide locale-specific params
 * (e.g. translated treatment slugs).
 */
export function buildAlternates(locale: Locale, hrefFor: (l: Locale) => Href) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = absoluteUrl(l, hrefFor(l));
  languages['x-default'] = absoluteUrl('sq', hrefFor('sq'));
  return { canonical: absoluteUrl(locale, hrefFor(locale)), languages };
}

export function buildMetadata({
  locale,
  title,
  description,
  pathname,
  hrefFor,
  noindex = false,
  siteName,
}: {
  locale: Locale;
  title: string;
  description: string;
  pathname?: AppPathname;
  hrefFor?: (l: Locale) => Href;
  noindex?: boolean;
  siteName: string;
}): Metadata {
  const resolver = hrefFor ?? (() => (pathname ?? '/') as Href);
  const alternates = buildAlternates(locale, resolver);
  return {
    title,
    description,
    alternates,
    robots: noindex || site.demo ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      title,
      description,
      url: alternates.canonical,
      siteName,
      locale: locale === 'sq' ? 'sq_AL' : 'en_GB',
      alternateLocale: locale === 'sq' ? ['en_GB'] : ['sq_AL'],
      images: [{ url: `${site.url}/og-image.png`, width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${site.url}/og-image.png`],
    },
  };
}
