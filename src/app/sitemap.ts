import type { MetadataRoute } from 'next';
import { getPathname } from '@/i18n/navigation';
import { locales, type AppPathname, type Locale } from '@/i18n/routing';
import { site } from '@/config/site';
import { treatments } from '@/content/treatments';
import { isPublicStatus } from '@/lib/content';

type Href = Parameters<typeof getPathname>[0]['href'];

/** Excludes unpublished pages (results, testimonials until approved). */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: AppPathname[] = ['/', '/about', '/treatments', '/locations', '/faq', '/contact', '/book-appointment', '/privacy', '/legal'];
  if (site.resultsPublished) staticPaths.push('/results');
  if (site.testimonialsPublished) staticPaths.push('/testimonials');

  const entry = (hrefFor: (l: Locale) => Href, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${getPathname({ locale: 'sq', href: hrefFor('sq') })}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${getPathname({ locale: l, href: hrefFor(l) })}`])),
    },
  });

  const pages = staticPaths.map((p) => entry(() => p as Href, p === '/' ? 1 : 0.7));
  const treatmentPages = treatments
    .filter((t) => site.contentPreview || isPublicStatus(t.status))
    .map((t) => entry((l) => ({ pathname: '/treatments/[slug]', params: { slug: t.slug[l] } }), 0.8));
  // each locale version as its own <url> entry
  return [...pages, ...treatmentPages].flatMap((e) =>
    Object.values(e.alternates!.languages!).map((url) => ({ ...e, url: url as string })),
  );
}
