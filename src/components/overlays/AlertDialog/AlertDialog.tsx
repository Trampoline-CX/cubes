import React from 'react'
import { Dialog } from '../Dialog/Dialog'
import { BodyText } from '../../text'

export interface AlertDialogProps {
  /**
   * Optional Alert Title.
   */
  title?: string
  /**
   * Text to display in the Alert.
   */
  message: React.ReactNode
  /**
   * Decides if the Alert is displayed or not.
   */
  open: boolean
  /**
   * Called when the Alert is closed. Should set `open` to false.
   */
  onClose: () => void
  /**
   * Text of the Button closing the Alert.
   */
  buttonText: string
}

/**
 * Alert the user of something important. Should be used sparingly, as this interrupts the
 * user flow.
 */
export const AlertDialog: React.FC<AlertDialogProps> = ({
  title,
  message,
  open,
  onClose,
  buttonText,
}) => (
  <Dialog
    sectioned
    hideClose
    open={open}
    onClose={onClose}
    title={title}
    primaryAction={{ label: buttonText, action: onClose }}
  >
    <BodyText>{message}</BodyText>
  </Dialog>
)
