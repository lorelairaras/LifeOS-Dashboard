type AccentKey = 'cyan' | 'rose' | 'amber' | 'lime' | 'violet'

const accentStyles: Record<AccentKey, { border: string; bg: string; text: string }> = {
  cyan:   { border: 'border-l-os-cyan',   bg: 'bg-os-cyan/10',   text: 'text-os-cyan' },
  rose:   { border: 'border-l-os-rose',   bg: 'bg-os-rose/10',   text: 'text-os-rose' },
  amber:  { border: 'border-l-os-amber',  bg: 'bg-os-amber/10',  text: 'text-os-amber' },
  lime:   { border: 'border-l-os-lime',   bg: 'bg-os-lime/10',   text: 'text-os-lime' },
  violet: { border: 'border-l-os-violet', bg: 'bg-os-violet/10', text: 'text-os-violet' },
}

interface StatCardProps {
  label: string
  value: string | number
  icon: React.ElementType
  colour?: string      // legacy prop — kept for backward compat
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
        'os-card flex items-center gap-4 p-5 border-l-2 transition-colors hover:border-os-bright',
        a ? a.border : 'border-l-os-border',
      ].join(' ')}
    >
      <div
        className={[
          'rounded-lg p-2.5 shrink-0',
          a ? `${a.bg} ${a.text}` : `bg-os-surface ${colour ?? 'text-os-sec'}`,
        ].join(' ')}
      >
        <Icon size={18} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-os-pri leading-none">{value}</p>
        <p className="mt-1 text-xs text-os-sec leading-snug">{label}</p>
      </div>
    </article>
  )
}
