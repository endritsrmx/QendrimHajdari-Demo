import type { FaqItem } from './types';

/** General practice FAQ. Organisational answers depend on client confirmation. */
export const generalFaq: FaqItem[] = [
  {
    id: 'g-1',
    status: 'needs_medical_review',
    question: {
      sq: 'Si mund të rezervoj një konsultë?',
      en: 'How can I book a consultation?',
    },
    answer: {
      sq: 'Zgjidhni klinikën e preferuar në faqen e rezervimit. Pasi të aktivizohet rezervimi online, do të shihni oraret e lira reale. Deri atëherë mund të na kontaktoni përmes formularit të kontaktit.',
      en: 'Choose your preferred location on the booking page. Once online booking is activated you will see real available times. Until then, you can reach us via the contact form.',
    },
  },
  {
    id: 'g-2',
    status: 'needs_medical_review',
    question: {
      sq: 'Çfarë duhet të sjell në konsultë?',
      en: 'What should I bring to my consultation?',
    },
    answer: {
      sq: 'Nëse keni, sillni raportet mjekësore, imazheritë e mëparshme (p.sh. MRI ose radiografi) dhe listën e medikamenteve që merrni.',
      en: 'If available, bring medical reports, previous imaging (e.g. MRI or X-rays) and a list of the medication you take.',
    },
  },
  {
    id: 'g-3',
    status: 'needs_medical_review',
    question: {
      sq: 'A mund të kërkoj një mendim të dytë?',
      en: 'Can I ask for a second opinion?',
    },
    answer: {
      sq: 'Po. Një mendim i dytë ortopedik mund t’ju ndihmojë të kuptoni më mirë diagnozën dhe mundësitë e trajtimit. Sillni të gjitha dokumentet dhe imazheritë ekzistuese.',
      en: 'Yes. A second orthopaedic opinion can help you better understand your diagnosis and treatment options. Please bring all existing documents and imaging.',
    },
  },
  {
    id: 'g-4',
    status: 'needs_medical_review',
    question: {
      sq: 'A janë konsultat të disponueshme në anglisht?',
      en: 'Are consultations available in English?',
    },
    answer: {
      sq: '[LANGUAGES_SPOKEN_VERIFIED] – gjuhët e konsultës do të konfirmohen.',
      en: '[LANGUAGES_SPOKEN_VERIFIED] – consultation languages to be confirmed.',
    },
  },
  {
    id: 'g-5',
    status: 'approved',
    question: {
      sq: 'A mund ta përdor këtë faqe në rast urgjence?',
      en: 'Can I use this website in an emergency?',
    },
    answer: {
      sq: 'Jo. Kjo faqe dhe formularët e saj nuk janë për urgjenca mjekësore. Në rast urgjence kontaktoni shërbimet lokale të urgjencës ose shkoni në repartin më të afërt të urgjencës.',
      en: 'No. This website and its forms are not intended for medical emergencies. In an emergency, contact your local emergency services or go to the nearest emergency department.',
    },
  },
];
