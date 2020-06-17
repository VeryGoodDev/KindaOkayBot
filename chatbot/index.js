require(`dotenv`).config()

const tmi = require(`tmi.js`)
const { aliases, commands } = require(`./commands.js`)
const { firstNames, lastNames } = require(`./cumbernames.js`)

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
// TEMPORARY, JUST WANNA SEE WHAT THIS ONE DOES
client.on(`join`, (channel, username, self) => {
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
client.on(`disconnected`, reason => {
  console.log(`Disconnected for the following reason: ${reason}`)
})
client.connect()

function handleMessage(target, context, message, self) {
  // Do nothing if message is from the bot and isn't a command
  if (self && !/^!.+/.test(message)) return
  const respond = msg => client.say(target, msg)
  const sender = transformUserData(context)
  console.log({ sender, message })
  // TODO: Add any moderation
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
