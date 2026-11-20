import type { Localized } from './types';

/** Lightweight slug map (safe to import in client components, e.g. the language switcher). */
export const treatmentSlugs = {
  acl: { sq: 'demtimet-e-acl', en: 'acl-injuries' },
  meniscus: { sq: 'demtimet-e-meniskut', en: 'meniscus-injuries' },
  'joint-replacement': { sq: 'zevendesimi-i-nyjeve', en: 'joint-replacement' },
  sports: { sq: 'mjekesia-sportive', en: 'sports-medicine' },
  trauma: { sq: 'traumatologjia-ortopedike', en: 'orthopaedic-trauma' },
  'knee-joint': { sq: 'semundjet-e-gjurit-dhe-nyjeve', en: 'knee-joint-conditions' },
} as const satisfies Record<string, Localized>;

export type TreatmentId = keyof typeof treatmentSlugs;

/** Maps a treatment slug from one locale to the other. */
export function translateTreatmentSlug(
  slug: string,
  from: 'sq' | 'en',
  to: 'sq' | 'en',
): string | null {
  const entry = Object.values(treatmentSlugs).find((s) => s[from] === slug);
  return entry ? entry[to] : null;
}
