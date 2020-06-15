import React from 'react'
import { View, StyleSheet } from 'react-native'
import { DecoratorFunction } from '@storybook/addons'
import { StorybookThemeContext } from '../utils/StorybookThemeContext'

const styles = StyleSheet.create({
  screen: {
    height: '100%',
  },
})

export const FakeScreen: DecoratorFunction<React.ReactNode> = storyFn => {
  const Story = storyFn as React.ComponentType

  return (
    <StorybookThemeContext.Consumer>
      {(theme): React.ReactNode => (
        <View
          style={[
            styles.screen,
            {
              backgroundColor: theme.currentTheme.colors.fill.background.default,
            },
          ]}
        >
          {<Story />}
        </View>
      )}
    </StorybookThemeContext.Consumer>
  )
}
