const buildChatbot = require(`./buildChatbot.cjs`)

void buildChatbot({
  watch: {
    onRebuild(error) {
      if (error) {
        console.error(`[dev] An error occurred while rebuilding the chatbot:`)
        console.error(error)
      } else {
        console.log(`[dev] Successfully rebuilt the chatbot`)
      }
    },
  },
}).then(() => {
  // TODO start the bot
  console.log(`[dev] Starting the chatbot`)
  return undefined
})
