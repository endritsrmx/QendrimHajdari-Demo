import { z } from 'zod';

export const LOCATION_VALUES = ['royal-medical', 'ordinanca-dora', 'no-preference'] as const;

/**
 * Shared client + server validation. Error messages are message keys (contact.validation.*)
 * so they can be translated on the client.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'nameRequired').max(120, 'nameTooLong'),
  email: z.string().trim().max(254, 'emailInvalid').pipe(z.email('emailInvalid')),
  phone: z
    .string()
    .trim()
    .max(40, 'phoneInvalid')
    .refine((v) => v === '' || /^[+()\d\s/-]{6,40}$/.test(v), 'phoneInvalid')
    .optional()
    .or(z.literal('')),
  location: z.enum(LOCATION_VALUES, { error: 'locationInvalid' }),
  message: z.string().trim().min(10, 'messageTooShort').max(2000, 'messageTooLong'),
  privacy: z.literal(true, { error: 'privacyRequired' }),
  /** honeypot – must stay empty */
  website: z.string().max(0).optional().or(z.literal('')),
  /** time trap – timestamp when the form was rendered */
  startedAt: z.number().optional(),
  locale: z.enum(['sq', 'en']).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
