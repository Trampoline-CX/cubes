import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigatorBuilder } from './base'
import { NavigatorsOrScreens } from './types'
import { isNavigator } from './is-navigator'

export interface SwitchNavigator {
  switch: NavigatorsOrScreens
}

export const switchBuilder: NavigatorBuilder<'switch', SwitchNavigator> = {
  name: 'switch',
  build: ({ navigator, buildTreeForNavigator, buildScreen }) => {
    const Stack = createStackNavigator()
    const screens = navigator.switch.map((x, i) => {
      if (isNavigator(x)) {
        return (
          <Stack.Screen
            key={`Navigator-${i}`}
            name={`Navigator-${i}`}
            component={buildTreeForNavigator(x)}
          />
        )
      } else {
        const screenName = Object.keys(x)[0]
        return (
          <Stack.Screen key={screenName} name={screenName} component={buildScreen(x[screenName])} />
        )
      }
    })

    return () => <Stack.Navigator screenOptions={{ headerShown: false }}>{screens}</Stack.Navigator>
  },
}
