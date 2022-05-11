/* eslint-disable max-params -- I don't control how many params TMI event handlers can take */
import { handleCommand, handleModeration, handleSpecialProcessing, handleUserGreet } from './chatHelpers'
import { getDisplayName, getUsername } from './userHelpers'
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
    return (channel: string, userState: ChatUserstate) => {
      // NOTE can get message: string as third param if needed for anything
      const bitCount = Number(userState.bits)
      if (bitCount > 0) {
        sendInChat(
          channel,
          `${getDisplayName(userState)} just cheered with ${bitCount} ${pluralize(
            bitCount,
            `bit`
          )}! Thanks for the support!`
        )
      }
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
  giftpaidupgrade({ sendInChat }) {
    return (channel: string, username: string, sender: string, userState: SubGiftUpgradeUserstate) => {
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
  raided({ sendInChat }) {
    return (channel: string, raider: string, raiderCount: number) => {
      sendInChat(
        channel,
        `${raider} has raided with ${raiderCount} ${pluralize(raiderCount, `raider`)}! Welcome raiders!`
      )
      sendInChat(channel, `!so ${raider}`)
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
  resub({ sendInChat }) {
    return (
      channel: string,
      username: string,
      months: number,
      message: string,
      userState: SubUserstate,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- TEMP
      subMethods: SubMethods
    ) => {
      // TODO call out number of months/streaks
      // TODO call out tier/prime/etc via subMethods info
      // TODO userState has info on cumulative months and whether to share the streak
      sendInChat(
        channel,
        `${getUsername(userState)} has resubscribed! Thanks for the 
      support!`
      )
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
  submysterygift({ sendInChat }) {
    return (
      channel: string,
      username: string,
      numSubsGifted: number,
      subMethods: SubMethods,
      userState: SubMysteryGiftUserstate
    ) => {
      sendInChat(
        channel,
        `${getDisplayName(userState)} is gifting ${numSubsGifted} ${pluralize(
          numSubsGifted,
          `sub`
        )} to the community! Thanks for the support!`
      )
    }
  },
  subscription({ sendInChat }) {
    return (channel: string, username: string, subMethods: SubMethods, message: string, userState: SubUserstate) => {
      // TODO Acknowledge tier/prime/etc from subMethods
      sendInChat(channel, `${getDisplayName(userState)} has just subscribed! Thanks for the support!`)
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
