import React, { useEffect, useState, useCallback } from 'react'
import { View, Animated } from 'react-native'
import { shameStyles } from '../../../theme/shame-styles'
import { useStyles, useTheme } from '../../../theme'
import { BodyText } from '../../text'
import { useTimeout } from '../../../utils/hooks/use-timeout'
import { TextAction } from '../../actions/actions'
import { Button } from '../../actions/Button/Button'
import { Box } from '../../structure/Box/Box'

export interface SnackbarProps {
  /**
   * Message to display on the Snackbar.
   */
  message: string
  /**
   * Optional action. Clicking it will dismiss the Snackbar.
   */
  action?: TextAction
  /**
   * Duration the Snackbar is displayed.
   */
  duration?: keyof typeof shameStyles['snackbar']['duration']
  /**
   * Function to call when the Snackbar is dismissed.
   */
  onDismiss?: () => void
}

const { duration: durationValues } = shameStyles.snackbar

/**
 * Confirm a User's action by displaying a small text at the bottom of the screen.
 * Can also provide the user a quick action.
 */
export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  action,
  duration = 'default',
  onDismiss,
}) => {
  const styles = useStyles(theme => ({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      overflow: 'hidden',
    },
    snackbar: {
      marginHorizontal: theme.spacing.small,
      marginBottom: theme.spacing.small,
      backgroundColor: theme.colors.fill.background.inverse,
      borderRadius: theme.radius.medium,
    },
  }))
  const { animation } = useTheme()
  const showDuration = animation.duration.shorter
  const durationValue = durationValues[duration]
  const [anim] = useState(new Animated.Value(0))

  const dismiss = useCallback(() => {
    Animated.timing(anim, {
      easing: animation.easing.exit,
      toValue: 0,
      duration: showDuration,
      useNativeDriver: true,
    }).start(onDismiss)
  }, [onDismiss, animation, showDuration])

  const onActionClick = useCallback(() => {
    if (action) {
      action.action()
    }
    dismiss() // Dismiss when user clicks action
  }, [action?.action, dismiss])

  useEffect(() => {
    Animated.timing(anim, {
      easing: animation.easing.enter,
      toValue: 1,
      duration: showDuration,
      useNativeDriver: true,
    }).start()
  }, [])

  useTimeout(dismiss, durationValue + showDuration)

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.snackbar,
          {
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
        <Box
          horizontal
          paddingY="small"
          paddingX="medium"
          space="medium"
          distribution="space-between"
          align="center"
        >
          <BodyText variation="inverse">{message}</BodyText>
          {action ? <Button onClick={onActionClick}>{action.label}</Button> : null}
        </Box>
      </Animated.View>
    </View>
  )
}
