import type { LocationId } from './locations';

/**
 * Booking provider configuration (Cal.com).
 * Each location maps to its own Cal.com event type link, e.g. "dr-hajdari/consultation-prishtina".
 * Without a link, the booking UI shows an honest "not yet connected" state – never fake slots.
 */
export const bookingConfig = {
  provider: 'calcom' as const,
  calOrigin: process.env.NEXT_PUBLIC_CALCOM_ORIGIN || 'https://cal.com',
  embedJsUrl:
    process.env.NEXT_PUBLIC_CALCOM_EMBED_JS_URL || 'https://app.cal.com/embed/embed.js',
  appointmentTypes: [
    {
      id: 'orthopaedic-consultation',
      links: {
        'royal-medical': process.env.NEXT_PUBLIC_CALCOM_LINK_ROYAL_MEDICAL || '',
        'ordinanca-dora': process.env.NEXT_PUBLIC_CALCOM_LINK_DORA || '',
      } satisfies Record<LocationId, string>,
    },
  ],
} as const;

export type AppointmentTypeId = (typeof bookingConfig.appointmentTypes)[number]['id'];

export function getCalLink(locationId: LocationId, typeId: AppointmentTypeId): string | null {
  const type = bookingConfig.appointmentTypes.find((t) => t.id === typeId);
  const link = type?.links[locationId];
  return link && link.trim().length > 0 ? link.trim() : null;
}

export const isBookingConfigured = (locationId: LocationId) =>
  getCalLink(locationId, 'orthopaedic-consultation') !== null;
