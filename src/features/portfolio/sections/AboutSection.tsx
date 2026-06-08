import Section from '@/components/Section'

export default function AboutSection() {
  return (
    <Section id="about" className="bg-surface-800/30">
      <div className="mx-auto max-w-3xl">
        <h2
          id="about-heading"
          className="mb-8 text-3xl font-bold text-text-primary"
        >
          About Me
        </h2>

        <div className="space-y-5 text-text-secondary leading-relaxed">
          <p>
            I&rsquo;m a frontend developer and business analyst with a focus on building tools that
            are well-documented, properly tested, and genuinely useful. I care as much about the
            requirements document and the QA plan as I do about the component tree.
          </p>

          <p>
            My background spans frontend development with React and TypeScript, business systems
            analysis, requirements engineering, and product thinking. I like working in the space
            where product and engineering meet — where a good question asked early saves two weeks
            of rework later.
          </p>

          <p>
            This portfolio is itself a working project. The docs folder has the same level of care
            as the code: architecture decisions are recorded, requirements have IDs, and nothing is
            marked as done until the tests confirm it. I built it that way because I think the
            process is as worth showing as the output.
          </p>

          <p>
            When I&rsquo;m not building things, I&rsquo;m reading about systems thinking, product
            strategy, and how teams make decisions under uncertainty.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { label: 'Focus', value: 'Frontend + Product' },
            { label: 'Location', value: 'Vietnam 🇻🇳' },
            { label: 'Available', value: 'Open to roles' },
          ].map((item) => (
            <div key={item.label} className="rounded-lg bg-surface-800 p-4">
              <dt className="text-xs font-medium uppercase tracking-wider text-text-muted">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm font-semibold text-text-primary">{item.value}</dd>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
