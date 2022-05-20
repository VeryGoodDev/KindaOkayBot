import { injectGlobal } from '@emotion/css'
import { useEffect } from 'preact/hooks'

const GlobalStyles = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions -- This has side effects and isn't technically unused
    injectGlobal`
      *, *::before, *::after {
        box-sizing: border-box;
      }
      html {
        /* Custom properties etc. */
      }
      body {
        background-color: hsl(180, 10%, 10%);
        color: hsl(180, 93%, 95%);
        font-family: Montserrat, sans-serif;
        font-size: 16px;
        margin: 0;
        padding: 0;
      }
      #app {
        display: grid;
        grid-template-rows: auto 1fr auto;
        min-height: 100vh;
      }
    `
  }, [])
  return null
}

export default GlobalStyles
