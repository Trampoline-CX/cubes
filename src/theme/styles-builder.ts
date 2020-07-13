import { StyleSheet } from 'react-native'
import { useContext, useMemo } from 'react'
import { AppProviderContext } from '../components/structure/AppProvider/AppProviderContext'
import { Theme } from './theme-types'

export type StylesBuilder<T extends StyleSheet.NamedStyles<T>> = (theme: Theme) => T

export const createStyles = <T extends StyleSheet.NamedStyles<T>>(
  builder: StylesBuilder<T>,
): StylesBuilder<T> => builder

/**
 * Constructs styles and memoize them according to the current theme.
 */
export const useStylesBuilder = <T extends StyleSheet.NamedStyles<T>>(
  builder: StylesBuilder<T>,
): T => {
  const theme = useTheme()
  return useMemo(() => builder(theme), [theme])
}

/**
 * Return the current theme.
 */
export const useTheme = (): Theme => useContext(AppProviderContext).theme
