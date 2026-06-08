// Button styling utilities — separated from Button.tsx to satisfy
// react-refresh/only-export-components (no mixed component+constant exports)

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-hover',
  secondary: 'bg-surface-700 text-text-primary hover:bg-surface-600',
  danger: 'bg-danger text-white hover:bg-red-700',
  ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-700',
}

export const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
}

export const buttonBaseClasses =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50'
