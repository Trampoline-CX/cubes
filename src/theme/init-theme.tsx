import React, { useContext, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { Theme } from './theme-types'
import { themes } from './themes'

/**
 * ThemeContext to use for managing the theming functionality.
 */
export const ThemeContext = React.createContext<Theme>(themes.light)

export const useStyles = <Style extends StyleSheet.NamedStyles<Style>>(
  builder: (theme: Theme) => Style,
): Style => {
  const theme = useContext(ThemeContext)

  return useMemo(() => builder(theme), [theme])
}
