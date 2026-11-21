/**
 * Global motion presets (GSAP). Values follow the brand motion spec.
 * All presets are applied via data attributes by <MotionProvider />.
 */
export const motionPresets = {
  revealText: { y: 40, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
  revealLines: { yPercent: 110, duration: 0.85, ease: 'power3.out', stagger: 0.12 },
  revealImage: { duration: 1.2, ease: 'power2.inOut', zoomFrom: 1.05 },
  fadeUp: { y: 24, duration: 0.65, ease: 'power2.out' },
  stagger: { y: 24, duration: 0.65, ease: 'power2.out', stagger: 0.07 },
  divider: { duration: 0.8, ease: 'power2.out' },
  menu: { overlay: 0.5, stagger: 0.07, ease: 'power3.out' },
} as const;

export type RevealType = 'fade' | 'text' | 'lines' | 'image' | 'divider' | 'stagger';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

