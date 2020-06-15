import React from 'react'
import { View } from 'react-native'
import { DecoratorFunction } from '@storybook/addons'
import { useStyles } from '../../theme'

export const Background: DecoratorFunction<React.ReactNode> = storyFn => {
  const styles = useStyles(theme => ({
    background: {
      flex: 1,
      backgroundColor: theme.colors.fill.background.default,
    },
  }))

  return <View style={styles.background}>{storyFn()}</View>
}
