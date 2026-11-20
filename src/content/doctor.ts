import type { ContentStatus, Localized } from './types';

/**
 * Doctor profile. Every factual field stays a placeholder until verified by the client.
 * NEVER add invented education, experience, awards, certifications or surgery numbers.
 */
export const doctor = {
  name: 'Qendrim Hajdari', // VERIFY spelling "Qëndrim"
  title: 'Dr.', // VERIFY official professional title
  specialties: {
    sq: ['Ortopedi', 'Traumatologji', 'Mjekësi sportive'],
    en: ['Orthopaedic Surgery', 'Trauma Surgery', 'Sports Medicine'],
  } satisfies Localized<string[]>,
  portrait: '/images/doctor/portrait-operating-room.jpg' as string | null, // client-supplied – confirm usage rights
  bio: {
    status: 'draft' as ContentStatus,
    placeholder: '[DOCTOR_BIO_APPROVED]',
    text: null as Localized<string[]> | null,
  },
  /** Vertical career timeline – years and institutions remain placeholders until verified. */
  career: [
    { year: '[YEAR]', title: '[MEDICAL_DEGREE_VERIFIED]', institution: '[UNIVERSITY_VERIFIED]' },
    { year: '[YEAR]', title: '[RESIDENCY_ORTHOPAEDICS_TRAUMA_VERIFIED]', institution: '[INSTITUTION_VERIFIED]' },
    { year: '[YEAR]', title: '[SPECIALIST_QUALIFICATION_VERIFIED]', institution: '[INSTITUTION_VERIFIED]' },
    { year: '[YEAR]', title: '[CURRENT_POSITION_VERIFIED]', institution: 'Royal Medical / Ordinanca Dora' },
  ],
  education: null as null | { title: string; institution: string; year: string }[], // [MEDICAL_QUALIFICATIONS_VERIFIED]
  qualifications: null as null | string[], // [MEDICAL_QUALIFICATIONS_VERIFIED]
  license: null as null | string, // [PROFESSIONAL_LICENSE]
  yearsOfExperience: null as null | number, // [YEARS_OF_EXPERIENCE_VERIFIED]
  furtherTraining: null as null | string[],
  memberships: null as null | string[], // [MEMBERSHIPS_VERIFIED]
};
