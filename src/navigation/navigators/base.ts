import { Navigator } from './types'

interface BuildArgs<T extends Navigator> {
  /**
   * Instance of the navigator that is being built.
   */
  navigator: T
  /**
   * Build the navigation tree for a nested navigator.
   */
  buildTreeForNavigator: (navigator: Navigator) => React.ComponentType
  /**
   * Build a screen.
   */
  buildScreen: (screen: React.ComponentType) => React.ComponentType
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface NavigatorBuilder<Name extends string, T extends Navigator> {
  readonly name: Name
  readonly build: (args: BuildArgs<T>) => React.ComponentType
}
