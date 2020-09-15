import { useMemo } from 'react'
import { useAppProviderDimensions } from '../../components/dev'
import { useTheme } from '../../theme'

export interface ResponsiveOptions<T> {
  /**
   * Options for small devices (width <= `theme.size.breakpoints.small`).
   */
  small: T
  /**
   * Options for medium size devices (`theme.size.breakpoints.small` < width < `theme.size.breakpoints.large`).
   */
  medium: T
  /**
   * Options for large devices (width >= `theme.size.breakpoints.large`).
   */
  large: T
}

/**
 * Hook returning a value which depends on responsive size. Options passed determine which
 * value will be returned for each screen size.
 */
export const useResponsive = <T>({ small, medium, large }: ResponsiveOptions<T>): T => {
  const { width } = useAppProviderDimensions()
  const { breakpoints } = useTheme().size

  return useMemo(() => {
    if (width <= breakpoints.small) {
      return small
    } else if (width >= breakpoints.large) {
      return large
    } else {
      return medium
    }
  }, [width, breakpoints, small, large, medium])
}
