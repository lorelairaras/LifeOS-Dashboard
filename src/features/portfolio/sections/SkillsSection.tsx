import Section from '@/components/Section'
import SkillBadge from '@/components/SkillBadge'
import { skills, skillCategories } from '@/features/portfolio/data/portfolioData'

export default function SkillsSection() {
  return (
    <Section id="skills">
      <h2 id="skills-heading" className="mb-12 text-3xl font-bold text-text-primary">
        Skills
      </h2>
      <div className="space-y-10">
        {skillCategories.map((category) => (
          <div key={category}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              {category}
            </h3>
            <ul className="flex flex-wrap gap-2" role="list" aria-label={`${category} skills`}>
              {skills
                .filter((s) => s.category === category)
                .map((skill) => (
                  <SkillBadge key={skill.name} name={skill.name} />
                ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
