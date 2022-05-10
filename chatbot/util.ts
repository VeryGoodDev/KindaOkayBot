/**
 * Returns the current date as a string in the format of `MM/DD, hh:mm`. The time will be in 24 hour format.
 */
export const niceDate = (): string =>
  new Date().toLocaleDateString(`en`, {
    day: `2-digit`,
    hour: `2-digit`,
    hour12: false,
    minute: `2-digit`,
    month: `2-digit`,
  })

/**
 * Shortcut to get a JSON string formatted in a more readable way.
 */
export const niceJson = (obj: unknown): string => JSON.stringify(obj, null, 2)

/**
 * Returns `singular` when `count` is 1, returns `plural` otherwise. If not provided, `plural` defaults to singular with an "s" at the end.
 */
export const pluralize = (count: number, singular: string, plural = `${singular}s`): string =>
  count === 1 ? singular : plural
