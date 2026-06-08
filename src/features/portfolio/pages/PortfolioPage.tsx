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
      <footer className="border-t border-surface-700/50 py-8 text-center">
        <p className="text-sm text-text-muted">
          Built with React, Vite, TypeScript &amp; Tailwind CSS &mdash;{' '}
          <a href="https://github.com/[YOUR_USERNAME]/lifeos-portfolio" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            View Source on GitHub
          </a>
        </p>
      </footer>
    </>
  )
}
