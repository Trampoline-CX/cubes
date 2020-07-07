import React from 'react'
import { View } from 'react-native'
import { useStyles } from '../../../theme'
import { Tab } from './Tab/Tab'

export interface BottomNavigationBarProps {
  /**
   * Tabs to display. Should be `BottomNavigationBar.Tab` components.
   */
  children: React.ReactNode
}

/**
 * Display the primary navigation as tabs appearing at the bottom of the Screen.
 * Clicking a tab should change screens in the application.
 *
 * There should always be between 2 to 5 tabs. Never more or less than this.
 */
export const BottomNavigationBar: React.FC<BottomNavigationBarProps> & {
  Tab: typeof Tab
} = ({ children }) => {
  const styles = useStyles(theme => ({
    background: {
      flexDirection: 'row',
      alignItems: 'stretch',
      backgroundColor: theme.colors.fill.background.lighter,
      ...theme.elevation.z8,
    },
  }))

  return <View style={styles.background}>{children}</View>
}

BottomNavigationBar.Tab = Tab
