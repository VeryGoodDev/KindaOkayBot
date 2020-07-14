const { getStreamData } = require(`./twitchApi.js`)

const commands = {
  // Static simple responses
  '!bot': {
    handler(sender, respond) {
      respond(
        `Dev decided to write his own bot. Still a work in progress. Bugs happening during stream always a distinct possibility.`
      )
    },
    description: `Use to get a little bit of info about KindaOkayBot`,
  },
  '!bytes': {
    handler(sender, respond) {
      respond(
        `Dev finally did something with channel points! They're called bytes here. Only a few custom ones have been added so far, so if you have a cool idea, suggest it in chat!`
      )
    },
    description: `Use to get some info about Dev's channel points`,
  },
  '!commands': {
    handler(sender, respond) {
      respond(`Go to https://verygooddev.github.io/kindaokaybot/commands to get a full list of commands you can use`)
    },
    description: `Use to get a link to a page listing all the commands for KindaOkayBot`,
  },
  '!hydrate': {
    handler(sender, respond) {
      respond(`Pssst. Hey you. Drinking water is cool, you should do that.`)
    },
    description: `Use to send a friendly reminder to drink some earth juice`,
  },
  '!minecraft': {
    handler(sender, respond) {
      respond(
        `Dev has goals for the Minecraft survival world! These include creating three villages in three biomes, making an excessive amount of automated farms, and building a museum to display every block and item in the game. More detailed info coming soon!`
      )
    },
    description: `Use to see a summary of some of Dev's goals/plans with his Minecraft survival world`,
  },
  '!schedule': {
    handler(sender, respond) {
      respond(
        `Dev usually streams 4-5 times a week, usually in the evening. Normally live Tuesday through Thursday, and at least one day out of Saturday and Sunday (and both when able!). Not set in stone since IRL stuff occasionally gets in the way, but followed as often as possible`
      )
    },
    description: `Use to see Dev's usual schedule for going live`,
  },
  '!twitter': {
    handler(sender, respond) {
      respond(
        `Follow Dev on Twitter for stream-related updates and occasional random thoughts! https://twitter.com/_verygooddev (the username without an underscore was already taken by someone who hasn't even tweeted since 2011 :/)`
      )
    },
    description: `Use to get a link to Dev's Twitter account, along with some mild sass towards whoever has the Twitter handle Dev wanted`,
  },
  // Dynamic simple responses
  '!beans': {
    handler(sender, respond, beanType = ``) {
      if (/^bush'?s$/i.test(beanType.trim())) {
        respond(`DEFINITELY BEANS`)
      } else {
        respond(`NOT EVEN BEANS`)
      }
    },
    hasPermission(sender) {
      return [`theallbean05`, `loubob05`].includes(sender.username)
    },
    exclusive: true,
  },
  '!creepylurk': {
    handler(sender, respond) {
      respond(
        `${sender.displayName} is lurking. Not like a normal lurk though, no no no. Instead, ${sender.displayName} is up in a tree, hiding behind the branches and leaves, and watching from the distance through binoculars while chuckling quietly at their frankly disturbing lurking behavior. Thanks for the lurk?`
      )
    },
    description: `Use to declare your intent to lurk in the creepiest way possible`,
  },
  '!gamelurk': {
    handler(sender, respond, ...args) {
      const game = args.length ? args.join(` `) : `a super dope game`
      respond(
        `${sender.displayName} wants to chill in the stream, but they also want to play ${game}. Both? Yeah, both is good. Have fun with the game, and happy lurking!`
      )
    },
    description: `Use to declare your intent to lurk while playing a game. The game to be played can optionally be specified e.g. \`!gamelurk minecraft\``,
  },
  '!lurk': {
    handler(sender, respond) {
      respond(
        `${sender.displayName} is lurking in the shadows, still watching but now doing so from a distance. Happy lurking!`
      )
    },
    description: `The generic lurk command when none of the more specific ones fit. Lurkers always welcome!`,
  },
  '!sleepylurk': {
    handler(sender, respond) {
      respond(
        `As ${sender.displayName}'s laying down to sleep / Within the stream they stay to creep. Have a good sleep HahaSleep thanks for the lurk!`
      )
    },
    description: `Use to declare your intent to go to bed, but still leave the stream up as a lurker`,
  },
  '!so': {
    handler(sender, respond, streamerParam) {
      if (!streamerParam) return
      const streamer = streamerParam.replace(/^@/, ``)
      respond(
        `Shout out to the ${getAdjective(
          streamer.toLowerCase()
        )} ${streamer}! Go show them some love at https://twitch.tv/${streamer.toLowerCase()}`
      )
    },
    hasPermission(sender) {
      return sender.mod === true
    },
    permissionLevel: `mods`,
    description: `Use to show some love for fellow streamers. Mod only to avoid the potential for abuse (attempts to use the command if you're not a mod will result in warnings or timeouts)`,
  },
  '!stilllurking': {
    handler(sender, respond) {
      respond(
        `${sender.displayName} has been lurking and just popped by to provide an update: they are still lurking. We appreciate this important update.`
      )
    },
    description: `Use to check in while lurking but before you're able to hang out in chat`,
  },
  '!unlurk': {
    handler(sender, respond) {
      respond(`${sender.displayName} has come back from watching in the shadows.`)
    },
    description: `Use to declare that your lurk is over and you're hanging out in chat again`,
  },
  '!worklurk': {
    handler(sender, respond) {
      respond(
        `${sender.displayName} has to work, but was kind enough to stop by the stream and have it up in the background while they work. Hope that work goes well, and happy lurking!`
      )
    },
    description: `Use to declare your intent to lurk in the stream while you're working (Dev does this often while doing his full time job and appreciates anyone who is able to lurk while working)`,
  },
  // Not simple responses
  '!addquote': {
    handler(sender, respond, ...args) {},
    description: `Use to add a quotation of Dev saying something funny/stupid/way out there/extra derpy`,
    permissionLevel: [`mods`, `vips`],
    hasPermission(sender) {
      // FIXME: Need to figure out how to test if sender is VIP
      return sender.mod === true || sender.vip === true
    },
  },
  '!deletequote': {
    handler(sender, respond, ...args) {},
    description: `Use to delete a previously created quote. Must provide the quote's ID (will be a number)`,
    permissionLevel: [`mods`],
    hasPermission(sender) {
      return sender.mod === true
    },
  },
  '!quote': {
    handler(sender, respond, ...args) {},
    description: `Use to get a quote from the collection of Dev quotes. Use \`!quote\` to get a random quote, \`!quote NUMBER\` to get a specific quote by number (e.g. \`!quote 69\`), or \`!quote ONE OR MORE WORDS\` to find the quote that most closely matches the word(s) you put (e.g. \`!quote canned tuna\`)`,
  },
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
    description: `Use to find out how long Dev has been live`,
  },
}

const aliases = {
  '!calendar': `!schedule`,
  '!calender': `!schedule`,
  '!channelpoints': `!bytes`,
  '!creeperlurk': `!creepylurk`,
  '!creeplurk': `!creepylurk`,
  '!points': `!bytes`,
  '!shoutout': `!so`,
  '!sleeplurk': `!sleepylurk`,
  '!stillurking': `!stilllurking`,
  '!werklurk': `!worklurk`,
  '!wurklurk': `!worklurk`,
}

// Can use this to specify a specific adjective to be used for specific streamers
// e.g. kindaokaybot: `kinda okay`
const specialAdjectives = {}
function getAdjective(streamer) {
  if (specialAdjectives[streamer]) return specialAdjectives[streamer]
  const adjectives = [
    `amazing`,
    `awesome`,
    `fantastic`,
    `magnificent`,
    `phenomenal`,
    `stupendous`,
    `talented`,
    `wonderful`,
  ]
  const idx = Math.floor(Math.random() * (adjectives.length - 1))
  return adjectives[idx]
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
