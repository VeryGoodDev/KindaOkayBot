import { getUsername } from './userHelpers'
import { isCommand } from './util'

import type { ClientHelpers } from './clientHandlers'
import type { Userstate } from 'tmi.js'

interface CommandComponents {
  command: string
  commandArgs: string[]
  originalCommand: string
}
interface ChatProcessingPeripherals {
  channel: string
  clientHelpers: ClientHelpers
  userState: Userstate
}

const parseCommand = (message: string): CommandComponents => {
  const [originalCommand, ...commandArgs] = message.trim().split(/\s+/)
  const command = originalCommand.toLowerCase()
  return { command, commandArgs, originalCommand }
}

export const handleCommand = (
  message: string,
  { channel, clientHelpers, userState }: ChatProcessingPeripherals
): void => {
  if (!isCommand(message)) {
    return
  }
  const { command, commandArgs } = parseCommand(message)
  console.log(
    `command "${command}" run by ${getUsername(userState)} with ${commandArgs.length} ${
      commandArgs.length === 1 ? `arg` : `args`
    }`
  )
  clientHelpers.sendInChat(channel, `nice command`)
}

/**
 * Returns a boolean indicating whether any moderation was performed that should prevent the message from being processed further.
 */
export const handleModeration = (message: string, userState: Userstate): boolean => {
  console.log(`moderating ${message} from ${getUsername(userState)}`)
  return false
}

export const handleSpecialProcessing = (
  message: string
  // { channel, clientHelpers }: ChatProcessingPeripherals
): void => {
  console.log(`potentially handling "${message}"`)
}

export const handleUserGreet = (userState: Userstate): void => {
  // TODO
  console.log(`Potentially greeting ${getUsername(userState)}`)
}
