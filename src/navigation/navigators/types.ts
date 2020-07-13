import { StackNavigator } from './stack'
import { SwitchNavigator } from './switch'

export type Navigator = StackNavigator | SwitchNavigator

export type NavigatorsOrScreens = readonly (Screen<string> | Navigator)[]
export type Screen<Name extends string> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [P in Name]: React.ComponentType<any>
}

type Screens<T extends NavigatorsOrScreens> = {
  [P in keyof T]: T[P] extends Screen<string>
    ? T[P]
    : T[P] extends Navigator
    ? NavigatorScreens<T[P]>
    : never
}[Extract<keyof T, number>]

export type NavigatorScreens<T extends Navigator> = T extends StackNavigator
  ? Screens<T['stack']>
  : T extends SwitchNavigator
  ? Screens<T['switch']>
  : never

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
