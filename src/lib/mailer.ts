import 'server-only';

/**
 * Configurable email delivery. Currently supports Resend's HTTP API (no SDK needed).
 * Required env: CONTACT_EMAIL_PROVIDER=resend, RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.
 * If not configured, `isMailerConfigured()` is false and the API answers honestly with 503.
 */
export function isMailerConfigured(): boolean {
  return (
    process.env.CONTACT_EMAIL_PROVIDER === 'resend' &&
    !!process.env.RESEND_API_KEY &&
    !!process.env.CONTACT_TO_EMAIL &&
    !!process.env.CONTACT_FROM_EMAIL
  );
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  location: string;
  message: string;
  locale?: string;
}): Promise<void> {
  if (!isMailerConfigured()) throw new Error('MAILER_NOT_CONFIGURED');

  const rows: [string, string][] = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone || '–'],
    ['Preferred location', data.location],
    ['Language', data.locale || '–'],
  ];
  const html = `
    <h2>New website enquiry</h2>
    <table>${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`).join('')}</table>
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL],
      reply_to: data.email,
      subject: `Website enquiry – ${data.name}`,
      html,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${data.message}`,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`MAILER_FAILED_${res.status}`);
}
