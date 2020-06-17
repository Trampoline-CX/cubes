import { useContext } from 'react'
import { Navigation, NavigationContext } from './NavigationProvider'
import { NavigationSchema } from './types'

export const useNav = <Schema extends NavigationSchema>(): Navigation<Schema> =>
  useContext(NavigationContext)
