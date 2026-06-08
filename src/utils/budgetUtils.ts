import type { BudgetEntry } from '@/types'

export interface BudgetTotals {
  income: number
  expenses: number
  balance: number
}

/**
 * Calculates income, expenses, and balance from a list of budget entries.
 */
export function calculateTotals(entries: BudgetEntry[]): BudgetTotals {
  const income = entries
    .filter((e) => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0)
  const expenses = entries
    .filter((e) => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0)
  return { income, expenses, balance: income - expenses }
}

/**
 * Formats a number as currency (e.g. "$1,234.56" or "-$123.00").
 */
export function formatCurrency(amount: number): string {
  const abs = Math.abs(amount)
  const formatted = abs.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return amount < 0 ? `-$${formatted}` : `$${formatted}`
}

/**
 * Filters budget entries to the current calendar month.
 */
export function filterCurrentMonth(entries: BudgetEntry[]): BudgetEntry[] {
  const now = new Date()
  return entries.filter((e) => {
    const date = new Date(e.date)
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth()
    )
  })
}
