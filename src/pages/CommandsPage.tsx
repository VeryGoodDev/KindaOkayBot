import { css } from '@emotion/css'

import {
  staticCommands,
  lurkCommands,
  simpleDynamicCommands,
  quoteCommands,
  twitchApiCommands,
  commandAliases,
} from '../../chatbot/commands'

import type { CommandMap, Command, CommandData } from '../../chatbot/commands'

interface CommandTableEntry {
  aliases: Command[]
  command: Command
  description: CommandData['description']
}

const allCommands: CommandMap = {
  ...staticCommands,
  ...lurkCommands,
  ...simpleDynamicCommands,
  ...quoteCommands,
  ...twitchApiCommands,
}

const aliasMap = (() => {
  const map: Record<Command, Command[]> = {}
  for (const [alias, command] of Object.entries(commandAliases) as Array<[Command, Command]>) {
    if (!(command in map)) {
      map[command] = []
    }
    map[command].push(alias)
  }
  return map
})()

const entries = Object.entries(allCommands) as Array<[Command, CommandData]>
const commandList = entries.reduce<CommandTableEntry[]>((list, [command, { description }]) => {
  const aliases = command in aliasMap ? aliasMap[command] : []
  const entry: CommandTableEntry = {
    aliases,
    command,
    description,
  }
  return [...list, entry]
}, [])

const placeholderCss = css`
  display: grid;
  font-size: 1.25rem;
  padding-block-start: 16px;
  place-items: center;
`

const CommandsPage = () => {
  console.log(commandList)
  return <div class={placeholderCss}>Command list coming soon</div>
}

export default CommandsPage
