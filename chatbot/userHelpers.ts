import { niceJson } from './util'

import type { Userstate } from 'tmi.js'

/**
 * Gets the username from the provided user state. Guaranteed to always be lowercase, for convenience in comparisons etc.
 */
export const getUsername = (userState: Userstate): string => {
  if (typeof userState.username === `string`) {
    return userState.username.toLowerCase()
  }
  console.warn(`[chatbot/util] Couldn't find a username for the following user state:`)
  console.warn(niceJson(userState))
  return `<NO_NAME_FOUND>`
}

/**
 * Gets the user's defined display name (custom capitalization) if available, returns the username if not.
 */
export const getDisplayName = (userState: Userstate): string => {
  if (typeof userState[`display-name`] === `string`) {
    return userState[`display-name`]
  }
  return getUsername(userState)
}
