import HeroSection from '@/features/portfolio/sections/HeroSection'
import AboutSection from '@/features/portfolio/sections/AboutSection'
import SkillsSection from '@/features/portfolio/sections/SkillsSection'
import ProjectsSection from '@/features/portfolio/sections/ProjectsSection'
import CaseStudiesSection from '@/features/portfolio/sections/CaseStudiesSection'
import ResumeSection from '@/features/portfolio/sections/ResumeSection'
import ContactSection from '@/features/portfolio/sections/ContactSection'

export default function PortfolioPage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CaseStudiesSection />
      <ResumeSection />
      <ContactSection />

      <footer className="border-t border-ro-pink/10 py-8 text-center">
        <p className="font-mono text-xs text-ro-muted">
          Built with React, Vite, TypeScript &amp; Tailwind CSS &mdash;{' '}
          <a
            href="https://github.com/lorelairaras/LifeOS-Dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ro-pink/70 underline-offset-2 transition-colors hover:text-ro-pink hover:underline"
          >
            View Source on GitHub
          </a>
        </p>
      </footer>
    </>
  )
}
