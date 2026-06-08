import type { ApplicationStatus, JobType } from '@/types'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple'

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  saved: 'Saved',
  applied: 'Applied',
  phone_screen: 'Phone Screen',
  assessment: 'Assessment',
  interviewing: 'Interviewing',
  offer: 'Offer',
  rejected: 'Rejected',
  closed: 'Closed',
}

export const STATUS_VARIANTS: Record<ApplicationStatus, BadgeVariant> = {
  saved: 'default',
  applied: 'info',
  phone_screen: 'info',
  assessment: 'purple',
  interviewing: 'purple',
  offer: 'success',
  rejected: 'danger',
  closed: 'default',
}

export const JOB_TYPE_LABELS: Record<JobType, string> = {
  remote: 'Remote',
  hybrid: 'Hybrid',
  on_site: 'On-site',
  flexible: 'Flexible',
}

export const STATUS_SELECT_OPTIONS = Object.entries(STATUS_LABELS).map(([value, label]) => ({
  value,
  label,
}))

export const JOB_TYPE_SELECT_OPTIONS = [
  { value: '', label: '— Select —' },
  ...Object.entries(JOB_TYPE_LABELS).map(([value, label]) => ({ value, label })),
]
