import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { isNavigator } from './is-navigator'
import { NavigatorsOrScreens, NavigatorBuilder } from './types'

/**
 * Stack Navigator, used to stack screens.
 */
export interface StackNavigator {
  readonly stack: NavigatorsOrScreens
  readonly options?: StackNavigatorOptions
}

/**
 * StackNavigator Options.
 */
export interface StackNavigatorOptions {
  /**
   * Animation to use when pushing/removing screens.
   *
   * "default" animation is a "push" animation, which is the standard animation when pushing new screens on a stack.
   */
  animation?: 'none' | 'default'
}

export const stackBuilder: NavigatorBuilder<'stack', StackNavigator> = {
  name: 'stack',
  build: ({ navigator, buildScreen, buildTreeForNavigator }) => {
    const Stack = createStackNavigator()
    const screens = navigator.stack.map((x, i) => {
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

    const { animation = 'default' } = navigator.options ?? {}

    return () => (
      <Stack.Navigator
        screenOptions={{ headerShown: false, animationEnabled: animation === 'default' }}
      >
        {screens}
      </Stack.Navigator>
    )
  },
}
