import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Modal from 'modal-react-native-web'
import { Theme, themes } from '../../../theme'
import { NavigationSchema } from '../../../navigation'
import { NavigationContainer } from '../../../navigation/NavigationContainer'
import { AppProviderContext } from './AppProviderContext'

export interface WithNavigationSchema {
  /**
   * Navigation Schema used to configure Navigation tree.
   */
  navigationSchema: NavigationSchema
  children?: never
}

export interface WithoutNavigationSchema {
  /**
   * Navigation Schema used to configure Navigation tree.
   */
  children: React.ReactNode
  navigationSchema?: never
}

export type AppProviderProps = {
  /**
   * Theme to use (will use light theme if none is provided).
   */
  theme?: Theme
} & (WithNavigationSchema | WithoutNavigationSchema)

// Set App Element of Modal
Modal.setAppElement('body')

/**
 * Component that should be defined at the root of the App and controls many elements, like
 * theming, navigation and so on.
 *
 * > **Note:** You don't need to pass any properties to this component. They are present for customization purpose only.
 */
export const AppProvider: React.FC<AppProviderProps> = ({
  theme = themes.light,
  navigationSchema,
  children,
}) => (
  <SafeAreaProvider>
    <AppProviderContext.Provider value={{ theme }}>
      <NavigationContainer schema={navigationSchema}>{children}</NavigationContainer>
    </AppProviderContext.Provider>
  </SafeAreaProvider>
)
