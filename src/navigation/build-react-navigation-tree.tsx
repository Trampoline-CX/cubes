import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationSchema, StackNavigator, Navigator, SwitchNavigator, Screen } from './types'

export const buildReactNavigationTree = <Schema extends NavigationSchema>(
  schema: Schema,
): React.ComponentType => _buildReactNavigationTreeRecursive(schema)

export const _buildReactNavigationTreeRecursive = <Schema extends Navigator>(
  navigator: Navigator,
): React.ComponentType => {
  if ('stack' in navigator) {
    return _buildStackNavigator(navigator)
  } else if ('switch' in navigator) {
    return _buildSwitchNavigator(navigator)
  } else {
    throw new Error(`Unknown Navigator in NavigationSchema: ${JSON.stringify(navigator, null, 2)}`)
  }
}

const _buildStackNavigator = (navigator: StackNavigator): React.ComponentType => {
  const Stack = createStackNavigator()
  const screens = navigator.stack.map((x, i) => {
    if (_isNavigator(x)) {
      return (
        <Stack.Screen
          key={`Navigator-${i}`}
          name={`Navigator-${i}`}
          component={_buildReactNavigationTreeRecursive(x)}
        />
      )
    } else {
      const screenName = Object.keys(x)[0]
      return <Stack.Screen key={screenName} name={screenName} component={x[screenName]} />
    }
  })

  return () => <Stack.Navigator screenOptions={{ headerShown: false }}>{screens}</Stack.Navigator>
}

const _buildSwitchNavigator = (navigator: SwitchNavigator): React.ComponentType => {
  const Stack = createStackNavigator()
  const screens = navigator.switch.map((x, i) => {
    if (_isNavigator(x)) {
      return (
        <Stack.Screen
          key={`Navigator-${i}`}
          name={`Navigator-${i}`}
          component={_buildReactNavigationTreeRecursive(x)}
        />
      )
    } else {
      const screenName = Object.keys(x)[0]
      return <Stack.Screen key={screenName} name={screenName} component={x[screenName]} />
    }
  })

  return () => <Stack.Navigator screenOptions={{ headerShown: false }}>{screens}</Stack.Navigator>
}

const _isNavigator = (element: Screen<string> | Navigator): element is Navigator => {
  if ('stack' in element || 'switch' in element) {
    return true
  } else {
    return false
  }
}
