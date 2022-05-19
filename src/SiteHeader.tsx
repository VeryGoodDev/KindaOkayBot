import { css } from '@emotion/css'

import { Paths } from './App'

const headerCss = css`
  --top-pad: 12px;
  --side-pad: calc(var(--top-pad) * 2);
  --bottom-pad: calc(var(--top-pad) + 2px);

  --bg-angle: 135deg;
  --bg-stripe-start: 85%;
  --bg-stripe-width: 2.5%;
  --bg-stripe-blend: 0%;

  align-items: center;
  background-color: hsl(0 0% 0%);
  background-image: linear-gradient(
    var(--bg-angle),
    hsl(0, 0%, 0%) 0%,
    hsl(0, 0%, 0%) calc(var(--bg-stripe-start) - var(--bg-stripe-blend)),
    hsl(180, 93%, 20%) var(--bg-stripe-start)
  );
  column-gap: 24px;
  display: grid;
  grid-template-columns: auto 1fr;
  padding: var(--top-pad) var(--side-pad) var(--bottom-pad);
`

const logoLinkCss = css`
  --border-width: 4px;
  --img-height: 32px;

  background-color: hsl(180, 93%, 85%);
  border-radius: 50%;
  border: var(--border-width) solid hsl(180, 93%, 20%);
  height: calc(var(--img-height) + (var(--border-width) * 2));

  img {
    border-radius: 50%;
    border: 2px solid hsl(0 0% 0%);
    height: var(--img-height);
  }
`

const navCss = css`
  a {
    color: inherit;
    font-weight: bold;
    text-decoration: none;
    text-transform: uppercase;
    transition: 120ms color ease-in-out;

    &:hover {
      color: hsl(180, 93%, 50%);
    }
  }
`

const SiteHeader = () => (
  <header class={headerCss}>
    <a class={logoLinkCss} href={Paths.HOME}>
      <img alt="Bot" src={Paths.BOT_IMAGE} />
    </a>
    <nav class={navCss}>
      <a href={Paths.COMMANDS}>Commands</a>
    </nav>
  </header>
)

export default SiteHeader
