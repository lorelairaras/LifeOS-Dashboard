import { useState, useEffect } from 'react'
import type { Note } from '@/types'
import type { NoteInput } from '../hooks/useNotes'
import FormField from '@/components/FormField'
import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import Button from '@/components/Button'

type FormState = {
  title: string
  content: string
  tags: string
}

const DEFAULT_FORM: FormState = { title: '', content: '', tags: '' }

function toFormState(note: Note): FormState {
  return { title: note.title, content: note.content, tags: note.tags.join(', ') }
}

interface NoteFormProps {
  initialNote?: Note
  onSubmit: (data: NoteInput) => void
  onCancel: () => void
}

export default function NoteForm({ initialNote, onSubmit, onCancel }: NoteFormProps) {
  const [form, setForm] = useState<FormState>(
    initialNote ? toFormState(initialNote) : DEFAULT_FORM
  )
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  useEffect(() => {
    setForm(initialNote ? toFormState(initialNote) : DEFAULT_FORM)
    setErrors({})
  }, [initialNote])

  const set = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<Record<keyof FormState, string>> = {}
    if (!form.title.trim()) newErrors.title = 'Title is required.'
    if (!form.content.trim()) newErrors.content = 'Content is required.'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onSubmit({
      title: form.title.trim(),
      content: form.content.trim(),
      tags: form.tags
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <FormField label="Title" htmlFor="note-title" error={errors.title} required>
          <Input
            id="note-title"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="What is this note about?"
            error={errors.title}
            autoFocus
            aria-required="true"
          />
        </FormField>

        <FormField label="Content" htmlFor="note-content" error={errors.content} required>
          <Textarea
            id="note-content"
            value={form.content}
            onChange={(e) => set('content', e.target.value)}
            placeholder="Write your note..."
            rows={6}
            error={errors.content}
            aria-required="true"
          />
        </FormField>

        <FormField label="Tags (comma-separated)" htmlFor="note-tags">
          <Input
            id="note-tags"
            value={form.tags}
            onChange={(e) => set('tags', e.target.value)}
            placeholder="frontend, career, ideas"
          />
        </FormField>
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm">
          {initialNote ? 'Save Changes' : 'Add Note'}
        </Button>
      </div>
    </form>
  )
}
