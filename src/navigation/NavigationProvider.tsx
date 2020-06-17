import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NavigationSchema, NavigatorScreens, ScreenArguments } from './types'

export interface Navigation<Schema extends NavigationSchema> {
  back: () => void
  to: (...args: ScreenArguments<NavigatorScreens<Schema>>) => void
}

export const NavigationContext = React.createContext<Navigation<NavigationSchema>>(
  (undefined as unknown) as Navigation<NavigationSchema>,
)

export interface ScreenNavigationProviderProps {
  children?: React.ReactNode
}

export const ReactNavigationProvider: React.FC<ScreenNavigationProviderProps> = ({ children }) => {
  const navigation = useNavigation()

  return (
    <NavigationContext.Provider
      value={{
        back: navigation.goBack,
        to: (screen, args) => navigation.navigate(screen, args),
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export const DummyNavigationProvider: React.FC<ScreenNavigationProviderProps> = ({ children }) => (
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
