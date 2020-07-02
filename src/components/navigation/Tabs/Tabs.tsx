import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Box } from '../../structure/Box/Box'
import { useStyles } from '../../../theme'
import { Tab } from './Tab/Tab'

export interface TabsProps {
  /**
   * List of tabs.
   */
  tabs: string[]
  /**
   * Index of selected tab.
   */
  selected: number
  /**
   * Callback when tab is selected.
   */
  onSelect: (selectedTabIndex: number) => void
  /**
   * Content to display in tabs.
   */
  children: React.ReactNode
}

/**
 * Use to alternate among related views sharing the same context.
 */
export const Tabs: React.FC<TabsProps> = ({ tabs, selected, onSelect, children }) => {
  const styles = useStyles(theme => ({
    tabsContainer: {
      flexDirection: 'row',
      alignItems: 'stretch',
      backgroundColor: theme.colors.fill.background.lighter,
      ...theme.elevation.z8,
    },
  }))

  const tabItems = useMemo(
    () =>
      tabs.map((tab, index) => (
        <Tab
          key={tab}
          label={tab}
          selected={selected === index}
          // eslint-disable-next-line react/jsx-no-bind
          onSelect={() => onSelect(index)}
        />
      )),
    [tabs, selected, onSelect],
  )

  return (
    <Box fill>
      <View style={styles.tabsContainer}>{tabItems}</View>
      {children}
    </Box>
  )
}
