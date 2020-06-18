import { navigatorBuilders } from './all'
import { Screen, Navigator } from './types'

export const isNavigator = (element: Screen<string> | Navigator): element is Navigator =>
  navigatorBuilders.findIndex(x => x.name in element) >= 0
