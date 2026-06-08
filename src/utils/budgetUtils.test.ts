import { describe, it, expect } from 'vitest'
import { calculateTotals, formatCurrency } from './budgetUtils'
import type { BudgetEntry } from '@/types'

function makeEntry(overrides: Partial<BudgetEntry> & Pick<BudgetEntry, 'id' | 'type' | 'amount'>): BudgetEntry {
  return {
    title: 'Test',
    category: 'Other',
    date: '2026-01-01',
    createdAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  }
}

describe('calculateTotals', () => {
  it('returns zeros for empty array', () => {
    const result = calculateTotals([])
    expect(result.income).toBe(0)
    expect(result.expenses).toBe(0)
    expect(result.balance).toBe(0)
  })

  it('sums income entries', () => {
    const entries = [
      makeEntry({ id: '1', type: 'income', amount: 1000 }),
      makeEntry({ id: '2', type: 'income', amount: 500 }),
    ]
    const result = calculateTotals(entries)
    expect(result.income).toBe(1500)
    expect(result.expenses).toBe(0)
    expect(result.balance).toBe(1500)
  })

  it('sums expense entries', () => {
    const entries = [
      makeEntry({ id: '1', type: 'expense', amount: 200 }),
      makeEntry({ id: '2', type: 'expense', amount: 50 }),
    ]
    const result = calculateTotals(entries)
    expect(result.income).toBe(0)
    expect(result.expenses).toBe(250)
    expect(result.balance).toBe(-250)
  })

  it('calculates net balance from mixed entries', () => {
    const entries = [
      makeEntry({ id: '1', type: 'income', amount: 3000 }),
      makeEntry({ id: '2', type: 'expense', amount: 1200 }),
      makeEntry({ id: '3', type: 'expense', amount: 300 }),
    ]
    const result = calculateTotals(entries)
    expect(result.income).toBe(3000)
    expect(result.expenses).toBe(1500)
    expect(result.balance).toBe(1500)
  })
})

describe('formatCurrency', () => {
  it('formats positive numbers with $ prefix', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })

  it('formats negative numbers with -$ prefix', () => {
    expect(formatCurrency(-500)).toBe('-$500.00')
  })

  it('formats zero as $0.00', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })
})
