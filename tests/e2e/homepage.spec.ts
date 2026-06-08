import { test, expect } from '@playwright/test'

// ============================================================
// TC-PF-001 to TC-PF-004 — Portfolio Homepage Smoke Tests
// Reference: docs/qa/test-cases_v0.1.0.md
// ============================================================

test.describe('Portfolio homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('TC-PF-001: page loads and title contains Rory', async ({ page }) => {
    await expect(page).toHaveTitle(/Rory/)
  })

  test('TC-PF-002: hero section contains heading with Rory', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText('Rory')
  })

  test('TC-PF-003: navigation links are present', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'Main navigation' })
    await expect(nav).toBeVisible()
    await expect(nav.getByRole('link', { name: 'About' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Skills' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Projects' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeVisible()
  })

  test('TC-PF-004: hero has two CTA links', async ({ page }) => {
    const hero = page.locator('#hero')
    await expect(hero.getByRole('link', { name: 'View Projects' })).toBeVisible()
    await expect(hero.getByRole('link', { name: 'Get in Touch' })).toBeVisible()
  })

  test('TC-PF-005: skip link is present and focusable', async ({ page }) => {
    // Tab once — skip link should receive focus
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

  test('TC-PF-007: skills section renders tags', async ({ page }) => {
    const skillsSection = page.getByRole('region', { name: /skills/i })
    await page.evaluate(() =>
      document.querySelector('#skills')?.scrollIntoView()
    )
    await expect(skillsSection).toBeVisible()
    // At least 6 skill items expected
    const skillTags = skillsSection.locator('li')
    const tagCount = await skillTags.count()
    expect(tagCount).toBeGreaterThanOrEqual(6)
  })
})

// ============================================================
// TC-RESP — Mobile responsive smoke tests
// Reference: docs/uiux/responsive-design_v0.1.0.md
// ============================================================

test.describe('Mobile layout — 390px', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('TC-RESP-001: no horizontal overflow at 390px', async ({ page }) => {
    await page.goto('/')
    // Check document width does not exceed viewport
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1) // +1 for rounding
  })

  test('TC-RESP-002: hamburger menu visible and opens on mobile', async ({ page }) => {
    await page.goto('/')
    const hamburger = page.getByRole('button', { name: /open navigation/i })
    await expect(hamburger).toBeVisible()
    await hamburger.click()
    // After clicking, menu items should be visible
    await expect(page.getByRole('link', { name: 'About' }).first()).toBeVisible()
  })
})

// ============================================================
// TC-DB-001, TC-DB-002 — Dashboard shell smoke tests
// ============================================================

test.describe('Dashboard shell', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard')
  })

  test('TC-DB-001: dashboard home loads with stat cards', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
    const statCards = page.locator('[data-testid="stat-card"]')
    await expect(statCards).toHaveCount(4)
  })

  test('TC-DB-002: navigation has all required links', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'Dashboard navigation' })
    for (const label of ['Tasks', 'Prompts', 'Jobs', 'Budget', 'Projects', 'Settings']) {
      await expect(nav.getByRole('link', { name: label })).toBeVisible()
    }
  })

  test('TC-DB-004: data-loss notice is visible', async ({ page }) => {
    await expect(page.locator('[data-testid="data-loss-notice"]')).toBeVisible()
  })

  test('TC-DB-003: Tasks link navigates to correct route', async ({ page }) => {
    // Use desktop nav
    const nav = page.getByRole('navigation', { name: 'Dashboard navigation' })
    await nav.getByRole('link', { name: 'Tasks' }).click()
    await expect(page).toHaveURL('/dashboard/tasks')
    await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible()
  })
})

// ============================================================
// TC-JT — Job Application Tracker tests
// Reference: docs/requirements/features/job-tracker_v0.1.0.md
// ============================================================

test.describe('Job Application Tracker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/jobs')
  })

  test('TC-JT-001: empty state with no applications', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Job Applications' })).toBeVisible()
    await expect(page.getByText(/no applications tracked yet/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /add application/i }).first()).toBeVisible()
  })

  test('TC-JT-002: create application successfully', async ({ page }) => {
    await page.getByRole('button', { name: /add application/i }).first().click()
    const modal = page.getByRole('dialog')
    await expect(modal).toBeVisible()
    await modal.getByLabel(/company/i).fill('Acme Corp')
    await modal.getByLabel(/role/i).fill('Frontend Engineer')
    await modal.getByRole('button', { name: /log application/i }).click()
    await expect(modal).not.toBeVisible()
    await expect(page.getByText('Acme Corp')).toBeVisible()
    await expect(page.getByText('Frontend Engineer')).toBeVisible()
  })

  test('TC-JT-003: filter by status', async ({ page }) => {
    // Create two applications with different statuses
    // First: saved (default)
    await page.getByRole('button', { name: /add application/i }).first().click()
    let modal = page.getByRole('dialog')
    await modal.getByLabel(/company/i).fill('Company A')
    await modal.getByLabel(/role/i).fill('Engineer')
    await modal.getByRole('button', { name: /log application/i }).click()
    await expect(modal).not.toBeVisible()

    // Second: applied
    await page.getByRole('button', { name: /add application/i }).first().click()
    modal = page.getByRole('dialog')
    await modal.getByLabel(/company/i).fill('Company B')
    await modal.getByLabel(/role/i).fill('Designer')
    // Change status to applied
    const statusSelect = modal.locator('select').first()
    await statusSelect.selectOption('applied')
    await modal.getByRole('button', { name: /log application/i }).click()
    await expect(modal).not.toBeVisible()

    // Filter by 'Applied' — should show only Company B
    await page.getByRole('button', { name: 'Applied', exact: true }).click()
    await expect(page.getByText('Company B')).toBeVisible()
    await expect(page.getByText('Company A')).not.toBeVisible()
  })

  test('TC-JT-004: overdue follow-up date shows amber highlight', async ({ page }) => {
    await page.getByRole('button', { name: /add application/i }).first().click()
    const modal = page.getByRole('dialog')
    await modal.getByLabel(/company/i).fill('OverdueInc')
    await modal.getByLabel(/role/i).fill('Dev')
    // Set follow-up date to a past date
    await modal.locator('#job-follow-up').fill('2020-01-01')
    await modal.getByRole('button', { name: /log application/i }).click()
    await expect(modal).not.toBeVisible()
    // Follow-up date should appear with amber/warning styling (check for ⚠ prefix)
    const jobList = page.locator('[data-testid="job-list"]')
    await expect(jobList.getByText(/⚠/)).toBeVisible()
  })

  test('TC-JT-005: mobile layout — no overflow at 390px', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await expect(page.getByRole('heading', { name: 'Job Applications' })).toBeVisible()
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })
})

// ============================================================
// TC-BT — Budget Tracker tests
// Reference: docs/requirements/features/budget-tracker_v0.1.0.md
// ============================================================

test.describe('Budget Tracker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/budget')
  })

  test('TC-BT-001: empty state with no entries', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Budget' })).toBeVisible()
    await expect(page.getByText(/no budget entries yet/i)).toBeVisible()
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
    await modal.getByRole('button', { name: /add entry/i }).click()
    await expect(modal).not.toBeVisible()
    await expect(page.getByText('Freelance payment')).toBeVisible()
    // Summary bar should show income
    await expect(page.locator('[data-testid="budget-summary"]')).toBeVisible()
  })

  test('TC-BT-003: create an expense entry', async ({ page }) => {
    await page.getByRole('button', { name: /add entry/i }).first().click()
    const modal = page.getByRole('dialog')
    await modal.getByLabel(/title/i).fill('Rent')
    await modal.locator('#budget-amount').fill('1200')
    await modal.locator('#budget-type').selectOption('expense')
    await modal.locator('#budget-date').fill('2026-06-01')
    await modal.getByRole('button', { name: /add entry/i }).click()
    await expect(modal).not.toBeVisible()
    await expect(page.getByText('Rent')).toBeVisible()
  })

  test('TC-BT-004: filter by income shows only income entries', async ({ page }) => {
    // Create income entry
    await page.getByRole('button', { name: /add entry/i }).first().click()
    let modal = page.getByRole('dialog')
    await modal.getByLabel(/title/i).fill('Salary')
    await modal.locator('#budget-amount').fill('3000')
    await modal.locator('#budget-type').selectOption('income')
    await modal.locator('#budget-date').fill('2026-06-01')
    await modal.getByRole('button', { name: /add entry/i }).click()
    await expect(modal).not.toBeVisible()

    // Create expense entry
    await page.getByRole('button', { name: /add entry/i }).first().click()
    modal = page.getByRole('dialog')
    await modal.getByLabel(/title/i).fill('Groceries')
    await modal.locator('#budget-amount').fill('150')
    await modal.locator('#budget-type').selectOption('expense')
    await modal.locator('#budget-date').fill('2026-06-02')
    await modal.getByRole('button', { name: /add entry/i }).click()
    await expect(modal).not.toBeVisible()

    // Filter by Income
    await page.getByRole('button', { name: 'Income', exact: true }).click()
    await expect(page.getByText('Salary')).toBeVisible()
    await expect(page.getByText('Groceries')).not.toBeVisible()
  })

  test('TC-BT-005: mobile layout — no overflow at 390px', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await expect(page.getByRole('heading', { name: 'Budget' })).toBeVisible()
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })
})
