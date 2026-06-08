import type { PromptCategory } from '@/types'
import { CATEGORY_LABELS } from '@/features/prompts/data/promptCategories'

const ALL_OPTIONS: Array<{ value: PromptCategory | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  ...(Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
    value: value as PromptCategory,
    label,
  }))),
]

interface PromptFiltersProps {
  categoryFilter: PromptCategory | 'all'
  onCategoryChange: (c: PromptCategory | 'all') => void
}

export default function PromptFilters({
  categoryFilter,
  onCategoryChange,
}: PromptFiltersProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-medium uppercase tracking-wider text-text-muted">
        Category
      </legend>
      <div className="flex flex-wrap gap-1.5">
        {ALL_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            aria-pressed={categoryFilter === opt.value}
            onClick={() => onCategoryChange(opt.value)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              categoryFilter === opt.value
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
