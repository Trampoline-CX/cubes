import React from 'react'
import { BodyText } from '../../../text'
import { Box } from '../../../structure'
import { Touchable } from '../../../base'

export interface ItemProps {
  /**
   * Label of the Item.
   */
  label: string
  /**
   * Action to execute on click.
   */
  onSelect: () => void
}

/**
 * Item shown in a Popover.
 */
export const Item: React.FC<ItemProps> = ({ label, onSelect }) => (
  <Touchable onClick={onSelect}>
    <Box paddingX="medium" paddingY="small">
      <BodyText>{label}</BodyText>
    </Box>
  </Touchable>
)
