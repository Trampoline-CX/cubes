import React from 'react'
import { Text } from 'react-native'
import { BodyText } from '../../text/BodyText/BodyText'
import { Stack } from '../../structure/Stack/Stack'
import { useStyles } from '../../../theme'

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
    <Stack horizontal>
      {/* TODO Put error Icon */}
      <BodyText>
        <Text style={styles.text}>{message}</Text>
      </BodyText>
    </Stack>
  )
}
