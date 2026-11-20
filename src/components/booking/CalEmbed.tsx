'use client';

import { useEffect, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { bookingConfig } from '@/config/booking';

export type CalState = 'loading' | 'ready' | 'error' | 'booked';

/**
 * Official Cal.com React embed. Availability, double-booking protection, confirmation e-mails
 * and calendar invites are handled by Cal.com – this component never simulates slots or bookings.
 */
export default function CalEmbed({
  calLink,
  namespace,
  locale,
  onStateChange,
  reloadKey,
}: {
  calLink: string;
  namespace: string;
  locale: string;
  onStateChange: (s: CalState) => void;
  reloadKey: number;
}) {
  const [, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timeout = window.setTimeout(() => !cancelled && onStateChange('error'), 20_000);
    onStateChange('loading');

    getCalApi({ namespace, embedJsUrl: bookingConfig.embedJsUrl })
      .then((cal) => {
        if (cancelled) return;
        cal('ui', {
          theme: 'light',
          layout: 'month_view',
          hideEventTypeDetails: false,
          cssVarsPerTheme: {
            light: { 'cal-brand': '#263633', 'cal-text': '#263633', 'cal-bg': '#ffffff' },
            dark: { 'cal-brand': '#F7F4EE' },
          },
        });
        cal('on', {
          action: 'linkReady',
          callback: () => {
            window.clearTimeout(timeout);
            if (!cancelled) onStateChange('ready');
          },
        });
        cal('on', {
          action: 'linkFailed',
          callback: () => {
            window.clearTimeout(timeout);
            if (!cancelled) onStateChange('error');
          },
        });
        // Real confirmation event emitted by Cal.com after a successful booking
        cal('on', {
          action: 'bookingSuccessfulV2',
          callback: () => {
            if (!cancelled) onStateChange('booked');
            setTick((x) => x + 1);
          },
        });
      })
      .catch(() => {
        window.clearTimeout(timeout);
        if (!cancelled) onStateChange('error');
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [namespace, reloadKey, onStateChange]);

  return (
    <Cal
      key={reloadKey}
      namespace={namespace}
      calLink={calLink}
      calOrigin={bookingConfig.calOrigin}
      embedJsUrl={bookingConfig.embedJsUrl}
      style={{ width: '100%', minHeight: 640, overflow: 'auto' }}
      config={{ layout: 'month_view', theme: 'light', locale }}
    />
  );
}
