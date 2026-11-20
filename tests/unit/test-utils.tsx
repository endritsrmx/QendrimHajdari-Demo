import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { render } from '@testing-library/react';
import en from '../../messages/en.json';
import sq from '../../messages/sq.json';

export function renderWithIntl(ui: ReactNode, locale: 'en' | 'sq' = 'en') {
  return render(
    <NextIntlClientProvider locale={locale} messages={locale === 'en' ? en : sq} timeZone="Europe/Belgrade">
      {ui}
    </NextIntlClientProvider>,
  );
}
