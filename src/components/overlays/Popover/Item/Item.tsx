import React, { useCallback } from 'react'
import { MenuOption } from 'react-native-popup-menu'
import { useTextStyles } from '../../../text'
import { useStyles } from '../../../../theme'

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
export const Item: React.FC<ItemProps> = ({ label, onSelect }) => {
  const { textStyles } = useTextStyles()
  const styles = useStyles(theme => ({
    wrapper: {
      paddingHorizontal: theme.spacing.medium,
      paddingVertical: theme.spacing.small,
    },
  }))

  return (
    <MenuOption
      onSelect={onSelect}
      customStyles={{ optionWrapper: styles.wrapper, optionText: textStyles.body }}
      text={label}
    />
  )
}
