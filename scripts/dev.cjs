const { spawn } = require(`node:child_process`)

const buildChatbot = require(`./buildChatbot.cjs`)

void buildChatbot({
  watch: {
    onRebuild(error) {
      if (error) {
        console.error(`[dev] An error occurred while rebuilding the chatbot:`)
        console.error(error)
      } else {
        console.log(`[dev] Chatbot successfully rebuilt`)
      }
    },
  },
}).then((buildResult) => {
  console.log(`[dev] Starting the chatbot`)
  const botProcess = spawn(`nodemon`, [`dist/chatbot/index.js`], {
    stdio: [`inherit`, `inherit`, `inherit`, `ipc`],
  })

  let isFirstStart = true
  botProcess.on(`message`, (message) => {
    if (message.type === `crash`) {
      console.error(`[dev] 😱 Chatbot crashed!`)
    } else if (message.type === `restart`) {
      console.log(`[dev] 🔃 Chatbot successfully restarted`)
    } else if (message.type === `start` && isFirstStart) {
      console.log(`[dev] ✅ Chatbot successfully started`)
      isFirstStart = false
    }
  })

  botProcess.on(`exit`, () => {
    buildResult.stop()
  })

  return undefined
})
