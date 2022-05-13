/* eslint-disable max-params -- I don't control how many params TMI event handlers can take */
import { handleCommand, handleModeration, handleSpecialProcessing, handleUserGreet } from './chatHelpers'
import { getDisplayName, getUsername } from './userHelpers'
import { isCommand, niceJson, pluralize } from './util'

import type {
  AnonSubGiftUpgradeUserstate,
  AnonSubGiftUserstate,
  AnonSubMysteryGiftUserstate,
  ChatUserstate,
  DeleteUserstate,
  EmoteObj,
  Events,
  MsgID,
  PrimeUpgradeUserstate,
  RoomState,
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
  anonsubgift() {
    return (
      channel: string,
      streakMonths: number,
      recipient: string,
      subMethods: SubMethods,
      userState: AnonSubGiftUserstate
    ) => {
      const args = niceJson({
        channel,
        recipient,
        streakMonths,
        subMethods,
        userState,
      })
      console.log(`anonsubgift event received with args: ${args}`)
    }
  },
  // TODO
  anonsubmysterygift() {
    return (channel: string, numSubsGifted: number, subMethods: SubMethods, userState: AnonSubMysteryGiftUserstate) => {
      const args = niceJson({
        channel,
        numSubsGifted,
        subMethods,
        userState,
      })

      console.log(`anonsubmysterygift event received with args: ${args}`)
    }
  },
  // TODO
  automod() {
    return (channel: string, actionTaken: string, message: string) => {
      const args = niceJson({
        actionTaken,
        channel,
        message,
      })

      console.log(`automod event received with args: ${args}`)
    }
  },
  // TODO
  ban() {
    return (channel: string, username: string, reason: string) => {
      const args = niceJson({
        channel,
        reason,
        username,
      })

      console.log(`ban event received with args: ${args}`)
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
  clearchat() {
    return (channel: string) => {
      const args = niceJson({ channel })

      console.log(`clearchat event received with args: ${args}`)
    }
  },
  // TODO
  connecting() {
    return (address: string, port: number) => {
      const args = niceJson({
        address,
        port,
      })

      console.log(`connecting event received with args: ${args}`)
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
  emoteonly() {
    return (channel: string, enabled: boolean) => {
      const args = niceJson({
        channel,
        enabled,
      })

      console.log(`emoteonly event received with args: ${args}`)
    }
  },
  // TODO
  emotesets() {
    return (sets: string, emoteObj: EmoteObj) => {
      const args = niceJson({
        emoteObj,
        sets,
      })

      console.log(`emotesets event received with args: ${args}`)
    }
  },
  // TODO
  followersonly() {
    return (channel: string, enabled: boolean, minutesSinceFollow: number) => {
      const args = niceJson({
        channel,
        enabled,
        minutesSinceFollow,
      })

      console.log(`followersonly event received with args: ${args}`)
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
  hosted() {
    return (channel: string, username: string, viewerCount: number, autohost: boolean) => {
      const args = niceJson({
        autohost,
        channel,
        username,
        viewerCount,
      })

      console.log(`hosted event received with args: ${args}`)
    }
  },
  // TODO
  hosting() {
    return (channel: string, target: string, viewerCount: number) => {
      const args = niceJson({
        channel,
        target,
        viewerCount,
      })

      console.log(`hosting event received with args: ${args}`)
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
  messagedeleted() {
    return (channel: string, username: string, deletedMessage: string, userState: DeleteUserstate) => {
      const args = niceJson({
        channel,
        deletedMessage,
        username,
        userState,
      })

      console.log(`messagedeleted event received with args: ${args}`)
    }
  },
  // TODO
  mod() {
    return (channel: string, username: string) => {
      const args = niceJson({
        channel,
        username,
      })

      console.log(`mod event received with args: ${args}`)
    }
  },
  // TODO
  mods() {
    return (channel: string, modList: string[]) => {
      const args = niceJson({
        channel,
        modList,
      })

      console.log(`mods event received with args: ${args}`)
    }
  },
  // TODO
  notice() {
    return (channel: string, messageId: MsgID, message: string) => {
      const args = niceJson({
        channel,
        message,
        messageId,
      })

      console.log(`notice event received with args: ${args}`)
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
  ping() {
    return () => {
      const args = niceJson({})

      console.log(`ping event received with args: ${args}`)
    }
  },
  // TODO
  pong() {
    return (latency: number) => {
      const args = niceJson({ latency })

      console.log(`pong event received with args: ${args}`)
    }
  },
  // TODO
  primepaidupgrade() {
    return (channel: string, username: string, subMethods: SubMethods, userState: PrimeUpgradeUserstate) => {
      const args = niceJson({
        channel,
        subMethods,
        username,
        userState,
      })

      console.log(`primepaidupgrade event received with args: ${args}`)
    }
  },
  // TODO
  // Chat mode that tries to filter repeated messages
  r9kbeta() {
    return (channel: string, enabled: boolean) => {
      const args = niceJson({
        channel,
        enabled,
      })

      console.log(`r9kbeta event received with args: ${args}`)
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
  reconnect() {
    return () => {
      const args = niceJson({})

      console.log(`reconnect event received with args: ${args}`)
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
  // Provides info about chat
  roomstate() {
    return (channel: string, roomState: RoomState) => {
      const args = niceJson({
        channel,
        roomState,
      })

      console.log(`roomstate event received with args: ${args}`)
    }
  },
  // TODO
  serverchange() {
    return (channel: string) => {
      const args = niceJson({ channel })

      console.log(`serverchange event received with args: ${args}`)
    }
  },
  // TODO
  slowmode() {
    return (channel: string, enabled: boolean, cooldownBetweenMessages: number) => {
      const args = niceJson({
        channel,
        cooldownBetweenMessages,
        enabled,
      })

      console.log(`slowmode event received with args: ${args}`)
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
  // TODO
  subscribers() {
    return (channel: string, enabled: boolean) => {
      const args = niceJson({
        channel,
        enabled,
      })

      console.log(`subscribers event received with args: ${args}`)
    }
  },
  subscription({ sendInChat }) {
    return (channel: string, username: string, subMethods: SubMethods, message: string, userState: SubUserstate) => {
      // TODO Acknowledge tier/prime/etc from subMethods
      sendInChat(channel, `${getDisplayName(userState)} has just subscribed! Thanks for the support!`)
    }
  },
  // TODO
  timeout() {
    return (channel: string, username: string, reason: string, duration: number) => {
      const args = niceJson({
        channel,
        duration,
        reason,
        username,
      })

      console.log(`timeout event received with args: ${args}`)
    }
  },
  // TODO
  unhost() {
    return (channel: string, viewerCount: number) => {
      const args = niceJson({
        channel,
        viewerCount,
      })

      console.log(`unhost event received with args: ${args}`)
    }
  },
  // TODO
  unmod() {
    return (channel: string, username: string) => {
      const args = niceJson({
        channel,
        username,
      })

      console.log(`unmod event received with args: ${args}`)
    }
  },
  // TODO
  vips() {
    return (channel: string, vipList: string[]) => {
      const args = niceJson({
        channel,
        vipList,
      })

      console.log(`vips event received with args: ${args}`)
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
