import { Route, Router } from 'preact-router'
import { Suspense, lazy } from 'preact/compat'

import ErrorPage from './ErrorPage'
import GlobalStyles from './GlobalStyles'
import HomePage from './HomePage'
import SiteHeader from './SiteHeader'

const CommandsPage = lazy(() => import(`./CommandsPage`))

const Paths = (() => {
  const isLocal = window.location.hostname === `localhost`
  const root = isLocal ? `/` : `/kindaokaybot`
  return {
    BOT_IMAGE: `./src/img/kindaokaybot.png`,
    COMMANDS: `${root}/commands`.replace(`//`, `/`),
    HOME: root,
  } as const
})()

const App = () => (
  <>
    <GlobalStyles />
    <SiteHeader />
    <main>
      <Router>
        <Route component={HomePage} path={Paths.HOME} />
        <Suspense fallback="Loading commands..." path={Paths.COMMANDS}>
          <CommandsPage />
        </Suspense>
        <Route component={ErrorPage} default={true} />
      </Router>
    </main>
  </>
)

export default App
export { Paths }
