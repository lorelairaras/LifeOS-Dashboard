/**
 * Returns true if the given ISO date string is today or in the past.
 * Returns false if the date is empty, undefined, or in the future.
 */
export function isOverdue(dateString: string | undefined): boolean {
  if (!dateString) return false
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return false
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  return date <= today
}

/**
 * Formats an ISO date string to a human-readable date (e.g. "Jun 3, 2026").
 */
export function formatDate(isoString: string | undefined): string {
  if (!isoString) return ''
  const date = new Date(isoString)
  if (isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

/**
 * Returns the current month as start/end ISO strings for filtering.
 */
export function getCurrentMonthRange(): { start: string; end: string } {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999).toISOString()
  return { start, end }
}
