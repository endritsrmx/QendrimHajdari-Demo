import { describe, expect, it } from 'vitest';
import { contactSchema } from '@/lib/contact-schema';

const valid = {
  name: 'Arta Krasniqi',
  email: 'arta@example.com',
  phone: '',
  location: 'royal-medical',
  message: 'I would like to book a consultation for my knee.',
  privacy: true,
  website: '',
};

describe('contactSchema', () => {
  it('accepts a valid enquiry', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it.each([
    ['name', '', 'nameRequired'],
    ['email', 'not-an-email', 'emailInvalid'],
    ['phone', 'abc', 'phoneInvalid'],
    ['message', 'short', 'messageTooShort'],
    ['location', 'mars', 'locationInvalid'],
    ['privacy', false, 'privacyRequired'],
  ])('rejects invalid %s with a translatable key', (field, value, key) => {
    const r = contactSchema.safeParse({ ...valid, [field]: value });
    expect(r.success).toBe(false);
    expect(r.error!.issues[0]!.message).toBe(key);
  });

  it('rejects a filled honeypot', () => {
    expect(contactSchema.safeParse({ ...valid, website: 'spam.com' }).success).toBe(false);
  });

  it('caps the message length at 2000 characters', () => {
    expect(contactSchema.safeParse({ ...valid, message: 'x'.repeat(2001) }).success).toBe(false);
  });
});
