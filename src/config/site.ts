/** Global site settings. Values marked VERIFY must be confirmed by the client before launch. */
export const site = {
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
    'http://localhost:3000'
  ).replace(/\/$/, ''),
  /** Demo deployment: never indexed by search engines */
  demo: process.env.NEXT_PUBLIC_DEMO_MODE === 'true',
  timeZone: 'Europe/Belgrade', // Kosovo: CET/CEST incl. daylight saving time
  /**
   * Content preview: shows content with status draft / needs_medical_review (clearly badged).
   * In production builds only `approved` and `published` content is rendered unless explicitly enabled.
   */
  contentPreview:
    process.env.NEXT_PUBLIC_CONTENT_PREVIEW === 'true' ||
    (process.env.NEXT_PUBLIC_CONTENT_PREVIEW !== 'false' && process.env.NODE_ENV !== 'production'),
  /** Results page stays unpublished until legal, medical and data-protection approval. */
  resultsPublished: process.env.NEXT_PUBLIC_RESULTS_PUBLISHED === 'true',
  /** Testimonials section stays hidden until approved testimonials exist. */
  testimonialsPublished: process.env.NEXT_PUBLIC_TESTIMONIALS_PUBLISHED === 'true',
} as const;
