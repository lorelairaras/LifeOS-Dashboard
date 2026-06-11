import { test, expect } from '@playwright/test'

// ============================================================
// TC-BAT — Ambient bat flock + Motion effects toggle (Phase 23E)
// Tests assert the RELATIONSHIP between reduced-motion state and behaviour,
// so they pass whether or not the runner emulates reduced motion.
// ============================================================

test.describe('Ambient bat flock', () => {
  test('TC-BAT-001: flock mounts only when motion is allowed', async ({ page }) => {
    await page.goto('/dashboard')
    const reduced = await page.evaluate(
      () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    )
    const canvas = page.locator('[data-testid="ambient-bats"]')
    if (reduced) {
      // Accessibility fallback: no decorative animation under reduced motion.
      await expect(canvas).toHaveCount(0)
    } else {
      // Default preference is ON, so the flock should be present.
      await expect(canvas).toHaveCount(1)
    }
  })

  test('TC-BAT-002: Settings exposes the Motion effects switch', async ({ page }) => {
    await page.goto('/dashboard/settings')
    await expect(page.getByRole('switch', { name: 'Motion effects' })).toBeVisible()
  })

  test('TC-BAT-003: toggling Motion effects flips aria-checked', async ({ page }) => {
    await page.goto('/dashboard/settings')
    const sw = page.getByRole('switch', { name: 'Motion effects' })
    const before = await sw.getAttribute('aria-checked')
    await sw.click()
    const after = await sw.getAttribute('aria-checked')
    expect(after).not.toBe(before)
  })

  test('TC-BAT-004: turning the toggle off removes the flock (when motion allowed)', async ({ page }) => {
    await page.goto('/dashboard/settings')
    const reduced = await page.evaluate(
      () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    )
    test.skip(reduced, 'Flock is already off under reduced motion')

    // Motion is allowed → flock present on the dashboard.
    await page.goto('/dashboard')
    await expect(page.locator('[data-testid="ambient-bats"]')).toHaveCount(1)

    // Turn it off in Settings, return — flock gone.
    await page.goto('/dashboard/settings')
    const sw = page.getByRole('switch', { name: 'Motion effects' })
    if ((await sw.getAttribute('aria-checked')) === 'true') await sw.click()
    await page.goto('/dashboard')
    await expect(page.locator('[data-testid="ambient-bats"]')).toHaveCount(0)
  })
})
