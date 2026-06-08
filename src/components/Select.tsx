import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
}
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[]
  error?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, error, className = '', ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={error && props.id ? `${props.id}-error` : undefined}
        className={`w-full appearance-none rounded-lg bg-surface-700 px-3 py-2 pr-8 text-sm text-text-primary outline-none transition-colors focus:ring-2 focus:ring-accent ${error ? 'ring-1 ring-danger' : ''} ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted"
        aria-hidden="true"
      />
    </div>
  )
)
Select.displayName = 'Select'
export default Select
