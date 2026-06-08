import Card from '@/components/Card'

interface WeeklyFocusWidgetProps {
  value: string
  onChange: (value: string) => void
}

export default function WeeklyFocusWidget({
  value,
  onChange,
}: WeeklyFocusWidgetProps) {
  return (
    <Card>
      <h2
        id="weekly-focus-heading"
        className="mb-3 text-sm font-semibold text-text-primary"
      >
        Weekly Focus
      </h2>
      <label htmlFor="weekly-focus" className="sr-only">
        What are you focusing on this week?
      </label>
      <input
        id="weekly-focus"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What are you focusing on this week?"
        className="w-full rounded-lg bg-surface-700 px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:ring-2 focus:ring-accent"
        aria-describedby="weekly-focus-hint"
      />
      <p id="weekly-focus-hint" className="mt-1.5 text-xs text-text-muted">
        Saved for this session only.
      </p>
    </Card>
  )
}
