import SkillBadge from '@/components/SkillBadge'
import { skills, skillCategories } from '@/features/portfolio/data/portfolioData'

export default function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ro-pink/50">
            Skills Matrix
          </span>
          <span className="h-px flex-1 bg-ro-pink/10" aria-hidden="true" />
        </div>

        <div className="ro-card p-8 sm:p-10">
          <h2 id="skills-heading" className="font-display mb-8 text-2xl font-bold text-ro-pri">
            Skills
          </h2>

          <div className="space-y-8">
            {skillCategories.map((category) => (
              <div key={category}>
                <h3 className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-ro-pink/70">
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
        </div>
      </div>
    </section>
  )
}
