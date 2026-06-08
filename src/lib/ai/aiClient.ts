import { isAiConfigured, aiApiKey, aiProvider, aiModel } from './aiConfig'

interface CompletionOptions {
  maxTokens?: number
  temperature?: number
}

async function completeOpenAi(
  prompt: string,
  opts: CompletionOptions,
): Promise<string> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${aiApiKey}`,
    },
    body: JSON.stringify({
      model: aiModel,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: opts.maxTokens ?? 1024,
      temperature: opts.temperature ?? 0.7,
    }),
  })

  if (!res.ok) {
    if (res.status === 429) throw new Error('RATE_LIMITED')
    throw new Error(`AI_ERROR_${res.status}`)
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content?.trim() ?? ''
}

async function completeAnthropic(
  prompt: string,
  opts: CompletionOptions,
): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': aiApiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: aiModel || 'claude-sonnet-4-6',
      max_tokens: opts.maxTokens ?? 1024,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) {
    if (res.status === 429) throw new Error('RATE_LIMITED')
    throw new Error(`AI_ERROR_${res.status}`)
  }

  const data = await res.json()
  return data.content?.[0]?.text?.trim() ?? ''
}

async function completeOllama(
  prompt: string,
  opts: CompletionOptions,
): Promise<string> {
  const baseUrl = import.meta.env.VITE_OLLAMA_URL || 'http://localhost:11434'
  const res = await fetch(`${baseUrl}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: aiModel || 'llama3',
      prompt,
      stream: false,
      options: {
        num_predict: opts.maxTokens ?? 1024,
        temperature: opts.temperature ?? 0.7,
      },
    }),
  })

  if (!res.ok) throw new Error(`AI_ERROR_${res.status}`)

  const data = await res.json()
  return data.response?.trim() ?? ''
}

export async function aiComplete(
  prompt: string,
  opts: CompletionOptions = {},
): Promise<string> {
  if (!isAiConfigured) {
    throw new Error('AI_NOT_CONFIGURED')
  }

  switch (aiProvider) {
    case 'anthropic':
      return completeAnthropic(prompt, opts)
    case 'ollama':
      return completeOllama(prompt, opts)
    default:
      return completeOpenAi(prompt, opts)
  }
}
