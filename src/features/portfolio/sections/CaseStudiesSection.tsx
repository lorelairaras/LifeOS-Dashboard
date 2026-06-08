import Section from '@/components/Section'
import CaseStudyCard from '@/components/CaseStudyCard'
import { caseStudies } from '@/features/portfolio/data/portfolioData'

export default function CaseStudiesSection() {
  return (
    <Section id="case-studies">
      <h2 id="case-studies-heading" className="mb-4 text-3xl font-bold text-text-primary">
        Case Studies
      </h2>
      <p className="mb-10 text-text-secondary">
        Deep-dives into selected projects — the problem, the decisions, and what I learned.
      </p>
      <div className="flex flex-col gap-8">
        {caseStudies.map((cs) => (
          <CaseStudyCard key={cs.id} caseStudy={cs} />
        ))}
      </div>
    </Section>
  )
}
