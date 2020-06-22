import React, { useState, useEffect } from 'react'
import { Animated, View } from 'react-native'
import { useStyles, useTheme } from '../../../theme'
import { BodyText } from '../../text'
import { useTimeout } from '../../../utils/hooks/use-timeout'
import { shameStyles } from '../../../theme/shame-styles'

export interface ToastProps {
  /**
   * Message to display on the Toast.
   */
  message: string
  /**
   * Duration the toast is displayed.
   */
  duration?: keyof typeof shameStyles['toast']['duration']
  /**
   * Function to call when the Toast is dismissed.
   */
  onDismiss?: () => void
}

const { duration: durationValues, maxWidth } = shameStyles.toast

/**
 * Displays a Toast to confirm a User's action.
 */
export const Toast: React.FC<ToastProps> = ({ message, duration = 'default', onDismiss }) => {
  const styles = useStyles(theme => ({
    container: {
      position: 'absolute',
      bottom: theme.spacing.medium,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    toast: {
      backgroundColor: theme.colors.fill.background.inverse,
      paddingVertical: theme.spacing.small,
      paddingHorizontal: theme.spacing.medium,
      borderRadius: theme.radius.circle,
      maxWidth,
    },
  }))
  const { animation } = useTheme()
  const showDuration = animation.duration.shorter
  const durationValue = durationValues[duration]
  const [anim] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(anim, {
      easing: animation.easing.enter,
      toValue: 1,
      duration: showDuration,
      useNativeDriver: true,
    }).start()
  }, [])

  useTimeout(() => {
    Animated.timing(anim, {
      easing: animation.easing.exit,
      toValue: 0,
      duration: showDuration,
      useNativeDriver: true,
    }).start(onDismiss)
  }, durationValue + showDuration)

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.toast,
          {
            opacity: anim,
            transform: [
              {
                translateY: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['100%', '0%'],
                }),
              },
            ],
          },
        ]}
      >
        <BodyText variation="inverse">{message}</BodyText>
      </Animated.View>
    </View>
  )
}
