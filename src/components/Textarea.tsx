import { forwardRef } from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className = '', ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={error ? true : undefined}
      aria-describedby={error && props.id ? `${props.id}-error` : undefined}
      rows={3}
      className={`w-full resize-none rounded-lg bg-surface-700 px-3 py-2 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:ring-2 focus:ring-accent ${error ? 'ring-1 ring-danger' : ''} ${className}`}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'
export default Textarea
