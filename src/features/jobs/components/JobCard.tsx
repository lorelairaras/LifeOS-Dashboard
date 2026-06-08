import { ExternalLink, Pencil, Trash2 } from 'lucide-react'
import type { JobApplication } from '@/types'
import Badge from '@/components/Badge'
import { isOverdue, formatDate } from '@/utils/dateUtils'
import { STATUS_LABELS, STATUS_VARIANTS, JOB_TYPE_LABELS } from '../data/jobCategories'

interface JobCardProps {
  job: JobApplication
  onEdit: (job: JobApplication) => void
  onDelete: (job: JobApplication) => void
}

export default function JobCard({ job, onEdit, onDelete }: JobCardProps) {
  const showFollowUpWarning =
    isOverdue(job.followUpDate) &&
    job.status !== 'rejected' &&
    job.status !== 'closed'

  return (
    <li className="flex items-start gap-3 rounded-xl bg-surface-800 p-4 shadow-sm">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-snug text-text-primary">{job.company}</p>
        <p className="mt-0.5 text-xs text-text-secondary">{job.role}</p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge label={STATUS_LABELS[job.status]} variant={STATUS_VARIANTS[job.status]} />

          {job.jobType && (
            <span className="text-xs text-text-muted">{JOB_TYPE_LABELS[job.jobType]}</span>
          )}

          {job.location && (
            <span className="text-xs text-text-muted">{job.location}</span>
          )}

          {job.dateApplied && (
            <span className="text-xs text-text-muted">Applied {formatDate(job.dateApplied)}</span>
          )}

          {job.followUpDate && showFollowUpWarning && (
            <span className="text-xs font-medium text-amber-400">
              {'⚠'} Follow-up {formatDate(job.followUpDate)}
            </span>
          )}

          {job.followUpDate && !showFollowUpWarning && (
            <span className="text-xs text-text-muted">
              Follow-up {formatDate(job.followUpDate)}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {job.jobUrl && (
          <a
            href={job.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open job posting"
            className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface-700 hover:text-text-primary"
          >
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        )}
        <button
          type="button"
          aria-label={`Edit application: ${job.company}`}
          onClick={() => onEdit(job)}
          className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface-700 hover:text-text-primary"
        >
          <Pencil size={14} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={`Delete application: ${job.company}`}
          onClick={() => onDelete(job)}
          className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface-700 hover:text-danger"
        >
          <Trash2 size={14} aria-hidden="true" />
        </button>
      </div>
    </li>
  )
}
