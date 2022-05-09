const { getStreamData } = require(`./twitchApi.js`)
// const { addQuote, getQuote } = require(`./quotesApi.js`)

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
  '!discord': {
    handler(sender, respond) {
      respond(`https://discord.gg/XqSQaC3`)
    },
    description: `Use to get the invite link to Dev's Discord server`,
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
        `The major goal for this survival world is to build a museum to display every block, item, and biome in the game, along with a zoo/aquarium to showcase every mob in the game. Other goals include making a farm for everything farmable and getting every advancement.`
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
  '!drivelurk': {
    handler(sender, respond) {
      respond(
        `${
          sender.displayName
        } has to drive somewhere, but is keeping the stream up. KEEP YOUR EYES ON THE ROAD ${sender.displayName.toUpperCase()}!!! (and thanks for the lurk)`
      )
    },
    description: `Use to declare your intent to lurk while you're driving`,
  },
  '!elliehug': {
    handler(sender, respond) {
      if (sender.displayName === `zierse`) {
        respond(
          `zierse gives Ellie the greatest hug the world has ever seen. Attempting to calculate the strength of a Zellie hug would destroy any bot, so in the interest of self preservation, I'll just say it was ${getHugDescriptor()}`
        )
      } else {
        respond(`${sender.displayName} hugs Ellie with 100% love, because she deserves it and is huggable af!`)
      }
    },
    description: `Use to give a virtual hug to Ellie (@rainbowcanoe)`,
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
  '!grouphug': {
    handler(sender, respond) {
      respond(`${sender.displayName} gave a big ol group hug to the entire chat! <3`)
    },
    description: `Use to give a virtual group hug to everyone in chat`,
  },
  '!highfive': {
    // FIXME: Add support for multiple + aliases
    handler(sender, respond, recipient) {
      respond(`${sender.displayName} gives a perfect high five to ${recipient}`)
    },
    description: `Use to give a high five to one or more people in chat`,
  },
  '!hug': {
    handler(sender, respond, ...args) {
      const strength = getRandomNumber(0, 100)
      const judgment = getHugStrengthJudgment(strength)
      if (args.length === 0) {
        respond(`${sender.displayName} gave a hug to a random person in chat <3`)
      } else if (args.length === 1) {
        respond(`${sender.displayName} gave a hug at ${strength}% strength to ${args[0]} <3 ${judgment}`)
      } else if (args.length === 2) {
        respond(`${sender.displayName} gave hugs to ${args[0]} and ${args[1]} <3`)
      } else {
        const lastInList = args.pop()
        respond(
          `${sender.displayName} gave hugs to ${args
            .map((name) => name.replace(/,$/, ``))
            .join(`, `)}, and ${lastInList} <3 HUG SKILLS OVER 9000!`
        )
      }
    },
    description: `Use to give a virtual hug to one or more people in chat. Use \`!hug\` by itself for the hug to just go to someone random, or list one or more names (separated by spaces) after the command to give hugs to all of those people`,
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
  '!sortalurk': {
    handler(sender, respond) {
      respond(
        `${sender.displayName} needs to take some attention away from the stream, but is also liable to pop in and out of chat whenever they please. Sorta thanks for the lurk!`
      )
    },
    description: `Use when you need to be in and out of chat, but not full on lurking`,
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
    handler(sender, respond, ...args) {
      respond(
        `This command is currently broken, sorry! Feel free to keep track of the quote or message it to Dev to add it once he gets this feature fixed.`
      )
      // const newQuote = args.join(` `)
      // addQuote(sender, newQuote)
      //   .then(([{ quote }, count]) => {
      //     respond(`Successfully added quote #${count}! Quote saved as "${quote}"`)
      //   })
      //   .catch(err => {
      //     console.error(`An error occurred while trying add "${newQuote}" as a quote:`, err)
      //     respond(
      //       `Something went wrong and the quote wasn't saved! You can try again, but if it keeps breaking save it for later and Dev will try to fix the problem soon`
      //     )
      //   })
    },
    description: `Use to add a quotation of Dev saying something funny/stupid/way out there/extra derpy`,
    permissionLevel: [`mods` /* `vips` */],
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
    exclusive: true,
  },
  '!quote': {
    handler(sender, respond, ...args) {
      respond(`This command is currently broken, sorry!`)
      // let query = args.join(` `)
      // if (/^\d+$/.test(query)) query = Number(query) - 1
      // getQuote(query)
      //   .then(({ quote }) => {
      //     respond(quote)
      //   })
      //   .catch(err => {
      //     console.error(`Error retrieving a quote:`, err)
      //     console.error(`Query was ${query || `''`}`)
      //     respond(`Something went wrong trying to get a quote. @verygooddev FIX IT`)
      //   })
    },
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

const channelPointsCommands = {
  '!incagbreto': {
    handler(sender, respond) {
      respond(
        `You have now gone incagbreto, any actions you make may not be private and will be recorded by brevil mod`
      )
    },
    hasPermission(sender) {
      return sender.username === `angelicbre`
    },
  },
}
for (const command of Object.keys(channelPointsCommands)) {
  channelPointsCommands[command].exclusive = true
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
const specialAdjectives = {
  megmage: `greatest streamer on Twitch`,
}
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
function getHugDescriptor() {
  const descriptors = [
    `a ridiculously amazing hug`,
    `an immeasurably phenomenal hug`,
    `an epically impressive hug`,
    `a hug that puts all other hugs to shame`,
  ]
  const idx = Math.floor(Math.random() * (descriptors.length - 1))
  return descriptors[idx]
}
function getHugStrengthJudgment(strength) {
  // Specific numbers
  if (strength === 100) return `The best of the best at hugging!`
  if (strength === 69) return `Nice`
  if (strength === 0) return `I-- did you even hug them?`
  // Ranges
  if (strength > 90) return `That was a top notch hug!`
  if (strength > 70) return `A solid hug for sure!`
  if (strength > 50) return `A respectable hug`
  if (strength > 30) return `Pretty decent, I suppose`
  if (strength > 10) return `I mean, I guess that was all right`
  return `Single digits? I mean, it was technically a hug, but were you even trying? Kappa`
}
function getRandomNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
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

module.exports = { aliases, commands: { ...commands, ...channelPointsCommands } }
