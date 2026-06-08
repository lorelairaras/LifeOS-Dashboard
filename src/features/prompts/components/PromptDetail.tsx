import { Pencil, Sparkles } from 'lucide-react'
import type { Prompt } from '@/types'
import Modal from '@/components/Modal'
import Badge from '@/components/Badge'
import Button from '@/components/Button'
import CopyButton from '@/components/CopyButton'
import {
  CATEGORY_LABELS,
  CATEGORY_VARIANTS,
} from '@/features/prompts/data/promptCategories'
import { isAiConfigured } from '@/lib/ai/aiConfig'

interface PromptDetailProps {
  prompt: Prompt | null
  isOpen: boolean
  onClose: () => void
  onEdit: (prompt: Prompt) => void
  onCopy: (id: string) => void
  onImprove?: (prompt: Prompt) => void
}

export default function PromptDetail({
  prompt,
  isOpen,
  onClose,
  onEdit,
  onCopy,
  onImprove,
}: PromptDetailProps) {
  if (!prompt) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={prompt.title}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            label={CATEGORY_LABELS[prompt.category]}
            variant={CATEGORY_VARIANTS[prompt.category]}
          />
          {prompt.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface-700 px-2 py-0.5 text-xs text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Use case */}
        {prompt.useCase && (
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-muted">
              When to use
            </p>
            <p className="text-sm text-text-secondary">{prompt.useCase}</p>
          </div>
        )}

        {/* Full prompt body */}
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-text-muted">
            Prompt
          </p>
          <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-lg bg-surface-700 p-4 font-mono text-xs leading-relaxed text-text-primary">
            {prompt.body}
          </pre>
        </div>

        {/* Action row */}
        <div className="flex items-center justify-between gap-3 border-t border-surface-700/50 pt-3">
          <CopyButton
            text={prompt.body}
            onCopy={() => onCopy(prompt.id)}
            size="md"
          />
          <div className="flex items-center gap-2">
            {onImprove && (
              <Button
                variant="secondary"
                size="sm"
                disabled={!isAiConfigured}
                title={isAiConfigured ? 'Improve with AI' : 'Add VITE_AI_API_KEY to enable'}
                onClick={() => {
                  onClose()
                  onImprove(prompt)
                }}
              >
                <Sparkles size={14} aria-hidden="true" />
                Improve
              </Button>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                onClose()
                onEdit(prompt)
              }}
            >
              <Pencil size={14} aria-hidden="true" />
              Edit Prompt
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
