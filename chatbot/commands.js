const { getStreamData } = require(`./twitchApi.js`)

const commands = {
  // Static simple responses
  '!bot': {
    handler(sender, respond) {
      respond(`Dev decided to write his own bot. Still a work in progress.`)
    },
  },
  '!hydrate': {
    handler(sender, respond) {
      respond(`Pssst. Hey you. Drinking water is cool, you should do that.`)
    },
  },
  '!minecraft': {
    handler(sender, respond) {
      respond(
        `Dev has goals for the Minecraft survival world! These include building three villages in three biomes and making an excessive amount of automated farms. More detailed info coming soon!`
      )
    },
  },
  '!schedule': {
    handler(sender, respond) {
      respond(
        `Dev usually streams 4-6 times a week, usually in the evening. No set-in-stone schedule for now, but feel free to follow to receive notifications whenever Dev goes live!`
      )
    },
  },
  '!twitter': {
    handler(sender, respond) {
      respond(
        `Follow Dev on Twitter for stream-related updates and occasional random thoughts! https://twitter.com/_verygooddev (the username without an underscore was already taken by someone who hasn't even tweeted since 2011 :/)`
      )
    },
  },
  // Dynamic simple responses
  '!lurk': {
    handler(sender, respond) {
      respond(
        `${sender.displayName} is lurking in the shadows, still watching but now doing so from a distance. Happy lurking!`
      )
    },
  },
  '!stilllurking': {
    handler(sender, respond) {
      respond(
        `${sender.displayName} has been lurking and just popped by to provide an update: they are still lurking. We appreciate this important update.`
      )
    },
  },
  '!unlurk': {
    handler(sender, respond) {
      respond(`${sender.displayName} has come back from watching in the shadows.`)
    },
  },
  // Not simple responses
  '!uptime': {
    handler(sender, respond) {
      getStreamData().then(({ data = [] }) => {
        if (!data.length) {
          respond(`Dev isn't currently streaming. Feel free to follow to be notified the next time he goes live!`)
        } else {
          const [stream] = data
          const startTime = new Date(stream.started_at).getTime()
          if (!Number.isNaN(startTime)) {
            respond(`Dev has been live for ${getUptimeString(startTime)}`)
          } else {
            respond(`Somehow this command didn't work. Awkward...`)
          }
        }
      })
    },
  },
}

const aliases = {
  '!calendar': `!schedule`,
  '!calender': `!schedule`,
}

function getUptimeString(startTime) {
  let seconds = Math.floor((Date.now() - startTime) / 1000)
  let minutes = Math.floor(seconds / 60)
  seconds %= 60
  const hours = Math.floor(minutes / 60)
  minutes %= 60
  let uptime = `${seconds}s`
  if (hours > 0 || minutes > 0) uptime = `${minutes}m ${uptime}`
  if (hours > 0) uptime = `${hours}h ${uptime}`
  return uptime
}

module.exports = { aliases, commands }
