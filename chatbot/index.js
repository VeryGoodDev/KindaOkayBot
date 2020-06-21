require(`dotenv`).config()

const tmi = require(`tmi.js`)
const { aliases, commands } = require(`./commands.js`)
const { firstNames, lastNames } = require(`./cumbernames.js`)

// FIXME: Probably a better way to set up moderation settings?
let deleteReptileEmotes = false

const client = new tmi.client({
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [process.env.CHANNEL_NAME],
})
client.on(`message`, handleMessage)
client.on(`connect`, handleConnect)
client.on(`raided`, handleRaid)
client.on(`anongiftpaidupgrade`, handleAnonGiftPaidUpgrade)
client.on(`cheer`, handleCheer)
client.on(`giftpaidupgrade`, handleGiftPaidUpgrade)
client.on(`resub`, handleResub)
client.on(`subgift`, handleSubGift)
client.on(`submysterygift`, handleSubMysteryGift)
client.on(`subscription`, handleSubscription)
// TEMPORARY, JUST WANNA SEE WHAT THIS ONE DOES
client.on(`join`, (target, username, self) => {
  if (self) return
  console.log(
    `${username} joined ${new Date().toLocaleDateString(`en`, {
      month: `long`,
      day: `numeric`,
      hour: `numeric`,
      minute: `2-digit`,
    })}`
  )
})
client.on(`part`, (target, username, self) => {
  if (self) {
    console.log(`The bot left I guess?`)
    return
  }
  if (username === `rubyredvines` && deleteReptileEmotes) {
    client.say(target, `!rubyout`)
  }
})
client.on(`disconnected`, reason => {
  console.log(`Disconnected for the following reason:`, reason)
})
client.connect()

function handleMessage(target, context, message, self) {
  // Do nothing if message is from the bot and isn't a command
  if (self && !/^!.+/.test(message)) return
  const respond = msg => client.say(target, msg)
  const sender = transformUserData(context)
  console.log({ sender, message })
  // TODO: Add any moderation
  if (deleteReptileEmotes) {
    // FIXME: CHALLENGE: See if there's a one-regex way to do this (e.g. lookahead/behind)
    if ([/^KomodoHype$/, /^KomodoHype\b/, /\bKomodoHype$/, /\bKomodoHype\b/].some(regex => regex.test(message))) {
      console.log(`ILLEGAL EMOTE`)
      client
        .deletemessage(target, sender.id)
        .catch(err => {
          console.error(`Error trying to delete illegal message:`, err)
        })
        .then(() => {
          client.whisper(
            sender.username,
            `Please don't use KomodoHype while rubyredvines (Dev's wife) is in chat. She only stops by from time to time and that emote makes her uncomfortable, so out of respect to her it's banned in chat when she's around. Feel free to use any other emotes in chat!`
          )
        })
      return
    }
  } else if (message.includes(`KomodoHype`)) {
    console.log(`NOT ILLEGAL`)
  }
  if (sender.username === `rubyredvines`) {
    deleteReptileEmotes = true
    client.say(
      target,
      `Dev's wife has blessed the chat with her presence! PogChamp Out of respect for her preferences, please refrain from using the "KomodoHype" emote. Bonus points if you use any emotes of hedgehogs, corgis, or cats while she's here.`
    )
  }
  const [originalCommand, ...args] = message.trim().split(/\s+/)
  const command = originalCommand.toLowerCase()
  if (command in commands) {
    if (checkPermission(sender, commands[command].hasPermission)) {
      commands[command].handler(sender, respond, ...args)
    }
  } else if (command in aliases) {
    if (checkPermission(sender, commands[aliases[command]].hasPermission)) {
      commands[aliases[command]].handler(sender, respond, ...args)
    }
    // Coming soon for commands that need the Twitch API
  } else if ([].includes(command)) {
    client.say(
      target,
      `${command} command coming in the future. Dev will need to actually sit down for a bit and figure out the Twitch API for this one, so it could be a few days, could be a few weeks.`
    )
  } else if ([`!quotes`, `!commands`].includes(command)) {
    // Coming soon for commands that don't need the Twitch API
    client.say(target, `${command} command coming soon`)
  } else if (command.toLowerCase() === `!rubyout` && (sender.username === `verygooddev` || sender.mod === true)) {
    // FIXME: Better shared state to change moderation settings with a command
    deleteReptileEmotes = false
    client.say(target, `Ruby is out of chat. You may use the "KomodoHype" emote if you really must.`)
  }
  // Non-command handling
  if (hasCumberbatchMention(message)) {
    client.say(target, `@${sender.username} did you mean ${getRandomCumberbatchName()}?`)
  }
}
function handleRaid(target, raider, raiderCount) {
  client.say(
    target,
    `${raider} is raiding with ${raiderCount} ${pluralize(raiderCount, `raider`, `raiders`)}! Welcome raiders!`
  )
  client.say(target, `!so ${raider}`)
}
function handleAnonGiftPaidUpgrade(target, username, context) {}
// context.bits has amount
function handleCheer(target, context) {
  client.say(
    target,
    `${transformUserData(context).displayName} just cheered with ${context.bits} ${pluralize(
      context.bits,
      `bit`,
      `bits`
    )}! Thanks for the support!`
  )
}
function handleGiftPaidUpgrade(target, username, sender, context) {
  client.say(
    target,
    `${
      transformUserData(context).displayName
    } is continuing the gift sub they received from ${sender}! Thanks for the support!`
  )
}
// context["msg-param-cumulative-months"]: String - Cumulative months
// context["msg-param-should-share-streak"]: Boolean - User decided to share their sub streak
function handleResub(target, username, streakMonths, message, context, methods) {
  console.log({ methods })
  const streakString = streakMonths > 1 ? `They're currently on a ${streakMonths} month streak!` : ``
  client.say(
    target,
    `${transformUserData(context).displayName} has resubscribed! ${streakString} Thanks for the support!`
  )
}
// context["msg-param-recipient-display-name"]: String - The display name of the recipient
// context["msg-param-recipient-id"]: String - The ID of the recipient
// context["msg-param-recipient-user-name"]: String - The login of the recipient
// context["msg-param-sender-count"]: Boolean or String - Number of giftsubs the sender has sent
function handleSubGift(target, username, streakMonths, recipient, methods, context) {}
// context["msg-param-sender-count"]: Boolean or String - The total numbers of giftsubs username has given in channel
function handleSubMysteryGift(target, username, giftSubsCount, methods, context) {
  client.say(
    target,
    `${transformUserData(context).displayName} is gifting ${giftSubsCount} ${pluralize(
      giftSubsCount,
      `sub`,
      `subs`
    )}} to the community! Thanks for the support!`
  )
}
function handleSubscription(target, username, methods, message, context) {
  console.log({ methods, message })
  client.say(target, `${transformUserData(context).displayName} has just subscribed! Thanks for the support!`)
}
function handleConnect(address, port) {
  console.log(`${process.env.BOT_USERNAME} connected to ${address}:${port}`)
}

function checkPermission(sender, permissionChecker = () => true) {
  return sender.username === `verygooddev` || permissionChecker(sender)
}
function getRandomCumberbatchName() {
  return `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`
}
function getRandomItem(list) {
  const idx = Math.floor(Math.random() * (list.length - 1))
  return list[idx]
}
function hasCumberbatchMention(message) {
  // Matches the correct spelling and a handful of typos
  const cumberRegex = /benn?[ea]di(ck|kt|t|ct|ckt)?\s*cumm?b[ea]rba(tch|ch|th|tc)/i
  return cumberRegex.test(message)
}
function transformUserData(rawData) {
  // Some of the fields provided by Twitch have kebab-cased keys
  // This wraps around that to provide an easier-to-use API
  // This also means I only have to update one place if the API response shape changes
  return {
    badgeInfo: rawData[`badge-info`],
    badgeInfoRaw: rawData[`badge-info-raw`],
    badges: rawData.badges,
    badgesRaw: rawData[`badges-raw`],
    color: rawData.color,
    displayName: rawData[`display-name`],
    emotes: rawData.emotes,
    emotesRaw: rawData[`emotes-raw`],
    flags: rawData.flags,
    id: rawData.id,
    messageType: rawData[`message-type`],
    mod: rawData.mod,
    roomId: rawData[`room-id`],
    subscriber: rawData.subscriber,
    tmiSentTimestamp: Number(rawData[`tmi-sent-ts`]),
    turbo: rawData.turbo,
    userId: rawData[`user-id`],
    userType: rawData[`user-type`],
    username: rawData.username,
  }
}
function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural
}
