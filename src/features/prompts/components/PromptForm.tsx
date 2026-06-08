import { useState, useEffect } from 'react'
import type { Prompt, PromptCategory } from '@/types'
import type { PromptInput } from '@/features/prompts/hooks/usePrompts'
import { CATEGORY_SELECT_OPTIONS } from '@/features/prompts/data/promptCategories'
import FormField from '@/components/FormField'
import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import Select from '@/components/Select'
import Button from '@/components/Button'

type FormState = {
  title: string
  body: string
  category: string
  useCase: string
  tags: string
}

const DEFAULT_FORM: FormState = {
  title: '',
  body: '',
  category: 'other',
  useCase: '',
  tags: '',
}

interface PromptFormProps {
  initialPrompt?: Prompt
  onSubmit: (data: PromptInput) => void
  onCancel: () => void
}

export default function PromptForm({
  initialPrompt,
  onSubmit,
  onCancel,
}: PromptFormProps) {
  const [form, setForm] = useState<FormState>(
    initialPrompt
      ? {
          title: initialPrompt.title,
          body: initialPrompt.body,
          category: initialPrompt.category,
          useCase: initialPrompt.useCase ?? '',
          tags: initialPrompt.tags.join(', '),
        }
      : DEFAULT_FORM
  )
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  useEffect(() => {
    setForm(
      initialPrompt
        ? {
            title: initialPrompt.title,
            body: initialPrompt.body,
            category: initialPrompt.category,
            useCase: initialPrompt.useCase ?? '',
            tags: initialPrompt.tags.join(', '),
          }
        : DEFAULT_FORM
    )
    setErrors({})
  }, [initialPrompt])

  const set = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<Record<keyof FormState, string>> = {}
    if (!form.title.trim()) newErrors.title = 'Title is required.'
    if (!form.body.trim()) newErrors.body = 'Prompt body is required.'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onSubmit({
      title: form.title.trim(),
      body: form.body.trim(),
      category: form.category as PromptCategory,
      useCase: form.useCase.trim() || undefined,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <FormField label="Title" htmlFor="prompt-title" error={errors.title} required>
          <Input
            id="prompt-title"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="Give your prompt a clear name"
            error={errors.title}
            autoFocus
            aria-required="true"
          />
        </FormField>

        <FormField label="Category" htmlFor="prompt-category">
          <Select
            id="prompt-category"
            value={form.category}
            onChange={(e) => set('category', e.target.value)}
            options={CATEGORY_SELECT_OPTIONS}
          />
        </FormField>

        <FormField label="Use Case" htmlFor="prompt-use-case">
          <Input
            id="prompt-use-case"
            value={form.useCase}
            onChange={(e) => set('useCase', e.target.value)}
            placeholder="When would you use this? (optional)"
          />
        </FormField>

        <FormField label="Prompt Body" htmlFor="prompt-body" error={errors.body} required>
          <Textarea
            id="prompt-body"
            value={form.body}
            onChange={(e) => set('body', e.target.value)}
            placeholder="Paste or type your prompt here..."
            error={errors.body}
            rows={8}
            className="font-mono text-xs"
            aria-required="true"
          />
        </FormField>

        <FormField label="Tags" htmlFor="prompt-tags">
          <Input
            id="prompt-tags"
            value={form.tags}
            onChange={(e) => set('tags', e.target.value)}
            placeholder="react, typescript, refactor (comma-separated)"
          />
        </FormField>
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm">
          {initialPrompt ? 'Save Changes' : 'Save Prompt'}
        </Button>
      </div>
    </form>
  )
}
