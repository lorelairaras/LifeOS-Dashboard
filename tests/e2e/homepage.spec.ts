import { test, expect } from '@playwright/test'

// ============================================================
// TC-PF-001 to TC-PF-007 - Portfolio Homepage Smoke Tests
// Reference: docs/qa/test-cases_v0.1.0.md
// ============================================================

test.describe('Portfolio homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('TC-PF-001: page loads and title contains Rory', async ({ page }) => {
    await expect(page).toHaveTitle(/Rory/)
  })

  // Phase 24: page reframed as a product landing - hero H1 is the product name "LifeOS".
  test('TC-PF-002: hero section contains heading with LifeOS', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText('LifeOS')
  })

  // Phase 24: section nav reflects the product narrative
  // (What it does / How it helps / Services / Case Studies / About / Contact).
  test('TC-PF-003: navigation links are present', async ({ page }) => {
    const hamburger = page.getByRole('button', { name: /open navigation menu/i })
    if (await hamburger.isVisible()) {
      await hamburger.click()
      const mobileNav = page.locator('[aria-label="Mobile navigation"]')
      for (const label of ['What it does', 'Services', 'Contact']) {
        await expect(mobileNav.getByRole('link', { name: label })).toBeVisible()
      }
    } else {
      const sectionNav = page.locator('[aria-label="Section navigation"]')
      await expect(sectionNav).toBeVisible()
      for (const label of ['What it does', 'Services', 'Contact']) {
        await expect(sectionNav.getByRole('link', { name: new RegExp(label, 'i') })).toBeVisible()
      }
    }
  })

  // Phase 24: hero CTAs are "Enter the Dashboard" and "See what it does".
  test('TC-PF-004: hero has two CTA links', async ({ page }) => {
    const hero = page.locator('#hero')
    await expect(hero.getByRole('link', { name: /see what it does/i })).toBeVisible()
    await expect(hero.getByRole('link', { name: /enter the dashboard/i })).toBeVisible()
  })

  test('TC-PF-005: skip link is present and focusable', async ({ page }) => {
    await page.keyboard.press('Tab')
    const skipLink = page.getByRole('link', { name: /skip to main content/i })
    await expect(skipLink).toBeFocused()
  })

  test('TC-PF-006: external links have noopener', async ({ page }) => {
    const externalLinks = page.locator('a[target="_blank"]')
    const count = await externalLinks.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < count; i++) {
      const rel = await externalLinks.nth(i).getAttribute('rel')
      expect(rel).toContain('noopener')
    }
  })

  // Phase 24: Skills section replaced by the product Services section.
  test('TC-PF-007: services section renders service cards', async ({ page }) => {
    await page.evaluate(() => document.querySelector('#services')?.scrollIntoView())
    const serviceList = page.locator('ul[aria-label="Services offered"]')
    await expect(serviceList).toBeVisible()
    const serviceCards = serviceList.locator('> li')
    await expect(serviceCards).toHaveCount(8)
  })
})

// ============================================================
// TC-RESP - Mobile responsive smoke tests
// Reference: docs/uiux/responsive-design_v0.1.0.md
// ============================================================

test.describe('Mobile layout - 390px', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('TC-RESP-001: no horizontal overflow at 390px', async ({ page }) => {
    await page.goto('/')
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })

  test('TC-RESP-002: hamburger menu visible and opens on mobile', async ({ page }) => {
    await page.goto('/')
    const hamburger = page.getByRole('button', { name: /open navigation/i })
    await expect(hamburger).toBeVisible()
    await hamburger.click()
    await expect(page.getByRole('link', { name: 'About' }).first()).toBeVisible()
  })
})

// ============================================================
// TC-DB-001, TC-DB-002 - Dashboard shell smoke tests
// ============================================================

test.describe('Dashboard shell', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard')
  })

  test('TC-DB-001: dashboard home loads with stat cards', async ({ page }) => {
    await expect(page.getByText('Your daily overview', { exact: true })).toBeVisible()
    const statCards = page.locator('[data-testid="stat-card"]')
    await expect(statCards).toHaveCount(5)
  })

  test('TC-DB-002: navigation has all required links', async ({ page }) => {
    const hamburger = page.getByRole('button', { name: /open navigation menu/i })
    if (await hamburger.isVisible()) {
      await hamburger.click()
    }
    const nav = page.getByRole('navigation', { name: 'Dashboard navigation' }).last()
    for (const label of ['Tasks', 'Prompts', 'Job Tracker', 'Budget', 'Projects']) {
      await expect(nav.getByRole('link', { name: label })).toBeVisible()
    }
  })

  test('TC-DB-004: data-loss notice is visible', async ({ page }) => {
    await expect(page.locator('[data-testid="data-loss-notice"]')).toBeVisible()
  })

  test('TC-DB-003: Tasks link navigates to correct route', async ({ page }) => {
    const hamburger = page.getByRole('button', { name: /open navigation menu/i })
    if (await hamburger.isVisible()) {
      await hamburger.click()
    }
    const nav = page.getByRole('navigation', { name: 'Dashboard navigation' }).last()
    await nav.getByRole('link', { name: 'Tasks' }).click()
    await expect(page).toHaveURL('/dashboard/tasks')
    await expect(page.getByRole('heading', { name: 'Tasks', exact: true })).toBeVisible()
  })
})

// ============================================================
// TC-JT - Job Application Tracker tests
// Reference: docs/requirements/features/job-tracker_v0.1.0.md
// ============================================================

test.describe('Job Application Tracker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/jobs')
  })

  test('TC-JT-001: demo jobs are displayed on load', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Job Tracker' })).toBeVisible()
    await expect(page.getByText('Prism Studio')).toBeVisible()
    await expect(page.getByRole('button', { name: /add application/i }).first()).toBeVisible()
  })

  test('TC-JT-002: create application successfully', async ({ page }) => {
    await page.getByRole('button', { name: /add application/i }).first().click()
    const modal = page.getByRole('dialog')
    await expect(modal).toBeVisible()
    await modal.getByLabel(/company/i).fill('Acme Corp')
    await modal.getByLabel(/role/i).fill('Test Automation Engineer')
    await modal.getByRole('button', { name: /log application/i }).click({ force: true })
    await expect(modal).not.toBeVisible()
    await expect(page.getByText('Acme Corp')).toBeVisible()
  })

  test('TC-JT-003: filter by status', async ({ page }) => {
    await page.getByRole('button', { name: /add application/i }).first().click()
    let modal = page.getByRole('dialog')
    await modal.getByLabel(/company/i).fill('Company A')
    await modal.getByLabel(/role/i).fill('Engineer')
    await modal.getByRole('button', { name: /log application/i }).click({ force: true })
    await expect(modal).not.toBeVisible()

    await page.getByRole('button', { name: /add application/i }).first().click()
    modal = page.getByRole('dialog')
    await modal.getByLabel(/company/i).fill('Company B')
    await modal.getByLabel(/role/i).fill('Designer')
    const statusSelect = modal.locator('select').first()
    await statusSelect.selectOption('applied')
    await modal.getByRole('button', { name: /log application/i }).click({ force: true })
    await expect(modal).not.toBeVisible()

    await page.getByRole('button', { name: 'Applied', exact: true }).click()
    await expect(page.getByText('Company B')).toBeVisible()
    await expect(page.getByText('Company A')).not.toBeVisible()
  })

  test('TC-JT-004: overdue follow-up date shows amber highlight', async ({ page }) => {
    await page.getByRole('button', { name: /add application/i }).first().click()
    const modal = page.getByRole('dialog')
    await modal.getByLabel(/company/i).fill('OverdueInc')
    await modal.getByLabel(/role/i).fill('Dev')
    await modal.locator('#job-follow-up').fill('2020-01-01')
    await modal.getByRole('button', { name: /log application/i }).click({ force: true })
    await expect(modal).not.toBeVisible()
    const ourCard = page
      .locator('[data-testid="job-list"] li')
      .filter({ hasText: 'OverdueInc' })
    await expect(ourCard.getByText(/⚠/)).toBeVisible()
  })

  test('TC-JT-006: clearing an optional field on edit persists', async ({ page }) => {
    await page.getByRole('button', { name: /add application/i }).first().click()
    let modal = page.getByRole('dialog')
    await modal.getByLabel(/company/i).fill('ClearField Co')
    await modal.getByLabel(/role/i).fill('QA Engineer')
    await modal.locator('#job-location').fill('Remote (Mars)')
    await modal.getByRole('button', { name: /log application/i }).click({ force: true })
    await expect(modal).not.toBeVisible()

    const card = page.locator('[data-testid="job-list"] li').filter({ hasText: 'ClearField Co' })
    await expect(card.getByText('Remote (Mars)')).toBeVisible()

    await card.getByRole('button', { name: 'Edit application: ClearField Co' }).click()
    modal = page.getByRole('dialog')
    await modal.locator('#job-location').fill('')
    await modal.getByRole('button', { name: /save changes/i }).click({ force: true })
    await expect(modal).not.toBeVisible()
    await expect(card.getByText('Remote (Mars)')).not.toBeVisible()

    await card.getByRole('button', { name: 'Edit application: ClearField Co' }).click()
    modal = page.getByRole('dialog')
    await expect(modal.locator('#job-location')).toHaveValue('')
    await modal.getByRole('button', { name: /cancel/i }).click()
    await expect(modal).not.toBeVisible()
  })

  test('TC-JT-005: mobile layout - no overflow at 390px', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await expect(page.getByRole('heading', { name: 'Job Tracker' })).toBeVisible()
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })
})

// ============================================================
// TC-BT - Budget Tracker tests
// Reference: docs/requirements/features/budget-tracker_v0.1.0.md
// ============================================================

test.describe('Budget Tracker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/budget')
  })

  test('TC-BT-001: demo budget entries are displayed on load', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Budget', exact: true })).toBeVisible()
    await expect(page.getByText('Monthly salary')).toBeVisible()
    await expect(page.getByRole('button', { name: /add entry/i }).first()).toBeVisible()
  })

  test('TC-BT-002: create an income entry', async ({ page }) => {
    await page.getByRole('button', { name: /add entry/i }).first().click()
    const modal = page.getByRole('dialog')
    await expect(modal).toBeVisible()
    await modal.getByLabel(/title/i).fill('Freelance payment')
    await modal.locator('#budget-amount').fill('2500')
    await modal.locator('#budget-type').selectOption('income')
    await modal.locator('#budget-date').fill('2026-06-01')
    await modal.getByRole('button', { name: /add entry/i }).click({ force: true })
    await expect(modal).not.toBeVisible()
    await expect(page.getByText('Freelance payment')).toBeVisible()
    await expect(page.locator('[data-testid="budget-summary"]')).toBeVisible()
  })

  test('TC-BT-003: create an expense entry', async ({ page }) => {
    await page.getByRole('button', { name: /add entry/i }).first().click()
    const modal = page.getByRole('dialog')
    await modal.getByLabel(/title/i).fill('Internet Bill')
    await modal.locator('#budget-amount').fill('60')
    await modal.locator('#budget-type').selectOption('expense')
    await modal.locator('#budget-date').fill('2026-06-01')
    await modal.getByRole('button', { name: /add entry/i }).click({ force: true })
    await expect(modal).not.toBeVisible()
    await expect(page.getByText('Internet Bill')).toBeVisible()
  })

  test('TC-BT-004: filter by income shows only income entries', async ({ page }) => {
    await page.getByRole('button', { name: /add entry/i }).first().click()
    let modal = page.getByRole('dialog')
    await modal.getByLabel(/title/i).fill('Bonus Payment')
    await modal.locator('#budget-amount').fill('3000')
    await modal.locator('#budget-type').selectOption('income')
    await modal.locator('#budget-date').fill('2026-06-01')
    await modal.getByRole('button', { name: /add entry/i }).click({ force: true })
    await expect(modal).not.toBeVisible()

    await page.getByRole('button', { name: /add entry/i }).first().click()
    modal = page.getByRole('dialog')
    await modal.getByLabel(/title/i).fill('Gym Membership')
    await modal.locator('#budget-amount').fill('150')
    await modal.locator('#budget-type').selectOption('expense')
    await modal.locator('#budget-date').fill('2026-06-02')
    await modal.getByRole('button', { name: /add entry/i }).click({ force: true })
    await expect(modal).not.toBeVisible()

    await page.getByRole('button', { name: 'Income', exact: true }).click()
    await expect(page.getByText('Bonus Payment')).toBeVisible()
    await expect(page.getByText('Gym Membership')).not.toBeVisible()
  })

  test('TC-BT-005: mobile layout - no overflow at 390px', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await expect(page.getByRole('heading', { name: 'Budget', exact: true })).toBeVisible()
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })
})
