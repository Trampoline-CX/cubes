import { useContext } from 'react'
import { NavigationSchema } from './types'
import { Navigation, NavigationContext } from './NavigationProvider'

export const useNav = <Schema extends NavigationSchema>(): Navigation<Schema> =>
  useContext(NavigationContext)
