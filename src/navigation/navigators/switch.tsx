import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigatorsOrScreens, NavigatorBuilder } from './types'
import { isNavigator } from './is-navigator'

/**
 * Default Navigator for Switch Navigation (navigating to a new screen does not add it on the stack).
 *
 * Uses React Navigation Bottom tabs navigator behind the scenes.
 */
export interface SwitchNavigator {
  switch: NavigatorsOrScreens
  options?: SwitchNavigatorOptions
}

/**
 * Options for SwitchNavigator.
 */
export interface SwitchNavigatorOptions {
  /**
   * Behavior of navigator when pressing back.
   *
   * - "default" behavior doesn't handle back button. It will just return to previous navigator or close the app.
   * - "tabs" behavior will act as tabs in a `BottomNavigationBar`. Pressing back will return to previously selected tab.
   */
  backBehavior: 'default' | 'tabs'
}

export const switchBuilder: NavigatorBuilder<'switch', SwitchNavigator> = {
  name: 'switch',
  build: ({ navigator, buildTreeForNavigator, buildScreen }) => {
    const Tabs = createBottomTabNavigator()
    const screens = navigator.switch.map((x, i) => {
      if (isNavigator(x)) {
        return (
          <Tabs.Screen
            key={`Navigator-${i}`}
            name={`Navigator-${i}`}
            component={buildTreeForNavigator(x)}
          />
        )
      } else {
        const screenName = Object.keys(x)[0]
        return (
          <Tabs.Screen key={screenName} name={screenName} component={buildScreen(x[screenName])} />
        )
      }
    })

    const { backBehavior = 'default' } = navigator.options ?? {}

    return () => (
      <Tabs.Navigator
        // eslint-disable-next-line react/jsx-no-bind
        tabBar={() => <></>}
        backBehavior={backBehavior === 'tabs' ? 'history' : 'none'}
      >
        {screens}
      </Tabs.Navigator>
    )
  },
}
