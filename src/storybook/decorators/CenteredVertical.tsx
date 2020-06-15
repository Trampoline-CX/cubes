import React from 'react'
import { View, StyleSheet } from 'react-native'
import { DecoratorFunction } from '@storybook/addons'

const style = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
})

export const CenteredVertical: DecoratorFunction<React.ReactNode> = storyFn => (
  <View style={style.root}>{storyFn()}</View>
)
