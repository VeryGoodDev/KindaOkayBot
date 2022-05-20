import { css } from '@emotion/css'

const beepBoopCss = css`
  display: grid;
  font-family: Righteous, sans-serif;
  font-size: 3rem;
  height: 100%;
  place-items: center;
`

const HomePage = () => <div class={beepBoopCss}>Beep boop</div>

export default HomePage
