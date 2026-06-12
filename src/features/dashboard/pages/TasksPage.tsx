import { useState } from 'react'
import { Plus, CheckSquare } from 'lucide-react'
import type { Task, TaskStatus, TaskPriority } from '@/types'
import { useTasks } from '@/features/tasks/hooks/useTasks'
import type { TaskInput } from '@/features/tasks/hooks/useTasks'
import TaskCard from '@/features/tasks/components/TaskCard'
import TaskForm from '@/features/tasks/components/TaskForm'
import TaskFilters from '@/features/tasks/components/TaskFilters'
import PageHeader from '@/components/PageHeader'
import EmptyState from '@/components/EmptyState'
import Modal from '@/components/Modal'
import ConfirmDialog from '@/components/ConfirmDialog'

export default function TasksPage() {
  const { tasks, loading, error, addTask, updateTask, deleteTask, toggleDone } = useTasks()

  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all')
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all')
  const [formOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deletingTask, setDeletingTask] = useState<Task | null>(null)

  const filtered = tasks.filter((t) => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false
    if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false
    return true
  })

  const handleOpenCreate = () => {
    setEditingTask(null)
    setFormOpen(true)
  }

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task)
    setFormOpen(true)
  }

  const handleFormClose = () => {
    setFormOpen(false)
    setEditingTask(null)
  }

  const handleFormSubmit = (data: TaskInput) => {
    if (editingTask) {
      updateTask(editingTask.id, data)
    } else {
      addTask(data)
    }
    handleFormClose()
  }

  const handleDeleteConfirm = () => {
    if (deletingTask) deleteTask(deletingTask.id)
    setDeletingTask(null)
  }

  return (
    <div>
      <PageHeader
        title="Tasks"
        flavor="Ritual Tasks"
        description="Track your daily, project, and career tasks."
        action={{
          label: 'Add Task',
          onClick: handleOpenCreate,
          icon: <Plus size={16} aria-hidden="true" />,
        }}
      />

      <div
        role="status"
        aria-live="polite"
        className={loading ? 'py-12 text-center text-sm text-text-muted' : 'sr-only'}
      >
        {loading ? 'Loading tasks...' : ''}
      </div>

      {error && (
        <div
          role="alert"
          className="mb-4 rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-sm text-error"
        >
          {error}
        </div>
      )}

      {!loading && tasks.length > 0 && (
        <div className="mb-6">
          <TaskFilters
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            onStatusChange={setStatusFilter}
            onPriorityChange={setPriorityFilter}
          />
        </div>
      )}

      {!loading && tasks.length === 0 ? (
        <EmptyState
          title="No tasks yet"
          description="Add your first task to start tracking what needs to be done."
          action={{ label: 'Add Task', onClick: handleOpenCreate }}
          icon={<CheckSquare size={40} />}
        />
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-surface-700 py-12 text-center">
          <p className="text-sm text-text-secondary">No tasks match the current filters.</p>
          <button
            type="button"
            className="mt-2 text-sm text-accent hover:underline"
            onClick={() => {
              setStatusFilter('all')
              setPriorityFilter('all')
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="space-y-2" aria-label="Task list" data-testid="task-list">
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleDone={toggleDone}
              onEdit={handleOpenEdit}
              onDelete={setDeletingTask}
            />
          ))}
        </ul>
      )}

      <Modal
        isOpen={formOpen}
        onClose={handleFormClose}
        title={editingTask ? 'Edit Task' : 'New Task'}
      >
        <TaskForm
          initialTask={editingTask ?? undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingTask}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingTask(null)}
        title="Delete task"
        message={`Are you sure you want to delete "${deletingTask?.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  )
}
