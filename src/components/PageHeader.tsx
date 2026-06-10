import Button from '@/components/Button'

interface PageHeaderProps {
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    icon?: React.ReactNode
  }
}

export default function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ro-pri">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-ro-sec">{description}</p>
        )}
      </div>
      {action && (
        <Button
          variant="primary"
          size="md"
          onClick={action.onClick}
          className="shrink-0"
        >
          {action.icon}
          {action.label}
        </Button>
      )}
    </div>
  )
}
