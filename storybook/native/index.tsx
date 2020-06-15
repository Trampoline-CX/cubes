import React, { useState } from 'react'
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native'
import { ThemeContext, themes } from '../../src'
import { AppTheme } from '../../src/storybook/decorators/AppTheme'
import { StorybookThemeContext } from '../../src/storybook/utils/StorybookThemeContext'
import { loadStories } from '../story-loader'

addDecorator(AppTheme)

// import stories
configure(() => {
  loadStories()
}, module)

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
// NOTE: Server was not included in build as it conflicts with `@storybook/react`
// library (since they both use `storybook-server` executable name)
const StorybookUIRoot = getStorybookUI({
  asyncStorage: require('react-native').AsyncStorage,
})

const BounceDesignSystemStorybookUIRoot: React.FC = () => {
  const [themeName, setThemeName] = useState<keyof typeof themes>('light')

  return (
    <StorybookThemeContext.Provider
      value={{
        currentTheme: themes[themeName],
        setThemeName,
        currentThemeName: themeName,
      }}
    >
      <ThemeContext.Provider value={themes[themeName]}>
        <StorybookUIRoot />
      </ThemeContext.Provider>
    </StorybookThemeContext.Provider>
  )
}

export default BounceDesignSystemStorybookUIRoot
