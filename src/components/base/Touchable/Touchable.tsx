import React from 'react'
import {
  ButtonProps,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
  StyleProp,
  Animated,
} from 'react-native'
import { TestProps } from '../../../utils/TestProps'

export interface TouchableProps extends TestProps {
  /**
   * Children Views or Text.
   */
  children: React.ReactNode
  /**
   * Action to trigger on Click. If `undefined`, no visual feedback will occur on click.
   */
  onClick?: ButtonProps['onPress']
  /**
   * Set to `true` to disable click.
   */
  disabled?: boolean
  /**
   * Action to trigger when user starts pressing the component.
   */
  onPressIn?: TouchableWithoutFeedbackProps['onPressIn']
  /**
   * Action to trigger when user stops pressing the component.
   */
  onPressOut?: TouchableWithoutFeedbackProps['onPressOut']
  /**
   * Hit Slop of the component. Should not be used unless really necessary.
   *
   * @see https://reactnative.dev/docs/touchablewithoutfeedback#hitslop
   */
  hitSlop?: TouchableWithoutFeedbackProps['hitSlop']
  /**
   * Style of the `View` used as a child of the clickable component.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewStyle?: StyleProp<any> // We take any style, as we need to be able to pass animated properties
}

/**
 * Basic component used to make clickable components.
 * On Android, the native ripple effect will be used.
 * On iOS and Web, opacity of the clickable component will be reduced on press.
 */
export const Touchable: React.FunctionComponent<TouchableProps> = ({
  children,
  onClick,
  disabled: disabledRaw,
  onPressIn,
  onPressOut,
  hitSlop,
  viewStyle,
  testID,
  accessibilityLabel,
}) => {
  const disabled = disabledRaw || !onClick

  return Platform.OS === 'android' ? (
    <TouchableNativeFeedback
      useForeground
      onPress={onClick}
      disabled={disabled}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      hitSlop={hitSlop}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      <Animated.View style={viewStyle}>{children}</Animated.View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity
      onPress={onClick}
      disabled={disabled}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      hitSlop={hitSlop}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      <Animated.View style={viewStyle}>{children}</Animated.View>
    </TouchableOpacity>
  )
}
