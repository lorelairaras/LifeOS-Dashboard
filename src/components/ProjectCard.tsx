import { Github, ExternalLink } from 'lucide-react'
import type { PortfolioProject } from '@/types'

interface ProjectCardProps {
  project: PortfolioProject
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl bg-surface-800 p-6 shadow-md">
      {project.featured && (
        <span className="mb-3 inline-flex w-fit rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
          Featured
        </span>
      )}
      <h3 className="text-lg font-semibold text-text-primary">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
        {project.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2" role="list" aria-label={`${project.title} tech stack`}>
        {project.techStack.map((tech) => (
          <li key={tech} className="rounded-full bg-surface-700 px-2.5 py-0.5 text-xs font-medium text-text-secondary">
            {tech}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center gap-4">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            aria-label={`${project.title} - view on GitHub`}
            className="flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary">
            <Github size={15} aria-hidden="true" />
            GitHub
          </a>
        )}
        {project.liveDemoUrl && project.liveDemoUrl !== '#' && (
          <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer"
            aria-label={`${project.title} - view live demo`}
            className="flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary">
            <ExternalLink size={15} aria-hidden="true" />
            Live Demo
          </a>
        )}
      </div>
    </article>
  )
}
