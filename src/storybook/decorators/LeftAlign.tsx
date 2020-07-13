import React from 'react'
import { View, StyleSheet } from 'react-native'
import { DecoratorFunction } from '@storybook/addons'

const style = StyleSheet.create({
  root: {
    alignItems: 'flex-start',
  },
})

export const LeftAlign: DecoratorFunction<React.ReactNode> = storyFn => (
  <View style={style.root}>{storyFn()}</View>
)
