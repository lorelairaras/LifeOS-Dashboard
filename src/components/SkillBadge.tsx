interface SkillBadgeProps {
  name: string
  className?: string
}

export default function SkillBadge({ name, className = '' }: SkillBadgeProps) {
  return (
    <li
      className={`rounded-full border border-surface-600 bg-surface-800 px-4 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary ${className}`}
    >
      {name}
    </li>
  )
}
