import { css } from '@emotion/css'
import { useEffect, useState } from 'preact/hooks'

import {
  staticCommands,
  lurkCommands,
  simpleDynamicCommands,
  quoteCommands,
  twitchApiCommands,
  commandAliases,
  PermissionLevels,
} from '../../chatbot/commands'
import Badge from '../components/Badge'

import type { CommandMap, Command, CommandData, PublicPermissionLevels } from '../../chatbot/commands'

interface CommandTableEntry {
  aliases: Command[]
  allowedUsers: PublicPermissionLevels[]
  command: Command
  description: string
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
const commandList = entries.reduce<CommandTableEntry[]>((list, [command, { description, restrictUsage }]) => {
  const aliases = command in aliasMap ? aliasMap[command] : []
  const allowedUsers: PublicPermissionLevels[] = []
  if (Array.isArray(restrictUsage)) {
    allowedUsers.push(...restrictUsage)
  } else if (restrictUsage && restrictUsage !== PermissionLevels.USER_SET) {
    allowedUsers.push(restrictUsage)
  } else {
    allowedUsers.push(PermissionLevels.ALL)
  }
  const entry: CommandTableEntry = {
    aliases,
    allowedUsers,
    command,
    description,
  }
  return [...list, entry]
}, [])

const tableCss = css`
  border-collapse: collapse;
  margin: auto;
  max-width: 700px;
  width: 100%;

  th,
  td {
    padding: 16px;
    text-align: left;
  }

  thead {
    background-color: hsl(180, 5%, 2.5%);
    font-family: Righteous;
    font-size: larger;
    position: sticky;
    top: 0;
  }

  tbody tr {
    background-color: hsl(180, 93%, var(--row-lightness));

    &:nth-child(odd) {
      --row-lightness: 10%;
    }

    &:nth-child(even) {
      --row-lightness: 15%;
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

interface CommandInfoProps {
  commandData: CommandTableEntry
}
const infoBlockCss = css`
  display: grid;
  row-gap: 8px;

  code {
    background-color: hsl(180, 5%, 30%);
    border-radius: 4px;
    font-family: 'Source Code Pro', monospace;
    padding: 0px 4px 2px;
  }
`
const badgeGroupCss = css`
  column-gap: 8px;
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
`
const CommandInfo = ({ commandData }: CommandInfoProps) => {
  const aliasJsx =
    commandData.aliases.length > 0 ? (
      <div>
        <i>Aliases:</i>
        {` `}
        <code>{commandData.aliases.join(`, `)}</code>
      </div>
    ) : null
  return (
    <div class={infoBlockCss}>
      <div class={badgeGroupCss}>
        {commandData.allowedUsers.map((group) => (
          <Badge key={group} group={group} />
        ))}
      </div>
      {/* TODO eventually separate usage field and render separately */}
      <div
        // eslint-disable-next-line react/no-danger -- Needed to actually use code tag inline
        dangerouslySetInnerHTML={{
          __html: commandData.description.replace(/`(?<command>.+?)`/g, `<code>$<command></code>`),
        }}
      />
      {aliasJsx}
    </div>
  )
}

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
            <td>
              <CommandInfo commandData={row} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CommandsPage
