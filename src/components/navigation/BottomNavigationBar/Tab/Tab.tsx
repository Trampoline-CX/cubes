import React from 'react'
import { IconName, Icon } from '../../../images-and-icons/Icon/Icon'
import { useStyles } from '../../../../theme'
import { Touchable } from '../../../base/Touchable/Touchable'
import { Box } from '../../../structure/Box/Box'

export interface TabProps {
  /**
   * Icon to display.
   */
  icon: IconName
  /**
   * Is the tab selected?
   */
  selected?: boolean
  /**
   * Called onClick of the tab.
   */
  onClick: () => void
}

/**
 * Tab component to display in `BottomNavigationBar`.
 */
export const Tab: React.FC<TabProps> = ({ icon, onClick, selected = false }) => {
  const styles = useStyles(theme => ({
    touchable: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.medium,
    },
  }))

  return (
    <Box fill>
      <Touchable viewStyle={styles.touchable} onClick={onClick}>
        <Icon name={icon} color={selected ? 'accent' : 'primary'} />
      </Touchable>
    </Box>
  )
}
