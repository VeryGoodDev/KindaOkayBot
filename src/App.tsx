import { Route, Router } from 'preact-router'
import { Suspense, lazy } from 'preact/compat'

import ErrorPage from './ErrorPage'
import HomePage from './HomePage'

const CommandsPage = lazy(() => import(`./CommandsPage`))

const App = () => (
  <>
    <nav style={{ marginBlockEnd: 12 }}>
      <a href="/">Home</a>
      <span style={{ display: `inline-block`, width: 12 }} />
      <a href="/commands">Commands</a>
    </nav>
    <Router>
      <HomePage path="/" />
      <Suspense fallback="Loading command info" path="/commands">
        <CommandsPage />
      </Suspense>
      <Route component={ErrorPage} default={true} />
    </Router>
  </>
)

export default App
