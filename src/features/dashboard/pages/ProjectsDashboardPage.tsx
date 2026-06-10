import { FolderKanban } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import EmptyState from '@/components/EmptyState'

export default function ProjectsDashboardPage() {
  return (
    <div>
      <PageHeader
        title="Project Reliquary"
        description="Document your work. Public projects appear in your portfolio."
        action={{ label: 'Add Project', onClick: () => {} }}
      />
      <EmptyState
        title="No projects yet"
        description="Add your first project or case study. Mark it as public to show it in your portfolio."
        action={{ label: 'Add Project', onClick: () => {} }}
        icon={<FolderKanban size={40} />}
      />
    </div>
  )
}
