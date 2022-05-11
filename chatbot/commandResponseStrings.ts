export const customizeResponse = (template: string, customizations: Record<string, string>): string => {
  let customized = template
  for (const [placeholder, value] of Object.entries(customizations)) {
    customized = customized.replace(`{{${placeholder}}}`, value)
  }
  return customized.trim()
}

export const INTERACTION = `{{displayName}} gave {{interaction}} to {{recipient}} {{emote}}`
