import { Mail, Github, Linkedin } from 'lucide-react'
import Section from '@/components/Section'
import ContactCard from '@/components/ContactCard'

const contactLinks = [
  { icon: Mail, label: 'Email', value: 'lorelai.raras@edufied.edu.vn', href: 'mailto:lorelai.raras@edufied.edu.vn', external: false },
  { icon: Github, label: 'GitHub', value: 'github.com/[YOUR_USERNAME]', href: 'https://github.com/[YOUR_USERNAME]', external: true },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/[YOUR_USERNAME]', href: 'https://linkedin.com/in/[YOUR_USERNAME]', external: true },
]

export default function ContactSection() {
  return (
    <Section id="contact" className="bg-surface-800/30">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="contact-heading" className="mb-4 text-3xl font-bold text-text-primary">
          Get in Touch
        </h2>
        <p className="mb-10 text-text-secondary">
          Open to frontend and product-adjacent roles, freelance projects, and interesting conversations.
        </p>
        <ul className="flex flex-col gap-3 sm:flex-row sm:justify-center" role="list">
          {contactLinks.map((link) => (
            <li key={link.label} className="flex-1 sm:max-w-xs">
              <ContactCard {...link} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
