/* eslint-disable max-params -- I don't control how many params TMI event handlers can take */
import { handleCommand, handleModeration, handleSpecialProcessing, handleUserGreet } from './chatHelpers'
import { getDisplayName } from './userHelpers'
import { isCommand, niceJson, pluralize } from './util'

import type {
  AnonSubGiftUpgradeUserstate,
  ChatUserstate,
  Events,
  SubGiftUpgradeUserstate,
  SubGiftUserstate,
  SubMethods,
  SubMysteryGiftUserstate,
  SubUserstate,
  Userstate,
} from 'tmi.js'

type HandlerMap<EventMap> = {
  [EventType in keyof EventMap]: (clientHelpers: ClientHelpers) => EventMap[EventType]
}
interface ClientHelpers {
  sendInChat: (channel: string, message: string) => void
  whisper: (username: string, message: string) => void
}

const handlers: Partial<HandlerMap<Events>> = {
  // TODO
  action({ sendInChat }) {
    return (channel: string, userState: Userstate, message: string, isSelf: boolean) => {
      const args = niceJson({
        channel,
        isSelf,
        message,
        sendInChat,
        userState,
      })
      console.log(`action event received with args: ${args}`)
    }
  },
  // TODO
  anongiftpaidupgrade({ sendInChat }) {
    return (channel: string, username: string, userState: AnonSubGiftUpgradeUserstate) => {
      const args = niceJson({
        channel,
        sendInChat,
        username,
        userState,
      })
      console.log(`anongiftpaidupgrade event received with args: ${args}`)
    }
  },
  // TODO
  chat(clientHelpers) {
    return (channel: string, userState: ChatUserstate, message: string, isSelf: boolean) => {
      // TODO Add logging (datetime, username, message)
      const messageIsCommand = isCommand(message)

      // Do nothing for bot messages, unless the bot is running a command
      if (isSelf && !messageIsCommand) {
        return
      }

      const shouldStopProcessing = handleModeration(message, userState)
      if (shouldStopProcessing) {
        return
      }

      handleUserGreet(userState)

      if (messageIsCommand) {
        handleCommand(message, { channel, clientHelpers, userState })
      } else {
        handleSpecialProcessing(message)
      }
    }
  },
  // TODO
  cheer({ sendInChat }) {
    return (channel: string, userState: ChatUserstate, message: string) => {
      const args = niceJson({
        channel,
        message,
        sendInChat,
        userState,
      })
      console.log(`cheer event received with args: ${args}`)
    }
  },
  // TODO
  disconnected({ sendInChat }) {
    return (reason: string) => {
      const args = niceJson({
        reason,
        sendInChat,
      })
      console.log(`disconnected event received with args: ${args}`)
    }
  },
  // TODO
  giftpaidupgrade({ sendInChat }) {
    return (channel: string, username: string, sender: string, userState: SubGiftUpgradeUserstate) => {
      const args = niceJson({
        channel,
        sender,
        sendInChat,
        username,
        userState,
      })
      console.log(`giftpaidupgrade event received with args: ${args}`)

      sendInChat(
        channel,
        `${getDisplayName(userState)} is continuing the gift sub they received from ${sender}! Thanks for the support!`
      )
    }
  },
  // TODO
  join({ sendInChat }) {
    return (channel: string, username: string, isSelf: boolean) => {
      const args = niceJson({
        channel,
        isSelf,
        sendInChat,
        username,
      })
      console.log(`join event received with args: ${args}`)
    }
  },
  // TODO
  part({ sendInChat }) {
    return (channel: string, username: string, isSelf: boolean) => {
      const args = niceJson({
        channel,
        isSelf,
        sendInChat,
        username,
      })
      console.log(`part event received with args: ${args}`)
    }
  },
  // TODO
  raided({ sendInChat }) {
    return (channel: string, raider: string, raiderCount: number) => {
      sendInChat(
        channel,
        `${raider} has raided with ${raiderCount} ${pluralize(raiderCount, `raider`)}! Welcome raiders!`
      )
    }
  },
  // TODO
  redeem({ sendInChat }) {
    return (channel: string, username: string, rewardType: string, tags: ChatUserstate) => {
      const args = niceJson({
        channel,
        rewardType,
        sendInChat,
        tags,
        username,
      })
      console.log(`redeem event received with args: ${args}`)
    }
  },
  // TODO
  resub({ sendInChat }) {
    return (channel: string, username: string, months: number, message: string, userState: SubUserstate) => {
      const args = niceJson({
        channel,
        message,
        months,
        sendInChat,
        username,
        userState,
      })
      console.log(`resub event received with args: ${args}`)
    }
  },
  // TODO
  subgift({ sendInChat }) {
    return (
      channel: string,
      username: string,
      streakMonths: number,
      recipient: string,
      methods: SubMethods,
      userState: SubGiftUserstate
    ) => {
      const args = niceJson({
        channel,
        methods,
        recipient,
        sendInChat,
        streakMonths,
        username,
        userState,
      })
      console.log(`subgift event received with args: ${args}`)
    }
  },
  // TODO
  submysterygift({ sendInChat }) {
    return (
      channel: string,
      username: string,
      numSubsGifted: number,
      methods: SubMethods,
      userState: SubMysteryGiftUserstate
    ) => {
      const args = niceJson({
        channel,
        methods,
        numSubsGifted,
        sendInChat,
        username,
        userState,
      })
      console.log(`submysterygift event received with args: ${args}`)
    }
  },
  // TODO
  subscription({ sendInChat }) {
    return (channel: string, username: string, methods: SubMethods, message: string, userState: SubUserstate) => {
      const args = niceJson({
        channel,
        message,
        methods,
        sendInChat,
        username,
        userState,
      })
      console.log(`subscription event received with args: ${args}`)
    }
  },
  // TODO
  whisper({ sendInChat }) {
    return (sender: string, userState: ChatUserstate, message: string, isSelf: boolean) => {
      const args = niceJson({
        isSelf,
        message,
        sender,
        sendInChat,
        userState,
      })
      console.log(`whisper event received with args: ${args}`)
    }
  },
}

export default handlers
export type { ClientHelpers }
