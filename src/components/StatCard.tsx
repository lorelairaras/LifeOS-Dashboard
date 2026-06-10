type AccentKey = 'pink' | 'bloom' | 'oracle' | 'gold' | 'success' | 'danger'

const accentStyles: Record<AccentKey, { border: string; bg: string; text: string }> = {
  pink:    { border: 'border-l-ro-pink',    bg: 'bg-ro-pink/10',    text: 'text-ro-pink' },
  bloom:   { border: 'border-l-ro-bloom',   bg: 'bg-ro-bloom/10',   text: 'text-ro-bloom' },
  oracle:  { border: 'border-l-ro-oracle',  bg: 'bg-ro-oracle/10',  text: 'text-ro-oracle' },
  gold:    { border: 'border-l-ro-gold',    bg: 'bg-ro-gold/10',    text: 'text-ro-gold' },
  success: { border: 'border-l-ro-success', bg: 'bg-ro-success/10', text: 'text-ro-success' },
  danger:  { border: 'border-l-ro-danger',  bg: 'bg-ro-danger/10',  text: 'text-ro-danger' },
}

interface StatCardProps {
  label: string
  value: string | number
  icon: React.ElementType
  colour?: string     // legacy prop — kept for backward compat
  accent?: AccentKey
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  colour,
  accent,
}: StatCardProps) {
  const a = accent ? accentStyles[accent] : null

  return (
    <article
      data-testid="stat-card"
      aria-label={`${label}: ${value}`}
      className={[
        'ro-card flex items-center gap-4 p-5 border-l-2 transition-colors hover:border-ro-pink/30',
        a ? a.border : 'border-l-ro-pink/20',
      ].join(' ')}
    >
      <div
        className={[
          'rounded-lg p-2.5 shrink-0',
          a ? `${a.bg} ${a.text}` : `bg-ro-surface ${colour ?? 'text-ro-sec'}`,
        ].join(' ')}
      >
        <Icon size={18} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-2xl font-bold text-ro-pri leading-none">{value}</p>
        <p className="mt-1 text-xs text-ro-sec leading-snug">{label}</p>
      </div>
    </article>
  )
}
