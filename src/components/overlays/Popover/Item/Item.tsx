import React from 'react'
import { BodyText } from '../../../text'
import { Box } from '../../../structure'
import { Touchable } from '../../../base'
import { IconName, IconProps, Icon } from '../../../images-and-icons'

export interface ItemProps {
  /**
   * Label of the Item.
   */
  label: string
  /**
   * Optional Icon.
   */
  icon?: IconName
  /**
   * Color of the Icon.
   */
  iconColor?: IconProps['color']
  /**
   * Action to execute on click.
   */
  onSelect: () => void
}

/**
 * Item shown in a Popover.
 */
export const Item: React.FC<ItemProps> = ({ label, icon, iconColor, onSelect }) => (
  <Touchable onClick={onSelect}>
    <Box horizontal space="small" paddingX="medium" paddingY="small" align="center">
      {icon ? <Icon name={icon} color={iconColor} /> : null}
      <BodyText>{label}</BodyText>
    </Box>
  </Touchable>
)
