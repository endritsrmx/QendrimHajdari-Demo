import type { Testimonial } from './types';

/**
 * Only real, documented and legally approved patient voices may be added here.
 * Each entry needs `consentReference` and status "approved"/"published" to be displayed.
 * [PATIENT_TESTIMONIAL_APPROVED] – intentionally empty. Do NOT add invented testimonials.
 */
export const testimonials: Testimonial[] = [];
