import { niceJson } from './util'

import type { SubMethod, Userstate } from 'tmi.js'

export const getSubTier = (plan?: SubMethod): string => {
  switch (plan) {
    case `1000`:
      return `Tier-1`
    case `2000`:
      return `Tier-2`
    case `3000`:
      return `Tier-3`
    case `Prime`:
      return `Prime`
    default:
      return `Unknown tier`
  }
}

/**
 * Convenience helper for getting the user ID from a user state. Warns to the console if for some reason one doesn't exist.
 */
export const getUserId = (userState: Userstate): string => {
  if (typeof userState[`user-id`] === `string`) {
    return userState[`user-id`]
  }
  console.warn(`[chatbot/util] Couldn't find a user ID for the following user state:`)
  console.warn(niceJson(userState))
  return `<NO_ID_FOUND>`
}

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

export const getUserLogString = (userState: Userstate): string => {
  const username = getUsername(userState)
  const userId = getUserId(userState)
  return `${username} (user ID ${userId})`
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
