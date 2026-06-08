import { useState } from 'react'
import { Plus, Wallet } from 'lucide-react'
import type { BudgetEntry, EntryType } from '@/types'
import { useBudget } from '@/features/budget/hooks/useBudget'
import type { BudgetInput } from '@/features/budget/hooks/useBudget'
import BudgetEntryCard from '@/features/budget/components/BudgetEntryCard'
import BudgetFilters from '@/features/budget/components/BudgetFilters'
import BudgetForm from '@/features/budget/components/BudgetForm'
import SummaryBar from '@/features/budget/components/SummaryBar'
import PageHeader from '@/components/PageHeader'
import EmptyState from '@/components/EmptyState'
import Modal from '@/components/Modal'
import ConfirmDialog from '@/components/ConfirmDialog'

export default function BudgetPage() {
  const { entries, addEntry, updateEntry, deleteEntry } = useBudget()

  const [typeFilter, setTypeFilter] = useState<EntryType | 'all'>('all')
  const [formOpen, setFormOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<BudgetEntry | null>(null)
  const [deletingEntry, setDeletingEntry] = useState<BudgetEntry | null>(null)

  const filtered = entries
    .filter((e) => typeFilter === 'all' || e.type === typeFilter)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

  const handleOpenCreate = () => {
    setEditingEntry(null)
    setFormOpen(true)
  }

  const handleOpenEdit = (entry: BudgetEntry) => {
    setEditingEntry(entry)
    setFormOpen(true)
  }

  const handleFormClose = () => {
    setFormOpen(false)
    setEditingEntry(null)
  }

  const handleFormSubmit = (data: BudgetInput) => {
    if (editingEntry) {
      updateEntry(editingEntry.id, data)
    } else {
      addEntry(data)
    }
    handleFormClose()
  }

  const handleDeleteConfirm = () => {
    if (deletingEntry) deleteEntry(deletingEntry.id)
    setDeletingEntry(null)
  }

  return (
    <div>
      <PageHeader
        title="Budget"
        description="Track income and expenses. See where your money goes."
        action={{
          label: 'Add Entry',
          onClick: handleOpenCreate,
          icon: <Plus size={16} aria-hidden="true" />,
        }}
      />

      {entries.length > 0 && (
        <>
          <SummaryBar entries={entries} />
          <div className="mb-6">
            <BudgetFilters typeFilter={typeFilter} onTypeChange={setTypeFilter} />
          </div>
        </>
      )}

      {entries.length === 0 ? (
        <EmptyState
          title="No budget entries yet"
          description="Record your first income or expense to start tracking."
          action={{ label: 'Add Entry', onClick: handleOpenCreate }}
          icon={<Wallet size={40} />}
        />
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-surface-700 py-12 text-center">
          <p className="text-sm text-text-secondary">No entries match the current filter.</p>
          <button
            type="button"
            className="mt-2 text-sm text-accent hover:underline"
            onClick={() => setTypeFilter('all')}
          >
            Clear filter
          </button>
        </div>
      ) : (
        <ul data-testid="budget-list" className="space-y-3">
          {filtered.map((entry) => (
            <BudgetEntryCard
              key={entry.id}
              entry={entry}
              onEdit={handleOpenEdit}
              onDelete={setDeletingEntry}
            />
          ))}
        </ul>
      )}

      <Modal
        isOpen={formOpen}
        onClose={handleFormClose}
        title={editingEntry ? 'Edit Entry' : 'Add Entry'}
      >
        <BudgetForm
          initialEntry={editingEntry ?? undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      </Modal>

      <ConfirmDialog
        isOpen={deletingEntry !== null}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingEntry(null)}
        title="Delete Entry"
        message={`Are you sure you want to delete "${deletingEntry?.title}"?`}
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  )
}
