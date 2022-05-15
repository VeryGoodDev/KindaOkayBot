import commandMap, { commandAliases, PermissionLevels, ResponseTypes } from './commands'
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
  const commandNameLower = originalCommand.toLowerCase() as Command
  const commandName = commandNameLower in commandAliases ? commandAliases[commandNameLower] : commandNameLower
  return { commandArgs, commandName, originalCommand }
}

const userHasPermission = (command: CommandData, userState: Userstate): boolean => {
  if (command.restrictUsage === undefined || command.restrictUsage === PermissionLevels.ALL) {
    return true
  }

  const userIsDev = getUsername(userState) === `verygooddev`

  switch (command.restrictUsage) {
    case PermissionLevels.MOD:
      return userIsDev || userState.mod === true
    case PermissionLevels.VIP:
      // TODO
      // return userIsDev || userState.badges?.vip === `vip`
      return false
    case PermissionLevels.USER_SET:
      return command.permittedUsers.includes(getUsername(userState))
    default:
      return userIsDev
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
    if (command.responseMethod === ResponseTypes.WHISPER) {
      clientHelpers.whisper(getUsername(userState), response)
    } else {
      clientHelpers.sendInChat(channel, response)
    }
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
