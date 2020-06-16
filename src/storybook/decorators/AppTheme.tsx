import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { DecoratorFunction, useCallback } from '@storybook/addons'
import { Button } from '../..'
import { StorybookThemeContext } from '../utils/StorybookThemeContext'

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})

export const AppTheme: DecoratorFunction<React.ReactNode> = storyFn => {
  const theme = useContext(StorybookThemeContext)

  const onThemeToggleClick = useCallback(() => {
    theme.setThemeName(theme.currentThemeName === 'light' ? 'dark' : 'light')
  }, [])

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.root,
          { backgroundColor: theme.currentTheme.colors.fill.background.default },
        ]}
      >
        <View style={styles.root}>{storyFn()}</View>
        <Button primary onClick={onThemeToggleClick}>
          {`Toggle theme (${theme.currentThemeName})`}
        </Button>
      </View>
    </View>
  )
}
