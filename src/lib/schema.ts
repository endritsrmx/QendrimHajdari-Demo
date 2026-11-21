import { brand } from '@/config/brand';
import { locations } from '@/config/locations';
import { site } from '@/config/site';
import type { Locale } from '@/i18n/routing';

/**
 * Structured data – only verified facts. No ratings, review markup, awards or invented details.
 */
export function physicianSchema(locale: Locale, url: string) {
  const clinics = locations.filter((l) => l.verified && l.address);
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': `${site.url}/#physician`,
    name: brand.displayName,
    url,
    medicalSpecialty: ['Orthopedic', 'Musculoskeletal'],
    knowsAbout:
      locale === 'sq'
        ? ['Ortopedi', 'Traumatologji', 'Mjekësi sportive', 'Dëmtimet e gjurit']
        : ['Orthopaedic surgery', 'Trauma surgery', 'Sports medicine', 'Knee injuries'],
    sameAs: [brand.social.instagram],
    ...(brand.phone && { telephone: brand.phone }),
    ...(clinics.length > 0 && {
      workLocation: clinics.map((c) => ({ '@id': `${site.url}/#clinic-${c.id}` })),
    }),
  };
}

export function clinicSchemas(locale: Locale) {
  return locations
    .filter((l) => l.verified && l.address)
    .map((l) => ({
      '@context': 'https://schema.org',
      '@type': 'MedicalClinic',
      '@id': `${site.url}/#clinic-${l.id}`,
      name: l.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: l.address,
        addressLocality: l.city[locale],
        addressCountry: 'XK',
      },
      ...(l.phone && { telephone: l.phone }),
    }));
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
  };
}
