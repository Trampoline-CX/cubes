import React from 'react'
import { BodyText } from '../../text/BodyText/BodyText'
import { Box } from '../../structure/Box/Box'
import { Icon } from '../../images-and-icons/Icon/Icon'

export interface InlineErrorProps {
  /**
   * Error message.
   */
  message: string
}

/**
 * Brief, in-context messages telling the user that something went wrong
 * with a single or group of inputs in a form.
 *
 * Use to let users know why a form input is invalid and how to fix it.
 *
 * > Used in `TextField` component to display error message.
 */
export const InlineError: React.FC<InlineErrorProps> = ({ message }) => (
  <Box horizontal space="small">
    <Icon name="error" color="error" />
    <BodyText variation="error">{message}</BodyText>
  </Box>
)
