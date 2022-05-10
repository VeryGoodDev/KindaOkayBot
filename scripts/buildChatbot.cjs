const { createBuildRunner } = require(`@vgd/esbuild-util`)

/**
 * @typedef {import('@vgd/esbuild-util/src/builders').BuildOptions} BuildOptions
 */

const chatbotBuildRunner = createBuildRunner({
  bundle: true,
  entryPoints: [`chatbot/index.ts`],
  minify: true,
  outdir: `dist/chatbot`,
  platform: `node`,
})

/**
 * @param {Partial<BuildOptions>} [overrides] Any build options to override when running the chatbot build
 * @returns {ReturnType<chatbotBuildRunner>}
 */
const buildChatbot = (overrides) => {
  const start = performance.now()
  const precision = 2
  return chatbotBuildRunner(overrides).then((buildResult) => {
    const diff = (performance.now() - start).toFixed(precision)
    console.log(`[build] Finished chatbot build in ${diff}ms`)
    return buildResult
  })
}

module.exports = buildChatbot
