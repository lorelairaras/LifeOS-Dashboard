import type { EntryType } from '@/types'

const TYPE_OPTIONS: Array<{ value: EntryType | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
]

function FilterPills<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: Array<{ value: T; label: string }>
  value: T
  onChange: (v: T) => void
}) {
  return (
    <fieldset>
      <legend className="mb-1.5 text-xs font-medium uppercase tracking-wider text-text-muted">
        {label}
      </legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            aria-pressed={value === opt.value}
            onClick={() => onChange(opt.value)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              value === opt.value
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

interface BudgetFiltersProps {
  typeFilter: EntryType | 'all'
  onTypeChange: (t: EntryType | 'all') => void
}

export default function BudgetFilters({ typeFilter, onTypeChange }: BudgetFiltersProps) {
  return (
    <div className="flex flex-wrap gap-6">
      <FilterPills
        label="Type"
        options={TYPE_OPTIONS}
        value={typeFilter}
        onChange={onTypeChange}
      />
    </div>
  )
}
