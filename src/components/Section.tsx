interface SectionProps {
  id: string
  children: React.ReactNode
  className?: string
  'aria-labelledby'?: string
}

export default function Section({ id, children, className = '', 'aria-labelledby': labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy ?? `${id}-heading`}
      className={`py-16 sm:py-24 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
