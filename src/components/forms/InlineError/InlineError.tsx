import React from 'react'
import { Text } from 'react-native'
import { BodyText } from '../../text/BodyText/BodyText'
import { useStyles } from '../../../theme'
import { Box } from '../../structure/Box/Box'

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
export const InlineError: React.FC<InlineErrorProps> = ({ message }) => {
  const styles = useStyles(theme => ({
    text: {
      color: theme.colors.status.error,
    },
  }))

  return (
    <Box horizontal>
      {/* TODO Put error Icon */}
      <BodyText>
        <Text style={styles.text}>{message}</Text>
      </BodyText>
    </Box>
  )
}
