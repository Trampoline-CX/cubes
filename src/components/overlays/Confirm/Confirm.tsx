import React, { useCallback } from 'react'
import { Dialog } from '../Dialog/Dialog'
import { BodyText } from '../../text'

export interface ConfirmProps {
  /**
   * Optional Confirm Title.
   */
  title?: string
  /**
   * Text to display in the Confirm.
   */
  message: React.ReactNode
  /**
   * Decides if the Confirm is displayed or not.
   */
  open: boolean
  /**
   * Called when the Confirm is closed. Should set `open` to false.
   */
  onClose: (accepted: boolean) => void
  /**
   * Text of the Button accepting the Confirm.
   */
  positiveActionText: string
  /**
   * Text of the Button declining the Confirm.
   */
  negativeActionText: string
}

/**
 * Alert the user of something important. Should be used sparingly, as this interrupts the
 * user flow.
 */
export const Confirm: React.FC<ConfirmProps> = ({
  title,
  message,
  open,
  onClose,
  positiveActionText,
  negativeActionText,
}) => {
  const decline = useCallback(() => onClose(false), [onClose])
  const accept = useCallback(() => onClose(true), [onClose])

  return (
    <Dialog
      sectioned
      hideClose
      open={open}
      onClose={decline}
      title={title}
      primaryAction={{ label: positiveActionText, action: accept }}
      secondaryActions={[{ label: negativeActionText, action: decline }]}
    >
      <BodyText>{message}</BodyText>
    </Dialog>
  )
}
