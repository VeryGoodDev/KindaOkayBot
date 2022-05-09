import { config } from 'dotenv'
import { client as TmiClient } from 'tmi.js'

import handlers from './clientHandlers.js'

config()

const chatClient = new TmiClient({
  channels: [process.env.CHANNEL_NAME],
  identity: {
    password: process.env.OAUTH_TOKEN,
    username: process.env.BOT_USERNAME,
  },
})

for (const [event, handler] of Object.entries(handlers)) {
  chatClient.on(event, handler)
}

void chatClient.connect().then(([address, port]) => {
  console.log(`${process.env.BOT_USERNAME} successfully connected to ${address}:${port}`)
  return undefined
})
