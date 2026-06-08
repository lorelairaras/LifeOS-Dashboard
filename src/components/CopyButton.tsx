import { useState, useEffect } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  text: string
  onCopy?: () => void
  size?: 'sm' | 'md'
  showLabel?: boolean
}

export default function CopyButton({
  text,
  onCopy,
  size = 'sm',
  showLabel = true,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    onCopy?.()
  }

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(t)
  }, [copied])

  const iconSize = size === 'sm' ? 13 : 15
  const cls =
    size === 'sm'
      ? 'flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors'
      : 'flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors'

  return (
    <button
      type="button"
      aria-label={copied ? 'Copied to clipboard' : 'Copy prompt to clipboard'}
      aria-live="polite"
      onClick={handleCopy}
      data-testid="copy-button"
      className={`${cls} ${
        copied
          ? 'bg-success/10 text-success'
          : 'bg-surface-700 text-text-secondary hover:bg-accent hover:text-white'
      }`}
    >
      {copied ? (
        <Check size={iconSize} aria-hidden="true" />
      ) : (
        <Copy size={iconSize} aria-hidden="true" />
      )}
      {showLabel && (copied ? 'Copied!' : 'Copy')}
    </button>
  )
}
