import { useState } from 'react'
import { FolderKanban, Plus, Github, ExternalLink, Pencil, Trash2 } from 'lucide-react'
import type { Project } from '@/types'
import { useProjects } from '@/features/projects/hooks/useProjects'
import type { ProjectInput } from '@/features/projects/hooks/useProjects'
import ProjectForm from '@/features/projects/components/ProjectForm'
import PageHeader from '@/components/PageHeader'
import Modal from '@/components/Modal'
import ConfirmDialog from '@/components/ConfirmDialog'

const STATUS_LABEL: Record<string, string> = {
  idea:        'Idea',
  in_progress: 'In Progress',
  complete:    'Complete',
  archived:    'Archived',
}

const STATUS_COLOR: Record<string, string> = {
  idea:        'border-ro-oracle/20 bg-ro-oracle/10 text-ro-oracle',
  in_progress: 'border-ro-pink/25 bg-ro-pink/10 text-ro-pink',
  complete:    'border-ro-success/25 bg-ro-success/10 text-ro-success',
  archived:    'border-ro-muted/20 bg-ro-surface text-ro-muted',
}

export default function ProjectsDashboardPage() {
  const { projects, loading, error, addProject, updateProject, deleteProject } = useProjects()

  const [formOpen, setFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [deletingProject, setDeletingProject] = useState<Project | null>(null)

  const handleOpenCreate = () => {
    setEditingProject(null)
    setFormOpen(true)
  }

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project)
    setFormOpen(true)
  }

  const handleFormClose = () => {
    setFormOpen(false)
    setEditingProject(null)
  }

  const handleFormSubmit = (data: ProjectInput) => {
    if (editingProject) {
      updateProject(editingProject.id, data)
    } else {
      addProject(data)
    }
    handleFormClose()
  }

  const handleDeleteConfirm = () => {
    if (deletingProject) deleteProject(deletingProject.id)
    setDeletingProject(null)
  }

  return (
    <div>
      <PageHeader
        title="Projects"
        flavor="The Reliquary"
        description="Document your work and turn it into case studies."
        action={{
          label: 'Add Project',
          onClick: handleOpenCreate,
          icon: <Plus size={16} aria-hidden="true" />,
        }}
      />

      {error && (
        <div role="alert" className="mb-4 rounded-lg border border-ro-danger/30 bg-ro-danger/10 px-3 py-2 text-sm text-ro-danger">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-sm text-ro-muted">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="ro-card flex flex-col items-center justify-center gap-3 py-16 text-center">
          <FolderKanban size={36} className="text-ro-muted/40" aria-hidden="true" />
          <p className="text-sm font-medium text-ro-sec">No projects yet</p>
          <p className="text-xs text-ro-muted">Add your first project to track progress and build your portfolio.</p>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="mt-2 flex items-center gap-2 rounded-lg border border-ro-pink/25 bg-ro-pink/10 px-4 py-2 text-sm font-medium text-ro-pink transition-colors hover:bg-ro-pink/20"
          >
            <Plus size={14} aria-hidden="true" />
            Add Project
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list" data-testid="project-list">
          {projects.map((project) => (
            <li key={project.id}>
              <div className="ro-card group flex h-full flex-col p-5">
                {/* Header */}
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-ro-pri">{project.name}</h3>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px] font-semibold ${STATUS_COLOR[project.status]}`}
                  >
                    {STATUS_LABEL[project.status]}
                  </span>
                </div>

                {/* Problem solved */}
                {project.problemSolved && (
                  <p className="mb-3 flex-1 text-xs leading-relaxed text-ro-muted line-clamp-3">
                    {project.problemSolved}
                  </p>
                )}

                {/* Tech stack */}
                {project.techStack.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-ro-pink/10 bg-ro-surface px-2 py-0.5 font-mono text-[9px] text-ro-muted"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="font-mono text-[9px] text-ro-muted">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Links + actions */}
                <div className="mt-auto flex items-center gap-2 border-t border-ro-pink/8 pt-3">
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} GitHub repository`}
                      className="flex items-center gap-1.5 text-xs text-ro-muted transition-colors hover:text-ro-pink"
                    >
                      <Github size={12} aria-hidden="true" />
                      GitHub
                    </a>
                  )}
                  {project.liveDemoUrl && project.liveDemoUrl !== '#' && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} live demo`}
                      className="flex items-center gap-1.5 text-xs text-ro-muted transition-colors hover:text-ro-pink"
                    >
                      <ExternalLink size={12} aria-hidden="true" />
                      Live Demo
                    </a>
                  )}
                  <div className="ml-auto flex gap-1">
                    <button
                      type="button"
                      aria-label={`Edit ${project.name}`}
                      onClick={() => handleOpenEdit(project)}
                      className="rounded-md p-1.5 text-ro-muted transition-colors hover:bg-ro-surface hover:text-ro-pri"
                    >
                      <Pencil size={13} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${project.name}`}
                      onClick={() => setDeletingProject(project)}
                      className="rounded-md p-1.5 text-ro-muted transition-colors hover:bg-ro-surface hover:text-ro-danger"
                    >
                      <Trash2 size={13} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        isOpen={formOpen}
        onClose={handleFormClose}
        title={editingProject ? 'Edit Project' : 'Add Project'}
        maxWidth="max-w-xl"
      >
        <ProjectForm
          initialProject={editingProject ?? undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingProject}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingProject(null)}
        title="Delete project"
        message={`Are you sure you want to delete "${deletingProject?.name}"? This cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  )
}
