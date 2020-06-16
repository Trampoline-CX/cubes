import React from 'react'
import { Tab } from './Tab/Tab'
import { useStyles } from '../../../theme'
import { View } from 'react-native'

export interface BottomNavigationBarProps {
  /**
   * Tabs to display. Should be `BottomNavigationBar.Tab` components.
   */
  children: React.ReactNode
}

/**
 * Bottom bar for tab navigation.
 */
export const BottomNavigationBar: React.FC<BottomNavigationBarProps> & {
  Tab: typeof Tab
} = ({ children }) => {
  const styles = useStyles(theme => ({
    background: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      alignItems: 'stretch',
      background: theme.colors.fill.background.lighter,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      ...theme.elevation.z8,
    },
  }))

  return <View style={styles.background}>{children}</View>
}

BottomNavigationBar.Tab = Tab
