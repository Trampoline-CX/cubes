import React from 'react'
import { StoryWrapper, StoryGetter, StoryContext } from '@storybook/addons'
import { View, StyleSheet } from 'react-native'
import { themes } from '../..'
import { AppProvider } from '../../components/structure/AppProvider/AppProvider'

export const WithAppProvider: StoryWrapper = (Story: StoryGetter, context: StoryContext) => {
  // context.globals.theme here will be either 'light' or 'dark'
  // getTheme being a function retrieving the actual theme object from that value
  const themeName: 'light' | 'dark' | 'side-by-side' | 'stacked' = context.globals.theme

  switch (themeName) {
    case 'side-by-side':
      return (
        <View style={styles.horizontal}>
          <AppProvider theme={themes.light}>
            <Story {...context} />
          </AppProvider>
          <AppProvider theme={themes.dark}>
            <Story {...context} />
          </AppProvider>
        </View>
      )
    case 'stacked':
      return (
        <View>
          <AppProvider theme={themes.light}>
            <Story {...context} />
          </AppProvider>
          <AppProvider theme={themes.dark}>
            <Story {...context} />
          </AppProvider>
        </View>
      )
    default:
      return (
        <AppProvider theme={themes[themeName]}>
          <Story {...context} />
        </AppProvider>
      )
  }
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
  },
})
