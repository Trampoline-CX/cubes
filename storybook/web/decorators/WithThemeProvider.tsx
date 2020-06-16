import React from 'react'
import { StoryWrapper, StoryGetter, StoryContext } from '@storybook/addons'
import { themes, ThemeContext } from '../../../src'

export const WithThemeProvider: StoryWrapper = (Story: StoryGetter, context: StoryContext) => {
  // context.globalArgs.theme here will be either 'light' or 'dark'
  // getTheme being a function retrieving the actual theme object from that value
  const themeName: 'light' | 'dark' = context.globalArgs.theme

  return (
    <ThemeContext.Provider value={themes[themeName]}>
      <Story {...context} />
    </ThemeContext.Provider>
  )
}
