/* eslint-disable @typescript-eslint/naming-convention -- Keys in commandMap specifically don't follow this rule */
import type { Userstate } from 'tmi.js'

type Command = `!${string}`
interface CommandData {
  description: string
  getResponse: (userState: Userstate, ...args: string[]) => string
}

const commandMap: Record<Command, CommandData> = {
  '!bot': {
    description: `Provides a little info about KindaOkayBot`,
    getResponse() {
      return `Dev decided to write his own bot. Still a work in progress. Bugs happening during stream always a distinct possibility. Written in TypeScript for NodeJS`
    },
  },
  '!bytes': {
    description: `Provides a little info about Dev's channel points`,
    getResponse() {
      return `Dev's channel points are called bytes. There aren't a lot of custom ones right now, so if you have any cool ideas, feel free to share in chat for Dev to consider!`
    },
  },
  '!commands': {
    description: `Provides a link to a webpage that lists all commands supported by KindaOkayBot`,
    getResponse() {
      return `Coming soon (feel free to ask Dev if you're looking for anything specific)`
    },
  },
  '!discord': {
    description: `Provides an invite link for Dev's Discord server`,
    getResponse() {
      return `https://discord.gg/XqSQaC3`
    },
  },
}

export default commandMap
export type { Command, CommandData }
