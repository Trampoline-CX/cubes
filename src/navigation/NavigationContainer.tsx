import React, { useMemo, useState, useCallback, useRef } from 'react'
import {
  NavigationContainer as RNNavigationContainer,
  NavigationContainerRef,
  NavigationState,
} from '@react-navigation/native'
import { NavigationSchema } from './types'
import { buildReactNavigationTree } from './build-react-navigation-tree'
import { DummyNavigationProvider, ReactNavigationWithRefProvider } from './NavigationProvider'
import { buildReactNavigationLinkingOptions } from './build-react-navigation-linking-options'
import { navigatorBuilders, Navigator } from './navigators'
import { isNavigator } from './navigators/is-navigator'

export interface NavigationProviderProps<Schema extends NavigationSchema> {
  /**
   * Schema to configure navigation.
   */
  schema?: Schema
  /**
   * Children rendered. If schema is provided, these will be rendered at bottom of Screens.
   * Can be used to display absolutely positioned views on top of everything else, or special
   * Cubes such as `DrawerMenu`.
   */
  children?: React.ReactNode
}

/**
 * Provides React Navigation support from a `NavigationSchema`. If a schema is provided,
 * Navigation will follow this schema. If no schema is provided, `children` will be used
 * as the only screen instead.
 */
export const NavigationContainer = <Schema extends NavigationSchema>({
  schema,
  children,
}: NavigationProviderProps<Schema>): React.ReactElement => {
  const navigationContainerRef = useRef<NavigationContainerRef>(null)

  const ReactNavigationTree = useMemo(() => (schema ? buildReactNavigationTree(schema) : null), [
    schema,
  ])
  const [routeName, setRouteName] = useState(getInitialRouteName(schema))
  const linkingOptions = schema ? buildReactNavigationLinkingOptions() : undefined

  const onStateChange = useCallback(
    (state: NavigationState | undefined) => setRouteName(state?.routeNames[state.index]),
    [],
  )

  return ReactNavigationTree ? (
    <>
      <RNNavigationContainer
        ref={navigationContainerRef}
        linking={linkingOptions}
        onStateChange={onStateChange}
      >
        <ReactNavigationTree />
      </RNNavigationContainer>
      <ReactNavigationWithRefProvider
        navigationContainerRef={navigationContainerRef}
        routeName={routeName ?? ''}
      >
        {children}
      </ReactNavigationWithRefProvider>
    </>
  ) : (
    <DummyNavigationProvider>{children}</DummyNavigationProvider>
  )
}

/**
 * Get the initial route name displayed in a Navigation Schema.
 */
const getInitialRouteName = (schema?: NavigationSchema): string | undefined =>
  schema ? getRouteName(schema) : undefined

const getRouteName = (navigator: Navigator): string => {
  const builder = navigatorBuilders.find(x => x.name in navigator)

  if (builder) {
    const screens = 'stack' in navigator ? navigator.stack : navigator.switch
    const firstScreen = screens[0]

    if (isNavigator(firstScreen)) {
      return getRouteName(firstScreen)
    } else {
      return Object.keys(firstScreen)[0]
    }
  } else {
    throw new Error(`Unknown Navigator in NavigationSchema: ${JSON.stringify(navigator, null, 2)}`)
  }
}
