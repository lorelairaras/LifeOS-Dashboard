const apiKey = import.meta.env.VITE_AI_API_KEY as string | undefined
const provider = (import.meta.env.VITE_AI_PROVIDER as string) || 'openai'
const model = (import.meta.env.VITE_AI_MODEL as string) || 'gpt-4o-mini'

export const isAiConfigured = Boolean(apiKey)
export const aiApiKey = apiKey ?? ''
export const aiProvider = provider
export const aiModel = model
