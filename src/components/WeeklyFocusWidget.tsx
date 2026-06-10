interface WeeklyFocusWidgetProps {
  value: string
  onChange: (value: string) => void
}

export default function WeeklyFocusWidget({
  value,
  onChange,
}: WeeklyFocusWidgetProps) {
  return (
    <div className="ro-card p-5">
      <h2
        id="weekly-focus-heading"
        className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-ro-sec"
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
        className="ro-input"
        aria-describedby="weekly-focus-hint"
      />
      <p id="weekly-focus-hint" className="mt-1.5 text-xs text-ro-muted">
        Saved for this session only.
      </p>
    </div>
  )
}
