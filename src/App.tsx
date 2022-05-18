import { Route, Router } from 'preact-router'
import { Suspense, lazy } from 'preact/compat'

import ErrorPage from './ErrorPage'

const HomePage = lazy(() => import(`./HomePage`))
const CommandsPage = lazy(() => import(`./CommandsPage`))

const Paths = (() => {
  const isLocal = window.location.hostname === `localhost`
  const root = isLocal ? `/` : `/kindaokaybot`
  return {
    COMMANDS: `${root}/commands`.replace(`//`, `/`),
    HOME: root,
  } as const
})()

const App = () => (
  <>
    <nav style={{ marginBlockEnd: 12 }}>
      <a href={Paths.HOME}>Home</a>
      <span style={{ display: `inline-block`, width: 12 }} />
      <a href={Paths.COMMANDS}>Commands</a>
    </nav>
    <main>
      <Router>
        <Suspense fallback="Loading..." path={Paths.HOME}>
          <HomePage />
        </Suspense>
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
