import { useContext } from 'react'
import { NavigationSchema } from './types'
import { Navigation, NavigationContext } from './NavigationProvider'

/**
 * Custom hook to handle navigation in components contained in `AppProvider`.
 *
 * Note that you can alias this with your `NavigationSchema` for simpler usage.
 *
 * @example
 * export const useNavigation = () => useNav<typeof mySchema>()
 */
export const useNav = <Schema extends NavigationSchema>(): Navigation<Schema> =>
  useContext(NavigationContext)
