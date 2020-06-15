import React from 'react'
import { View, StyleSheet } from 'react-native'
import { DecoratorFunction } from '@storybook/addons'
import { StorybookThemeContext } from '../utils/StorybookThemeContext'
import { themes } from '../..'

const style = StyleSheet.create({
  root: {
    flex: 1,
  },
})

export const DarkBackground: DecoratorFunction<React.ReactNode> = storyFn => (
  <StorybookThemeContext.Consumer>
    {(theme): React.ReactNode => (
      <View
        style={[
          style.root,
          {
            backgroundColor: (theme.currentThemeName === 'light' ? themes.dark : themes.light)
              .colors.fill.background.default,
          },
        ]}
      >
        {storyFn()}
      </View>
    )}
  </StorybookThemeContext.Consumer>
)
