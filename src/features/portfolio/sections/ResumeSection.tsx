import { Download } from 'lucide-react'
import { experience } from '@/features/portfolio/data/portfolioData'

const RESUME_PDF_PATH: string | null = null

export default function ResumeSection() {
  return (
    <section
      id="resume"
      aria-labelledby="resume-heading"
      className="py-16 sm:py-24 ro-grid-bg"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ro-pink/50">
            Career Timeline
          </span>
          <span className="h-px flex-1 bg-ro-pink/10" aria-hidden="true" />
        </div>

        <div className="ro-card p-8 sm:p-10">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <h2 id="resume-heading" className="font-display text-2xl font-bold text-ro-pri">
                Experience
              </h2>
              <p className="mt-1.5 text-sm text-ro-sec">Career history and key contributions.</p>
            </div>
            {RESUME_PDF_PATH && (
              <a
                href={RESUME_PDF_PATH}
                download
                className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-ro-pink/20 bg-ro-surface px-4 py-2 text-sm font-medium text-ro-sec transition-colors hover:border-ro-pink/40 hover:text-ro-pri"
                aria-label="Download resume as PDF"
              >
                <Download size={14} aria-hidden="true" />
                Download CV
              </a>
            )}
          </div>

          <ol
            className="relative border-l border-ro-pink/15 pl-8 space-y-8"
            aria-label="Career timeline"
          >
            {experience.map((item, index) => (
              <li key={index} className="relative">
                <span
                  className="absolute -left-[1.125rem] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-ro-pink bg-ro-void"
                  aria-hidden="true"
                />
                <div className="rounded-xl border border-ro-pink/10 bg-ro-surface p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-ro-pri">{item.role}</h3>
                      <p className="mt-0.5 text-sm font-medium text-ro-pink">{item.company}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-ro-pink/10 bg-ro-card px-3 py-0.5 font-mono text-xs text-ro-muted">
                      {item.startDate} — {item.endDate}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2" role="list">
                    {item.bullets.map((bullet, bIndex) => (
                      <li
                        key={bIndex}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-ro-sec"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ro-pink/50"
                          aria-hidden="true"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
