import { css } from '@emotion/css'
import { useEffect, useState } from 'preact/hooks'

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

const tableCss = css`
  border-collapse: collapse;
  margin: auto;
  max-width: 1000px;
  width: 100%;

  th,
  td {
    padding: 0.5em 0.75em;
    text-align: left;
  }

  thead {
    /* TODO bg color */
  }

  tbody tr {
    &:nth-child(odd) {
      /* TODO */
    }

    &:nth-child(even) {
      /* TODO */
    }
  }
`

const sortCommandList = (list: CommandTableEntry[]): CommandTableEntry[] =>
  [...list].sort(({ command: commandA }, { command: commandB }) => {
    if (commandA < commandB) {
      return -1
    }
    if (commandA > commandB) {
      return 1
    }
    return 0
  })

const CommandsPage = () => {
  // TODO sort controls
  const [sortedList, setSortedList] = useState(commandList)

  useEffect(() => {
    setSortedList((prevList) => sortCommandList(prevList))
  }, [])

  return (
    <table class={tableCss}>
      <thead>
        <th>Command</th>
        <th>Info</th>
      </thead>
      <tbody>
        {sortedList.map((row) => (
          <tr key={row.command}>
            <td>{row.command}</td>
            <td>{row.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CommandsPage
