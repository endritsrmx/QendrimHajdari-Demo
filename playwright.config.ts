import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.E2E_PORT || 3100);
// Use a locally installed Chrome when Playwright's own browsers are not available:
// PW_CHROME_PATH=/usr/bin/google-chrome npm run test:e2e
const executablePath = process.env.PW_CHROME_PATH;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
    launchOptions: executablePath ? { executablePath, args: ['--no-sandbox'] } : undefined,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `npm run start -- -p ${PORT}`,
    port: PORT,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
