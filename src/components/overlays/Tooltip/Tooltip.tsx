import React, { useState, useCallback, useEffect } from 'react'
import {
  View,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  Platform,
} from 'react-native'
import { Popover } from '../Popover/Popover'
import { Caption } from '../../text'
import { useStyles } from '../../../theme'
import { useUncontrolledState } from '../../../utils/hooks/use-uncontrolled-state'

export interface TooltipProps {
  /**
   * Toggle tooltip visibility. Should be provided if `children` contains a clickable element.
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
   * Called when the tooltip should dismiss. Should not be provided unless `children`
   * contains a clickable element.
   *
   * If provided, tooltip visibility is delegated to component's user.
   */
  onRequestClose?: () => void
}

/**
 * Floating label that briefly explain the function of a user interface element.
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
  children,
  onRequestClose,
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

  const onEnter = useCallback(() => {
    if (!onRequestClose) {
      setOpen(true)
    }
  }, [onRequestClose])
  const onLeave = useCallback(() => {
    if (onRequestClose) {
      onRequestClose()
    } else {
      setOpen(false)
    }
  }, [onRequestClose])

  // Forward `active` property changes to open state
  useEffect(() => setOpen(active), [active])

  return (
    <Popover
      open={open}
      activator={
        // Touchable present for Native Apps and Touch Screens without any mouse pointer
        <TouchableWithoutFeedback onPress={onEnter}>
          {/* View needed for touchable + handling tooltip visibility on mouse hover */}
          <View onMouseEnter={onEnter} onMouseLeave={onLeave}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      }
      onRequestClose={onLeave}
      placement="top"
      hideBackdrop
      clickThrough
      popoverStyle={styles.tooltip}
    >
      <Caption variation="inverse">{content}</Caption>
    </Popover>
  )
}
