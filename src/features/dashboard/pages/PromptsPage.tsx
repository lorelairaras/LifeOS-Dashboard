import { useState } from 'react'
import { Plus, BookOpen } from 'lucide-react'
import type { Prompt, PromptCategory } from '@/types'
import { usePrompts } from '@/features/prompts/hooks/usePrompts'
import type { PromptInput } from '@/features/prompts/hooks/usePrompts'
import PromptCard from '@/features/prompts/components/PromptCard'
import PromptForm from '@/features/prompts/components/PromptForm'
import PromptDetail from '@/features/prompts/components/PromptDetail'
import PromptFilters from '@/features/prompts/components/PromptFilters'
import PageHeader from '@/components/PageHeader'
import EmptyState from '@/components/EmptyState'
import Modal from '@/components/Modal'
import ConfirmDialog from '@/components/ConfirmDialog'

export default function PromptsPage() {
  const { prompts, addPrompt, updatePrompt, deletePrompt, updateLastUsed } =
    usePrompts()

  const [categoryFilter, setCategoryFilter] = useState<PromptCategory | 'all'>('all')
  const [formOpen, setFormOpen] = useState(false)
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null)
  const [viewingPrompt, setViewingPrompt] = useState<Prompt | null>(null)
  const [deletingPrompt, setDeletingPrompt] = useState<Prompt | null>(null)

  const filtered =
    categoryFilter === 'all'
      ? prompts
      : prompts.filter((p) => p.category === categoryFilter)

  const handleOpenCreate = () => {
    setEditingPrompt(null)
    setFormOpen(true)
  }

  const handleOpenEdit = (prompt: Prompt) => {
    setEditingPrompt(prompt)
    setFormOpen(true)
  }

  const handleFormClose = () => {
    setFormOpen(false)
    setEditingPrompt(null)
  }

  const handleFormSubmit = (data: PromptInput) => {
    if (editingPrompt) {
      updatePrompt(editingPrompt.id, data)
    } else {
      addPrompt(data)
    }
    handleFormClose()
  }

  const handleDeleteConfirm = () => {
    if (deletingPrompt) deletePrompt(deletingPrompt.id)
    setDeletingPrompt(null)
  }

  return (
    <div>
      <PageHeader
        title="Prompt Library"
        description="Save and reuse your best AI prompts."
        action={{
          label: 'Add Prompt',
          onClick: handleOpenCreate,
          icon: <Plus size={16} aria-hidden="true" />,
        }}
      />

      {prompts.length > 0 && (
        <div className="mb-6">
          <PromptFilters
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
          />
        </div>
      )}

      {prompts.length === 0 ? (
        <EmptyState
          title="Your prompt library is empty"
          description="Save your first prompt to start building your personal AI workflow."
          action={{ label: 'Add Prompt', onClick: handleOpenCreate }}
          icon={<BookOpen size={40} />}
        />
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-surface-700 py-12 text-center">
          <p className="text-sm text-text-secondary">No prompts in this category.</p>
          <button
            type="button"
            className="mt-2 text-sm text-accent hover:underline"
            onClick={() => setCategoryFilter('all')}
          >
            Show all prompts
          </button>
        </div>
      ) : (
        <ul
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Prompt library"
          data-testid="prompt-grid"
        >
          {filtered.map((prompt) => (
            <li key={prompt.id}>
              <PromptCard
                prompt={prompt}
                onCopy={updateLastUsed}
                onEdit={handleOpenEdit}
                onDelete={setDeletingPrompt}
                onView={setViewingPrompt}
              />
            </li>
          ))}
        </ul>
      )}

      <Modal
        isOpen={formOpen}
        onClose={handleFormClose}
        title={editingPrompt ? 'Edit Prompt' : 'New Prompt'}
        maxWidth="max-w-xl"
      >
        <PromptForm
          initialPrompt={editingPrompt ?? undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      </Modal>

      <PromptDetail
        prompt={viewingPrompt}
        isOpen={!!viewingPrompt}
        onClose={() => setViewingPrompt(null)}
        onEdit={(p) => {
          setViewingPrompt(null)
          handleOpenEdit(p)
        }}
        onCopy={updateLastUsed}
      />

      <ConfirmDialog
        isOpen={!!deletingPrompt}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingPrompt(null)}
        title="Delete prompt"
        message={`Are you sure you want to delete "${deletingPrompt?.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  )
}
