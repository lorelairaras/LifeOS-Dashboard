import { Github, ExternalLink, CheckCircle2 } from 'lucide-react'
import type { CaseStudy } from '@/types'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <article className="rounded-xl bg-surface-800 p-6 shadow-md">
      {caseStudy.featured && (
        <span className="mb-3 inline-flex w-fit rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
          Featured
        </span>
      )}
      <h3 className="text-xl font-semibold text-text-primary">{caseStudy.title}</h3>
      <p className="mt-1 text-sm text-text-secondary">{caseStudy.summary}</p>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">The Problem</h4>
          <p className="text-sm leading-relaxed text-text-secondary">{caseStudy.problem}</p>
        </div>
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">The Solution</h4>
          <p className="text-sm leading-relaxed text-text-secondary">{caseStudy.solution}</p>
        </div>
      </div>
      {caseStudy.highlights.length > 0 && (
        <div className="mt-5">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">Key Highlights</h4>
          <ul className="space-y-2" role="list">
            {caseStudy.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-2" role="list" aria-label={`${caseStudy.title} tech stack`}>
          {caseStudy.techStack.map((tech) => (
            <li key={tech} className="rounded-full bg-surface-700 px-2.5 py-0.5 text-xs font-medium text-text-secondary">
              {tech}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          {caseStudy.githubUrl && (
            <a href={caseStudy.githubUrl} target="_blank" rel="noopener noreferrer"
              aria-label={`${caseStudy.title} - GitHub`}
              className="flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary">
              <Github size={15} aria-hidden="true" />
              GitHub
            </a>
          )}
          {caseStudy.liveDemoUrl && caseStudy.liveDemoUrl !== '#' && (
            <a href={caseStudy.liveDemoUrl} target="_blank" rel="noopener noreferrer"
              aria-label={`${caseStudy.title} - Live Demo`}
              className="flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary">
              <ExternalLink size={15} aria-hidden="true" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
