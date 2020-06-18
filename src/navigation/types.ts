/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Navigator } from './navigators'

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

/**
 * Provides a Navigation Schema to configure Navigation.
 */
export type NavigationSchema = Navigator

/**
 * Provide Screen arguments type for navigation functions.
 * Retrieve Screen elements from the Navigation Schema and returns a Tuple representing the
 * screen name and arguments.
 *
 * For example, if we have 2 screens:
 *
 * @example
 * const ScreenA: React.FC = () => <View />
 * const ScreenB: React.FC<{ id: string }> = ({ id }) => <View />
 *
 * // Navigation Schema
 * const schema = {
 *   stack: [{ ScreenA }, { ScreenB }]
 * } as const
 *
 * // For this Schema, will return Tuples ['ScreenA'] and ['ScreenB', { id: string }]
 */
export type ScreenArguments<T> = {
  [P in Extract<keyof UnionToIntersection<T>, string>]: UnionToIntersection<
    T
  >[P] extends React.ComponentType<any>
    ? ScreenPropType<UnionToIntersection<T>[P]> extends Record<string, never>
      ? [P]
      : [P, ScreenPropType<UnionToIntersection<T>[P]>]
    : never
}[Extract<keyof UnionToIntersection<T>, string>]

/**
 * Infer the Props type from a React Component.
 */
type ScreenPropType<T extends React.ComponentType<any>> = T extends React.ComponentType<infer P>
  ? P
  : never
