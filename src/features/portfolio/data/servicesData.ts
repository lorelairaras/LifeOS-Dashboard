import {
  Code2,
  Database,
  PenTool,
  LayoutDashboard,
  Headset,
  Bot,
  ClipboardCheck,
  Workflow,
} from 'lucide-react'
import type { Service } from '@/types'

// ============================================================
// Services offered. Rendered from data by ServicesSection.
// To add/edit/remove a service, change this array only — the
// layout adapts automatically. Keep benefit lines outcome-led.
// ============================================================

export const services: Service[] = [
  {
    id: 'web-development',
    tag: 'Build',
    title: 'Web Development',
    benefit: 'Fast, responsive, search-friendly websites that load quickly and convert.',
    capabilities: [
      'React, Next.js, and modern TypeScript front ends',
      'Responsive layouts that work from phone to desktop',
      'SEO-aware structure, performance budgets, and clean Lighthouse scores',
      'Deployed and live on Vercel with preview URLs per change',
    ],
    icon: Code2,
    featured: true,
  },
  {
    id: 'system-development',
    tag: 'Build',
    title: 'System Development',
    benefit: 'Database-driven panels and internal tools that make your operations efficient.',
    capabilities: [
      'Custom admin panels, dashboards, and information-management systems',
      'Role-based access and data-layer security, not just hidden buttons',
      'Reporting and exports your team can actually use',
      'Built on free-tier-friendly stacks (Supabase, Postgres) where possible',
    ],
    icon: Database,
  },
  {
    id: 'graphic-design',
    tag: 'Design',
    title: 'Graphic Design',
    benefit: 'A cohesive visual identity that makes your brand look intentional.',
    capabilities: [
      'Logos, layout packages, and vector assets',
      'Social media kits and content templates',
      'Consistent type, colour, and spacing systems',
      'Source files handed over, not locked away',
    ],
    icon: PenTool,
  },
  {
    id: 'ui-ux-design',
    tag: 'Design',
    title: 'UI / UX Design',
    benefit: 'Interfaces that are easy to use because the journey was mapped before the pixels.',
    capabilities: [
      'User flows and journey maps that expose friction early',
      'High-fidelity wireframes and prototypes in Figma',
      'Accessible-by-default colour, contrast, and focus states (WCAG 2.1 AA)',
      'Developer-ready handoff specs (tokens, states, breakpoints)',
    ],
    icon: LayoutDashboard,
  },
  {
    id: 'virtual-assistance',
    tag: 'Support',
    title: 'Virtual Assistance',
    benefit: 'Reliable hands for the digital upkeep that quietly eats your week.',
    capabilities: [
      'Data entry, content publishing, and workspace upkeep',
      'Light server and account management',
      'Document and file organisation with sensible naming',
      'Clear status updates so nothing falls through the cracks',
    ],
    icon: Headset,
  },
  {
    id: 'chatbots-ai',
    tag: 'AI',
    title: 'Chatbots & AI Assistants',
    benefit: 'Answer common questions, capture leads, and deflect support — around the clock.',
    capabilities: [
      'FAQ and support bots that deflect repetitive tickets',
      'Lead-capture and booking assistants for your site',
      'Retrieval (RAG) bots that answer from your own docs',
      'Embed on web, or connect to messaging channels',
    ],
    icon: Bot,
    note: 'Scoped to free / low-cost tiers first (e.g. open models or generous free API quotas). Anything needing paid API volume is agreed with you up front — no surprise bills.',
    featured: true,
  },
  {
    id: 'business-analysis',
    tag: 'Analysis',
    title: 'Business Systems Analysis',
    benefit: 'Turn a vague idea into a spec engineers can build and QA can test — without rework.',
    capabilities: [
      'Functional specifications (Confluence-ready, BSA standard)',
      'User stories, acceptance criteria, and Given/When/Then test cases',
      'Process maps, RACI, and SOPs that capture how work really happens',
      'Standards-readiness checks (ISO 9001, ISO 27001, DPTM, SOC 2)',
    ],
    icon: ClipboardCheck,
    featured: true,
  },
  {
    id: 'automation-integrations',
    tag: 'Automation',
    title: 'Automation & Integrations',
    benefit: 'Connect your tools and let the boring, repeatable steps run themselves.',
    capabilities: [
      'API integrations between the apps you already use',
      'Workflow automation for repetitive manual steps',
      'Vercel deployment pipelines with preview + production environments',
      'Lightweight data dashboards from your existing sources',
    ],
    icon: Workflow,
    note: 'Built on free-tier services and your existing accounts wherever possible; any paid connector is flagged and approved before use.',
  },
]
