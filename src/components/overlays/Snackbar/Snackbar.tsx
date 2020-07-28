import React, { useCallback } from 'react'
import { View, Animated } from 'react-native'
import { shameStyles } from '../../../theme/shame-styles'
import { useStyles, useTheme } from '../../../theme'
import { BodyText } from '../../text'
import { useTimeout } from '../../../utils/hooks/use-timeout'
import { TextAction } from '../../actions/actions'
import { Box } from '../../structure/Box/Box'
import { useAnimation } from '../../../utils/hooks/use-animation'
import { SnackbarButton } from './SnackbarButton/SnackbarButton'

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
  const anim = useAnimation({
    initialValue: 0,
    toValue: 1,
    type: 'timing',
    easing: animation.easing.enter,
    duration: showDuration,
    useNativeDriver: true,
  })

  const dismiss = useCallback(() => {
    Animated.timing(anim, {
      easing: animation.easing.exit,
      toValue: 0,
      duration: showDuration,
      useNativeDriver: true,
    }).start(onDismiss)
  }, [onDismiss, animation, showDuration])

  const onActionClick = useCallback(() => {
    if (action && action.action) {
      action.action()
    }
    dismiss() // Dismiss when user clicks action
  }, [action?.action, dismiss])

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
          paddingY={action ? 'none' : 'small'}
          paddingX="medium"
          paddingRight={action ? 'xSmall' : 'medium'}
          space="medium"
          align="center"
        >
          <Box paddingY="xSmall" fill>
            <BodyText variation="inverse">{message}</BodyText>
          </Box>
          {action ? <SnackbarButton onClick={onActionClick}>{action.label}</SnackbarButton> : null}
        </Box>
      </Animated.View>
    </View>
  )
}
