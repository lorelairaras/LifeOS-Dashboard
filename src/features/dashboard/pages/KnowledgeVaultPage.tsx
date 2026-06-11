import { useState } from 'react'
import { BookMarked, Plus, Pencil, Trash2, Search } from 'lucide-react'
import type { Note } from '@/types'
import { useNotes } from '@/features/vault/hooks/useNotes'
import type { NoteInput } from '@/features/vault/hooks/useNotes'
import NoteForm from '@/features/vault/components/NoteForm'
import PageHeader from '@/components/PageHeader'
import Modal from '@/components/Modal'
import ConfirmDialog from '@/components/ConfirmDialog'

export default function KnowledgeVaultPage() {
  const { notes, loading, error, addNote, updateNote, deleteNote } = useNotes()

  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [deletingNote, setDeletingNote] = useState<Note | null>(null)

  const allTags = [...new Set(notes.flatMap((n) => n.tags))].sort()

  const filtered = notes.filter((note) => {
    if (activeTag && !note.tags.includes(activeTag)) return false
    if (query.trim()) {
      const q = query.toLowerCase()
      return (
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q) ||
        note.tags.some((t) => t.includes(q))
      )
    }
    return true
  })

  const handleOpenCreate = () => {
    setEditingNote(null)
    setFormOpen(true)
  }

  const handleFormClose = () => {
    setFormOpen(false)
    setEditingNote(null)
  }

  const handleFormSubmit = (data: NoteInput) => {
    if (editingNote) {
      updateNote(editingNote.id, data)
    } else {
      addNote(data)
    }
    handleFormClose()
  }

  return (
    <div>
      <PageHeader
        title="Knowledge Vault"
        description="Notes & resources · Your personal knowledge base."
        action={{
          label: 'Add Note',
          onClick: handleOpenCreate,
          icon: <Plus size={16} aria-hidden="true" />,
        }}
      />

      {error && (
        <div
          role="alert"
          className="mb-4 rounded-lg border border-ro-danger/30 bg-ro-danger/10 px-3 py-2 text-sm text-ro-danger"
        >
          {error}
        </div>
      )}

      {/* Search + tag filters */}
      {!loading && notes.length > 0 && (
        <div className="mb-6 space-y-3">
          <div className="relative max-w-sm">
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ro-muted"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes..."
              aria-label="Search notes"
              className="ro-input pl-9"
            />
          </div>
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by tag">
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                aria-pressed={activeTag === null}
                className={`rounded-full border px-3 py-1 font-mono text-[10px] transition-colors ${
                  activeTag === null
                    ? 'border-ro-pink/40 bg-ro-pink/15 text-ro-pink'
                    : 'border-ro-pink/10 bg-ro-surface text-ro-muted hover:border-ro-pink/25'
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  aria-pressed={activeTag === tag}
                  className={`rounded-full border px-3 py-1 font-mono text-[10px] transition-colors ${
                    activeTag === tag
                      ? 'border-ro-pink/40 bg-ro-pink/15 text-ro-pink'
                      : 'border-ro-pink/10 bg-ro-surface text-ro-muted hover:border-ro-pink/25'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div
        role="status"
        aria-live="polite"
        className={loading ? 'py-12 text-center text-sm text-ro-muted' : 'sr-only'}
      >
        {loading ? 'Loading notes...' : ''}
      </div>

      {loading ? null : notes.length === 0 ? (
        <div className="ro-card flex flex-col items-center justify-center gap-3 py-16 text-center">
          <BookMarked size={36} className="text-ro-muted/40" aria-hidden="true" />
          <p className="text-sm font-medium text-ro-sec">The vault is empty</p>
          <p className="text-xs text-ro-muted">
            Capture your first note — ideas, snippets, things worth keeping.
          </p>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="mt-2 flex items-center gap-2 rounded-lg border border-ro-pink/25 bg-ro-pink/10 px-4 py-2 text-sm font-medium text-ro-pink transition-colors hover:bg-ro-pink/20"
          >
            <Plus size={14} aria-hidden="true" />
            Add Note
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-ro-pink/15 py-12 text-center">
          <p className="text-sm text-ro-sec">No notes match your search.</p>
          <button
            type="button"
            className="mt-2 text-sm text-ro-pink hover:underline"
            onClick={() => {
              setQuery('')
              setActiveTag(null)
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          data-testid="note-list"
        >
          {filtered.map((note) => (
            <li key={note.id}>
              <article className="ro-card flex h-full flex-col p-5">
                <h3 className="mb-2 text-sm font-semibold text-ro-pri">{note.title}</h3>
                <p className="mb-3 flex-1 whitespace-pre-line text-xs leading-relaxed text-ro-muted line-clamp-4">
                  {note.content}
                </p>
                <div className="flex items-center gap-2 border-t border-ro-pink/8 pt-3">
                  <div className="flex flex-1 flex-wrap gap-1">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-ro-pink/10 bg-ro-surface px-2 py-0.5 font-mono text-[9px] text-ro-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    aria-label={`Edit note ${note.title}`}
                    onClick={() => {
                      setEditingNote(note)
                      setFormOpen(true)
                    }}
                    className="rounded-md p-1.5 text-ro-muted transition-colors hover:bg-ro-surface hover:text-ro-pri"
                  >
                    <Pencil size={13} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete note ${note.title}`}
                    onClick={() => setDeletingNote(note)}
                    className="rounded-md p-1.5 text-ro-muted transition-colors hover:bg-ro-surface hover:text-ro-danger"
                  >
                    <Trash2 size={13} aria-hidden="true" />
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      <Modal
        isOpen={formOpen}
        onClose={handleFormClose}
        title={editingNote ? 'Edit Note' : 'Add Note'}
        maxWidth="max-w-xl"
      >
        <NoteForm
          initialNote={editingNote ?? undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingNote}
        onConfirm={() => {
          if (deletingNote) deleteNote(deletingNote.id)
          setDeletingNote(null)
        }}
        onCancel={() => setDeletingNote(null)}
        title="Delete note"
        message={`Delete "${deletingNote?.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  )
}
