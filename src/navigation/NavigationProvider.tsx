import React, { useMemo } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { NavigationSchema, ScreenArguments, NavigatorScreens } from './types'
import { buildReactNavigationTree } from './build-react-navigation-tree'

export interface Navigation<Schema extends NavigationSchema> {
  back: () => void
  to: (...args: ScreenArguments<NavigatorScreens<Schema>>) => void
}

export const NavigationContext = React.createContext<Navigation<NavigationSchema>>(
  (undefined as unknown) as Navigation<NavigationSchema>,
)

export interface NavigationProviderProps<Schema extends NavigationSchema> {
  /**
   * Schema to configure navigation.
   */
  schema?: Schema
  /**
   * Children rendered if schema isn't provided.
   */
  children?: React.ReactNode
}

export const NavigationProvider = <Schema extends NavigationSchema>({
  schema,
  children,
}: NavigationProviderProps<Schema>): React.ReactElement => {
  const ReactNavigationTree = useMemo(() => (schema ? buildReactNavigationTree(schema) : null), [
    schema,
  ])

  return (
    <NavigationContainer independent>
      <NavigationContext.Provider value={{ back: () => {}, to: () => {} }}>
        {ReactNavigationTree ? <ReactNavigationTree /> : children}
      </NavigationContext.Provider>
    </NavigationContainer>
  )
}
