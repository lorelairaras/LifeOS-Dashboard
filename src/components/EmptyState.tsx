import Button from '@/components/Button'

interface EmptyStateProps {
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  icon?: React.ReactNode
}

export default function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-ro-pink/20 py-16 px-6 text-center bg-ro-pink/[0.02]">
      {icon && (
        <div className="mb-4 text-ro-pink/40" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className="font-display text-base font-semibold text-ro-pri">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-ro-sec max-w-sm leading-relaxed">{description}</p>
      )}
      {action && (
        <Button
          variant="primary"
          size="md"
          onClick={action.onClick}
          className="mt-5"
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}
