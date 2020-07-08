import React, { useState, useCallback, useEffect, useMemo } from 'react'
import {
  View,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
  NativeSyntheticEvent,
  GestureResponderEvent,
  NativeTouchEvent,
  Platform,
} from 'react-native'
import _ from 'lodash'
import { Popover } from '../Popover/Popover'
import { Caption } from '../../text'
import { useStyles } from '../../../theme'
import { IconButton, IconButtonProps } from '../../actions/IconButton/IconButton'
import { Button, ButtonProps } from '../../actions/Button/Button'
import { Touchable, TouchableProps } from '../../base/Touchable/Touchable'
import { shameStyles } from '../../../theme/shame-styles'

export interface TooltipProps {
  /**
   * Toggle tooltip visibility. Should be used mainly for debugging purpose, as visibility should be automatically handled.
   */
  active?: boolean
  /**
   * Content displayed in the Tooltip.
   */
  content: string
  /**
   * The element that will activate the tooltip and to which the Tooltip will be anchored to.
   */
  children: React.ReactNode
  /**
   * Preferred placement of the tooltip.
   */
  preferredPlacement?: 'above' | 'below'
}

const { hideAfterDelay } = shameStyles.tooltip

/**
 * Floating label that briefly explain the function of a user interface element. If wrapping a "Touchable" element,
 * clicking the "Touchable" element will display the Toast.
 *
 * Behavior is slightly different on one platform to another:
 * - On Web, when using a Mouse, it will open when mouse hovers the `children` and will dismiss when
 * the mouse leaves the `children`.
 * - On Web, when using touches, it will open on click and dismiss itself when clicking somewhere else on screen.
 * - On Android and iOS, it will open on click and will dismiss itself after a short delay.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  active = false,
  content,
  children: childrenRaw,
  preferredPlacement = 'above',
}) => {
  const styles = useStyles(theme => ({
    tooltip: {
      backgroundColor: theme.colors.fill.background.inverse,
      borderRadius: theme.radius.medium,
      paddingVertical: theme.spacing.small,
      paddingHorizontal: theme.spacing.medium,
    },
  }))

  const [open, setOpen] = useState(active)

  const show = useCallback(() => setOpen(true), [])
  const hide = useCallback(() => setOpen(false), [])

  // Forward `active` property changes to open state
  useEffect(() => setOpen(active), [active])

  useHideAfterDelayOnNative(open, hide)

  const children = useMemo(
    () =>
      React.Children.map(childrenRaw, child => {
        if (React.isValidElement(child)) {
          if (child.type === IconButton || child.type === Button || child.type === Touchable) {
            const props: IconButtonProps | ButtonProps | TouchableProps = child.props

            return React.cloneElement(child, {
              onClick: _.wrap(
                props.onClick,
                (origOnClick, event: NativeSyntheticEvent<NativeTouchEvent>) => {
                  event.persist()
                  origOnClick?.(event)
                  show()
                },
              ),
            })
          } else if (
            child.type === TouchableWithoutFeedback ||
            child.type === TouchableNativeFeedback ||
            child.type === TouchableOpacity ||
            child.type === TouchableHighlight
          ) {
            const props: TouchableWithoutFeedbackProps = child.props

            return React.cloneElement(child, {
              onPress: _.wrap(props.onPress, (origOnPress, event: GestureResponderEvent) => {
                event.persist()
                origOnPress?.(event)
                show()
              }),
            })
          }
        }

        return child
      }),
    [show, childrenRaw],
  )

  return (
    <Popover
      open={open}
      activator={
        // Touchable present for Native Apps and Touch Screens without any mouse pointer
        <TouchableWithoutFeedback onPress={show}>
          {/* View needed for touchable + handling tooltip visibility on mouse hover */}
          <View onMouseEnter={show} onMouseLeave={hide}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      }
      onRequestClose={hide}
      placement={preferredPlacement === 'above' ? 'top' : 'bottom'}
      hideBackdrop
      clickThrough
      popoverStyle={styles.tooltip}
    >
      <Caption variation="inverse">{content}</Caption>
    </Popover>
  )
}

/**
 * Hide the tooltip after a certain delay on Native (Android and iOS).
 */
const useHideAfterDelayOnNative = (open: boolean, hide: () => void): void => {
  useEffect(() => {
    if (open && (Platform.OS === 'android' || Platform.OS === 'ios')) {
      const timeoutRef = setTimeout(hide, hideAfterDelay)

      return () => clearTimeout(timeoutRef)
    }

    return // Return necessary for ESLint
  }, [open])
}
