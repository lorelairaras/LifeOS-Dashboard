import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import { buttonBaseClasses, buttonVariantClasses, buttonSizeClasses } from '@/components/button.utils'

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      {/* Decorative floating shapes — CSS-only 3D */}
      <div className="pointer-events-none absolute inset-0 motion-reduce:hidden" aria-hidden="true">
        <div className="absolute left-[10%] top-[20%] h-16 w-16 animate-float rounded-full bg-accent/5 blur-sm" />
        <div className="absolute right-[15%] top-[30%] h-24 w-24 animate-float-slow rounded-lg bg-accent/5 blur-sm" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[25%] left-[20%] h-12 w-12 animate-float rounded-full bg-accent/5 blur-sm" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[30%] right-[10%] h-20 w-20 animate-float-slow rounded-lg bg-accent/5 blur-sm" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
          Frontend Developer · Business Analyst · Product Thinker
        </p>

        {/* Name */}
        <h1
          id="hero-heading"
          className="font-display text-5xl font-bold tracking-tight text-text-primary sm:text-6xl lg:text-7xl"
        >
          Hi, I&rsquo;m{' '}
          <span className="text-accent italic">Rory</span>
        </h1>

        {/* Tagline */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary sm:text-xl">
          I design systems, build tools, and ship things that actually work — for myself and for
          users. This is my command center.
        </p>

        {/* CTA Buttons — use <a> directly with shared button classes */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#projects"
            className={[buttonBaseClasses, buttonVariantClasses.primary, buttonSizeClasses.lg].join(' ')}
          >
            View Projects
          </a>
          <a
            href="#contact"
            className={[
              buttonBaseClasses,
              buttonVariantClasses.ghost,
              buttonSizeClasses.lg,
              'border border-surface-600',
            ].join(' ')}
          >
            Get in Touch
          </a>
        </div>

        {/* Social links */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <a
            href="https://github.com/[YOUR_USERNAME]"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-text-muted transition-colors hover:text-text-primary"
          >
            <Github size={20} aria-hidden="true" />
          </a>
          <a
            href="https://linkedin.com/in/[YOUR_USERNAME]"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-text-muted transition-colors hover:text-text-primary"
          >
            <Linkedin size={20} aria-hidden="true" />
          </a>
          <a
            href="mailto:lorelai.raras@edufied.edu.vn"
            aria-label="Send email"
            className="text-text-muted transition-colors hover:text-text-primary"
          >
            <Mail size={20} aria-hidden="true" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <a
            href="#about"
            aria-label="Scroll to about section"
            className="text-text-muted transition-colors hover:text-text-primary animate-bounce"
          >
            <ArrowDown size={24} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
