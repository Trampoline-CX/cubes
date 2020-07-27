import React from 'react'
import _ from 'lodash'
import { Animated, View } from 'react-native'
import { useStyles, useTheme } from '../../../theme'
import { shameStyles } from '../../../theme/shame-styles'
import { useAnimation } from '../../../utils/hooks/use-animation'

export interface ProgressBarProps {
  /**
   * Progression of the task. Number value between [0, 100].
   */
  progress: number
}

const { height } = shameStyles.progressBar

/**
 * Use this component to visually represent the completion of a task or operation.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({ progress: progressRaw }) => {
  const styles = useStyles(theme => ({
    container: {
      backgroundColor: theme.colors.fill.background.darker,
      borderRadius: theme.radius.medium,
      overflow: 'hidden',
      width: '100%',
      height,
    },
    progress: {
      position: 'absolute',
      left: '-100%', // Make progress bar twice the width to be able to animate width using scaleX
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.colors.fill.accent.default,
    },
  }))

  const progress = _.clamp(progressRaw, 0, 100)
  const { animation } = useTheme()
  const anim = useAnimation({
    initialValue: 0,
    toValue: progress,
    type: 'timing',
    easing: animation.easing.move,
    duration: animation.duration.shorter,
    useNativeDriver: true,
  })

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progress,
          {
            transform: [
              {
                scaleX: anim.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 1],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  )
}
