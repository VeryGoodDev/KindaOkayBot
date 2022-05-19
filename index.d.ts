interface BotEnvironment {
  BOT_USERNAME: string
  OAUTH_TOKEN: string
  CHANNEL_NAME: string
  API_CLIENT_ID: string
  API_CLIENT_SECRET: string
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends BotEnvironment {}
  }
}

declare module '*.png'

export {}
