import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Theme, themes } from '../../../theme'
import { NavigationSchema } from '../../../navigation'
import { NavigationContainer } from '../../../navigation/NavigationContainer'
import { SnackbarProvider } from '../../overlays/Snackbar/SnackbarProvider'
import { AppProviderSizeProvider } from '../../dev'
import { PopoverPortals } from '../../overlays/Popover/PopoverPortalProvider/PopoverPortals'
import { TopBarProvider } from '../../navigation/TopBar/TopBarProvider/TopBarProvider'
import { DrawerMenuProvider } from '../../navigation/DrawerMenu/Context/DrawerMenuContext'
import { AppProviderContext } from './AppProviderContext'
import { LeftSidebarProvider } from './LeftSidebar/LeftSidebar'

export interface AppProviderProps {
  /**
   * Theme to use (will use light theme if none is provided).
   */
  theme?: Theme
  /**
   * Navigation Schema used to configure Navigation tree.
   */
  navigationSchema?: NavigationSchema
  /**
   * Children to show (prototype). If `navigationSchema` is provided, these views will be rendered
   * below prototype content. Useful to display absolutely positioned views or special Cubes such
   * as `DrawerMenu`.
   */
  children?: React.ReactNode
}

/**
 * Required component that should be defined at the root of the App and controls many elements, like
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
    <AppProviderSizeProvider>
      <AppProviderContext.Provider value={{ theme }}>
        <SnackbarProvider>
          <DrawerMenuProvider>
            <PopoverPortals.Provider>
              <TopBarProvider>
                <LeftSidebarProvider>
                  <NavigationContainer schema={navigationSchema}>{children}</NavigationContainer>
                </LeftSidebarProvider>
              </TopBarProvider>
              <PopoverPortals.DestinationPortal />
            </PopoverPortals.Provider>
          </DrawerMenuProvider>
        </SnackbarProvider>
      </AppProviderContext.Provider>
    </AppProviderSizeProvider>
  </SafeAreaProvider>
)
