# Playwright Test Plan — LifeOS Portfolio Dashboard

**Version:** v0.1.0  
**Date:** 2026-06-03  
**Author:** Rory  
**Status:** Draft — test files not yet created

---

## Overview

Playwright is the primary automated testing tool for LifeOS. It tests full user flows through a real browser (Chromium by default, with optional Firefox and WebKit coverage).

Tests are located in `tests/e2e/`.

---

## Configuration

File: `playwright.config.ts` (project root)

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## File Structure

```
tests/e2e/
├── portfolio/
│   ├── homepage.spec.ts        # TC-PF-001 to TC-PF-008
│   └── navigation.spec.ts      # TC-PF-002, TC-PF-011
├── dashboard/
│   ├── shell.spec.ts           # TC-DB-001 to TC-DB-005
│   ├── tasks.spec.ts           # TC-TK-001 to TC-TK-006
│   ├── prompts.spec.ts         # TC-PL-001 to TC-PL-006
│   ├── jobs.spec.ts            # TC-JT-001 to TC-JT-004
│   └── budget.spec.ts          # TC-BT-001 to TC-BT-007
└── accessibility/
    └── a11y.spec.ts            # TC-A11Y-002 to TC-A11Y-004
```

---

## Test File: homepage.spec.ts

```typescript
import { test, expect } from '@playwright/test';

test.describe('Portfolio homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC-PF-001: page loads and title contains Rory', async ({ page }) => {
    await expect(page).toHaveTitle(/Rory/);
  });

  test('TC-PF-003: hero section has name and CTA buttons', async ({ page }) => {
    const hero = page.getByRole('region', { name: /hero/i });
    await expect(hero).toBeVisible();
    const buttons = hero.getByRole('link');
    await expect(buttons).toHaveCount({ minimum: 2 });
  });

  test('TC-PF-006: projects section has at least two project cards', async ({ page }) => {
    const projects = page.getByRole('region', { name: /projects/i });
    const cards = projects.getByRole('article');
    await expect(cards).toHaveCount({ minimum: 2 });
  });

  test('TC-PF-007: external links have noopener', async ({ page }) => {
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const rel = await externalLinks.nth(i).getAttribute('rel');
      expect(rel).toContain('noopener');
    }
  });
});
```

---

## Test File: shell.spec.ts

```typescript
import { test, expect } from '@playwright/test';

test.describe('Dashboard shell', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('TC-DB-001: dashboard home loads with stat cards', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
    const statCards = page.locator('[data-testid="stat-card"]');
    await expect(statCards).toHaveCount({ minimum: 4 });
  });

  test('TC-DB-002: navigation has all required links', async ({ page }) => {
    const nav = page.getByRole('navigation');
    for (const label of ['Tasks', 'Prompts', 'Jobs', 'Budget', 'Settings']) {
      await expect(nav.getByRole('link', { name: label })).toBeVisible();
    }
  });

  test('TC-DB-003: Tasks link navigates to tasks route', async ({ page }) => {
    await page.getByRole('link', { name: 'Tasks' }).click();
    await expect(page).toHaveURL('/dashboard/tasks');
  });

  test('TC-DB-004: data-loss notice is visible on load', async ({ page }) => {
    await expect(page.locator('[data-testid="data-loss-notice"]')).toBeVisible();
  });

  test('TC-DB-005: data-loss notice can be dismissed', async ({ page }) => {
    await page.locator('[data-testid="data-loss-notice"] button').click();
    await expect(page.locator('[data-testid="data-loss-notice"]')).not.toBeVisible();
  });
});
```

---

## Test Helpers

Reusable helper: `tests/e2e/helpers/createTask.ts`

```typescript
import { Page } from '@playwright/test';

export async function createTask(
  page: Page,
  title: string,
  options?: { status?: string; priority?: string }
) {
  await page.goto('/dashboard/tasks');
  await page.getByRole('button', { name: /add task/i }).click();
  await page.getByLabel(/title/i).fill(title);
  if (options?.status) {
    await page.getByLabel(/status/i).selectOption(options.status);
  }
  await page.getByRole('button', { name: /save|create/i }).click();
}
```

---

## Running Tests

```bash
# Run all tests (headless)
npx playwright test

# Run tests with UI
npx playwright test --ui

# Run tests in headed mode
npx playwright test --headed

# Run a specific file
npx playwright test tests/e2e/portfolio/homepage.spec.ts

# Show last test report
npx playwright show-report
```

---

## CI/CD Integration (Planned)

When GitHub Actions is configured:

```yaml
# .github/workflows/e2e.yml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

Note: This YAML is planned. It will not be added to the repository until CI is configured.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-03 | Initial Playwright plan created |
