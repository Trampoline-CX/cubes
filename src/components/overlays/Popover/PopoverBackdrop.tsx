import React, { useContext, useState, useEffect } from 'react'
import { TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native'
import { shameStyles } from '../../../theme/shame-styles'
import { useStyles, useTheme } from '../../../theme'
import { PopoverContext } from './PopoverContext'

export interface PopoverBackdropProps {
  open: boolean
  invisible: boolean
}

const { zIndex, backdrop } = shameStyles.popover

export const PopoverBackdrop: React.FC<PopoverBackdropProps> = ({ open, invisible }) => {
  const styles = useStyles(() => ({
    backdrop: {
      backgroundColor: backdrop.color,
      ...StyleSheet.absoluteFillObject,
      opacity: 0,
      zIndex,
    },
  }))
  const { animation } = useTheme()
  const [anim] = useState(new Animated.Value(0))

  const { requestClose } = useContext(PopoverContext)

  useEffect(() => {
    Animated.timing(anim, {
      easing: animation.easing.move,
      toValue: open ? 1 : 0,
      duration: animation.duration.shorter,
      useNativeDriver: true,
    }).start()
  }, [open, invisible])

  return (
    <TouchableWithoutFeedback onPress={requestClose}>
      <Animated.View
        style={[styles.backdrop, !invisible && { opacity: anim }]}
        pointerEvents={open ? 'auto' : 'none'}
      />
    </TouchableWithoutFeedback>
  )
}
