import { NextResponse, type NextRequest } from 'next/server';
import { contactSchema } from '@/lib/contact-schema';
import { createRateLimiter } from '@/lib/rate-limit';
import { isMailerConfigured, sendContactEmail } from '@/lib/mailer';

const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 }); // 5 requests / 10 min / IP
const MIN_FILL_MS = 3000; // time trap against bots
const MAX_BODY_BYTES = 10_000;

export const dynamic = 'force-dynamic';

function clientIp(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

export async function POST(req: NextRequest) {
  // same-origin check (basic CSRF protection for a JSON endpoint)
  const origin = req.headers.get('origin');
  if (origin && origin !== req.nextUrl.origin) {
    return NextResponse.json({ ok: false, code: 'forbidden' }, { status: 403 });
  }
  if (!req.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json({ ok: false, code: 'invalid' }, { status: 415 });
  }

  const rl = limiter(clientIp(req));
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, code: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } },
    );
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return NextResponse.json({ ok: false, code: 'invalid' }, { status: 413 });

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, code: 'invalid' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, code: 'validation', fields: parsed.error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })) },
      { status: 422 },
    );
  }
  const data = parsed.data;

  // Honeypot / time trap: respond as success-less "accepted" without sending – but never claim delivery.
  if (data.website || (data.startedAt && Date.now() - data.startedAt < MIN_FILL_MS)) {
    return NextResponse.json({ ok: false, code: 'rejected' }, { status: 400 });
  }

  if (!isMailerConfigured()) {
    return NextResponse.json({ ok: false, code: 'not_configured' }, { status: 503 });
  }

  try {
    await sendContactEmail({
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
      location: data.location,
      message: data.message,
      locale: data.locale,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] delivery failed', err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, code: 'delivery_failed' }, { status: 502 });
  }
}
