const tmi = require('tmi.js')
const { getStreamData } = require('./twitchApi.js')
const commands = require('./commands.js')

const keepAliveInterval = setInterval(() => {
  console.log(`Stayin' alive, stayin' alive...`)
}, 60000)

const client = new tmi.client({
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [
    process.env.CHANNEL_NAME
  ],
})
client.on('message', handleMessage)
client.on('connect', handleConnect)
client.on('raided', handleRaid)
// TEMPORARY, JUST WANNA SEE WHAT THIS ONE DOES
client.on('join', (channel, username, self) => {
  if (self) return
  console.log(`${username} joined ${new Date().toLocaleDateString('en', { month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}`)
})
client.on('disconnected', (reason) => {
  clearInterval(keepAliveInterval)
  console.log(`Disconnected for the following reason: ${reason}`)
})
client.connect()

function handleMessage(target, context, message, self) {
  // Do nothing if message is from the bot
  if (self) return
  console.log({ target, context, message })
  const sender = transformUserData(context)
  const [command, ...args] = message.trim().split(/\s+/)
  if (command.toLowerCase() in commands) {
    commands[command.toLowerCase()].handler(sender, (msg) => client.say(target, msg))
  } else if (command.toLowerCase() === '!schedule' || command.toLowerCase() === '!calendar') {
    client.say(target, `Can't have a ${command} command until Dev makes a schedule LUL For now, Dev streams 4-6 times a week, usually in the evening. Some kind of schedule probably coming soon!`)
  } else if (['!so'].includes(command.toLowerCase())) {
    client.say(target, `${command} command coming in the future. Dev will need to actually sit down for a bit and figure out the Twitch API for this one, so it could be a few days, could be a few weeks.`)
  } else if (['!quotes', '!commands'].includes(command.toLowerCase())) {
    client.say(target, `${command} command coming soon (probably)`)
  }
}
function handleRaid(target, raider, raiderCount) {
  console.log('Raid!', { target, raider, raiderCount })
  client.say(target, `${raider} is raiding with ${raiderCount} ${pluralize(raiderCount, 'raider', 'raiders')}! Welcome raiders!`)
}
function handleConnect(address, port) {
  console.log(`${process.env.BOT_USERNAME} connected to ${address}:${port}`)
}
function transformUserData(rawData) {
  // Some of the fields provided by Twitch have kebab-cased keys
  // This wraps around that to provide an easier-to-use API
  // This also means I only have to update one place if the API response shape changes
  return {
    badgeInfo: rawData['badge-info'],
    badgeInfoRaw: rawData['badge-info-raw'],
    badges: rawData.badges,
    badgesRaw: rawData['badges-raw'],
    color: rawData.color,
    displayName: rawData['display-name'],
    emotes: rawData.emotes,
    emotesRaw: rawData['emotes-raw'],
    flags: rawData.flags,
    id: rawData.id,
    messageType: rawData['message-type'],
    mod: rawData.mod,
    roomId: rawData['room-id'],
    subscriber: rawData.subscriber,
    tmiSentTimestamp: Number(rawData['tmi-sent-ts']),
    turbo: rawData.turbo,
    userId: rawData['user-id'],
    userType: rawData['user-type'],
    username: rawData.username,
  }
}
function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural
}