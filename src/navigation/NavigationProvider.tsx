import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  useDrawerMenuContext,
  DrawerMenuContext,
} from '../components/navigation/DrawerMenu/Context/DrawerMenuContext'
import { NavigationSchema, ScreenArguments } from './types'
import { NavigatorScreens } from './navigators/types'

export interface Navigation<Schema extends NavigationSchema> {
  back: () => void
  to: (...args: ScreenArguments<NavigatorScreens<Schema>>) => void
  drawer: DrawerMenuContext
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

  return (
    <NavigationContext.Provider
      value={{
        back: navigation.goBack,
        to: (screen, args) => navigation.navigate(screen, args),
        drawer,
      }}
    >
      <Component {...route.params} />
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
        drawer,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}
