import React, { useContext } from 'react'
import { TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native'
import { shameStyles } from '../../../theme/shame-styles'
import { useStyles, useTheme } from '../../../theme'
import { useAnimation } from '../../../utils/hooks/use-animation'
import { PopoverContext } from './PopoverContext'

export interface PopoverBackdropProps {
  open: boolean
  invisible: boolean
  clickThrough: boolean
}

const { zIndex, backdrop } = shameStyles.popover

export const PopoverBackdrop: React.FC<PopoverBackdropProps> = ({
  open,
  invisible,
  clickThrough,
}) => {
  const styles = useStyles(() => ({
    backdrop: {
      backgroundColor: backdrop.color,
      ...StyleSheet.absoluteFillObject,
      opacity: 0,
      zIndex,
    },
  }))
  const { animation } = useTheme()
  const anim = useAnimation({
    toValue: open ? 1 : 0,
    type: 'timing',
    easing: animation.easing.move,
    duration: animation.duration.shorter,
    useNativeDriver: true,
  })

  const { requestClose } = useContext(PopoverContext)

  const contentView = (
    <Animated.View
      style={[styles.backdrop, !invisible && { opacity: anim }]}
      pointerEvents={open && !clickThrough ? 'auto' : 'none'}
    />
  )

  return clickThrough ? (
    contentView
  ) : (
    <TouchableWithoutFeedback onPress={requestClose}>{contentView}</TouchableWithoutFeedback>
  )
}
