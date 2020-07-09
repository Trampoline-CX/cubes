import React, { useState, useEffect, useCallback } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import { useStyles } from '../../../theme'
import { Modal } from '../../base/Modal/Modal'
import { SwipeableSheet } from './SwipeableSheet/SwipeableSheet'

export interface SheetProps {
  /**
   * Whether or not the Sheet is opened.
   */
  open: boolean
  /**
   * Callback called when the sheet should close.
   */
  onClose: () => void
  /**
   * Children elements to render in the Sheet.
   */
  children: React.ReactNode
}

/**
 * Large container entering from the edge of the screen. Can provide
 * contextual actions, information or filters. Does not interrupt the
 * flow as a Dialog would do.
 */
export const Sheet: React.FC<SheetProps> = ({ open, onClose, children }) => {
  const [isAnimating, setAnimating] = useState(false)
  const styles = useStyles(() => ({
    container: {
      flex: 1,
    },
    backdrop: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  }))

  useEffect(() => {
    if (open) {
      setAnimating(true)
    }
  }, [open])

  const hide = useCallback(() => {
    setAnimating(true)
    onClose()
  }, [onClose])

  const onHidden = useCallback(() => {
    setAnimating(false)

    if (open) {
      onClose()
    }
  }, [open])

  return (
    <Modal visible={open || isAnimating} onRequestClose={hide} animationType="none" transparent>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={hide}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <SwipeableSheet open={open} onHidden={onHidden}>
          {children}
        </SwipeableSheet>
      </View>
    </Modal>
  )
}
