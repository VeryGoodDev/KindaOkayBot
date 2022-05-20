import { css } from '@emotion/css'

const errorPageCss = css`
  display: grid;
  height: 100%;
  place-content: center;
  row-gap: 16px;
  text-align: center;

  * {
    margin: 0;
  }

  h1 {
    font-family: Righteous, inherit;
    font-size: 4rem;
  }

  p {
    font-style: italic;
  }
`

const ErrorPage = () => (
  <div class={errorPageCss}>
    <h1>404</h1>
    <p>Page not found</p>
  </div>
)

export default ErrorPage
