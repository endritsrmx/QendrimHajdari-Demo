import type { Localized } from '@/content/types';

export type LocationId = 'royal-medical' | 'ordinanca-dora';

export interface PracticeLocation {
  id: LocationId;
  name: string;
  city: Localized;
  country: Localized;
  /** null = not yet verified → placeholder token is shown */
  address: string | null;
  addressPlaceholder: string;
  phone: string | null;
  email: string | null;
  /** Verified consultation hours per location, e.g. [{ days: {sq,en}, hours: '09:00–16:00' }] */
  hours: { days: Localized; hours: string }[] | null;
  accessibility: Localized | null;
  /** External maps link (no embedded third-party map → no tracking before consent) */
  mapsUrl: string;
  /** Facility affiliation confirmed by client in writing → enables MedicalClinic schema */
  verified: boolean;
  image: string | null;
  imagePlaceholder: string;
}

export const locations: PracticeLocation[] = [
  {
    id: 'royal-medical',
    name: 'Royal Medical',
    city: { sq: 'Prishtinë', en: 'Prishtina' },
    country: { sq: 'Kosovë', en: 'Kosovo' },
    address: process.env.NEXT_PUBLIC_ROYAL_MEDICAL_ADDRESS || null,
    addressPlaceholder: '[ROYAL_MEDICAL_ADDRESS]',
    phone: process.env.NEXT_PUBLIC_ROYAL_MEDICAL_PHONE || null,
    email: null,
    hours: null, // [WORKING_HOURS_BY_LOCATION]
    accessibility: null,
    mapsUrl:
      process.env.NEXT_PUBLIC_ROYAL_MEDICAL_MAPS_URL ||
      'https://www.google.com/maps/search/?api=1&query=Royal+Medical+Prishtina+Kosovo',
    verified: false,
    image: null,
    imagePlaceholder: '[ROYAL_MEDICAL_PHOTO]',
  },
  {
    id: 'ordinanca-dora',
    name: 'Ordinanca Dora',
    city: { sq: 'Gjilan', en: 'Gjilan' },
    country: { sq: 'Kosovë', en: 'Kosovo' },
    address: process.env.NEXT_PUBLIC_DORA_ADDRESS || null,
    addressPlaceholder: '[DORA_ADDRESS]',
    phone: process.env.NEXT_PUBLIC_DORA_PHONE || null,
    email: null,
    hours: null,
    accessibility: null,
    mapsUrl:
      process.env.NEXT_PUBLIC_DORA_MAPS_URL ||
      'https://www.google.com/maps/search/?api=1&query=Ordinanca+Dora+Gjilan+Kosovo',
    verified: false,
    image: null,
    imagePlaceholder: '[DORA_PHOTO]',
  },
];

export const getLocation = (id: string | null | undefined) =>
  locations.find((l) => l.id === id) ?? null;
