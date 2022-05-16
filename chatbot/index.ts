import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { config } from 'dotenv'
import { client as TmiClient } from 'tmi.js'

import handlers from './clientHandlers.js'
import { pluralize } from './util.js'

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

const accumulatedEvents: Partial<Record<keyof Events, number[]>> = {}
const chatLog: string[] = []

const clientHelpers: ClientHelpers = {
  addEvent(eventName: keyof Events, value: number) {
    if (!accumulatedEvents[eventName]) {
      accumulatedEvents[eventName] = []
    }
    accumulatedEvents[eventName]?.push(value)
  },
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
    if (chatLog.length > 0) {
      const now = new Date()
      const year = now.getFullYear()
      const month = `${now.getMonth() + 1}`.padStart(2, `0`)
      const day = `${now.getDate()}`.padStart(2, `0`)
      const time = new Date().toLocaleTimeString(`en`, { hour12: false })
      const fileName = `chatbot-${year}-${month}-${day}-${time.replace(/:/g, ``)}.log`
      const filePath = join(process.cwd(), `chatlog`, fileName)

      const logClone = [...chatLog]

      const pongCount = accumulatedEvents.pong?.length ?? 0
      const pongTimes = `${pongCount} ${pluralize(pongCount, `time`)}`
      const latencySum = accumulatedEvents.pong?.reduce((sum, latency) => sum + latency, 0) ?? 0
      const avgLatency = pongCount === 0 ? `0/0` : latencySum / pongCount
      logClone.push(`[${time}] pong event occurred ${pongTimes} with an average latency of ${avgLatency}ms`)
      logClone.push(`[${time}] Exit handler called with exit code ${exitCode}`)

      const logContents = logClone.join(`\n`)

      console.log(`writing log of ${logClone.length} entries to ${filePath}`)
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
