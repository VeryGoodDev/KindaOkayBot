const { spawn } = require(`node:child_process`)
const { getPreactBuildRunner } = require(`@vgd/esbuild-util`)
const { readdir, rm: deleteFile } = require(`node:fs/promises`)
const { join } = require(`node:path`)

const commonOverrides = {
  outdir: `site`,
  splitting: true,
}

const SITE_DIR = join(process.cwd(), `site`)
const clearSiteDir = async () => {
  const siteFiles = await readdir(SITE_DIR)
  await Promise.all(siteFiles.map((file) => deleteFile(join(SITE_DIR, file))))
}

const build = async () => {
  await clearSiteDir()
  const runBuild = await getPreactBuildRunner()
  const start = performance.now()
  void runBuild({
    ...commonOverrides,
    minify: true,
  }).then(() => {
    const diff = (performance.now() - start).toFixed(2)
    console.log(`[site:build] Site built in ${diff}ms`)

    return undefined
  })
}

const dev = async () => {
  await clearSiteDir()
  const runBuild = await getPreactBuildRunner()
  const start = performance.now()
  void runBuild({
    ...commonOverrides,
    sourcemap: true,
    watch: {
      onRebuild(error) {
        if (error) {
          console.error(`[site:dev] An error occurred while rebuilding the site:`)
          console.error(error)
        } else {
          console.log(`[site:dev] Site successfully rebuilt`)
        }
      },
    },
  }).then((buildResult) => {
    const diff = (performance.now() - start).toFixed(2)
    console.log(`[site:dev] Site built in ${diff}ms`)
    console.log(`[site:dev] Starting local server`)

    const serverProcess = spawn(`serve`, [`-p`, `9000`, `--single`], {
      stdio: `inherit`,
    })
    serverProcess.on(`exit`, () => {
      console.log(`Shutting down build runner`)
      buildResult.stop()
    })

    return undefined
  })
}

if (process.argv.includes(`--build`)) {
  void build()
} else if (process.argv.includes(`--dev`)) {
  void dev()
} else {
  throw new Error(`This script must be provided with either the --build option or the --dev option`)
}
