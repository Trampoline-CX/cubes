import React from 'react'
import { View } from 'react-native'
import { DecoratorFunction } from '@storybook/addons'
import { useStyles } from '../../theme'

export const PhoneScreen: DecoratorFunction<React.ReactNode> = storyFn => {
  const styles = useStyles(theme => ({
    background: {
      flex: 1,
      backgroundColor: theme.colors.fill.background.lighter,
      alignItems: 'center',
    },
    phone: {
      maxWidth: 480,
      height: 800,
      overflow: 'hidden',
      ...theme.elevation.z4,
    },
  }))

  return (
    <View style={styles.background}>
      <View style={styles.phone}>{storyFn()}</View>
    </View>
  )
}
