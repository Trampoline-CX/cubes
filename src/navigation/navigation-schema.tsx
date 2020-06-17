import React from 'react'
import { View, Text } from 'react-native'

export interface StackNavigator {
  readonly stack: NavigatorsOrScreens
}

export interface SwitchNavigator {
  readonly switch: NavigatorsOrScreens
}

export type Navigator = StackNavigator | SwitchNavigator
type NavigatorsOrScreens = readonly (Screen | Navigator)[]
export type Screen = {
  readonly name: string
  readonly screen: React.ComponentType
}

export type NavigationSchema = Navigator

const MoneyScreen: React.FC = () => <Text>Money</Text>
const TransactionScreen: React.FC = () => <Text>TransactionScreen</Text>
const ExploreScreen: React.FC = () => <Text>Explore</Text>
const ProfileScreen: React.FC = () => <Text>ProfileScreen</Text>

export const schema = {
  switch: [
    {
      stack: [
        { name: 'MoneyScreen', screen: MoneyScreen },
        { name: 'TransactionDetail', screen: TransactionScreen },
      ],
    } as const,
    { name: 'Explore' as const, screen: ExploreScreen },
    { name: 'Profile', screen: ProfileScreen },
  ],
} as const

type Screens<T extends NavigatorsOrScreens> = {
  [P in keyof T]: T[P] extends Screen
    ? T[P]['name']
    : T[P] extends Navigator
    ? NavigatorScreens<T[P]>
    : never
}[Extract<keyof T, number>]

type NavigatorScreens<T extends Navigator> = T extends StackNavigator
  ? Screens<T['stack']>
  : T extends SwitchNavigator
  ? Screens<T['switch']>
  : never

type ConcreteScreensSimple = Screens<typeof schema['switch']>
type ConcreteScreens<T extends Navigator> = NavigatorScreens<T>

const func = <T extends Navigator>(scheme: T): ConcreteScreens<T> => {}

const test = func(schema)

// type Screens<T extends (Navigator | Screen)[]> = {
//   [P in keyof T]: T[P] extends Navigator ? NavigatorScreens<T[P]> : T[P]
// }

// type NavigatorScreens<T extends Navigator> = T extends StackNavigator
//   ? Screens<T['stack']>
//   : T extends SwitchNavigator
//   ? Screens<T['switch']>
//   : never

type screens = NavigatorScreens<typeof schema>

// ------------------------
