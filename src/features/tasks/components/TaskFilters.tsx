import type { TaskStatus, TaskPriority } from '@/types'

const STATUS_OPTIONS: Array<{ value: TaskStatus | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'blocked', label: 'Blocked' },
  { value: 'done', label: 'Done' },
]

const PRIORITY_OPTIONS: Array<{ value: TaskPriority | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
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

interface TaskFiltersProps {
  statusFilter: TaskStatus | 'all'
  priorityFilter: TaskPriority | 'all'
  onStatusChange: (s: TaskStatus | 'all') => void
  onPriorityChange: (p: TaskPriority | 'all') => void
}

export default function TaskFilters({
  statusFilter,
  priorityFilter,
  onStatusChange,
  onPriorityChange,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap gap-6">
      <FilterPills
        label="Status"
        options={STATUS_OPTIONS}
        value={statusFilter}
        onChange={onStatusChange}
      />
      <FilterPills
        label="Priority"
        options={PRIORITY_OPTIONS}
        value={priorityFilter}
        onChange={onPriorityChange}
      />
    </div>
  )
}
