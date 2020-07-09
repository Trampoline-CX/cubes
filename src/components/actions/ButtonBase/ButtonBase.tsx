import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, ViewStyle, TextStyle, Animated, Easing, Platform } from 'react-native'
import { Spinner, SpinnerProps } from '../../feedback-indicators/Spinner/Spinner'
import { Touchable, TouchableProps } from '../../base/Touchable/Touchable'
import { Box } from '../../structure/Box/Box'
import { useStyles, Theme, useTheme } from '../../../theme'
import { useTextStyles } from '../../text/use-text-styles'
import { shameStyles } from '../../../theme/shame-styles'
import { TestProps } from '../../../utils/TestProps'

const LOADING_ACCESSIBILITY_LABEL = 'button-loading'

export interface ButtonBasePublicProps<T = string> extends TestProps {
  /**
   * Button Text.
   */
  children: T
  /**
   * Set to `true` to disable.
   */
  disabled?: boolean
  /**
   * Set to `true` to enter loading state.
   */
  loading?: boolean
  /**
   * Called when the button is clicked.
   *
   * If this is not set, there will still be touch feedback, but no action will be performed.
   * Optional mainly for mockup purposes.
   */
  onClick?: () => void
  /**
   * Called when the button is long-clicked.
   */
  onLongClick?: () => void
}

export interface ButtonStyleProps {
  borderRadius?: keyof Theme['radius']
  spinnerColor?: SpinnerProps['color']
  labelStyle?: TextStyle[]
  containerStyle?: ViewStyle[]
  disabledContainerStyle?: ViewStyle[]
  hitSlop?: TouchableProps['hitSlop']
  containsText?: boolean
}

export type ButtonBaseProps = ButtonBasePublicProps<React.ReactNode> & ButtonStyleProps

/**
 * Component used as a base for Button components.
 */
export const ButtonBase: React.FC<ButtonBaseProps> = ({
  children,
  disabled,
  loading,
  onClick = () => {}, // Defaults to empty action, to keep touch feedback
  onLongClick,
  borderRadius: borderRadiusRaw = 'none',
  spinnerColor = 'primary',
  labelStyle = [],
  containerStyle = [],
  disabledContainerStyle = [],
  hitSlop,
  containsText = true,
  testID,
  accessibilityLabel,
}) => {
  const { textStyles } = useTextStyles()
  const styles = useStyles(theme => ({
    root: {
      overflow: 'hidden',
    },

    // Base
    containerBase: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',

      minHeight: theme.size.minTouchArea,
    },
    labelBase: {
      // extends "textStyles.body"
      fontWeight: theme.font.weights.strong,
      textAlign: 'center',
    },
    iconContainer: {
      width: theme.size.icon.default,
      height: theme.size.icon.default,

      alignItems: 'center',
      justifyContent: 'center',
    },

    // State: Disabled
    containerDisabled: {
      opacity: theme.opacity.disabled,
    },
  }))

  const currentTheme = useTheme()
  const borderRadius = currentTheme.radius[borderRadiusRaw]
  const [isPressed, setPressed] = useState(false)
  const [pressedAnim] = useState(new Animated.Value(1))
  const isDisabled = disabled || loading

  const containerStyles: ViewStyle[] = [styles.containerBase, { borderRadius }, ...containerStyle]
  const labelStyles: TextStyle[] = [textStyles.body, styles.labelBase, ...labelStyle]

  const onPressIn = useCallback(() => setPressed(true), [setPressed])
  const onPressOut = useCallback(() => setPressed(false), [setPressed])

  if (isDisabled) {
    containerStyles.push(styles.containerDisabled, ...disabledContainerStyle)
  }

  useEffect(() => {
    Animated.timing(pressedAnim, {
      toValue: isPressed ? shameStyles.button.pressedScale : 1,
      duration: currentTheme.animation.duration.shorter,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start()
  }, [isPressed])

  return (
    <Touchable
      disabled={isDisabled}
      onClick={onClick}
      onLongClick={onLongClick}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      hitSlop={hitSlop}
      viewStyle={[
        styles.root,
        { borderRadius, transform: Platform.OS === 'ios' ? [] : [{ scale: pressedAnim }] },
      ]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      <View style={containerStyles}>
        {loading && (
          <Box paddingLeft="medium">
            <View style={styles.iconContainer}>
              {loading && (
                <Spinner color={spinnerColor} accessibilityLabel={LOADING_ACCESSIBILITY_LABEL} />
              )}
            </View>
          </Box>
        )}

        {containsText ? (
          <Box paddingX="medium">
            <Text style={labelStyles}>{children}</Text>
          </Box>
        ) : (
          children
        )}
      </View>
    </Touchable>
  )
}
