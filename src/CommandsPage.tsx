import { css } from '@emotion/css'

import {
  staticCommands,
  lurkCommands,
  simpleDynamicCommands,
  quoteCommands,
  twitchApiCommands,
  commandAliases,
} from '../chatbot/commands'

import type { CommandMap } from '../chatbot/commands'

const allCommands: CommandMap = {
  ...staticCommands,
  ...lurkCommands,
  ...simpleDynamicCommands,
  ...quoteCommands,
  ...twitchApiCommands,
}

const placeholderCss = css`
  display: grid;
  font-size: 1.25rem;
  padding-block-start: 16px;
  place-items: center;
`

const CommandsPage = () => {
  console.log(allCommands)
  console.log(commandAliases)
  return <div class={placeholderCss}>Command list coming soon</div>
}

export default CommandsPage
