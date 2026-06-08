import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = '', ...props }, ref) => (
    <input
      ref={ref}
      aria-invalid={error ? true : undefined}
      aria-describedby={error && props.id ? `${props.id}-error` : undefined}
      className={`w-full rounded-lg bg-surface-700 px-3 py-2 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:ring-2 focus:ring-accent ${error ? 'ring-1 ring-danger' : ''} ${className}`}
      {...props}
    />
  )
)
Input.displayName = 'Input'
export default Input
