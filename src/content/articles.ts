import type { Article } from './types';

/** Editorial drafts – status "needs_medical_review". */
export const articles: Article[] = [
  {
    id: 'understanding-acl',
    status: 'needs_medical_review',
    title: { sq: 'Të kuptojmë dëmtimet e ACL', en: 'Understanding ACL injuries' },
    excerpt: {
      sq: 'Si ndodhin dëmtimet e ligamentit të kryqëzuar anterior, cilat janë shenjat e zakonshme dhe pse vendimi për trajtim merret gjithmonë individualisht.',
      en: 'How anterior cruciate ligament injuries happen, which signs are common, and why treatment decisions are always made individually.',
    },
    readingTime: 4,
    relatedTreatment: 'acl',
  },
  {
    id: 'common-meniscus-problems',
    status: 'needs_medical_review',
    title: { sq: 'Problemet e zakonshme të meniskut', en: 'Common meniscus problems' },
    excerpt: {
      sq: 'Nga lëndimet sportive te ndryshimet që lidhen me moshën: një përmbledhje e përgjithshme për meniskun dhe mundësitë e vlerësimit.',
      en: 'From sports injuries to age-related changes: a general overview of the meniscus and how problems are assessed.',
    },
    readingTime: 4,
    relatedTreatment: 'meniscus',
  },
  {
    id: 'when-to-seek-consultation',
    status: 'needs_medical_review',
    title: {
      sq: 'Kur duhet të kërkoni një konsultë ortopedike',
      en: 'When to seek an orthopaedic consultation',
    },
    excerpt: {
      sq: 'Dhimbje që nuk largohet, ënjtje e përsëritur ose paqëndrueshmëri: disa shenja që ia vlen të vlerësohen nga një specialist.',
      en: 'Persistent pain, recurring swelling or instability: some signs that are worth having assessed by a specialist.',
    },
    readingTime: 3,
    relatedTreatment: 'knee-joint',
  },
];
