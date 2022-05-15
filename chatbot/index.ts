import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

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

const chatLog: string[] = []

const clientHelpers: ClientHelpers = {
  logEvent(logEntry: string) {
    const time = new Date().toLocaleTimeString(`en`, { hour12: false })
    const entry = `[${time}] ${logEntry}`
    chatLog.push(entry)
  },
  sendInChat(channel: string, message: string) {
    void chatClient.say(channel, message)
  },
  whisper(username: string, message: string) {
    void chatClient.whisper(username, message)
  },
}

for (const [event, handler] of Object.entries(handlers)) {
  chatClient.on(event as keyof Events, handler(clientHelpers) as (...args: never) => void)
}

let chatClientIsConnected = false
chatClient.on(`connected`, (address, port) => {
  chatClientIsConnected = true
  clientHelpers.logEvent(`${process.env.BOT_USERNAME.toString()} chat client now connected to ${address}:${port}`)
})
chatClient.on(`disconnected`, (reason) => {
  chatClientIsConnected = false
  clientHelpers.logEvent(`${process.env.BOT_USERNAME.toString()} chat client disconnected with reason: ${reason}`)
})
void chatClient.connect()

let hasHandledExit = false
const handleExit = (exitCode: number): void => {
  const handleExitAsync = async (): Promise<void> => {
    if (chatClientIsConnected) {
      await chatClient.disconnect()
    }
    if (chatLog.length > -1) {
      const now = new Date()
      const year = now.getFullYear()
      const month = `${now.getMonth() + 1}`.padStart(2, `0`)
      const day = `${now.getDate()}`.padStart(2, `0`)
      const time = new Date().toLocaleTimeString(`en`, { hour12: false })
      const fileName = `chatbot-log-${year}-${month}-${day}-${time.replace(/:/g, ``)}`
      const filePath = join(process.cwd(), `chatbot`, fileName)

      const logSnapshot = [...chatLog]
      logSnapshot.push(`[${time}] Exit handler called with exit code ${exitCode}`)
      const logContents = logSnapshot.join(`\n`)

      await writeFile(filePath, logContents, `utf-8`)
      console.log(`log written to file, safe to finish exiting`)
    }
  }
  if (!hasHandledExit) {
    hasHandledExit = true
    void handleExitAsync()
  }
}
process.on(`exit`, handleExit)
process.on(`SIGINT`, handleExit)
