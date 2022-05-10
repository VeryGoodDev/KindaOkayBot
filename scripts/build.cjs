const buildChatbot = require(`./buildChatbot.cjs`)

buildChatbot().catch((err) => {
  console.error(`[build] Something went wrong building the chatbot:`)
  console.error(err)
  throw err
})
