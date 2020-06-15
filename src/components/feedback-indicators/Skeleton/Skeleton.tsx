import React, { useContext } from 'react'
import { ViewStyle, StyleProp, Animated } from 'react-native'
import { useStyles } from '../../../theme'
import { SkeletonLoadingContext } from '../SkeletonLoading/SkeletonLoading'
import { shameStyles } from '../../../theme/shame-styles'

export interface SkeletonProps {
  /**
   * Style of the `View`.
   */
  style: StyleProp<ViewStyle>
}

/**
 * Basic Skeleton component used to display placeholder content.
 */
export const Skeleton: React.FC<SkeletonProps> = ({ style }) => {
  const styles = useStyles(theme => ({
    skeleton: {
      backgroundColor: theme.colors.fill.background.darker,
    },
  }))

  const anim = useContext(SkeletonLoadingContext)

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          opacity: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, shameStyles.skeleton.minOpacity],
          }),
        },
        style,
      ]}
    />
  )
}
