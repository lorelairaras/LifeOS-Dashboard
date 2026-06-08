export const promptTemplates = {
  improvePrompt: (original: string) =>
    `You are a prompt engineering expert. Improve the following prompt for clarity, specificity, and effectiveness. Preserve the original intent and context. Return only the improved prompt text, nothing else.

Original prompt:
${original}

Improved prompt:`,
}
