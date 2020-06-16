import React from 'react'
import { Text } from 'react-native'
import { BodyText } from '../../text/BodyText/BodyText'
import { useStyles } from '../../../theme'
import { Box } from '../../structure'

export interface InlineErrorProps {
  /**
   * Error message.
   */
  message: string
}

/**
 * Component used to display an error message.
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
