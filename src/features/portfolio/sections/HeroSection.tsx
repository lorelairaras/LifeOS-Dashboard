import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react'
import { buttonBaseClasses, buttonVariantClasses, buttonSizeClasses } from '@/components/button.utils'

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen items-center justify-center overflow-hidden ro-grid-bg"
    >
      {/* Ambient glow behind the panel */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ro-pink/6 blur-[80px]" />
        <div className="absolute right-[15%] top-[25%] h-48 w-48 rounded-full bg-ro-oracle/5 blur-[60px]" />
      </div>

      <div className="relative mx-auto w-full max-w-4xl px-4 py-28 sm:px-6 lg:px-8">
        {/* OS dashboard panel */}
        <div className="ro-card overflow-hidden">
          {/* Panel header bar */}
          <div className="flex items-center justify-between border-b border-ro-pink/10 bg-ro-surface px-5 py-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-ro-danger/60" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-ro-gold/60" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-ro-success/60" aria-hidden="true" />
              </div>
              <span className="ml-2 font-mono text-[10px] text-ro-muted">lifeos.portfolio — command</span>
            </div>
            <span className="flex items-center gap-1.5 rounded-full border border-ro-success/30 bg-ro-success/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-ro-success">
              <span className="h-1.5 w-1.5 rounded-full bg-ro-success animate-glow-pulse" aria-hidden="true" />
              System Online
            </span>
          </div>

          {/* Panel body */}
          <div className="px-8 py-12 sm:px-12">
            {/* Eyebrow */}
            <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ro-pink/70">
              Frontend Developer · Business Analyst · Product Thinker
            </p>

            {/* Name */}
            <h1 id="hero-heading" className="font-display text-5xl font-bold tracking-tight text-ro-pri sm:text-6xl lg:text-7xl">
              Hi, I&rsquo;m{' '}
              <span className="italic text-ro-pink">Rory</span>
            </h1>

            {/* Tagline */}
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ro-sec sm:text-lg">
              I design systems, build tools, and ship things that work — for myself and for users.
              This is my operating system. You&rsquo;re looking at the public interface.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#projects"
                className={[buttonBaseClasses, buttonVariantClasses.primary, buttonSizeClasses.lg].join(' ')}
              >
                View Projects
              </a>
              <a
                href="/dashboard"
                className={[buttonBaseClasses, buttonVariantClasses.ghost, buttonSizeClasses.lg, 'border border-ro-pink/25'].join(' ')}
              >
                Enter Dashboard →
              </a>
            </div>

            {/* Social links */}
            <div className="mt-8 flex items-center gap-1">
              <a
                href="https://github.com/lorelairaras"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-ro-muted transition-colors hover:bg-ro-card hover:text-ro-pri"
              >
                <Github size={16} aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com/in/[YOUR_USERNAME]"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-ro-muted transition-colors hover:bg-ro-card hover:text-ro-pri"
              >
                <Linkedin size={16} aria-hidden="true" />
              </a>
              <a
                href="mailto:lorelai.raras@edufied.edu.vn"
                aria-label="Send email"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-ro-muted transition-colors hover:bg-ro-card hover:text-ro-pri"
              >
                <Mail size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-10 flex justify-center">
          <a
            href="#about"
            aria-label="Scroll to about section"
            className="flex flex-col items-center gap-1.5 text-ro-muted transition-colors hover:text-ro-sec"
          >
            <span className="font-mono text-[9px] uppercase tracking-widest">Scroll</span>
            <ArrowDown size={16} className="animate-bounce" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
