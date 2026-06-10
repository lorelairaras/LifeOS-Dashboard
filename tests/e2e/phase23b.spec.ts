import { test, expect } from '@playwright/test'

// ============================================================
// TC-PR — Project Reliquary CRUD tests (Phase 23B)
// ============================================================

test.describe('Project Reliquary', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/projects')
  })

  test('TC-PR-001: demo projects are displayed on load', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Project Reliquary' })).toBeVisible()
    await expect(page.getByText('LifeOS Dashboard')).toBeVisible()
    await expect(page.getByRole('button', { name: /add project/i }).first()).toBeVisible()
  })

  test('TC-PR-002: create a project successfully', async ({ page }) => {
    await page.getByRole('button', { name: /add project/i }).first().click()
    const modal = page.getByRole('dialog')
    await expect(modal).toBeVisible()
    await modal.getByLabel(/project name/i).fill('E2E Test Project')
    await modal.getByLabel(/tech stack/i).fill('Playwright, TypeScript')
    await modal.getByRole('button', { name: 'Add Project', exact: true }).click({ force: true })
    await expect(modal).not.toBeVisible()
    await expect(page.getByText('E2E Test Project')).toBeVisible()
    await expect(page.getByText('Playwright')).toBeVisible()
  })

  test('TC-PR-003: edit a project', async ({ page }) => {
    await page.getByRole('button', { name: 'Edit LifeOS Dashboard' }).click()
    const modal = page.getByRole('dialog')
    await expect(modal).toBeVisible()
    await modal.getByLabel(/project name/i).fill('LifeOS Dashboard v2')
    await modal.getByRole('button', { name: /save changes/i }).click({ force: true })
    await expect(modal).not.toBeVisible()
    await expect(page.getByText('LifeOS Dashboard v2')).toBeVisible()
  })

  test('TC-PR-004: delete a project with confirmation', async ({ page }) => {
    await page.getByRole('button', { name: 'Delete Internal BA Toolkit' }).click()
    // ConfirmDialog uses role="alertdialog" (correct ARIA for destructive confirms)
    const dialog = page.getByRole('alertdialog')
    await expect(dialog).toBeVisible()
    await dialog.getByRole('button', { name: 'Delete', exact: true }).click()
    await expect(page.getByText('Internal BA Toolkit')).not.toBeVisible()
  })
})

// ============================================================
// TC-HB — Habit Rituals tests (Phase 23B)
// ============================================================

test.describe('Habit Rituals', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/habits')
  })

  test('TC-HB-001: demo habits are displayed on load', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Habit Rituals' })).toBeVisible()
    await expect(page.getByText('Morning pages')).toBeVisible()
    await expect(page.locator('[data-testid="habit-list"]')).toBeVisible()
  })

  test('TC-HB-002: add a new habit', async ({ page }) => {
    await page.getByLabel('New habit name').fill('Drink water')
    await page.getByRole('button', { name: 'Add', exact: true }).click()
    await expect(page.getByText('Drink water')).toBeVisible()
  })

  test('TC-HB-003: toggle a habit check for today', async ({ page }) => {
    // "No social media before noon" has no check today in demo data
    const todayToggle = page.getByRole('button', {
      name: 'No social media before noon — Today — not done',
    })
    await todayToggle.click()
    await expect(
      page.getByRole('button', { name: 'No social media before noon — Today — done' })
    ).toBeVisible()
  })

  test('TC-HB-004: delete a habit with confirmation', async ({ page }) => {
    await page.getByRole('button', { name: 'Delete habit Exercise' }).click()
    const dialog = page.getByRole('alertdialog')
    await expect(dialog).toBeVisible()
    await dialog.getByRole('button', { name: 'Delete', exact: true }).click()
    await expect(page.getByText('Exercise', { exact: true })).not.toBeVisible()
  })
})

// ============================================================
// TC-KV — Knowledge Vault tests (Phase 23B)
// ============================================================

test.describe('Knowledge Vault', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/vault')
  })

  test('TC-KV-001: demo notes are displayed on load', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Knowledge Vault' })).toBeVisible()
    await expect(page.getByText('Product thinking frameworks')).toBeVisible()
    await expect(page.locator('[data-testid="note-list"]')).toBeVisible()
  })

  test('TC-KV-002: create a note successfully', async ({ page }) => {
    await page.getByRole('button', { name: /add note/i }).first().click()
    const modal = page.getByRole('dialog')
    await expect(modal).toBeVisible()
    await modal.getByLabel(/title/i).fill('E2E Test Note')
    await modal.getByLabel(/content/i).fill('Created by Playwright during Phase 23B QA.')
    await modal.getByLabel(/tags/i).fill('testing')
    await modal.getByRole('button', { name: 'Add Note', exact: true }).click({ force: true })
    await expect(modal).not.toBeVisible()
    await expect(page.getByText('E2E Test Note')).toBeVisible()
  })

  test('TC-KV-003: search filters notes', async ({ page }) => {
    await page.getByLabel('Search notes').fill('React patterns')
    await expect(page.getByText('React patterns I always forget')).toBeVisible()
    await expect(page.getByText('Books to read this year')).not.toBeVisible()
  })

  test('TC-KV-004: tag filter narrows the list', async ({ page }) => {
    await page.getByRole('button', { name: 'career', exact: true }).click()
    await expect(page.getByText('Interview prep — BA questions')).toBeVisible()
    await expect(page.getByText('System design notes')).not.toBeVisible()
  })

  test('TC-KV-006: edit a note', async ({ page }) => {
    await page.getByRole('button', { name: 'Edit note System design notes' }).click()
    const modal = page.getByRole('dialog')
    await expect(modal).toBeVisible()
    await modal.getByLabel(/title/i).fill('System design notes v2')
    await modal.getByRole('button', { name: /save changes/i }).click({ force: true })
    await expect(modal).not.toBeVisible()
    await expect(page.getByText('System design notes v2')).toBeVisible()
  })

  test('TC-KV-005: delete a note with confirmation', async ({ page }) => {
    await page.getByRole('button', { name: 'Delete note Books to read this year' }).click()
    const dialog = page.getByRole('alertdialog')
    await expect(dialog).toBeVisible()
    await dialog.getByRole('button', { name: 'Delete', exact: true }).click()
    await expect(page.getByText('Books to read this year')).not.toBeVisible()
  })
})

// ============================================================
// TC-RESP-23B — Responsiveness checks for new pages
// ============================================================

test.describe('Phase 23B mobile layout — 390px', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  for (const [route, name] of [
    ['/dashboard/projects', 'Projects'],
    ['/dashboard/habits', 'Habits'],
    ['/dashboard/vault', 'Vault'],
  ] as const) {
    test(`TC-RESP-23B ${name}: no horizontal overflow at 390px`, async ({ page }) => {
      await page.goto(route)
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
    })
  }
})
