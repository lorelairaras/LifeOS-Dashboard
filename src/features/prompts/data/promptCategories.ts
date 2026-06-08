import type { PromptCategory } from '@/types'

export const CATEGORY_LABELS: Record<PromptCategory, string> = {
  frontend_development: 'Frontend Dev',
  qa_testing: 'QA Testing',
  documentation: 'Docs',
  business_analysis: 'Business Analysis',
  product_planning: 'Product',
  resume_cover_letter: 'Resume & CV',
  daily_planning: 'Daily Planning',
  other: 'Other',
}

export const CATEGORY_VARIANTS: Record<
  PromptCategory,
  'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple'
> = {
  frontend_development: 'info',
  qa_testing: 'purple',
  documentation: 'default',
  business_analysis: 'warning',
  product_planning: 'info',
  resume_cover_letter: 'success',
  daily_planning: 'warning',
  other: 'default',
}

export const CATEGORY_SELECT_OPTIONS = Object.entries(CATEGORY_LABELS).map(
  ([value, label]) => ({ value, label })
)
