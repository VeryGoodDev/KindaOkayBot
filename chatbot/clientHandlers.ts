/* eslint-disable max-params -- I don't control how many params TMI event handlers can take */
import { handleCommand, handleModeration, handleSpecialProcessing, handleUserGreet } from './chatHelpers'
import { getDisplayName, getSubTier, getUserLogString } from './userHelpers'
import { isCommand, niceJson, pluralize } from './util'

import type {
  AnonSubGiftUpgradeUserstate,
  AnonSubGiftUserstate,
  AnonSubMysteryGiftUserstate,
  ChatUserstate,
  DeleteUserstate,
  Events,
  MsgID,
  PrimeUpgradeUserstate,
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
  logEvent: (logEntry: string) => void
  sendInChat: (channel: string, message: string) => void
  whisper: (username: string, message: string) => void
}

const handlers: HandlerMap<Partial<Events>> = {
  action({ logEvent }) {
    return (channel: string, userState: Userstate, message: string) => {
      logEvent(`[action] ${getUserLogString(userState)}: ${message}`)
    }
  },
  // TODO logging, chat message
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
  // TODO logging, chat message
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
  // TODO logging, chat message
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
  automod({ logEvent }) {
    return (channel: string, actionTaken: string, message: string) => {
      logEvent(`[automod] action taken: "${actionTaken}" for message "${message}"`)
    }
  },
  ban({ logEvent }) {
    return (channel: string, username: string, reason: string) => {
      logEvent(`[ban] ${username} banned for reason: ${reason}`)
    }
  },
  chat(clientHelpers) {
    return (channel: string, userState: ChatUserstate, message: string, isSelf: boolean) => {
      clientHelpers.logEvent(`[chat] ${getUserLogString(userState)}: ${message}`)
      console.log({
        badgeInfo: userState[`badge-info`],
        badges: userState.badges,
        displayName: getDisplayName(userState),
      })

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
  cheer({ logEvent, sendInChat }) {
    return (channel: string, userState: ChatUserstate, message: string) => {
      const bitCount = Number(userState.bits)
      logEvent(`[cheer] ${getUserLogString(userState)} x${bitCount} bits: ${message}`)
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
  clearchat({ logEvent }) {
    return (channel: string) => {
      logEvent(`[clearchat] ${channel} chat cleared`)
    }
  },
  emoteonly({ logEvent }) {
    return (channel: string, enabled: boolean) => {
      const newState = enabled ? `enabled` : `disabled`
      logEvent(`[emoteonly] ${newState}`)
    }
  },
  followersonly({ logEvent }) {
    return (channel: string, enabled: boolean, minutesSinceFollow: number) => {
      const newState = enabled ? `${minutesSinceFollow}-minute follower enabled` : `disabled`
      logEvent(`[followersonly] ${newState}`)
    }
  },
  // TODO logging
  giftpaidupgrade({ sendInChat }) {
    return (channel: string, username: string, sender: string, userState: SubGiftUpgradeUserstate) => {
      sendInChat(
        channel,
        `${getDisplayName(userState)} is continuing the gift sub they received from ${sender}! Thanks for the support!`
      )
    }
  },
  hosted({ logEvent }) {
    return (channel: string, username: string, viewerCount: number, autohost: boolean) => {
      const hostType = autohost ? `autohost` : `host`
      logEvent(`[hosted] ${viewerCount}-viewer ${hostType} from ${username}`)
    }
  },
  hosting({ logEvent }) {
    return (channel: string, target: string, viewerCount: number) => {
      const viewers = `${viewerCount} ${pluralize(viewerCount, `viewer`)}`
      logEvent(`[hosting] hosting ${target} with ${viewers}`)
    }
  },
  join({ logEvent }) {
    return (channel: string, username: string) => {
      logEvent(`[join] ${username}`)
    }
  },
  messagedeleted({ logEvent }) {
    return (channel: string, username: string, deletedMessage: string, userState: DeleteUserstate) => {
      const { login = `<EMPTY>` } = userState
      logEvent(`[messagedeleted] ${username} (login "${login}"): ${deletedMessage}`)
    }
  },
  mod({ logEvent }) {
    return (channel: string, username: string) => {
      logEvent(`[mod] ${username}`)
    }
  },
  mods({ logEvent }) {
    return (channel: string, modList: string[]) => {
      const mods = `${modList.length} ${pluralize(modList.length, `mod`)}`
      logEvent(`[mods] list of ${mods} retrieved`)
    }
  },
  notice({ logEvent }) {
    return (channel: string, messageId: MsgID, message: string) => {
      logEvent(`[notice] message ID "${messageId}": ${message}`)
    }
  },
  part({ logEvent }) {
    return (channel: string, username: string) => {
      logEvent(`[part] ${username}`)
    }
  },
  pong({ logEvent }) {
    return (latency: number) => {
      logEvent(`[pong] ${latency}ms`)
    }
  },
  // TODO logging, chat message
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
  // Chat mode that tries to filter repeated messages
  r9kbeta({ logEvent }) {
    return (channel: string, enabled: boolean) => {
      const newState = enabled ? `enabled` : `disabled`
      logEvent(`[r9kbeta] ${newState}`)
    }
  },
  raided({ logEvent, sendInChat }) {
    return (channel: string, raider: string, raiderCount: number) => {
      logEvent(`[raided] ${raiderCount}-viewer raid from ${raider}`)

      sendInChat(
        channel,
        `${raider} has raided with ${raiderCount} ${pluralize(raiderCount, `raider`)}! Welcome raiders!`
      )
      sendInChat(channel, `!so ${raider}`)
    }
  },
  reconnect({ logEvent }) {
    return () => {
      logEvent(`[reconnect] client reconnected`)
    }
  },
  redeem({ logEvent }) {
    return (channel: string, username: string, rewardType: string) => {
      logEvent(`[redeem] ${username}: ${rewardType}`)
    }
  },
  resub({ logEvent, sendInChat }) {
    return (
      channel: string,
      username: string,
      months: number,
      message: string,
      userState: SubUserstate,
      subMethods: SubMethods
    ) => {
      const tier = getSubTier(subMethods.plan)
      logEvent(`[resub] ${username} x${months} (${tier}): ${message}`)
      // TODO call out number of months/streaks
      // TODO call out tier/prime/etc via subMethods info
      // TODO userState has info on cumulative months and whether to share the streak
      sendInChat(
        channel,
        `${getDisplayName(userState)} has resubscribed! Thanks for the 
      support!`
      )
    }
  },
  serverchange({ logEvent }) {
    return (channel: string) => {
      logEvent(`[serverchange] ${channel}`)
    }
  },
  slowmode({ logEvent }) {
    return (channel: string, enabled: boolean, cooldownBetweenMessages: number) => {
      const newState = enabled ? `${cooldownBetweenMessages}-second cooldown enabled` : `disabled`
      logEvent(`[slowmode] ${newState}`)
    }
  },
  // TODO logging, chat message
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
  // TODO logging
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
  subscribers({ logEvent }) {
    return (channel: string, enabled: boolean) => {
      const newState = enabled ? `enabled` : `disabled`
      logEvent(`[subscribers] ${newState}`)
    }
  },
  // TODO improve chat message
  subscription({ logEvent, sendInChat }) {
    return (channel: string, username: string, subMethods: SubMethods, message: string, userState: SubUserstate) => {
      const tier = getSubTier(subMethods.plan)
      logEvent(`[subscription] ${username} x1 (${tier}): ${message}`)
      // TODO Acknowledge tier/prime/etc from subMethods
      sendInChat(channel, `${getDisplayName(userState)} has just subscribed! Thanks for the support!`)
    }
  },
  timeout({ logEvent }) {
    return (channel: string, username: string, reason: string, duration: number) => {
      logEvent(`[timeout] ${username} (${duration}s): ${reason}`)
    }
  },
  unhost({ logEvent }) {
    return (channel: string, viewerCount: number) => {
      logEvent(`[unhost] ${viewerCount} ${pluralize(viewerCount, `viewer`)}`)
    }
  },
  unmod({ logEvent }) {
    return (channel: string, username: string) => {
      logEvent(`[unmod] ${username}`)
    }
  },
  vips({ logEvent }) {
    return (channel: string, vipList: string[]) => {
      const vips = `${vipList.length} ${pluralize(vipList.length, `VIP`)}`
      logEvent(`[mods] list of ${vips} retrieved`)
    }
  },
  whisper({ logEvent }) {
    return (sender: string, userState: ChatUserstate, message: string) => {
      logEvent(`[whisper] from ${sender}: ${message}`)
    }
  },
}

export default handlers
export type { ClientHelpers }
