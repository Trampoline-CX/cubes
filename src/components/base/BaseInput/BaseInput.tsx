import React from 'react'
import { useStyles } from '../../../theme'
import { Touchable } from '../Touchable/Touchable'
import { BodyText } from '../../text'

export interface BaseInputProps {
  value: string
  onClick: () => void
  focused: boolean
  disabled: boolean
}

/**
 * Gives the look of a basic Input component. Use for components that look like a `TextField` but are not.
 */
export const BaseInput: React.FC<BaseInputProps> = ({ value, onClick, focused, disabled }) => {
  const styles = useStyles(theme => ({
    // Base Styles
    inputContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors.fill.background.lighter,
      borderColor: theme.colors.fill.primary.default,
      borderWidth: theme.border.small,
      borderRadius: theme.radius.medium,
      height: 40, // Need to enforce height for iOS.
      paddingHorizontal: theme.spacing.medium,
      paddingVertical: theme.spacing.small - theme.border.small,
      alignItems: 'center',
    },

    // Focused Styles
    inputContainerFocused: {
      borderColor: theme.colors.fill.primary.default,
    },

    // Disabled Styles
    inputContainerDisabled: {
      opacity: theme.opacity.disabled,
    },
  }))

  return (
    <Touchable
      viewStyle={[
        styles.inputContainer,
        focused && styles.inputContainerFocused,
        disabled && styles.inputContainerDisabled,
      ]}
      onClick={onClick}
      disabled={disabled}
    >
      <BodyText maxLines={1}>{value}</BodyText>
    </Touchable>
  )
}
