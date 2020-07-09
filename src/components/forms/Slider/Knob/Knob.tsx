import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MarkerProps } from '@ptomasroos/react-native-multi-slider'
import { useStyles } from '../../../../theme'
import { shameStyles } from '../../../../theme/shame-styles'

export type KnobProps = MarkerProps

const { size, borderColor } = shameStyles.slider.knob

export const Knob: React.FC<KnobProps> = () => {
  const styles = useStyles(theme => ({
    knobContainer: {
      height: size,
      width: size,
    },
    knob: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.fill.background.lighter,
      borderRadius: theme.radius.circle,
      //   borderWidth: theme.border.small,
      //   borderColor,
    },
    knobOuter: {
      left: -2,
      right: -2,
      top: -2,
      bottom: -2,
      backgroundColor: borderColor,
    },
  }))

  return (
    <View style={styles.knobContainer}>
      <View style={[styles.knob, styles.knobOuter]} />
      <View style={styles.knob} />
    </View>
  )
}
