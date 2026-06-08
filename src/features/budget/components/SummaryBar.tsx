import type { BudgetEntry } from '@/types'
import { calculateTotals, formatCurrency } from '@/utils/budgetUtils'

interface SummaryBarProps {
  entries: BudgetEntry[]
}

export default function SummaryBar({ entries }: SummaryBarProps) {
  const { income, expenses, balance } = calculateTotals(entries)
  return (
    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3" data-testid="budget-summary">
      <div className="rounded-xl bg-surface-800 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Income</p>
        <p className="mt-1 text-xl font-bold text-success">{formatCurrency(income)}</p>
      </div>
      <div className="rounded-xl bg-surface-800 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Expenses</p>
        <p className="mt-1 text-xl font-bold text-danger">{formatCurrency(expenses)}</p>
      </div>
      <div className="rounded-xl bg-surface-800 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Net Balance</p>
        <p className={`mt-1 text-xl font-bold ${balance >= 0 ? 'text-success' : 'text-danger'}`}>
          {formatCurrency(balance)}
        </p>
      </div>
    </div>
  )
}
