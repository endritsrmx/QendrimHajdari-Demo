import { describe, expect, it } from 'vitest';
import { filterRenderable, isRenderable } from '@/lib/content';
import { treatments } from '@/content/treatments';
import { treatmentSlugs, translateTreatmentSlug } from '@/content/treatment-slugs';
import { testimonials } from '@/content/testimonials';
import { doctor } from '@/content/doctor';
import { pathnames } from '@/i18n/routing';
import en from '../../messages/en.json';
import sq from '../../messages/sq.json';

describe('editorial workflow', () => {
  it('hides unapproved content in production mode', () => {
    expect(isRenderable('needs_medical_review', false)).toBe(false);
    expect(isRenderable('draft', false)).toBe(false);
    expect(isRenderable('approved', false)).toBe(true);
    expect(isRenderable('published', false)).toBe(true);
  });
  it('shows everything in preview mode', () => {
    expect(filterRenderable(treatments, true)).toHaveLength(treatments.length);
  });
});

describe('content integrity', () => {
  it('has the six required treatment topics with unique slugs per locale', () => {
    expect(treatments.map((t) => t.id)).toEqual(['acl', 'meniscus', 'joint-replacement', 'sports', 'trauma', 'knee-joint']);
    for (const l of ['sq', 'en'] as const) {
      const slugs = treatments.map((t) => t.slug[l]);
      expect(new Set(slugs).size).toBe(slugs.length);
      slugs.forEach((s) => expect(s).toMatch(/^[a-z0-9-]+$/));
    }
  });
  it('translates treatment slugs between languages', () => {
    expect(translateTreatmentSlug('acl-injuries', 'en', 'sq')).toBe('demtimet-e-acl');
    expect(translateTreatmentSlug('demtimet-e-meniskut', 'sq', 'en')).toBe('meniscus-injuries');
    expect(translateTreatmentSlug('unknown', 'en', 'sq')).toBeNull();
    expect(Object.keys(treatmentSlugs)).toHaveLength(6);
  });
  it('contains no invented testimonials or doctor facts', () => {
    expect(testimonials).toHaveLength(0);
    expect(doctor.yearsOfExperience).toBeNull();
    expect(doctor.memberships).toBeNull();
    expect(doctor.qualifications).toBeNull();
  });
  it('only states durations as non-guaranteed', () => {
    const text = JSON.stringify(treatments).toLowerCase();
    expect(text).not.toMatch(/\b\d+\s*(weeks|months|javë|muaj)\b/);
    expect(text).not.toMatch(/guarantee(d)? (success|result)|success rate/);
  });
});

describe('i18n', () => {
  const keys = (o: object, p = ''): string[] =>
    Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? keys(v, `${p}${k}.`) : [`${p}${k}`]));
  it('has identical message keys in Albanian and English', () => {
    expect(keys(sq).sort()).toEqual(keys(en).sort());
  });
  it('defines localized URLs as specified', () => {
    expect(pathnames['/about']).toEqual({ sq: '/rreth-meje', en: '/about' });
    expect(pathnames['/book-appointment']).toEqual({ sq: '/rezervo-termin', en: '/book-appointment' });
    expect(pathnames['/legal']).toEqual({ sq: '/informacione-ligjore', en: '/legal' });
  });
});
