import { Loader2 } from 'lucide-react'
import Modal from '@/components/Modal'
import Button from '@/components/Button'

interface PromptImproveModalProps {
  isOpen: boolean
  onClose: () => void
  onAccept: (improvedText: string) => void
  originalText: string
  improvedText: string | null
  loading: boolean
  error: string | null
}

export default function PromptImproveModal({
  isOpen,
  onClose,
  onAccept,
  originalText,
  improvedText,
  loading,
  error,
}: PromptImproveModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Improve Prompt"
      titleId="improve-prompt-title"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-4">
        {loading && (
          <div className="flex items-center justify-center gap-2 py-8 text-sm text-text-muted">
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Improving prompt...
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-sm text-error"
          >
            {error}
          </div>
        )}

        {improvedText && (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-text-muted">
                  Original ({originalText.length} chars)
                </p>
                <pre className="max-h-48 overflow-auto whitespace-pre-wrap rounded-lg bg-surface-700 p-3 font-mono text-xs leading-relaxed text-text-secondary">
                  {originalText}
                </pre>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent">
                  Improved ({improvedText.length} chars)
                </p>
                <pre className="max-h-48 overflow-auto whitespace-pre-wrap rounded-lg bg-surface-700 p-3 font-mono text-xs leading-relaxed text-text-primary">
                  {improvedText}
                </pre>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-surface-700/50 pt-3">
              <Button variant="ghost" size="sm" onClick={onClose}>
                Dismiss
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onAccept(improvedText)}
              >
                Accept Improvement
              </Button>
            </div>
          </>
        )}

        {!loading && !improvedText && !error && (
          <p className="py-4 text-center text-sm text-text-muted">
            Click the improve button on a prompt to get started.
          </p>
        )}
      </div>
    </Modal>
  )
}
