import React from 'react'
import { StoryWrapper, StoryGetter, StoryContext } from '@storybook/addons'
import { themes } from '../..'
import { AppProvider } from '../../components/structure/AppProvider/AppProvider'

export const WithAppProvider: StoryWrapper = (Story: StoryGetter, context: StoryContext) => {
  // context.globalArgs.theme here will be either 'light' or 'dark'
  // getTheme being a function retrieving the actual theme object from that value
  const themeName: 'light' | 'dark' = context.globalArgs.theme

  return (
    <AppProvider theme={themes[themeName]}>
      <Story {...context} />
    </AppProvider>
  )
}
