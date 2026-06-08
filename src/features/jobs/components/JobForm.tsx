import { useState, useEffect } from 'react'
import type { JobApplication, ApplicationStatus, JobType } from '@/types'
import type { JobInput } from '../hooks/useJobs'
import FormField from '@/components/FormField'
import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import Select from '@/components/Select'
import Button from '@/components/Button'
import { STATUS_SELECT_OPTIONS, JOB_TYPE_SELECT_OPTIONS } from '../data/jobCategories'

type FormState = {
  company: string
  role: string
  location: string
  jobType: string
  status: string
  jobUrl: string
  notes: string
  dateApplied: string
  followUpDate: string
}

const DEFAULT_FORM: FormState = {
  company: '',
  role: '',
  location: '',
  jobType: '',
  status: 'saved',
  jobUrl: '',
  notes: '',
  dateApplied: '',
  followUpDate: '',
}

interface JobFormProps {
  initialJob?: JobApplication
  onSubmit: (data: JobInput) => void
  onCancel: () => void
}

export default function JobForm({ initialJob, onSubmit, onCancel }: JobFormProps) {
  const [form, setForm] = useState<FormState>(
    initialJob
      ? {
          company: initialJob.company,
          role: initialJob.role,
          location: initialJob.location ?? '',
          jobType: initialJob.jobType ?? '',
          status: initialJob.status,
          jobUrl: initialJob.jobUrl ?? '',
          notes: initialJob.notes ?? '',
          dateApplied: initialJob.dateApplied ?? '',
          followUpDate: initialJob.followUpDate ?? '',
        }
      : DEFAULT_FORM
  )
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  useEffect(() => {
    setForm(
      initialJob
        ? {
            company: initialJob.company,
            role: initialJob.role,
            location: initialJob.location ?? '',
            jobType: initialJob.jobType ?? '',
            status: initialJob.status,
            jobUrl: initialJob.jobUrl ?? '',
            notes: initialJob.notes ?? '',
            dateApplied: initialJob.dateApplied ?? '',
            followUpDate: initialJob.followUpDate ?? '',
          }
        : DEFAULT_FORM
    )
    setErrors({})
  }, [initialJob])

  const set = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<Record<keyof FormState, string>> = {}
    if (!form.company.trim()) newErrors.company = 'Company is required.'
    if (!form.role.trim()) newErrors.role = 'Role is required.'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onSubmit({
      company: form.company.trim(),
      role: form.role.trim(),
      location: form.location.trim() || undefined,
      jobType: (form.jobType as JobType) || undefined,
      status: form.status as ApplicationStatus,
      jobUrl: form.jobUrl.trim() || undefined,
      notes: form.notes.trim() || undefined,
      dateApplied: form.dateApplied || undefined,
      followUpDate: form.followUpDate || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Company" htmlFor="job-company" error={errors.company} required>
            <Input
              id="job-company"
              value={form.company}
              onChange={(e) => set('company', e.target.value)}
              placeholder="Company name"
              error={errors.company}
              autoFocus
              aria-required="true"
            />
          </FormField>
          <FormField label="Role" htmlFor="job-role" error={errors.role} required>
            <Input
              id="job-role"
              value={form.role}
              onChange={(e) => set('role', e.target.value)}
              placeholder="Job title"
              error={errors.role}
              aria-required="true"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Status" htmlFor="job-status">
            <Select
              id="job-status"
              value={form.status}
              onChange={(e) => set('status', e.target.value)}
              options={STATUS_SELECT_OPTIONS}
            />
          </FormField>
          <FormField label="Job Type" htmlFor="job-type">
            <Select
              id="job-type"
              value={form.jobType}
              onChange={(e) => set('jobType', e.target.value)}
              options={JOB_TYPE_SELECT_OPTIONS}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Location" htmlFor="job-location">
            <Input
              id="job-location"
              value={form.location}
              onChange={(e) => set('location', e.target.value)}
              placeholder="City, Country"
            />
          </FormField>
          <FormField label="Job URL" htmlFor="job-url">
            <Input
              id="job-url"
              type="url"
              value={form.jobUrl}
              onChange={(e) => set('jobUrl', e.target.value)}
              placeholder="https://..."
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Date Applied" htmlFor="job-date-applied">
            <Input
              id="job-date-applied"
              type="date"
              value={form.dateApplied}
              onChange={(e) => set('dateApplied', e.target.value)}
            />
          </FormField>
          <FormField label="Follow-up Date" htmlFor="job-follow-up">
            <Input
              id="job-follow-up"
              type="date"
              value={form.followUpDate}
              onChange={(e) => set('followUpDate', e.target.value)}
            />
          </FormField>
        </div>

        <FormField label="Notes" htmlFor="job-notes">
          <Textarea
            id="job-notes"
            value={form.notes}
            onChange={(e) => set('notes', e.target.value)}
            placeholder="Any notes about this application..."
          />
        </FormField>
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="sm">
          {initialJob ? 'Save Changes' : 'Log Application'}
        </Button>
      </div>
    </form>
  )
}
