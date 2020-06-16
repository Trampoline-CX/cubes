import React from 'react'
import { View } from 'react-native'
import { IconName, Icon } from '../../../icons'
import { useStyles } from '../../../../theme'
import { shameStyles } from '../../../../theme/shame-styles'
import { Touchable } from '../../../base'

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

const { height } = shameStyles.bottomNavigationBar.tab

/**
 * Tab component to display in `BottomNavigationBar`.
 */
export const Tab: React.FC<TabProps> = ({ icon, onClick, selected = false }) => {
  const styles = useStyles(() => ({
    tab: {
      flex: 1,
    },
    touchable: {
      alignItems: 'center',
      justifyContent: 'center',
      height,
    },
  }))

  return (
    <View style={styles.tab}>
      <Touchable viewStyle={styles.touchable} onClick={onClick}>
        <Icon name={icon} color={selected ? 'accent' : 'primary'} />
      </Touchable>
    </View>
  )
}
