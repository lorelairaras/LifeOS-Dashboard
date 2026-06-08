import { useState, useEffect } from 'react'
import type { Task, TaskStatus, TaskPriority, TaskCategory } from '@/types'
import type { TaskInput } from '@/features/tasks/hooks/useTasks'
import FormField from '@/components/FormField'
import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import Select from '@/components/Select'
import Button from '@/components/Button'

const STATUS_OPTIONS = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'blocked', label: 'Blocked' },
]
const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
]
const CATEGORY_OPTIONS = [
  { value: 'general', label: 'General' },
  { value: 'work', label: 'Work' },
  { value: 'project', label: 'Project' },
  { value: 'personal', label: 'Personal' },
  { value: 'career', label: 'Career' },
]

type FormState = {
  title: string
  description: string
  status: string
  priority: string
  category: string
  dueDate: string
  notes: string
}

const DEFAULT_FORM: FormState = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  category: 'general',
  dueDate: '',
  notes: '',
}

interface TaskFormProps {
  initialTask?: Task
  onSubmit: (data: TaskInput) => void
  onCancel: () => void
}

export default function TaskForm({ initialTask, onSubmit, onCancel }: TaskFormProps) {
  const [form, setForm] = useState<FormState>(
    initialTask
      ? {
          title: initialTask.title,
          description: initialTask.description ?? '',
          status: initialTask.status,
          priority: initialTask.priority,
          category: initialTask.category,
          dueDate: initialTask.dueDate ?? '',
          notes: initialTask.notes ?? '',
        }
      : DEFAULT_FORM
  )
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  useEffect(() => {
    setForm(
      initialTask
        ? {
            title: initialTask.title,
            description: initialTask.description ?? '',
            status: initialTask.status,
            priority: initialTask.priority,
            category: initialTask.category,
            dueDate: initialTask.dueDate ?? '',
            notes: initialTask.notes ?? '',
          }
        : DEFAULT_FORM
    )
    setErrors({})
  }, [initialTask])

  const set = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) {
      setErrors({ title: 'Title is required.' })
      return
    }
    onSubmit({
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      status: form.status as TaskStatus,
      priority: form.priority as TaskPriority,
      category: form.category as TaskCategory,
      dueDate: form.dueDate || undefined,
      notes: form.notes.trim() || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <FormField label="Title" htmlFor="task-title" error={errors.title} required>
          <Input
            id="task-title"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="What needs to be done?"
            error={errors.title}
            autoFocus
            aria-required="true"
          />
        </FormField>

        <FormField label="Description" htmlFor="task-description">
          <Textarea
            id="task-description"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder="Optional details..."
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Status" htmlFor="task-status">
            <Select
              id="task-status"
              value={form.status}
              onChange={(e) => set('status', e.target.value)}
              options={STATUS_OPTIONS}
            />
          </FormField>
          <FormField label="Priority" htmlFor="task-priority">
            <Select
              id="task-priority"
              value={form.priority}
              onChange={(e) => set('priority', e.target.value)}
              options={PRIORITY_OPTIONS}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Category" htmlFor="task-category">
            <Select
              id="task-category"
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
              options={CATEGORY_OPTIONS}
            />
          </FormField>
          <FormField label="Due Date" htmlFor="task-due-date">
            <Input
              id="task-due-date"
              type="date"
              value={form.dueDate}
              onChange={(e) => set('dueDate', e.target.value)}
            />
          </FormField>
        </div>

        <FormField label="Notes" htmlFor="task-notes">
          <Textarea
            id="task-notes"
            value={form.notes}
            onChange={(e) => set('notes', e.target.value)}
            placeholder="Any additional notes..."
          />
        </FormField>
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm">
          {initialTask ? 'Save Changes' : 'Create Task'}
        </Button>
      </div>
    </form>
  )
}
