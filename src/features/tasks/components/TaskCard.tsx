import { CheckCircle2, Circle, Pencil, Trash2 } from 'lucide-react'
import type { Task } from '@/types'
import Badge from '@/components/Badge'
import { isOverdue, formatDate } from '@/utils/dateUtils'

const STATUS_LABELS: Record<Task['status'], string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
  blocked: 'Blocked',
}

const STATUS_VARIANTS = {
  todo: 'default',
  in_progress: 'info',
  done: 'success',
  blocked: 'warning',
} as const

const PRIORITY_LABELS: Record<Task['priority'], string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
}

const PRIORITY_VARIANTS = {
  low: 'default',
  medium: 'info',
  high: 'warning',
  urgent: 'danger',
} as const

interface TaskCardProps {
  task: Task
  onToggleDone: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export default function TaskCard({ task, onToggleDone, onEdit, onDelete }: TaskCardProps) {
  const overdue = task.status !== 'done' && isOverdue(task.dueDate)

  return (
    <li className="flex items-start gap-3 rounded-xl bg-surface-800 p-4 shadow-sm">
      <button
        type="button"
        aria-label={
          task.status === 'done'
            ? `Mark "${task.title}" as to do`
            : `Mark "${task.title}" as done`
        }
        onClick={() => onToggleDone(task.id)}
        className="mt-0.5 shrink-0 text-text-muted transition-colors hover:text-success"
      >
        {task.status === 'done' ? (
          <CheckCircle2 size={20} className="text-success" aria-hidden="true" />
        ) : (
          <Circle size={20} aria-hidden="true" />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium leading-snug ${
            task.status === 'done' ? 'text-text-muted line-through' : 'text-text-primary'
          }`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="mt-0.5 line-clamp-1 text-xs text-text-muted">{task.description}</p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge
            label={STATUS_LABELS[task.status]}
            variant={STATUS_VARIANTS[task.status]}
          />
          <Badge
            label={PRIORITY_LABELS[task.priority]}
            variant={PRIORITY_VARIANTS[task.priority]}
          />
          {task.category !== 'general' && (
            <span className="text-xs capitalize text-text-muted">{task.category}</span>
          )}
          {task.dueDate && (
            <span
              className={`text-xs ${overdue ? 'font-medium text-warning' : 'text-text-muted'}`}
            >
              {overdue ? '⚠ ' : ''}{formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          aria-label={`Edit task: ${task.title}`}
          onClick={() => onEdit(task)}
          className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface-700 hover:text-text-primary"
        >
          <Pencil size={14} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={`Delete task: ${task.title}`}
          onClick={() => onDelete(task)}
          className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface-700 hover:text-danger"
        >
          <Trash2 size={14} aria-hidden="true" />
        </button>
      </div>
    </li>
  )
}
