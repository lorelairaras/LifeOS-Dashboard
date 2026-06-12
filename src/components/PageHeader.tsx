import Button from '@/components/Button'
import { useFlavorNames } from '@/hooks/useFlavorNames'

interface PageHeaderProps {
  title: string
  description?: string
  // Optional gothic flavor name — shown as a subtitle only when the
  // user enables "Flavor names" in Settings.
  flavor?: string
  action?: {
    label: string
    onClick: () => void
    icon?: React.ReactNode
  }
}

export default function PageHeader({ title, description, flavor, action }: PageHeaderProps) {
  const { enabled: flavorOn } = useFlavorNames()

  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ro-pri">{title}</h1>
        {flavorOn && flavor && (
          <p className="mt-0.5 font-display text-xs italic text-ro-pink/60">{flavor}</p>
        )}
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
