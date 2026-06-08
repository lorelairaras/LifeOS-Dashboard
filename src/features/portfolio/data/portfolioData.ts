import type { SkillTag, PortfolioProject, CaseStudy, ExperienceItem } from '@/types'

export const skills: SkillTag[] = [
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Vite', category: 'Frontend' },
  { name: 'React Router', category: 'Frontend' },
  { name: 'HTML5 / CSS3', category: 'Frontend' },
  { name: 'Git / GitHub', category: 'Tools & Platform' },
  { name: 'Playwright', category: 'Tools & Platform' },
  { name: 'Vitest', category: 'Tools & Platform' },
  { name: 'ESLint / Prettier', category: 'Tools & Platform' },
  { name: 'Vercel', category: 'Tools & Platform' },
  { name: 'Business Analysis', category: 'Business & Product' },
  { name: 'Product Thinking', category: 'Business & Product' },
  { name: 'Requirements Writing', category: 'Business & Product' },
  { name: 'QA Planning', category: 'Business & Product' },
  { name: 'Documentation', category: 'Business & Product' },
  { name: 'AI Workflow', category: 'Business & Product' },
]

export const projects: PortfolioProject[] = [
  {
    id: 'lifeos',
    title: 'LifeOS Portfolio Dashboard',
    description: 'A personal operating system — public portfolio and private productivity dashboard in one React application. Built with Vite, TypeScript, and Tailwind CSS. Includes task tracking, prompt library, job tracker, budget tracker, and projects.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Playwright'],
    githubUrl: 'https://github.com/[YOUR_USERNAME]/lifeos-portfolio',
    liveDemoUrl: '#',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Your Second Project',
    description: 'Replace this with a real project description. Explain what problem it solves, who it helps, and what makes it interesting.',
    techStack: ['React', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/[YOUR_USERNAME]/project-two',
  },
]

export const caseStudies: CaseStudy[] = [
  {
    id: 'lifeos-case-study',
    title: 'LifeOS — Building a Personal Operating System',
    summary: 'A portfolio site that is also a daily-use productivity dashboard.',
    problem: 'Most developer portfolios go stale quickly because they serve only a passive showcase purpose. A portfolio with no daily utility gets no daily maintenance.',
    solution: 'Combine the public portfolio with a private productivity dashboard so the system earns daily use and stays current.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Playwright', 'Vercel'],
    highlights: [
      'Documented 32 artefacts before writing a single line of code — requirements, architecture, data models, and QA plans.',
      'TypeScript strict mode with zero lint warnings from day one.',
      'Lazy-loaded dashboard routes to keep the portfolio bundle lean.',
      'Playwright E2E tests covering portfolio smoke, mobile responsiveness, and dashboard navigation.',
    ],
    githubUrl: 'https://github.com/[YOUR_USERNAME]/lifeos-portfolio',
    liveDemoUrl: '#',
    featured: true,
  },
  {
    id: 'case-study-2',
    title: 'Your Second Case Study',
    summary: 'Replace this with a real project you want to write about in depth.',
    problem: 'Describe the real problem this project solved. Who had the problem? What was broken or missing?',
    solution: 'Explain your approach. What decisions did you make? What trade-offs did you consider?',
    techStack: ['Replace', 'with', 'real', 'stack'],
    highlights: [
      'Replace with a key outcome or decision from the project.',
      'Quantify where possible.',
    ],
  },
]

export const experience: ExperienceItem[] = [
  {
    role: 'Your Current Role',
    company: 'Your Company',
    startDate: 'Jan 2024',
    endDate: 'Present',
    bullets: [
      'Replace with real responsibilities using strong action verbs',
      'Include measurable outcomes where possible',
    ],
  },
  {
    role: 'Previous Role',
    company: 'Previous Company',
    startDate: 'Jun 2021',
    endDate: 'Dec 2023',
    bullets: [
      'Describe key responsibilities and achievements',
      'Quantify impact where possible',
    ],
  },
]

export const skillCategories = [...new Set(skills.map((s) => s.category))]
