import { Pencil, Trash2, Sparkles } from 'lucide-react'
import type { Prompt } from '@/types'
import Badge from '@/components/Badge'
import CopyButton from '@/components/CopyButton'
import {
  CATEGORY_LABELS,
  CATEGORY_VARIANTS,
} from '@/features/prompts/data/promptCategories'
import { isAiConfigured } from '@/lib/ai/aiConfig'

interface PromptCardProps {
  prompt: Prompt
  onCopy: (id: string) => void
  onEdit: (prompt: Prompt) => void
  onDelete: (prompt: Prompt) => void
  onView: (prompt: Prompt) => void
  onImprove?: (prompt: Prompt) => void
}

export default function PromptCard({
  prompt,
  onCopy,
  onEdit,
  onDelete,
  onView,
  onImprove,
}: PromptCardProps) {
  return (
    <article className="flex flex-col rounded-xl bg-surface-800 p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={() => onView(prompt)}
            className="line-clamp-2 text-left text-sm font-semibold text-text-primary transition-colors hover:text-accent"
          >
            {prompt.title}
          </button>
          <div className="mt-1.5">
            <Badge
              label={CATEGORY_LABELS[prompt.category]}
              variant={CATEGORY_VARIANTS[prompt.category]}
            />
          </div>
        </div>
        <CopyButton text={prompt.body} onCopy={() => onCopy(prompt.id)} size="sm" />
      </div>

      {/* Body preview */}
      <button
        type="button"
        onClick={() => onView(prompt)}
        aria-label={`Preview: ${prompt.title}`}
        className="mt-3 w-full cursor-pointer text-left font-mono text-xs leading-relaxed text-text-muted line-clamp-3"
      >
        {prompt.body}
      </button>

      {/* Tags */}
      {prompt.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {prompt.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface-700 px-2 py-0.5 text-xs text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-surface-700/50 pt-3">
        <button
          type="button"
          aria-label={`View full prompt: ${prompt.title}`}
          onClick={() => onView(prompt)}
          className="text-xs text-accent hover:underline"
        >
          View full prompt
        </button>
        <div className="flex items-center gap-1">
          {onImprove && (
            <button
              type="button"
              aria-label={isAiConfigured ? `Improve prompt: ${prompt.title}` : 'AI not configured'}
              title={isAiConfigured ? 'Improve with AI' : 'Add VITE_AI_API_KEY to enable'}
              onClick={() => onImprove(prompt)}
              disabled={!isAiConfigured}
              className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface-700 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Sparkles size={13} aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            aria-label={`Edit prompt: ${prompt.title}`}
            onClick={() => onEdit(prompt)}
            className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface-700 hover:text-text-primary"
          >
            <Pencil size={13} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={`Delete prompt: ${prompt.title}`}
            onClick={() => onDelete(prompt)}
            className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface-700 hover:text-danger"
          >
            <Trash2 size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}
