import { Screen, Navigator } from './types'

export const isNavigator = (element: Screen<string> | Navigator): element is Navigator =>
  'stack' in element || 'switch' in element
