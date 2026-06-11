import { useState } from 'react'
import { Plus, Briefcase } from 'lucide-react'
import type { JobApplication, ApplicationStatus } from '@/types'
import { useJobs } from '@/features/jobs/hooks/useJobs'
import type { JobInput } from '@/features/jobs/hooks/useJobs'
import JobCard from '@/features/jobs/components/JobCard'
import JobForm from '@/features/jobs/components/JobForm'
import JobFilters from '@/features/jobs/components/JobFilters'
import PageHeader from '@/components/PageHeader'
import EmptyState from '@/components/EmptyState'
import Modal from '@/components/Modal'
import ConfirmDialog from '@/components/ConfirmDialog'

export default function JobsPage() {
  const { jobs, loading, error, addJob, updateJob, deleteJob } = useJobs()

  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all')
  const [formOpen, setFormOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<JobApplication | null>(null)
  const [deletingJob, setDeletingJob] = useState<JobApplication | null>(null)

  const filtered = jobs.filter((j) => {
    if (statusFilter !== 'all' && j.status !== statusFilter) return false
    return true
  })

  const handleOpenCreate = () => {
    setEditingJob(null)
    setFormOpen(true)
  }

  const handleOpenEdit = (job: JobApplication) => {
    setEditingJob(job)
    setFormOpen(true)
  }

  const handleFormClose = () => {
    setFormOpen(false)
    setEditingJob(null)
  }

  const handleFormSubmit = (data: JobInput) => {
    if (editingJob) {
      updateJob(editingJob.id, data)
    } else {
      addJob(data)
    }
    handleFormClose()
  }

  const handleDeleteConfirm = () => {
    if (deletingJob) deleteJob(deletingJob.id)
    setDeletingJob(null)
  }

  return (
    <div>
      <PageHeader
        title="Job Tracker"
        flavor="Career Pipeline"
        description="Track every application, status, and follow-up."
        action={{
          label: 'Add Application',
          onClick: handleOpenCreate,
          icon: <Plus size={16} aria-hidden="true" />,
        }}
      />

      <div
        role="status"
        aria-live="polite"
        className={loading ? 'py-12 text-center text-sm text-text-muted' : 'sr-only'}
      >
        {loading ? 'Loading applications...' : ''}
      </div>

      {error && (
        <div
          role="alert"
          className="mb-4 rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-sm text-error"
        >
          {error}
        </div>
      )}

      {!loading && jobs.length > 0 && (
        <div className="mb-6">
          <JobFilters statusFilter={statusFilter} onStatusChange={setStatusFilter} />
        </div>
      )}

      {!loading && jobs.length === 0 ? (
        <EmptyState
          title="No roles in the pipeline"
          description="Start logging your job search to never lose track of where you've applied."
          action={{ label: 'Add Application', onClick: handleOpenCreate }}
          icon={<Briefcase size={40} />}
        />
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-surface-700 py-12 text-center">
          <p className="text-sm text-text-secondary">No applications match the current filter.</p>
          <button
            type="button"
            className="mt-2 text-sm text-accent hover:underline"
            onClick={() => setStatusFilter('all')}
          >
            Clear filter
          </button>
        </div>
      ) : (
        <ul className="space-y-2" aria-label="Job application list" data-testid="job-list">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} onEdit={handleOpenEdit} onDelete={setDeletingJob} />
          ))}
        </ul>
      )}

      <Modal
        isOpen={formOpen}
        onClose={handleFormClose}
        title={editingJob ? 'Edit Application' : 'Log Application'}
      >
        <JobForm
          initialJob={editingJob ?? undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingJob}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingJob(null)}
        title="Delete application"
        message={`Are you sure you want to delete your application to "${deletingJob?.company}"?`}
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  )
}
