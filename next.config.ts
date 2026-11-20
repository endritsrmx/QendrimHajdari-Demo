import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isProd = process.env.NODE_ENV === 'production';
const enableHsts = process.env.ENABLE_HSTS === 'true';
const calOrigin = process.env.NEXT_PUBLIC_CALCOM_ORIGIN || 'https://cal.com';
const calApp = process.env.NEXT_PUBLIC_CALCOM_EMBED_ORIGIN || 'https://app.cal.com';

/**
 * Content Security Policy.
 * Next.js injects inline bootstrap scripts for statically generated pages, so a nonce-based
 * policy would force dynamic rendering. We keep pages static and allow 'unsafe-inline' for
 * scripts only; all third-party origins are explicitly allow-listed (Cal.com only).
 * See DEPLOYMENT.md → "Content Security Policy" for the stricter nonce variant.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? '' : " 'unsafe-eval'"} ${calApp} ${calOrigin}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${calApp} ${calOrigin}`,
  "font-src 'self'",
  `connect-src 'self' ${calApp} ${calOrigin}`,
  `frame-src ${calApp} ${calOrigin}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isProd ? ['upgrade-insecure-requests'] : []),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
  ...(enableHsts
    ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }]
    : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
