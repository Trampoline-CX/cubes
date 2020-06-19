import React from 'react'
import { Dialog } from '../Dialog/Dialog'
import { BodyText } from '../../text'

export interface AlertProps {
  /**
   * Optional Alert Title.
   */
  title?: string
  /**
   * Text to display in the Alert.
   */
  children: React.ReactNode
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
export const Alert: React.FC<AlertProps> = ({ title, children, open, onClose, buttonText }) => (
  <Dialog
    sectioned
    open={open}
    onClose={onClose}
    title={title}
    primaryAction={{ label: buttonText, action: onClose }}
  >
    <BodyText>{children}</BodyText>
  </Dialog>
)
