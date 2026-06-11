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

  // Phase 23A: Main navigation top bar no longer contains section links.
  // Section links are in the sidebar strip (desktop) or mobile nav drawer (mobile).
  test('TC-PF-003: navigation links are present', async ({ page }) => {
    const hamburger = page.getByRole('button', { name: /open navigation menu/i })
    if (await hamburger.isVisible()) {
      // Mobile: open hamburger and check mobile navigation links
      await hamburger.click()
      const mobileNav = page.locator('[aria-label="Mobile navigation"]')
      for (const label of ['About', 'Skills', 'Projects', 'Contact']) {
        await expect(mobileNav.getByRole('link', { name: label })).toBeVisible()
      }
    } else {
      // Desktop: check sidebar section navigation (anchor links)
      const sectionNav = page.locator('[aria-label="Section navigation"]')
      await expect(sectionNav).toBeVisible()
      for (const label of ['About', 'Skills', 'Projects', 'Contact']) {
        await expect(sectionNav.getByRole('link', { name: new RegExp(label, 'i') })).toBeVisible()
      }
    }
  })

  // Phase 23A: Second hero CTA changed from "Get in Touch" to "Enter Dashboard →"
  test('TC-PF-004: hero has two CTA links', async ({ page }) => {
    const hero = page.locator('#hero')
    await expect(hero.getByRole('link', { name: 'View Projects' })).toBeVisible()
    await expect(hero.getByRole('link', { name: /enter dashboard/i })).toBeVisible()
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

  // Phase 23A: "Command Chamber" is now a <p> subtitle, not a heading.
  // Stat cards increased from 4 to 5 (added Prompts This Week).
  test('TC-DB-001: dashboard home loads with stat cards', async ({ page }) => {
    // Check exact subtitle text — avoids matching hidden sidebar nav item
    await expect(page.getByText('Command Chamber · Your daily overview')).toBeVisible()
    const statCards = page.locator('[data-testid="stat-card"]')
    await expect(statCards).toHaveCount(5)
  })

  // Phase 23A: Desktop sidebar nav is hidden on mobile — open hamburger first.
  test('TC-DB-002: navigation has all required links', async ({ page }) => {
    const hamburger = page.getByRole('button', { name: /open navigation menu/i })
    if (await hamburger.isVisible()) {
      await hamburger.click()
    }
    // When mobile menu is open, the visible nav is the last one rendered
    const nav = page.getByRole('navigation', { name: 'Dashboard navigation' }).last()
    for (const label of ['Ritual Tasks', 'Prompt Grimoire', 'Career Pipeline', 'Budget Pulse', 'Project Reliquary']) {
      await expect(nav.getByRole('link', { name: label })).toBeVisible()
    }
  })

  test('TC-DB-004: data-loss notice is visible', async ({ page }) => {
    await expect(page.locator('[data-testid="data-loss-notice"]')).toBeVisible()
  })

  // Phase 23A: On mobile the sidebar is hidden — open hamburger first.
  test('TC-DB-003: Ritual Tasks link navigates to correct route', async ({ page }) => {
    const hamburger = page.getByRole('button', { name: /open navigation menu/i })
    if (await hamburger.isVisible()) {
      await hamburger.click()
    }
    const nav = page.getByRole('navigation', { name: 'Dashboard navigation' }).last()
    await nav.getByRole('link', { name: 'Ritual Tasks' }).click()
    await expect(page).toHaveURL('/dashboard/tasks')
    await expect(page.getByRole('heading', { name: 'Ritual Tasks', exact: true })).toBeVisible()
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

  // Phase 23A: Demo data is loaded when Supabase is not configured.
  // Empty state is no longer shown — verify demo jobs are displayed instead.
  test('TC-JT-001: demo jobs are displayed on load', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Career Pipeline' })).toBeVisible()
    await expect(page.getByText('Prism Studio')).toBeVisible()
    await expect(page.getByRole('button', { name: /add application/i }).first()).toBeVisible()
  })

  // Phase 23A: Use force:true for modal submit on mobile (button may be below fold).
  // Also removed check for 'Frontend Engineer' — it exists in demo data (strict mode violation).
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
    // Create two applications with different statuses
    // First: saved (default)
    await page.getByRole('button', { name: /add application/i }).first().click()
    let modal = page.getByRole('dialog')
    await modal.getByLabel(/company/i).fill('Company A')
    await modal.getByLabel(/role/i).fill('Engineer')
    await modal.getByRole('button', { name: /log application/i }).click({ force: true })
    await expect(modal).not.toBeVisible()

    // Second: applied
    await page.getByRole('button', { name: /add application/i }).first().click()
    modal = page.getByRole('dialog')
    await modal.getByLabel(/company/i).fill('Company B')
    await modal.getByLabel(/role/i).fill('Designer')
    // Change status to applied
    const statusSelect = modal.locator('select').first()
    await statusSelect.selectOption('applied')
    await modal.getByRole('button', { name: /log application/i }).click({ force: true })
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
    await modal.getByRole('button', { name: /log application/i }).click({ force: true })
    await expect(modal).not.toBeVisible()
    // Follow-up date should appear with amber/warning styling (check for ⚠ prefix).
    // Scope to the card we created — demo data may also contain overdue follow-ups.
    const ourCard = page
      .locator('[data-testid="job-list"] li')
      .filter({ hasText: 'OverdueInc' })
    await expect(ourCard.getByText(/⚠/)).toBeVisible()
  })

  test('TC-JT-005: mobile layout — no overflow at 390px', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await expect(page.getByRole('heading', { name: 'Career Pipeline' })).toBeVisible()
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

  // Phase 23A: Demo data is loaded when Supabase is not configured.
  // Empty state is no longer shown — verify demo entries are displayed instead.
  test('TC-BT-001: demo budget entries are displayed on load', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Budget Pulse', exact: true })).toBeVisible()
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
    // Summary bar should show income
    await expect(page.locator('[data-testid="budget-summary"]')).toBeVisible()
  })

  // Phase 23A: Changed title from 'Rent' to 'Internet Bill' — 'Rent' already exists in demo data.
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

  // Phase 23A: Use unique names not present in demo data to avoid strict mode violations.
  test('TC-BT-004: filter by income shows only income entries', async ({ page }) => {
    // Create income entry with unique name
    await page.getByRole('button', { name: /add entry/i }).first().click()
    let modal = page.getByRole('dialog')
    await modal.getByLabel(/title/i).fill('Bonus Payment')
    await modal.locator('#budget-amount').fill('3000')
    await modal.locator('#budget-type').selectOption('income')
    await modal.locator('#budget-date').fill('2026-06-01')
    await modal.getByRole('button', { name: /add entry/i }).click({ force: true })
    await expect(modal).not.toBeVisible()

    // Create expense entry with unique name
    await page.getByRole('button', { name: /add entry/i }).first().click()
    modal = page.getByRole('dialog')
    await modal.getByLabel(/title/i).fill('Gym Membership')
    await modal.locator('#budget-amount').fill('150')
    await modal.locator('#budget-type').selectOption('expense')
    await modal.locator('#budget-date').fill('2026-06-02')
    await modal.getByRole('button', { name: /add entry/i }).click({ force: true })
    await expect(modal).not.toBeVisible()

    // Filter by Income — should show our new income entry, not the expense
    await page.getByRole('button', { name: 'Income', exact: true }).click()
    await expect(page.getByText('Bonus Payment')).toBeVisible()
    await expect(page.getByText('Gym Membership')).not.toBeVisible()
  })

  test('TC-BT-005: mobile layout — no overflow at 390px', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await expect(page.getByRole('heading', { name: 'Budget Pulse', exact: true })).toBeVisible()
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })
})
