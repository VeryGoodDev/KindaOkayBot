import { niceJson } from './util'

import type { Userstate } from 'tmi.js'

export const getUsername = (userState: Userstate): string => {
  if (typeof userState.username === `string`) {
    return userState.username.toLowerCase()
  }
  console.warn(`[chatbot/util] Couldn't find a username for the following user state:`)
  console.warn(niceJson(userState))
  return `<NO_NAME_FOUND>`
}

export const getDisplayName = (userState: Userstate): string => {
  if (typeof userState[`display-name`] === `string`) {
    return userState[`display-name`]
  }
  return getUsername(userState)
}
