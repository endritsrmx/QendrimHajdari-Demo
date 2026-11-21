export const brand = {
  /** Spelling as on the Gjilan practice sign (Ortopedia Dora). VERIFY official professional title. */
  name: 'Qëndrim Hajdari',
  displayName: 'Dr. Qëndrim Hajdari',
  wordmark: 'QËNDRIM HAJDARI',
  monogram: 'QH',
  tagline: 'Orthopaedic & Trauma Surgery',
  social: {
    instagram: 'https://www.instagram.com/dr.qendrimhajdari',
  },
  /** [PHONE_NUMBER] / [BUSINESS_EMAIL] – set via env once verified */
  /** From the Gjilan practice sign: "Dr. Qëndrim Hajdari, Ortoped, +383 45 592 399" */
  phone: process.env.NEXT_PUBLIC_PRACTICE_PHONE || '+383 45 592 399',
  email: process.env.NEXT_PUBLIC_PRACTICE_EMAIL || '',
  colors: {
    ivory: '#F7F4EE',
    sand: '#E8DED0',
    bronze: '#B49C7C',
    slate: '#263633',
    grey: '#555D58',
    white: '#FFFFFF',
    border: '#DCD7CE',
    hover: '#EEE9E1',
  },
} as const;
