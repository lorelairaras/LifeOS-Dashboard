import { useState, useEffect } from 'react'
import type { Project, ProjectStatus, ProjectVisibility } from '@/types'
import type { ProjectInput } from '../hooks/useProjects'
import FormField from '@/components/FormField'
import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import Select from '@/components/Select'
import Button from '@/components/Button'

const STATUS_OPTIONS = [
  { value: 'idea', label: 'Idea' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'complete', label: 'Complete' },
  { value: 'archived', label: 'Archived' },
]

const VISIBILITY_OPTIONS = [
  { value: 'public', label: 'Public — shown on portfolio' },
  { value: 'private', label: 'Private — only you' },
]

type FormState = {
  name: string
  status: string
  visibility: string
  problemSolved: string
  techStack: string
  keyFeatures: string
  githubUrl: string
  liveDemoUrl: string
}

const DEFAULT_FORM: FormState = {
  name: '',
  status: 'idea',
  visibility: 'private',
  problemSolved: '',
  techStack: '',
  keyFeatures: '',
  githubUrl: '',
  liveDemoUrl: '',
}

function toFormState(project: Project): FormState {
  return {
    name: project.name,
    status: project.status,
    visibility: project.visibility,
    problemSolved: project.problemSolved ?? '',
    techStack: project.techStack.join(', '),
    keyFeatures: project.keyFeatures ?? '',
    githubUrl: project.githubUrl ?? '',
    liveDemoUrl: project.liveDemoUrl ?? '',
  }
}

interface ProjectFormProps {
  initialProject?: Project
  onSubmit: (data: ProjectInput) => void
  onCancel: () => void
}

export default function ProjectForm({ initialProject, onSubmit, onCancel }: ProjectFormProps) {
  const [form, setForm] = useState<FormState>(
    initialProject ? toFormState(initialProject) : DEFAULT_FORM
  )
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  useEffect(() => {
    setForm(initialProject ? toFormState(initialProject) : DEFAULT_FORM)
    setErrors({})
  }, [initialProject])

  const set = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) newErrors.name = 'Project name is required.'
    // Only allow http(s) URLs — prevents javascript: links being stored
    // and later rendered as hrefs (stored-XSS vector once projects go public)
    const isSafeUrl = (v: string) => !v || /^https?:\/\//i.test(v)
    if (!isSafeUrl(form.githubUrl.trim()))
      newErrors.githubUrl = 'URL must start with http:// or https://'
    if (!isSafeUrl(form.liveDemoUrl.trim()))
      newErrors.liveDemoUrl = 'URL must start with http:// or https://'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onSubmit({
      name: form.name.trim(),
      status: form.status as ProjectStatus,
      visibility: form.visibility as ProjectVisibility,
      problemSolved: form.problemSolved.trim() || undefined,
      techStack: form.techStack
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      keyFeatures: form.keyFeatures.trim() || undefined,
      githubUrl: form.githubUrl.trim() || undefined,
      liveDemoUrl: form.liveDemoUrl.trim() || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <FormField label="Project Name" htmlFor="project-name" error={errors.name} required>
          <Input
            id="project-name"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="My next big thing"
            error={errors.name}
            autoFocus
            aria-required="true"
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Status" htmlFor="project-status">
            <Select
              id="project-status"
              value={form.status}
              onChange={(e) => set('status', e.target.value)}
              options={STATUS_OPTIONS}
            />
          </FormField>
          <FormField label="Visibility" htmlFor="project-visibility">
            <Select
              id="project-visibility"
              value={form.visibility}
              onChange={(e) => set('visibility', e.target.value)}
              options={VISIBILITY_OPTIONS}
            />
          </FormField>
        </div>

        <FormField label="Problem It Solves" htmlFor="project-problem">
          <Textarea
            id="project-problem"
            value={form.problemSolved}
            onChange={(e) => set('problemSolved', e.target.value)}
            placeholder="What problem does this project solve?"
          />
        </FormField>

        <FormField label="Tech Stack (comma-separated)" htmlFor="project-tech">
          <Input
            id="project-tech"
            value={form.techStack}
            onChange={(e) => set('techStack', e.target.value)}
            placeholder="React, TypeScript, Supabase"
          />
        </FormField>

        <FormField label="Key Features" htmlFor="project-features">
          <Textarea
            id="project-features"
            value={form.keyFeatures}
            onChange={(e) => set('keyFeatures', e.target.value)}
            placeholder="The main things this project does"
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="GitHub URL" htmlFor="project-github" error={errors.githubUrl}>
            <Input
              id="project-github"
              type="url"
              value={form.githubUrl}
              onChange={(e) => set('githubUrl', e.target.value)}
              placeholder="https://github.com/..."
              error={errors.githubUrl}
            />
          </FormField>
          <FormField label="Live Demo URL" htmlFor="project-demo" error={errors.liveDemoUrl}>
            <Input
              id="project-demo"
              type="url"
              value={form.liveDemoUrl}
              onChange={(e) => set('liveDemoUrl', e.target.value)}
              placeholder="https://..."
              error={errors.liveDemoUrl}
            />
          </FormField>
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm">
          {initialProject ? 'Save Changes' : 'Add Project'}
        </Button>
      </div>
    </form>
  )
}
