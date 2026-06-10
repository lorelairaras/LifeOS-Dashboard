import { describe, it, expect } from 'vitest'
import { localIsoDate, currentStreak, dayLabel } from './dates'

// Fixed reference: Thursday 2026-06-11, 06:00 LOCAL time.
// At this moment UTC+7 users would still be on 2026-06-10 in UTC —
// the exact condition that broke the original toISOString() version.
const REF = new Date(2026, 5, 11, 6, 0, 0)

describe('localIsoDate', () => {
  it('returns the local calendar date, not UTC', () => {
    expect(localIsoDate(0, REF)).toBe('2026-06-11')
  })

  it('walks back across month boundaries', () => {
    expect(localIsoDate(11, REF)).toBe('2026-05-31')
  })

  it('pads single-digit months and days', () => {
    const jan5 = new Date(2026, 0, 5, 12, 0, 0)
    expect(localIsoDate(0, jan5)).toBe('2026-01-05')
    expect(localIsoDate(4, jan5)).toBe('2026-01-01')
  })

  it('does not mutate the input date', () => {
    const before = REF.getTime()
    localIsoDate(3, REF)
    expect(REF.getTime()).toBe(before)
  })
})

describe('currentStreak', () => {
  const day = (n: number) => localIsoDate(n, REF)

  it('returns 0 with no checks', () => {
    expect(currentStreak(new Set(), REF)).toBe(0)
  })

  it('counts consecutive days ending today', () => {
    expect(currentStreak(new Set([day(0), day(1), day(2)]), REF)).toBe(3)
  })

  it('unchecked today does not break the streak (day is not over)', () => {
    expect(currentStreak(new Set([day(1), day(2), day(3)]), REF)).toBe(3)
  })

  it('a gap before yesterday ends the streak', () => {
    expect(currentStreak(new Set([day(0), day(2), day(3)]), REF)).toBe(1)
  })

  it('streaks longer than the 7-day display window still count fully', () => {
    const checks = new Set(Array.from({ length: 30 }, (_, i) => day(i)))
    expect(currentStreak(checks, REF)).toBe(30)
  })

  it('only yesterday checked counts as 1', () => {
    expect(currentStreak(new Set([day(1)]), REF)).toBe(1)
  })

  it('only a check from three days ago counts as 0', () => {
    expect(currentStreak(new Set([day(3)]), REF)).toBe(0)
  })
})

describe('dayLabel', () => {
  it('labels offset 0 as Today', () => {
    expect(dayLabel(0, REF)).toBe('Today')
  })

  it('labels other offsets with the local weekday', () => {
    // 2026-06-11 is a Thursday → one day before is Wednesday
    expect(dayLabel(1, REF)).toBe('Wed')
  })
})
