export const niceDate = () =>
  new Date().toLocaleDateString(`en`, {
    day: `2-digit`,
    hour: `2-digit`,
    hour12: false,
    minute: `2-digit`,
    month: `2-digit`,
  })

export const pluralize = (count, singular, plural = `${singular}s`) => (count === 1 ? singular : plural)
