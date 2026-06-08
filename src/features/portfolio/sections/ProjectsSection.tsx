import Section from '@/components/Section'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/features/portfolio/data/portfolioData'

export default function ProjectsSection() {
  return (
    <Section id="projects" className="bg-surface-800/30">
      <h2 id="projects-heading" className="mb-4 text-3xl font-bold text-text-primary">
        Projects
      </h2>
      <p className="mb-10 text-text-secondary">
        {'A selection of things I\'ve built. See deeper write-ups in '}
        <a href="#case-studies" className="text-accent hover:underline">Case Studies</a>
        {'.'}
      </p>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2" role="list" aria-label="Portfolio projects">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
