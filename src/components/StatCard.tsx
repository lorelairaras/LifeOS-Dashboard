interface StatCardProps {
  label: string
  value: string | number
  icon: React.ElementType
  colour?: string
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  colour = 'text-accent',
}: StatCardProps) {
  return (
    <article
      data-testid="stat-card"
      className="flex items-center gap-4 rounded-xl bg-surface-800 p-5 shadow-md"
      aria-label={`${label}: ${value}`}
    >
      <div className={`rounded-lg bg-surface-700 p-2.5 ${colour}`}>
        <Icon size={20} aria-hidden="true" />
      </div>
      <div>
        <p className="text-2xl font-bold text-text-primary">{value}</p>
        <p className="text-xs text-text-muted">{label}</p>
      </div>
    </article>
  )
}
