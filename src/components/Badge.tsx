type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-surface-700 text-text-secondary',
  success: 'bg-green-900/50 text-green-300',
  warning: 'bg-yellow-900/50 text-yellow-300',
  danger: 'bg-red-900/50 text-red-300',
  info: 'bg-blue-900/50 text-blue-300',
  purple: 'bg-purple-900/50 text-purple-300',
}

export default function Badge({ label, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {label}
    </span>
  )
}
