import CaseStudyCard from '@/components/CaseStudyCard'
import { caseStudies } from '@/features/portfolio/data/portfolioData'

export default function CaseStudiesSection() {
  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ro-pink/50">
            Case Studies
          </span>
          <span className="h-px flex-1 bg-ro-pink/10" aria-hidden="true" />
        </div>

        <div className="ro-card p-8 sm:p-10">
          <h2 id="case-studies-heading" className="font-display mb-3 text-2xl font-bold text-ro-pri">
            Case Studies
          </h2>
          <p className="mb-8 text-sm text-ro-sec">
            Deep-dives into selected projects — the problem, the decisions, and what I learned.
          </p>

          <div className="flex flex-col gap-6">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.id} caseStudy={cs} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
