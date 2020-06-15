import React from 'react'
import { themes, Theme } from '../..'

type ThemeName = keyof typeof themes

interface ThemeContext {
  currentTheme: Theme
  currentThemeName: ThemeName
  setThemeName: (themeName: ThemeName) => void
}

export const StorybookThemeContext = React.createContext<ThemeContext>({
  currentTheme: themes.light,
  setThemeName: () => {},
  currentThemeName: 'light',
})
