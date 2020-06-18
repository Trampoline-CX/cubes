import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NavigationSchema, ScreenArguments } from './types'
import { NavigatorScreens } from './navigators/types'

export interface Navigation<Schema extends NavigationSchema> {
  back: () => void
  to: (...args: ScreenArguments<NavigatorScreens<Schema>>) => void
}

export const NavigationContext = React.createContext<Navigation<NavigationSchema>>(
  (undefined as unknown) as Navigation<NavigationSchema>,
)

export interface ReactNavigationProviderProps {
  component: React.ComponentType
}

export const ReactNavigationProvider: React.FC<ReactNavigationProviderProps> = ({ component }) => {
  const Component = component
  const navigation = useNavigation()
  const route = useRoute()

  return (
    <NavigationContext.Provider
      value={{
        back: navigation.goBack,
        to: (screen, args) => navigation.navigate(screen, args),
      }}
    >
      <Component {...route.params} />
    </NavigationContext.Provider>
  )
}

export interface DummyNavigationProviderProps {
  children: React.ReactNode
}

export const DummyNavigationProvider: React.FC<DummyNavigationProviderProps> = ({ children }) => (
  <NavigationContext.Provider
    value={{
      back: () => {
        console.warn('Back navigation performed but no navigation schema was provided.')
      },
      to: () => {
        console.warn('Screen navigation performed but no navigation schema was provided.')
      },
    }}
  >
    {children}
  </NavigationContext.Provider>
)
