import { css } from '@emotion/css'
import { SketchLogo, Sword } from 'phosphor-react'

import { PermissionLevels } from '../../chatbot/commands'

import type { PublicPermissionLevels } from '../../chatbot/commands'
import type { IconProps } from 'phosphor-react'

interface BadgeProps {
  group: PublicPermissionLevels
}

const names = {
  [PermissionLevels.ALL]: `Everyone`,
  [PermissionLevels.MOD]: `Mods`,
  [PermissionLevels.VIP]: `VIPs`,
} as const
const icons = {
  [PermissionLevels.ALL]: () => null,
  [PermissionLevels.MOD]: (props: IconProps) => <Sword {...props} />,
  [PermissionLevels.VIP]: (props: IconProps) => <SketchLogo {...props} />,
} as const

const badgeCss = css`
  border-radius: 20px;
  color: hsl(180, 0%, 0%);
  font-size: 0.75rem;
  font-weight: bold;
  padding: 4px 8px;
  text-transform: uppercase;

  display: inline-grid;
  grid-auto-flow: column;
  align-items: center;
  column-gap: 2px;

  &[data-group='${PermissionLevels.ALL}'] {
    background-color: hsl(180, 93%, 85%);
  }

  &[data-group='${PermissionLevels.MOD}'] {
    background-color: hsl(150, 75%, 50%);
  }

  &[data-group='${PermissionLevels.VIP}'] {
    background-color: hsl(310, 93%, 50%);
  }
`

const Badge = ({ group }: BadgeProps) => {
  const Icon = icons[group]
  return (
    <span class={badgeCss} data-group={group}>
      <Icon size={16} weight="bold" />
      {names[group]}
    </span>
  )
}

export default Badge
