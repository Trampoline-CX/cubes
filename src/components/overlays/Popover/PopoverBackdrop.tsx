import React, { useContext, useState, useEffect } from 'react'
import { TouchableWithoutFeedback, Animated } from 'react-native'
import { shameStyles } from '../../../theme/shame-styles'
import { useStyles, useTheme } from '../../../theme'
import { PopoverContext } from './PopoverContext'

export interface PopoverBackdropProps {
  open: boolean
  invisible: boolean
}

const { backdrop } = shameStyles.popover

export const PopoverBackdrop: React.FC<PopoverBackdropProps> = ({ open, invisible }) => {
  const styles = useStyles(() => ({
    backdrop: {
      backgroundColor: backdrop.color,
      position: 'absolute',
      top: -9999999,
      left: -9999999,
      right: -9999999,
      bottom: -9999999,
      opacity: 0,
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
