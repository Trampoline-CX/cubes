import React from 'react'
import { View, Text } from 'react-native'

export interface StackNavigator {
  stack: []
}

export interface SwitchNavigator {
  switch: []
}

export type Navigator = StackNavigator | SwitchNavigator

export type NavigationSchema = Navigator

const MoneyScreen: React.FC = () => <Text>Money</Text>
const TransactionScreen: React.FC = () => <Text>TransactionScreen</Text>
const ExploreScreen: React.FC = () => <Text>Explore</Text>
const ProfileScreen: React.FC<{ id: string }> = () => <Text>ProfileScreen</Text>

type Screen<T extends React.FC<any>> = T extends React.FC<infer P> ? P : never

export namespace NavigatorParamList {
  export type Root = {
    Money: undefined
    Explore: undefined
    Profile: Screen<typeof ProfileScreen>
  }

  export type Money = {}
}

type Screens<T extends (Navigator | Screen)[]> = {
  [P in keyof T]: T[P] extends Navigator ? NavigatorScreens<T[P]> : T[P]
}

type NavigatorScreens<T extends Navigator> = T extends StackNavigator
  ? Screens<T['stack']>
  : T extends SwitchNavigator
  ? Screens<T['switch']>
  : never

type screens = NavigatorScreens<typeof schema>

// type ConcreteSchema<T extends Navigator> = {
//   [P in Extract<keyof T, string>]:
// }

// ------------------------
