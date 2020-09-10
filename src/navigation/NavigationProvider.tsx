import React from 'react'
import {
  useNavigation,
  useRoute,
  useIsFocused,
  NavigationContainerRef,
} from '@react-navigation/native'
import {
  useDrawerMenuContext,
  DrawerMenuContext,
} from '../components/navigation/DrawerMenu/Context/DrawerMenuContext'
import { NavigationSchema, ScreenArguments, ScreenNames } from './types'
import { NavigatorScreens } from './navigators/types'

export interface Navigation<Schema extends NavigationSchema> {
  back: () => void
  to: (...args: ScreenArguments<NavigatorScreens<Schema>>) => void
  current: ScreenNames<NavigatorScreens<Schema>>
  drawer: DrawerMenuContext
  isFocused: boolean
}

export const NavigationContext = React.createContext<Navigation<NavigationSchema>>(
  (undefined as unknown) as Navigation<NavigationSchema>,
)

export interface ReactNavigationProviderProps {
  component: React.ComponentType
}

/**
 * Provides a `NavigationContext` for every screen, using React Navigation behind the scenes.
 */
export const ReactNavigationProvider: React.FC<ReactNavigationProviderProps> = ({ component }) => {
  const Component = component
  const navigation = useNavigation()
  const route = useRoute()
  const drawer = useDrawerMenuContext()
  const isFocused = useIsFocused()

  return (
    <NavigationContext.Provider
      value={{
        back: navigation.goBack,
        to: (screen, args) => navigation.navigate(screen, args),
        current: route.name as never, // Necessary for compilation
        drawer,
        isFocused,
      }}
    >
      <Component {...route.params} />
    </NavigationContext.Provider>
  )
}

export interface ReactNavigationWithRefProviderProps {
  navigationContainerRef: React.MutableRefObject<NavigationContainerRef | null>
  routeName: string | undefined
  children: React.ReactNode
}

const noOp = (): void => {}

/**
 * Provides a `NavigationContext` for AppProvider's `children`, which are not wrapped in React Navigation.
 *
 * Uses React Navigation `NavigationContainerRef` and navigationState to provide navigation.
 */
export const ReactNavigationWithRefProvider: React.FC<ReactNavigationWithRefProviderProps> = ({
  navigationContainerRef,
  routeName,
  children,
}) => {
  const ref = navigationContainerRef.current
  const drawer = useDrawerMenuContext()

  return (
    <NavigationContext.Provider
      value={{
        back: ref?.goBack ?? noOp,
        to: ref ? (screen, args) => ref?.navigate(screen, args) : noOp,
        current: (routeName || '') as never, // Necessary for compilation
        drawer,
        isFocused: true,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export interface DummyNavigationProviderProps {
  children: React.ReactNode
}

/**
 * Provide a dummy `NavigationContext` for when no `NavigationSchema` is provided
 * (when we simply wrap children).
 *
 * All navigation performed simply log a warning to the console.
 */
export const DummyNavigationProvider: React.FC<DummyNavigationProviderProps> = ({ children }) => {
  const drawer = useDrawerMenuContext()

  return (
    <NavigationContext.Provider
      value={{
        back: () => {
          console.warn('Back navigation performed but no navigation schema was provided.')
        },
        to: () => {
          console.warn('Screen navigation performed but no navigation schema was provided.')
        },
        current: 'NoRoutes' as never,
        drawer,
        isFocused: true,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}
