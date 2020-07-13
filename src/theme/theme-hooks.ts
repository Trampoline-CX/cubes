import { StyleSheet } from 'react-native'
import { useContext, useMemo } from 'react'
import { AppProviderContext } from '../components/structure/AppProvider/AppProviderContext'
import { Theme } from './theme-types'

/**
 * Constructs styles and memoize them according to the current theme.
 */
export const useStyles = <Style extends StyleSheet.NamedStyles<Style>>(
  builder: (theme: Theme) => Style,
): Style => {
  const theme = useTheme()
  return useMemo(() => builder(theme), [theme])
}

/**
 * Return the current theme.
 */
export const useTheme = (): Theme => useContext(AppProviderContext).theme
