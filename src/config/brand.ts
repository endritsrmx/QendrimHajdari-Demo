export const brand = {
  /** VERIFY: exact spelling incl. "Qëndrim" and official professional title. */
  name: 'Qendrim Hajdari',
  displayName: 'Dr. Qendrim Hajdari',
  wordmark: 'QENDRIM HAJDARI',
  monogram: 'QH',
  tagline: 'Orthopaedic & Trauma Surgery',
  social: {
    instagram: 'https://www.instagram.com/dr.qendrimhajdari',
  },
  /** [PHONE_NUMBER] / [BUSINESS_EMAIL] – set via env once verified */
  phone: process.env.NEXT_PUBLIC_PRACTICE_PHONE || '',
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
