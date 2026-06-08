import { Download } from 'lucide-react'
import Section from '@/components/Section'
import { experience } from '@/features/portfolio/data/portfolioData'

const RESUME_PDF_PATH: string | null = null

export default function ResumeSection() {
  return (
    <Section id="resume" className="bg-surface-800/30">
      <div className="flex items-start justify-between gap-4 mb-10">
        <div>
          <h2 id="resume-heading" className="text-3xl font-bold text-text-primary">Experience</h2>
          <p className="mt-2 text-text-secondary">Career history and key contributions.</p>
        </div>
        {RESUME_PDF_PATH && (
          <a href={RESUME_PDF_PATH} download
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-surface-600 bg-surface-800 px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary"
            aria-label="Download resume as PDF">
            <Download size={15} aria-hidden="true" />
            Download CV
          </a>
        )}
      </div>
      <ol className="relative border-l border-surface-600 pl-8 space-y-10" aria-label="Career timeline">
        {experience.map((item, index) => (
          <li key={index} className="relative">
            <span className="absolute -left-[1.125rem] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-surface-900" aria-hidden="true" />
            <div className="rounded-xl bg-surface-800 p-5 shadow-md">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold text-text-primary">{item.role}</h3>
                  <p className="mt-0.5 text-sm font-medium text-accent">{item.company}</p>
                </div>
                <span className="shrink-0 rounded-full bg-surface-700 px-3 py-0.5 text-xs text-text-muted">
                  {item.startDate} — {item.endDate}
                </span>
              </div>
              <ul className="mt-4 space-y-2" role="list">
                {item.bullets.map((bullet, bIndex) => (
                  <li key={bIndex} className="flex items-start gap-2.5 text-sm leading-relaxed text-text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
