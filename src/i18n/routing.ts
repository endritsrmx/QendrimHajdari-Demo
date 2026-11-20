import { defineRouting } from 'next-intl/routing';

export const locales = ['sq', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'sq';

/**
 * Language-specific, SEO-friendly URLs.
 * Keys are the internal pathnames (used in code), values the public URLs per locale.
 */
export const pathnames = {
  '/': '/',
  '/about': { sq: '/rreth-meje', en: '/about' },
  '/treatments': { sq: '/sherbimet', en: '/treatments' },
  '/treatments/[slug]': { sq: '/sherbimet/[slug]', en: '/treatments/[slug]' },
  '/locations': { sq: '/klinikat', en: '/locations' },
  '/results': { sq: '/rezultatet', en: '/results' },
  '/testimonials': { sq: '/deshmite', en: '/testimonials' },
  '/faq': { sq: '/pyetjet', en: '/faq' },
  '/contact': { sq: '/kontakti', en: '/contact' },
  '/book-appointment': { sq: '/rezervo-termin', en: '/book-appointment' },
  '/privacy': { sq: '/privatesia', en: '/privacy' },
  '/legal': { sq: '/informacione-ligjore', en: '/legal' },
} as const;

export type AppPathname = keyof typeof pathnames;

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  // Albanian is always the default entry point; users switch explicitly (choice is kept via cookie)
  localeDetection: false,
  pathnames,
});
