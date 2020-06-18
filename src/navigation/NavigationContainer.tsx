import React, { useMemo } from 'react'
import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native'
import { NavigationSchema } from './types'
import { buildReactNavigationTree } from './build-react-navigation-tree'
import { DummyNavigationProvider } from './NavigationProvider'
import { buildReactNavigationLinkingOptions } from './build-react-navigation-linking-options'

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

export const NavigationContainer = <Schema extends NavigationSchema>({
  schema,
  children,
}: NavigationProviderProps<Schema>): React.ReactElement => {
  const ReactNavigationTree = useMemo(() => (schema ? buildReactNavigationTree(schema) : null), [
    schema,
  ])
  const linkingOptions = buildReactNavigationLinkingOptions()

  return (
    <RNNavigationContainer independent linking={linkingOptions}>
      {ReactNavigationTree ? (
        <ReactNavigationTree />
      ) : (
        <DummyNavigationProvider>{children}</DummyNavigationProvider>
      )}
    </RNNavigationContainer>
  )
}