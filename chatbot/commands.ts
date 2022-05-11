/* eslint-disable @typescript-eslint/naming-convention -- Keys in commandMap specifically don't follow this rule */
import { customizeResponse, INTERACTION } from './commandResponseStrings'
import { getDisplayName } from './userHelpers'
import { chooseRandom, getCommaSeparatedList } from './util'

import type { Userstate } from 'tmi.js'

type Command = `!${string}`
interface CommandData {
  description: string
  getResponse: (userState: Userstate, ...args: string[]) => string
}
type CommandMap = Record<Command, CommandData>

const staticCommands: CommandMap = {
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
  '!schedule': {
    description: `Provides info about Dev's streaming schedule`,
    getResponse() {
      return chooseRandom([
        `Schedule lmao LUL`,
        `3-4 times a week for several months, then once every seven months for a year and a half`,
        `There are currently no set days or times that Dev consistently streams, but he hopes to do 1-2 a week for the time being`,
      ])
    },
  },
  '!twitter': {
    description: `Provides a link to Dev's Twitter account and some mild sass towards the person who has the username Dev wanted`,
    getResponse() {
      return `https://twitter.com/_verygooddev (the username without an underscore was already taken by someone who hasn't even tweeted since 2011 :/)`
    },
  },
}

const simpleDynamicCommands: CommandMap = {
  '!creepylurk': {
    description: `Use to declare your intent to lurk in the creepiest way possible`,
    getResponse(userState) {
      const displayName = getDisplayName(userState)
      return `${displayName} is lurking. Not like a normal lurk though, no no no. Instead, ${displayName} is up in a tree, hiding behind the branches and leaves, and watching from the distance through binoculars while chuckling quietly at their frankly disturbing lurking behavior. Thanks for the lurk?`
    },
  },
  '!drivelurk': {
    description: `Use to declare your intent to lurk while you're driving`,
    getResponse(userState) {
      const displayName = getDisplayName(userState)
      return `${displayName} has to drive somewhere, but is keeping the stream up as a lurker. KEEP YOUR EYES ON THE GODDAMN ROAD ${displayName.toUpperCase()}!!! (and thanks for the lurk)`
    },
  },
  '!gamelurk': {
    description: `Use to declare your intent to lurk while playing a game. You can optionally specify the game you're going to play if you want, e.g. \`!gamelurk stardew valley\``,
    getResponse(userState, ...args) {
      const game = args.length > 0 ? args.join(` `) : `a super dope game`
      return `${getDisplayName(
        userState
      )} wants to chill in the stream, but they also want to play ${game}. Both? Yeah, both is good. Have fun with your game, and thanks for the lurk!`
    },
  },
  '!grouphug': {
    description: `Use to give a virtual group hug to everyone in chat`,
    getResponse(userState) {
      return `${getDisplayName(userState)} gave a big ol group hug to the entire chat! <3`
    },
  },
  '!highfive': {
    description: `Use to give a high five to one or more people in chat`,
    getResponse(userState, ...recipients) {
      const recipient = recipients.length > 0 ? getCommaSeparatedList(recipients) : `a random person in chat`
      return customizeResponse(INTERACTION, {
        displayName: getDisplayName(userState),
        emote: `:D`,
        interaction: `a perfect high five`,
        recipient,
      })
    },
  },
  '!hug': {
    description: `Use to give a virtual hug to one or more people in chat`,
    getResponse(userState, ...recipients) {
      // TODO hug strength/judgment (at least for one recipient, maybe can do for multiple)
      const recipient = recipients.length > 0 ? getCommaSeparatedList(recipients) : `a random person in chat`
      return customizeResponse(INTERACTION, {
        displayName: getDisplayName(userState),
        emote: `<3`,
        interaction: `a hug`,
        recipient,
      })
    },
  },
}

const commandMap: CommandMap = {
  ...staticCommands,
  ...simpleDynamicCommands,
}

export default commandMap
export type { Command, CommandData }
