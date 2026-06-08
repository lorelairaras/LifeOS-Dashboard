import { useState, useCallback } from 'react'
import { isAiConfigured } from '@/lib/ai/aiConfig'
import { aiComplete } from '@/lib/ai/aiClient'
import { promptTemplates } from '@/lib/ai/promptTemplates'

export function usePromptImprover() {
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const improve = useCallback(async (promptText: string) => {
    if (!isAiConfigured) {
      setError('AI not configured. Add VITE_AI_API_KEY to .env.local to enable AI features.')
      return
    }
    if (!promptText.trim()) {
      setError('Prompt text is empty.')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const improved = await aiComplete(promptTemplates.improvePrompt(promptText))
      setResult(improved)
    } catch (e) {
      const msg = e instanceof Error ? e.message : ''
      if (msg === 'RATE_LIMITED') {
        setError('Too many requests. Please wait a moment and try again.')
      } else {
        setError('Failed to improve prompt. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const clear = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return { result, loading, error, improve, clear }
}
