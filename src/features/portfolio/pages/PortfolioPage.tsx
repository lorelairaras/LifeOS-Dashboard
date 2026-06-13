import HeroSection from '@/features/portfolio/sections/HeroSection'
import WhatItDoesSection from '@/features/portfolio/sections/WhatItDoesSection'
import HowItHelpsSection from '@/features/portfolio/sections/HowItHelpsSection'
import ServicesSection from '@/features/portfolio/sections/ServicesSection'
import CaseStudiesSection from '@/features/portfolio/sections/CaseStudiesSection'
import AboutSection from '@/features/portfolio/sections/AboutSection'
import ContactSection from '@/features/portfolio/sections/ContactSection'

export default function PortfolioPage() {
  return (
    <>
      {/* Product-led landing: what LifeOS is, what it does, how it helps,
          services, flagship case study, why it exists, contact. */}
      <HeroSection />
      <WhatItDoesSection />
      <HowItHelpsSection />
      <ServicesSection />
      <CaseStudiesSection />
      <AboutSection />
      <ContactSection />

      <footer className="border-t border-ro-pink/10 py-8 text-center">
        <p className="font-mono text-xs text-ro-muted">
          LifeOS &mdash; built with React, Vite, TypeScript &amp; Tailwind CSS &mdash;{' '}
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
