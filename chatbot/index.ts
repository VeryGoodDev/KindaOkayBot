import { config } from 'dotenv'
import { client as TmiClient } from 'tmi.js'

import handlers from './clientHandlers.js'

import type { ClientHelpers } from './clientHandlers.js'
import type { Events } from 'tmi.js'

config()

const chatClient = new TmiClient({
  channels: [process.env.CHANNEL_NAME],
  identity: {
    password: process.env.OAUTH_TOKEN,
    username: process.env.BOT_USERNAME,
  },
})

const clientHelpers: ClientHelpers = {
  sendInChat(channel: string, message: string) {
    void chatClient.say(channel, message)
  },
  whisper(username: string, message: string) {
    void chatClient.whisper(username, message)
  },
}

for (const [event, handler] of Object.entries(handlers)) {
  chatClient.on(event as keyof Events, handler(clientHelpers))
}

void chatClient.connect().then(([address, port]) => {
  console.log(`${process.env.BOT_USERNAME.toString()} successfully connected to ${address}:${port}`)
  return undefined
})
