// Date helpers for habit tracking.
// IMPORTANT: these use the LOCAL calendar date, not UTC. Using
// toISOString() here would shift "today" for any user ahead of UTC
// (e.g. UTC+7: between midnight and 7am local, UTC is still yesterday).

export function localIsoDate(daysAgo = 0, from: Date = new Date()): string {
  const date = new Date(from)
  date.setDate(date.getDate() - daysAgo)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function dayLabel(daysAgo: number, from: Date = new Date()): string {
  if (daysAgo === 0) return 'Today'
  const date = new Date(from)
  date.setDate(date.getDate() - daysAgo)
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

// Two-letter day marker for narrow screens
export function dayLetter(daysAgo: number, from: Date = new Date()): string {
  const date = new Date(from)
  date.setDate(date.getDate() - daysAgo)
  return date.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 2)
}

// Consecutive days ending today (or yesterday — an unchecked today
// does not break the streak, since the day isn't over yet).
export function currentStreak(checkedDates: Set<string>, from: Date = new Date()): number {
  let streak = 0
  for (let i = checkedDates.has(localIsoDate(0, from)) ? 0 : 1; ; i++) {
    if (checkedDates.has(localIsoDate(i, from))) {
      streak++
    } else {
      break
    }
  }
  return streak
}
