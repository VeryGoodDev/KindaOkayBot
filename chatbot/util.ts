/**
 * Small helper to make code more readable/searchable anywhere that checks whether a chat should be parsed as a command.
 */
export const isCommand = (message: string): boolean => message.startsWith(`!`)

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

/**
 * Returns a random integer between `min` and `max`, excluding `max`. Pass `true` as a third argument to make it inclusive, i.e. able to have a chance to return `max`. Caveats:
 * - if `min` is greater than `max`, a `RangeError` will be thrown
 * - if either `min` or `max` is not an integer, a `TypeError` will be thrown
 */
export const randomFromRange = (min: number, max: number, inclusive = false): number => {
  if (min > max) {
    throw new RangeError(`The min value must always be larger than the max value`)
  }
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new TypeError(`The min and max values must both be integers`)
  }
  return min + Math.floor(Math.random() * (max - min + (inclusive ? 1 : 0)))
}

/** Returns a pseudo-randomly chosen item from the provided array of options */
export const chooseRandom = <T>(options: T[]): T => {
  const index = randomFromRange(0, options.length)
  return options[index]
}
