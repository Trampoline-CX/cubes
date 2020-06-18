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

export interface StackNavigatorOptions {
  animation?: 'none' | 'default'
}

export interface StackNavigator {
  readonly stack: NavigatorsOrScreens
  readonly options?: StackNavigatorOptions
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
