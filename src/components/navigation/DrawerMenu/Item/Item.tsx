import React, { useCallback } from 'react'
import { IconName, Icon } from '../../../images-and-icons/Icon/Icon'
import { Touchable } from '../../../base/Touchable/Touchable'
import { Box } from '../../../structure/Box/Box'
import { Heading } from '../../../text'
import { useDrawerMenuContext } from '../Context/DrawerMenuContext'

export interface ItemProps {
  /**
   * Label to display.
   */
  label: string
  /**
   * Icon to display.
   */
  icon: IconName
  /**
   * Action to execute on click.
   */
  onClick?: () => void
  /**
   * If true, this Item will appear as the currently selected one.
   */
  selected?: boolean
}

export const Item: React.FC<ItemProps> = ({
  label,
  icon,
  onClick: onClickRaw = () => {},
  selected = false,
}) => {
  const { close } = useDrawerMenuContext()
  const onClick = useCallback(() => {
    onClickRaw()
    close()
  }, [onClickRaw, close])

  return (
    <Touchable onClick={onClick}>
      <Box horizontal paddingX="medium" paddingY="small" space="xLarge" align="center">
        <Icon name={icon} color={selected ? 'accent' : 'subdued'} />
        <Box paddingY="xSmall" fill>
          <Heading variation={selected ? 'accent' : 'subdued'}>{label}</Heading>
        </Box>
      </Box>
    </Touchable>
  )
}
