interface ContactCardProps {
  icon: React.ElementType
  label: string
  value: string
  href: string
  external?: boolean
}

export default function ContactCard({ icon: Icon, label, value, href, external = false }: ContactCardProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="flex items-center gap-4 rounded-xl border border-surface-600 bg-surface-800 px-5 py-4 text-sm transition-colors hover:border-accent/40 hover:bg-surface-700"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-700 text-accent">
        <Icon size={18} aria-hidden="true" />
      </span>
      <span>
        <span className="block text-xs font-medium uppercase tracking-wider text-text-muted">{label}</span>
        <span className="mt-0.5 block font-medium text-text-primary">{value}</span>
      </span>
    </a>
  )
}
