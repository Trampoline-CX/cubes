/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

/**
 * UnionToIntersection
 *
 * @description Get intersection type given union type `U`
 * Credit: jcalz
 * @see https://stackoverflow.com/a/50375286/7381355
 * @example
 *   // Expect: { name: string } & { age: number } & { visible: boolean }
 *   UnionToIntersection<{ name: string } | { age: number } | { visible: boolean }>
 */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never

export interface StackNavigator {
  readonly stack: NavigatorsOrScreens
}

export interface SwitchNavigator {
  readonly switch: NavigatorsOrScreens
}

export type Navigator = StackNavigator | SwitchNavigator
type NavigatorsOrScreens = readonly (Screen<string> | Navigator)[]
export type Screen<Name extends string> = {
  [P in Name]: React.ComponentType<any>
}

export type NavigationSchema = Navigator

// const MoneyScreen: React.FC = () => <Text>Money</Text>
// const TransactionScreen: React.FC<{ id: string }> = () => <Text>TransactionScreen</Text>
// const ExploreScreen: React.FC = () => <Text>Explore</Text>
// const ProfileScreen: React.FC = () => <Text>ProfileScreen</Text>

// export const schema = {
//   switch: [
//     {
//       stack: [{ MoneyScreen }, { TransactionScreen }],
//     },
//     { ExploreScreen },
//     { ProfileScreen },
//   ],
// } as const

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

type ScreenNames<T extends Screen<string>> = keyof {
  [P in Extract<keyof UnionToIntersection<T>, string>]: UnionToIntersection<
    T
  >[P] extends React.ComponentType<any>
    ? P
    : never
}

export type ScreenArguments<T> = {
  [P in Extract<keyof UnionToIntersection<T>, string>]: UnionToIntersection<
    T
  >[P] extends React.ComponentType<any>
    ? ScreenPropType<UnionToIntersection<T>[P]> extends Record<string, never>
      ? [P]
      : [P, ScreenPropType<UnionToIntersection<T>[P]>]
    : never
}[Extract<keyof UnionToIntersection<T>, string>]

type ScreenPropType<T extends React.ComponentType<any>> = T extends React.ComponentType<infer P>
  ? P
  : never

// type screens = NavigatorScreens<typeof schema>
// type Names = ScreenNames<screens>
// type Args = ScreenArguments<screens>
