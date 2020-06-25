import React, { useContext } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { shameStyles } from '../../../theme/shame-styles'
import { useStyles } from '../../../theme'
import { PopoverContext } from './PopoverContext'

export interface PopoverBackdropProps {
  hide: boolean
}

const { backdrop } = shameStyles.popover

export const PopoverBackdrop: React.FC<PopoverBackdropProps> = ({ hide }) => {
  const styles = useStyles(() => ({
    backdrop: {
      backgroundColor: backdrop.color,
      position: 'absolute',
      top: -9999999,
      left: -9999999,
      right: -9999999,
      bottom: -9999999,
    },
    backdropHidden: {
      opacity: 0,
    },
  }))

  const { requestClose } = useContext(PopoverContext)

  return (
    <TouchableWithoutFeedback onPress={requestClose}>
      <View style={[styles.backdrop, hide ? styles.backdropHidden : null]} />
    </TouchableWithoutFeedback>
  )
}
