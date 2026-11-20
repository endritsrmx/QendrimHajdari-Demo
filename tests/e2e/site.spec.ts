import { expect, test } from '@playwright/test';

const PAGES = {
  sq: ['/sq', '/sq/rreth-meje', '/sq/sherbimet', '/sq/klinikat', '/sq/rezultatet', '/sq/deshmite', '/sq/pyetjet', '/sq/kontakti', '/sq/rezervo-termin', '/sq/privatesia', '/sq/informacione-ligjore'],
  en: ['/en', '/en/about', '/en/treatments', '/en/locations', '/en/results', '/en/testimonials', '/en/faq', '/en/contact', '/en/book-appointment', '/en/privacy', '/en/legal'],
};
const TREATMENTS = {
  sq: ['demtimet-e-acl', 'demtimet-e-meniskut', 'zevendesimi-i-nyjeve', 'mjekesia-sportive', 'traumatologjia-ortopedike', 'semundjet-e-gjurit-dhe-nyjeve'],
  en: ['acl-injuries', 'meniscus-injuries', 'joint-replacement', 'sports-medicine', 'orthopaedic-trauma', 'knee-joint-conditions'],
};

test.describe('pages', () => {
  for (const [locale, urls] of Object.entries(PAGES)) {
    for (const url of urls) {
      test(`${url} renders with lang=${locale}, one h1 and no horizontal overflow`, async ({ page }) => {
        const res = await page.goto(url);
        expect(res?.status()).toBe(200);
        await expect(page.locator('html')).toHaveAttribute('lang', locale);
        await expect(page.locator('h1')).toHaveCount(1);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(0);
      });
    }
  }

  for (const [locale, slugs] of Object.entries(TREATMENTS)) {
    for (const slug of slugs) {
      const base = locale === 'sq' ? '/sq/sherbimet/' : '/en/treatments/';
      test(`treatment ${base}${slug}`, async ({ page }) => {
        expect((await page.goto(base + slug))?.status()).toBe(200);
        await expect(page.locator('h1')).toBeVisible();
      });
    }
  }
});

test('root redirects to Albanian by default', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/sq$/);
});

test('unknown pages and locale codes show a 404', async ({ page }) => {
  expect((await page.goto('/en/does-not-exist'))?.status()).toBe(404);
  await expect(page.getByText('This page could not be found.')).toBeVisible();
  expect((await page.goto('/de/about'))?.status()).toBe(404);
  expect((await page.goto('/en/treatments/demtimet-e-acl'))?.status()).toBe(404);
});

test('metadata: canonical + hreflang for translated treatment slugs', async ({ page }) => {
  await page.goto('/en/treatments/acl-injuries');
  await expect(page).toHaveTitle(/ACL Injuries \| Dr\. Qendrim Hajdari \| Orthopaedic Care/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/en\/treatments\/acl-injuries$/);
  await expect(page.locator('link[hreflang="sq"]')).toHaveAttribute('href', /\/sq\/sherbimet\/demtimet-e-acl$/);
  await expect(page.locator('link[hreflang="x-default"]')).toHaveCount(1);
  const ld = await page.locator('script[type="application/ld+json"]').first().textContent();
  expect(ld).toContain('BreadcrumbList');
  expect(ld).not.toMatch(/aggregateRating|Review/);
});

test('language switch opens the equivalent page', async ({ page, isMobile }) => {
  await page.goto('/en/treatments/meniscus-injuries');
  if (isMobile) {
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.locator('#site-menu').getByRole('link', { name: /Switch language to Shqip/ }).click();
  } else {
    await page.locator('header').getByRole('link', { name: /Switch language to Shqip/ }).first().click();
  }
  await expect(page).toHaveURL(/\/sq\/sherbimet\/demtimet-e-meniskut$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'sq');
});

test('fullscreen menu: keyboard, focus trap, ESC and focus return', async ({ page }) => {
  await page.goto('/en');
  const toggle = page.locator('button[aria-controls="site-menu"]');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#site-menu')).toBeVisible();
  await expect(page.locator('#site-menu a').first()).toBeFocused();
  for (let i = 0; i < 25; i++) await page.keyboard.press('Tab');
  const inside = await page.evaluate(() => !!document.activeElement?.closest('#site-header'));
  expect(inside).toBe(true);
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
});

test('menu navigation works', async ({ page }) => {
  await page.goto('/en');
  await page.locator('button[aria-controls="site-menu"]').click();
  await page.locator('#site-menu').getByRole('link', { name: /FAQ/ }).click();
  await expect(page).toHaveURL(/\/en\/faq$/);
  await expect(page.locator('h1')).toContainText('Frequently asked questions');
});

test('location card pre-selects the booking location', async ({ page }) => {
  await page.goto('/en/locations');
  await page.getByRole('link', { name: 'Book at This Location' }).nth(1).click();
  await expect(page).toHaveURL(/book-appointment\?location=ordinanca-dora/);
  await expect(page.getByText('Step 2 of 3')).toBeVisible();
  await expect(page.locator('main').getByText('Ordinanca Dora, Gjilan')).toBeVisible();
});

test('booking without provider shows an honest state and no fake slots', async ({ page }) => {
  await page.goto('/en/book-appointment');
  await page.locator('main').getByText('Royal Medical').click();
  await page.getByRole('button', { name: /Continue/ }).click();
  await page.locator('main').getByText('Orthopaedic Consultation').click();
  await page.getByRole('button', { name: /Continue/ }).click();
  await expect(page.getByTestId('booking-not-configured')).toBeVisible();
  await expect(page.locator('iframe')).toHaveCount(0);
});

test('contact form validates and does not claim delivery without a provider', async ({ page }) => {
  await page.goto('/en/contact');
  await page.getByRole('button', { name: /Send message/ }).click();
  await expect(page.getByText('Please enter your name.')).toBeVisible();
  await page.getByLabel(/Full name/).fill('Test Person');
  await page.getByLabel(/^Email/).fill('test@example.com');
  await page.getByLabel(/Preferred location/).selectOption('royal-medical');
  await page.getByLabel(/^Message/).fill('Question about an appointment.');
  await page.getByRole('checkbox').check();
  await page.waitForTimeout(3100); // time trap
  await page.getByRole('button', { name: /Send message/ }).click();
  await expect(page.getByText(/has NOT been sent/)).toBeVisible();
});

test.describe('reduced motion', () => {
  test.use({ colorScheme: 'light', reducedMotion: 'reduce' });
  test('content is visible immediately without motion classes', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('html')).not.toHaveClass(/motion/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const opacity = await page.locator('[data-reveal="fade"]').first().evaluate((el) => getComputedStyle(el).opacity);
    expect(opacity).toBe('1');
  });
});

test('skip link moves focus to main content', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard test');
  await page.goto('/en');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main-content$/);
});

test('contact API enforces validation server-side', async ({ request }) => {
  const res = await request.post('/api/contact', { data: { name: 'x' } });
  expect(res.status()).toBe(422);
});
