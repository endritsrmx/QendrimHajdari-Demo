import type { Metadata, Viewport } from 'next';
import { ViewTransition, type ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { site } from '@/config/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/layout/SkipLink';
import { Cursor } from '@/components/layout/Cursor';
import { RouteFocus } from '@/components/layout/RouteFocus';
import { MobileBookingBar } from '@/components/layout/MobileBookingBar';
import { MotionProvider } from '@/components/animations/MotionProvider';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#F7F4EE',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as 'sq' | 'en', namespace: 'meta' });
  return {
    metadataBase: new URL(site.url),
    title: { default: t('siteName'), template: '%s' },
    applicationName: t('siteName'),
    formatDetection: { telephone: false },
  };
}

/** Client-side messages: only namespaces used by client components. */
const CLIENT_NAMESPACES = ['nav', 'common', 'cursor', 'booking', 'contact'] as const;

// Runs before paint: enables reveal states only when motion is allowed (content stays visible without JS).
const MOTION_SCRIPT = `try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion')}}catch(e){}`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const clientMessages = Object.fromEntries(CLIENT_NAMESPACES.map((ns) => [ns, messages[ns]]));
  const t = await getTranslations('nav');

  return (
    <html lang={locale} dir="ltr">
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_SCRIPT }} />
        <link rel="preload" href="/fonts/cormorant-garamond-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/manrope-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <SkipLink label={t('skip')} />
          <Header />
          <ViewTransition default="page">
            <main id="main-content" tabIndex={-1} className="outline-none">
              {children}
            </main>
          </ViewTransition>
          <Footer />
          <MobileBookingBar />
          <Cursor />
          <MotionProvider />
          <RouteFocus />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
