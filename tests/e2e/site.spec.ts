import { expect, test } from '@playwright/test';

// Most tests run as a "returning visitor in this session" → 0.6 s intro version.
test.beforeEach(async ({ page }, info) => {
  if (info.title.startsWith('intro:')) return;
  await page.addInitScript(() => {
    try {
      sessionStorage.setItem('qh-intro-seen', '1');
    } catch {}
  });
});

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
  await expect(page.getByText('This page could not be found')).toBeVisible();
  expect((await page.goto('/de/about'))?.status()).toBe(404);
  expect((await page.goto('/en/treatments/demtimet-e-acl'))?.status()).toBe(404);
});

test('metadata: canonical + hreflang for translated treatment slugs', async ({ page }) => {
  await page.goto('/en/treatments/acl-injuries');
  await expect(page).toHaveTitle(/ACL injuries \| Dr\. Qëndrim Hajdari \| Orthopaedic Care/);
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
  await page.getByRole('link', { name: 'Book at this location' }).nth(1).click();
  await expect(page).toHaveURL(/book-appointment\?location=ordinanca-dora/);
  await expect(page.getByText('Step 2 of 3')).toBeVisible();
  await expect(page.locator('main').getByText('Ortopedia Dora, Gjilan')).toBeVisible();
});

test('booking without provider shows an honest state and no fake slots', async ({ page }) => {
  await page.goto('/en/book-appointment');
  await page.locator('main').getByText('Royal Medical').click();
  await page.getByRole('button', { name: /Continue/ }).click();
  await page.locator('main').getByText('Orthopaedic consultation').click();
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

test('menu can be interrupted: reopening mid-close continues without restarting', async ({ page }) => {
  await page.goto('/en');
  const toggle = page.locator('button[aria-controls="site-menu"]');
  await toggle.click();
  await page.waitForTimeout(700);
  await toggle.click(); // start closing…
  await page.waitForTimeout(80);
  await toggle.click(); // …and grab it again mid-flight
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.waitForTimeout(600);
  const clip = await page.locator('#site-menu').evaluate((el) => getComputedStyle(el).clipPath);
  expect(clip).toMatch(/inset\(0(px|%)?\)|inset\(0% 0% 0% 0%\)|none/);
  await expect(page.locator('#site-menu a').first()).toBeVisible();
});

test.describe('reduced transparency & increased contrast', () => {
  test('header becomes a solid surface', async ({ browser }) => {
    const ctx = await browser.newContext({ contrast: 'more' });
    const page = await ctx.newPage();
    await page.goto('/en');
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(500);
    const bg = await page.locator('.header-material').evaluate((el) => getComputedStyle(el, '::before').backgroundColor);
    expect(bg).toBe('rgb(247, 244, 238)');
    await ctx.close();
  });
});

test('intro: first visit plays fully, counts to 100, then hands over to the hero', async ({ page }) => {
  const counts: number[] = [];
  await page.exposeFunction('__count', (v: string) => counts.push(Number(v)));
  await page.addInitScript(() => {
    const iv = setInterval(() => {
      const c = document.querySelector('[data-intro-count]');
      if (c) (window as unknown as { __count: (v: string) => void }).__count(c.textContent || '0');
      else if (document.readyState === 'complete') clearInterval(iv);
    }, 50);
  });
  await page.goto('/sq');
  await expect(page.locator('html')).toHaveClass(/intro-pending/);
  await expect(page.locator('.qh-intro')).toBeVisible();
  await expect(page.locator('[data-label="acl"]')).toHaveText(/Ligamenti i kryqëzuar|LKA/);
  await expect(page.locator('.qh-intro')).toHaveCount(0, { timeout: 12000 });
  await expect(page.locator('html')).not.toHaveClass(/intro-pending/);
  await expect(page.locator('#main-content')).toBeFocused();
  await expect(page.locator('#site-header')).toHaveCSS('opacity', '1');
  await expect(page.locator('#hero-title')).toBeVisible();
  expect(Math.max(...counts)).toBe(100);
  for (let i = 1; i < counts.length; i++) expect(counts[i]!).toBeGreaterThanOrEqual(counts[i - 1]!);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe('hidden');
});

test('intro: second visit in the same session gets the short version', async ({ page }) => {
  await page.goto('/en');
  await expect(page.locator('.qh-intro')).toHaveCount(0, { timeout: 12000 });
  const t0 = Date.now();
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/intro-short/);
  await expect(page.locator('.qh-intro')).toHaveCount(0, { timeout: 3000 });
  expect(Date.now() - t0).toBeLessThan(3000);
});

test('intro: deep links never show the intro', async ({ page }) => {
  await page.goto('/en/treatments/acl-injuries');
  await expect(page.locator('html')).not.toHaveClass(/intro-pending/);
  await expect(page.locator('.qh-intro')).toHaveCount(0);
});
