import React from 'react'
import Modal from 'modal-react-native-web'
import { View, TouchableWithoutFeedback, Platform } from 'react-native'
import { useStyles } from '../../../theme'
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

// Set App Element of Modal (for React Native Web)
if (Platform.OS === 'web') {
  Modal.setAppElement('body')
}

/**
 * Large container entering from the edge of the screen. Can provide
 * contextual actions, information or filters. Does not interrupt the
 * flow as a Dialog would do.
 */
export const Sheet: React.FC<SheetProps> = ({ open, onClose, children }) => {
  const styles = useStyles(theme => ({
    container: {
      flex: 1,
    },
    backdrop: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  }))

  return (
    <Modal
      visible={open}
      onDismiss={onClose}
      onRequestClose={onClose}
      animationType="none"
      transparent
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        {open && (
          <SwipeableSheet onSwiped={onClose}>
            {/* <Header title={title} onClose={onClose} hideClose={hideClose} /> */}
            {children}
            {/* <Footer primaryAction={primaryAction} secondaryActions={secondaryActions} /> */}
          </SwipeableSheet>
        )}
      </View>
    </Modal>
  )
}
