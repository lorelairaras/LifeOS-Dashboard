import type { ApplicationStatus } from '@/types'
import { STATUS_LABELS } from '../data/jobCategories'

const STATUS_OPTIONS: Array<{ value: ApplicationStatus | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  ...Object.entries(STATUS_LABELS).map(([value, label]) => ({
    value: value as ApplicationStatus,
    label,
  })),
]

interface JobFiltersProps {
  statusFilter: ApplicationStatus | 'all'
  onStatusChange: (s: ApplicationStatus | 'all') => void
}

export default function JobFilters({ statusFilter, onStatusChange }: JobFiltersProps) {
  return (
    <fieldset>
      <legend className="mb-1.5 text-xs font-medium uppercase tracking-wider text-text-muted">
        Status
      </legend>
      <div className="flex flex-wrap gap-1.5">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            aria-pressed={statusFilter === opt.value}
            onClick={() => onStatusChange(opt.value)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              statusFilter === opt.value
                ? 'bg-accent text-white'
                : 'bg-surface-700 text-text-secondary hover:bg-surface-600 hover:text-text-primary'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}
