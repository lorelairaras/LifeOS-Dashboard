import ProjectCard from '@/components/ProjectCard'
import Card3D from '@/components/Card3D'
import { projects } from '@/features/portfolio/data/portfolioData'

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-16 sm:py-24 ro-grid-bg"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ro-pink/50">
            Project Reliquary
          </span>
          <span className="h-px flex-1 bg-ro-pink/10" aria-hidden="true" />
        </div>

        <div className="ro-card p-8 sm:p-10">
          <h2 id="projects-heading" className="font-display mb-3 text-2xl font-bold text-ro-pri">
            Projects
          </h2>
          <p className="mb-8 text-sm text-ro-sec">
            Things I&rsquo;ve built. Deeper write-ups are in{' '}
            <a href="#case-studies" className="text-ro-pink underline-offset-2 hover:underline">
              Case Studies
            </a>
            .
          </p>

          <ul
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            role="list"
            aria-label="Portfolio projects"
          >
            {projects.map((project) => (
              <li key={project.id}>
                <Card3D className="h-full">
                  <ProjectCard project={project} />
                </Card3D>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
