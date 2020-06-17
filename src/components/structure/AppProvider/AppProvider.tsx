import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Theme, themes } from '../../../theme'
import { AppProviderContext } from './AppProviderContext'

export interface AppProviderProps {
  /**
   * Theme to use (will use light theme if none is provided).
   */
  theme?: Theme
  /**
   * Children views.
   */
  children: React.ReactNode
}

/**
 * Component that should be defined at the root of the App and controls many elements, like
 * theming, navigation and so on.
 *
 * > **Note:** You don't need to pass any properties to this component. They are present for customization purpose only.
 */
export const AppProvider: React.FC<AppProviderProps> = ({ theme = themes.light, children }) => (
  <AppProviderContext.Provider value={{ theme }}>
    <NavigationContainer>{children}</NavigationContainer>
  </AppProviderContext.Provider>
)
