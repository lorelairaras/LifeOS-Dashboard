import { test, expect } from '@playwright/test'

// ============================================================
// TC-A11Y — Dialog focus management (WCAG 2.1 — 2.4.3 Focus Order, 2.1.2 No Keyboard Trap)
// ============================================================

test.describe('Dialog focus management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/projects')
  })

  test('TC-A11Y-001: ConfirmDialog traps Tab focus inside the dialog', async ({ page }) => {
    await page.getByRole('button', { name: 'Delete Internal BA Toolkit' }).click()
    const dialog = page.getByRole('alertdialog')
    await expect(dialog).toBeVisible()
    const cancelButton = dialog.getByRole('button', { name: 'Cancel' })
    const deleteButton = dialog.getByRole('button', { name: 'Delete', exact: true })

    await expect(cancelButton).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(deleteButton).toBeFocused()
    // Tab from the last focusable element must wrap to the first
    await page.keyboard.press('Tab')
    await expect(cancelButton).toBeFocused()
    // Shift+Tab from the first focusable element must wrap to the last
    await page.keyboard.press('Shift+Tab')
    await expect(deleteButton).toBeFocused()
  })

  test('TC-A11Y-002: ConfirmDialog restores focus to the trigger on cancel', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Delete Internal BA Toolkit' })
    await trigger.click()
    const dialog = page.getByRole('alertdialog')
    await expect(dialog).toBeVisible()
    await dialog.getByRole('button', { name: 'Cancel' }).click()
    await expect(dialog).not.toBeVisible()
    await expect(trigger).toBeFocused()
  })

  test('TC-A11Y-003: Modal restores focus to the trigger on close (Escape)', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /add project/i }).first()
    await trigger.click()
    const modal = page.getByRole('dialog')
    await expect(modal).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(modal).not.toBeVisible()
    await expect(trigger).toBeFocused()
  })

  test('TC-A11Y-004: Modal traps Tab focus across form fields', async ({ page }) => {
    await page
      .getByRole('button', { name: /add project/i })
      .first()
      .click()
    const modal = page.getByRole('dialog')
    await expect(modal).toBeVisible()
    const closeButton = modal.getByRole('button', { name: 'Close dialog' })
    const submitButton = modal.getByRole('button', { name: 'Add Project', exact: true })

    // Initial focus lands on the first focusable element (the close button)
    await expect(closeButton).toBeFocused()
    // Shift+Tab from the first focusable element must wrap to the last
    await page.keyboard.press('Shift+Tab')
    await expect(submitButton).toBeFocused()
    // Tab from the last focusable element must wrap back to the first
    await page.keyboard.press('Tab')
    await expect(closeButton).toBeFocused()
  })
})
