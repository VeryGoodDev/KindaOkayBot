import commandMap, { PermissionLevels } from './commands'
import { getUsername } from './userHelpers'
import { isCommand } from './util'

import type { ClientHelpers } from './clientHandlers'
import type { Command, CommandData } from './commands'
import type { Userstate } from 'tmi.js'

interface CommandComponents {
  commandArgs: string[]
  commandName: Command
  originalCommand: string
}
interface ChatProcessingPeripherals {
  channel: string
  clientHelpers: ClientHelpers
  userState: Userstate
}

const parseCommand = (message: string): CommandComponents => {
  const [originalCommand, ...commandArgs] = message.trim().split(/\s+/)
  const commandName = originalCommand.toLowerCase() as Command
  return { commandArgs, commandName, originalCommand }
}

const userHasPermission = (command: CommandData, userState: Userstate): boolean => {
  if (command.restrictUsage === undefined || command.restrictUsage === PermissionLevels.ALL) {
    return true
  }

  switch (command.restrictUsage) {
    case PermissionLevels.MOD:
      return userState.mod === true
    case PermissionLevels.VIP:
      // TODO
      // return userState.badges?.vip === `vip`
      return false
    case PermissionLevels.USER_SET:
      // TODO
      return false
    default:
      return getUsername(userState) === `verygooddev`
  }
}

export const handleCommand = (
  message: string,
  { channel, clientHelpers, userState }: ChatProcessingPeripherals
): void => {
  if (!isCommand(message)) {
    return
  }
  const { commandName, commandArgs } = parseCommand(message)

  if (commandName in commandMap) {
    const command = commandMap[commandName]
    if (!userHasPermission(command, userState)) {
      return
    }
    const response = command.getResponse(userState, ...commandArgs)
    clientHelpers.sendInChat(channel, response)
  }
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
