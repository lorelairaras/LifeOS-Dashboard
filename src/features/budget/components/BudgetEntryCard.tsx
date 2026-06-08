import { Pencil, Trash2 } from 'lucide-react'
import type { BudgetEntry } from '@/types'
import Badge from '@/components/Badge'
import { formatCurrency } from '@/utils/budgetUtils'
import { formatDate } from '@/utils/dateUtils'

interface BudgetEntryCardProps {
  entry: BudgetEntry
  onEdit: (entry: BudgetEntry) => void
  onDelete: (entry: BudgetEntry) => void
}

export default function BudgetEntryCard({ entry, onEdit, onDelete }: BudgetEntryCardProps) {
  return (
    <li className="flex items-start gap-3 rounded-xl bg-surface-800 p-4 shadow-sm">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-snug text-text-primary">{entry.title}</p>
        <p className="mt-0.5 text-xs text-text-muted">{entry.category}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge
            label={entry.type === 'income' ? 'Income' : 'Expense'}
            variant={entry.type === 'income' ? 'success' : 'danger'}
          />
          <span
            className={`text-sm font-semibold ${
              entry.type === 'income' ? 'text-success' : 'text-danger'
            }`}
          >
            {formatCurrency(entry.amount)}
          </span>
          <span className="text-xs text-text-muted">{formatDate(entry.date)}</span>
        </div>
        {entry.notes && (
          <p className="mt-1 line-clamp-1 text-xs text-text-muted">{entry.notes}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          aria-label={`Edit entry: ${entry.title}`}
          onClick={() => onEdit(entry)}
          className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface-700 hover:text-text-primary"
        >
          <Pencil size={14} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={`Delete entry: ${entry.title}`}
          onClick={() => onDelete(entry)}
          className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface-700 hover:text-danger"
        >
          <Trash2 size={14} aria-hidden="true" />
        </button>
      </div>
    </li>
  )
}
