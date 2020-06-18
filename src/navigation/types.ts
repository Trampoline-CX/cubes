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

export type NavigationSchema = Navigator

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
