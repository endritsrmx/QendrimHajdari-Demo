import type { Locale } from '@/i18n/routing';

export type Localized<T = string> = Record<Locale, T>;

/**
 * Editorial workflow for medical content.
 * Only `approved` and `published` content is rendered in production (see lib/content.ts).
 */
export type ContentStatus = 'draft' | 'needs_medical_review' | 'approved' | 'published';

export type IllustrationId =
  | 'acl'
  | 'meniscus'
  | 'joint-replacement'
  | 'sports'
  | 'trauma'
  | 'knee-consultation';

export interface FaqItem {
  id: string;
  status: ContentStatus;
  question: Localized;
  answer: Localized;
}

export interface Treatment {
  id: string;
  number: string;
  status: ContentStatus;
  slug: Localized;
  illustration: IllustrationId;
  title: Localized;
  cardText: Localized;
  heroLead: Localized;
  seoDescription: Localized;
  intro: Localized;
  anatomy: Localized;
  symptoms: Localized<string[]>;
  diagnostics: Localized<string[]>;
  conservative: Localized<string[]>;
  /** General description of surgical options – specific procedures offered need approval */
  operative: Localized<string[]>;
  aftercare: Localized;
  risks: Localized<string[]>;
  faq: FaqItem[];
  related: string[];
}

export interface Article {
  id: string;
  status: ContentStatus;
  title: Localized;
  excerpt: Localized;
  readingTime: number;
  relatedTreatment: string;
}

export interface Testimonial {
  id: string;
  status: ContentStatus;
  /** documented written consent reference – required before publishing */
  consentReference: string | null;
  quote: Localized;
  attribution: Localized;
}
