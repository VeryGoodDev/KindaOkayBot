import { css } from '@emotion/css'

const year = new Date().getFullYear()

const footerCss = css`
  align-items: center;
  background-color: hsl(180, 0%, 0%);
  display: grid;
  font-size: small;
  gap: 12px;
  justify-content: space-between;
  padding: 12px 8px;

  ul {
    align-content: center;
    column-gap: 16px;
    display: grid;
    grid-auto-flow: column;
    justify-content: end;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;

    &:focus-visible {
      border-radius: 1px;
      outline-offset: 8px;
      outline: 2px solid hsl(180, 93%, 50%);
    }
  }

  @media (min-width: 512px) {
    grid-template-columns: auto 1fr;
    padding: 16px;

    ul {
      padding-inline: 16px;
    }
  }
`

const SiteFooter = () => (
  <footer class={footerCss}>
    <span>
      &copy;&nbsp;
      {`${year} VeryGoodDev`}
    </span>
    <nav>
      <ul>
        <li>
          <a href="https://github.com/verygooddev/kindaokaybot">Source</a>
        </li>
        <li>
          Icons by
          {` `}
          <a href="https://phosphoricons.com">Phosphor</a>
        </li>
        <li>
          <a href="https://twitter.com/_verygooddev">Contact Dev</a>
        </li>
      </ul>
    </nav>
  </footer>
)

export default SiteFooter
