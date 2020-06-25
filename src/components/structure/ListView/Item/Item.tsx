import React, { useMemo } from 'react'
import { Box } from '../../Box/Box'
import { Heading, Caption } from '../../../text'
import { IconAction, IconButton } from '../../../actions'
import { Touchable } from '../../../base'

export interface ItemProps {
  /**
   * Title displayed on the Item.
   */
  title: string
  /**
   * Optional description to display below the title.
   */
  description?: string
  /**
   * Optional actions displayed as `IconButton` on the right of the item.
   * Icons appear in reverse order (first icon is the rightmost one), as
   * the first one should be the more important.
   */
  actions?: IconAction[]
  /**
   * Action to execute on Item click.
   */
  onClick?: () => void
}

/**
 * Display an Item in a List.
 */
export const Item: React.FC<ItemProps> = ({ title, description, actions, onClick }) => {
  const actionItems = useMemo(
    () =>
      actions?.map((item, i) => (
        <IconButton
          key={i}
          icon={item.icon}
          onClick={item.action}
          color={item.color}
          size="small"
        />
      )),
    [actions],
  )

  return (
    <Touchable onClick={onClick}>
      <Box horizontal align="center" distribution="space-between">
        {/* Additional Box adding spacing to have consistent height with or without actions */}
        <Box paddingY="xSmall">
          <Box paddingX="medium" paddingY="small">
            <Heading maxLines={1}>{title}</Heading>
            <Caption maxLines={2}>{description}</Caption>
          </Box>
        </Box>

        {actionItems && (
          <Box horizontal reverse>
            {actionItems}
          </Box>
        )}
      </Box>
    </Touchable>
  )
}
