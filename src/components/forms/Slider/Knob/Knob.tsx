import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MarkerProps } from '@ptomasroos/react-native-multi-slider'
import { useStyles } from '../../../../theme'
import { shameStyles } from '../../../../theme/shame-styles'

export type KnobProps = {
  trackLength: number
  min: number
  max: number
} & MarkerProps

const { size, borderColor } = shameStyles.slider.knob

export const Knob: React.FC<KnobProps> = ({ trackLength, currentValue, min, max }) => {
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

  const valuePosition = trackLength ? ((currentValue - min) * trackLength) / (max - min) : 0

  return (
    <View
      style={[
        styles.knobContainer,
        {
          // Offset marker to start / end at right place on track
          transform: [{ translateX: (valuePosition * -size) / trackLength + size / 2 }],
        },
      ]}
    >
      <View style={[styles.knob, styles.knobOuter]} />
      <View style={styles.knob} />
    </View>
  )
}
