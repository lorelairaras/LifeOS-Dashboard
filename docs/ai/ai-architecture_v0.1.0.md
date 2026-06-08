# AI Architecture — LifeOS Portfolio Dashboard

**Version:** v0.1.0
**Date:** 2026-06-08
**Author:** Rory
**Status:** Planning (Phase 16)

---

## Architecture Overview

The AI layer is a **client-side integration** that adds intelligence to existing dashboard features. No custom backend is required for MVP. API calls go directly from the browser to the AI provider.

```
[Dashboard UI] --> [useAI hook] --> [AI Service Layer] --> [AI Provider API]
                                         |
                                   [Prompt Templates]
```

---

## Component Architecture

### 1. AI Service Layer (`src/lib/ai/`)

| File | Purpose |
|---|---|
| `aiClient.ts` | Provider-agnostic API client. Handles request/response, error handling, rate limiting. |
| `aiConfig.ts` | Configuration: API key validation, provider selection, model parameters. |
| `promptTemplates.ts` | Prompt templates for each AI feature. Separates prompt engineering from UI logic. |

### 2. AI Hooks (`src/hooks/`)

| Hook | Feature | Input | Output |
|---|---|---|---|
| `usePromptImprover` | Prompt Improver | Prompt text | Improved text, loading, error |
| `useTaskSummary` | Weekly Summary | Task[] | Summary text, loading, error |
| `useJobNotes` | Job Notes | JobApplication | Notes text, loading, error |
| `useCoverLetter` | Cover Letter | JobApplication + skills | Letter text, loading, error |
| `useBudgetSummary` | Budget Summary | BudgetEntry[] + date range | Summary text, loading, error |
| `useNextSteps` | Next Steps | Tasks + Jobs + Projects | Suggestions[], loading, error |

Each hook follows the same pattern:
```typescript
function usePromptImprover() {
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const improve = async (promptText: string) => {
    if (!isAiConfigured) {
      setError('AI not configured. Add VITE_AI_API_KEY to .env.local')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const improved = await aiClient.complete(promptTemplates.improvePrompt(promptText))
      setResult(improved)
    } catch (e) {
      setError('Failed to improve prompt. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return { result, loading, error, improve, clear: () => setResult(null) }
}
```

### 3. AI UI Components (`src/features/ai/`)

| Component | Used In | Trigger |
|---|---|---|
| `PromptImproveButton` | PromptsPage | Click button on any prompt card |
| `PromptCompareModal` | PromptsPage | Opens after AI returns improved version |
| `TaskSummaryPanel` | DashboardHomePage | "Weekly Summary" button |
| `JobNotesPanel` | JobsPage | "Generate Notes" button on application card |
| `CoverLetterModal` | JobsPage | "Draft Cover Letter" button |
| `BudgetSummaryPanel` | BudgetPage | "Analyze" button |
| `NextStepsPanel` | DashboardHomePage | "Suggest Next Steps" button |
| `AiNotConfiguredBanner` | All AI components | Shown when API key missing |

---

## API Key Management

```
VITE_AI_API_KEY=sk-...        # AI provider API key
VITE_AI_PROVIDER=openai       # Provider: openai | anthropic | ollama
VITE_AI_MODEL=gpt-4o-mini     # Model to use
```

### Configuration Guard Pattern

```typescript
// src/lib/ai/aiConfig.ts
const apiKey = import.meta.env.VITE_AI_API_KEY as string | undefined
const provider = (import.meta.env.VITE_AI_PROVIDER as string) || 'openai'

export const isAiConfigured = Boolean(apiKey)
export const aiProvider = provider
export const aiModel = (import.meta.env.VITE_AI_MODEL as string) || 'gpt-4o-mini'
```

Same guard pattern as Supabase: when `isAiConfigured` is false, AI buttons show a tooltip explaining setup, and no API calls are attempted.

---

## Provider Abstraction

The AI service layer abstracts the provider so switching between OpenAI, Anthropic, or Ollama requires only changing environment variables:

```typescript
// src/lib/ai/aiClient.ts
interface AiClient {
  complete(prompt: string, options?: { maxTokens?: number; temperature?: number }): Promise<string>
}

function createOpenAiClient(apiKey: string, model: string): AiClient { ... }
function createAnthropicClient(apiKey: string, model: string): AiClient { ... }
function createOllamaClient(model: string): AiClient { ... }

export const aiClient: AiClient = isAiConfigured
  ? createClientForProvider(aiProvider, apiKey!, aiModel)
  : (null as unknown as AiClient)
```

---

## Prompt Template Strategy

All prompts live in `src/lib/ai/promptTemplates.ts` as pure functions:

```typescript
export const promptTemplates = {
  improvePrompt: (original: string) => `
You are a prompt engineering expert. Improve the following prompt for clarity,
specificity, and effectiveness. Preserve the original intent.

Original prompt:
${original}

Improved prompt:`,

  weeklyTaskSummary: (tasks: { title: string; done: boolean; dueDate?: string }[]) => `
Summarize this week's tasks in 3-5 sentences...`,

  // ... one function per feature
}
```

Benefits:
- Easy to iterate on prompts without touching UI code
- Testable in isolation
- Version-controlled

---

## Data Flow and Privacy

### What Gets Sent to the AI API

| Feature | Data Sent | Sensitive? | Mitigation |
|---|---|---|---|
| Prompt Improver | Prompt text only | Low | User explicitly triggers |
| Task Summary | Task titles and dates | Low | No personal identifiers |
| Job Notes | Company, role, status | Medium | User-provided, no secrets |
| Cover Letter | Company, role, user skills | Medium | Skills are public portfolio data |
| Budget Summary | Category names and amounts | High | See privacy section below |
| Next Steps | Task titles, job statuses | Medium | Aggregated, no raw details |

### Budget Data Privacy (AI-BS-004)

Budget data requires special handling per DPTM and privacy requirements:

1. Send only aggregated totals and category names — never individual transaction details
2. Strip any merchant names or account numbers before sending
3. Do not log API request bodies that contain budget data
4. Display a privacy notice before first budget AI analysis

---

## Error Handling Strategy

| Error Type | User-Facing Message | Action |
|---|---|---|
| API key not configured | "AI features require an API key. See Settings." | Show setup link |
| Rate limited (429) | "Too many requests. Please wait a moment." | Auto-retry after delay |
| Network error | "Unable to reach AI service. Check your connection." | Retry button |
| Invalid response | "Unexpected response. Please try again." | Retry button |
| Timeout (>15s) | "Request timed out. Please try again." | Retry button |

---

## Security Considerations

| Risk | Mitigation | Standard |
|---|---|---|
| API key exposure in client bundle | Key in env var, not committed. `.env.local` in `.gitignore`. | ISO 27001 A.9.4.2 |
| Prompt injection via user data | Sanitize user input before inserting into prompt templates | OWASP |
| Data leakage to AI provider | Document what data is sent per feature. Budget data aggregated. | DPTM |
| XSS via AI-generated content | Render AI output as plain text, never as HTML | OWASP |

**Note:** Client-side API keys are visible in browser DevTools. For production, consider a lightweight proxy (Vercel Edge Function or Supabase Edge Function) to hide the key. This is a post-MVP enhancement.

---

## Standards-Readiness Notes

- **ISO 27001 A.13.2.1:** External API integration documented with data classification per feature.
- **ISO 27001 A.14.2.5:** AI architecture separates concerns (service layer, hooks, UI components).
- **DPTM:** Data minimisation enforced — only necessary data sent to AI APIs. Budget data aggregated.
- **SOC 2 CC6.6:** AI features gated behind configuration check. No unauthorized API calls.
- **ISO 9001 8.5.1:** Architecture follows established patterns (same as Supabase integration).

---

## Changelog

| Version | Date | Change |
|---|---|---|
| v0.1.0 | 2026-06-08 | Initial AI architecture — service layer, hooks, components, privacy model |
