import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import {
  buttonBaseClasses,
  buttonVariantClasses,
  buttonSizeClasses,
} from '@/components/button.utils'
import type { ButtonVariant, ButtonSize } from '@/components/button.utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', loading = false, disabled, className = '', children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          buttonBaseClasses,
          buttonVariantClasses[variant],
          buttonSizeClasses[size],
          className,
        ].join(' ')}
        {...props}
      >
        {loading && <Loader2 size={14} className="animate-spin" aria-hidden="true" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
