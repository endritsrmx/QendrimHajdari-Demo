import type { ContentStatus, Localized } from './types';

/** Medical philosophy – cautious wording, flagged for medical review. */
export const philosophy: { number: string; status: ContentStatus; title: Localized; text: Localized }[] = [
  {
    number: '01',
    status: 'needs_medical_review',
    title: { sq: 'Vlerësim individual', en: 'Individual Assessment' },
    text: {
      sq: 'Çdo konsultë fillon me dëgjim: ankesat, historia mjekësore, aktiviteti dhe qëllimet personale formojnë bazën e vlerësimit.',
      en: 'Every consultation begins with listening: symptoms, medical history, activity and personal goals form the basis of the assessment.',
    },
  },
  {
    number: '02',
    status: 'needs_medical_review',
    title: { sq: 'Trajtim i bazuar në dëshmi', en: 'Evidence-Informed Treatment' },
    text: {
      sq: 'Rekomandimet orientohen nga njohuritë aktuale mjekësore dhe gjithmonë peshohen sipas situatës individuale.',
      en: 'Recommendations are guided by current medical knowledge and always weighed against the individual situation.',
    },
  },
  {
    number: '03',
    status: 'needs_medical_review',
    title: { sq: 'Plan i personalizuar rikuperimi', en: 'Personalised Recovery Planning' },
    text: {
      sq: 'Rikuperimi planifikohet hap pas hapi dhe përshtatet sipas progresit – pa premtime për afate të garantuara.',
      en: 'Recovery is planned step by step and adjusted to progress – without promises of guaranteed timelines.',
    },
  },
];

export const pillars: { title: Localized; text: Localized }[] = [
  {
    title: { sq: 'Ortopedi', en: 'Orthopaedics' },
    text: {
      sq: 'Vlerësim dhe trajtim i ankesave të nyjeve, kockave dhe sistemit lëvizës.',
      en: 'Assessment and treatment of joint, bone and musculoskeletal complaints.',
    },
  },
  {
    title: { sq: 'Traumatologji', en: 'Trauma Surgery' },
    text: {
      sq: 'Kujdes për frakturat dhe lëndimet e sistemit lëvizës pas aksidenteve.',
      en: 'Care for fractures and musculoskeletal injuries following accidents.',
    },
  },
  {
    title: { sq: 'Mjekësi sportive', en: 'Sports Medicine' },
    text: {
      sq: 'Diagnostikim, trajtim dhe rikthim i strukturuar në aktivitet pas lëndimeve sportive.',
      en: 'Diagnosis, treatment and a structured return to activity after sports injuries.',
    },
  },
];
