import React, { useCallback } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import { useStyles } from '../../../theme'
import { Box } from '../../structure/Box/Box'
import { BodyText } from '../../text'
import { shameStyles } from '../../../theme/shame-styles'
import { Icon } from '../../images-and-icons/Icon/Icon'

export interface CheckboxProps {
  /**
   * True if selected.
   */
  checked: boolean
  /**
   * Label to display next to the Checkbox.
   */
  label: React.ReactNode
  /**
   * Additional text to aid in use.
   */
  helpText?: React.ReactNode
  /**
   * Disables the input.
   */
  disabled?: boolean
  /**
   * Called when selection state changes. Should propagate change to `checked` prop.
   */
  onChange: (checked: boolean) => void
}

const { size } = shameStyles.checkbox

/**
 * Use when the user needs to choose zero, one or multiple items in a list.
 * It may also be used as an indicator that the user performed a certain action
 * (like reading the terms and conditions).
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  helpText,
  disabled = false,
  onChange,
}) => {
  const styles = useStyles(theme => ({
    background: {
      backgroundColor: theme.colors.fill.background.lighter,
      borderColor: theme.colors.fill.primary.default,
      borderWidth: theme.border.small,
      borderRadius: theme.radius.small,
      width: size,
      height: size,
      marginVertical: (theme.font.size.regular.height - size) / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundChecked: {
      borderColor: theme.colors.fill.accent.default,
    },
    disabled: {
      opacity: theme.opacity.disabled,
    },
  }))

  const onClick = useCallback(() => onChange(!checked), [checked, onChange])

  return (
    <TouchableWithoutFeedback onPress={onClick} disabled={disabled}>
      <View style={disabled ? styles.disabled : null}>
        <Box horizontal space="medium">
          <View style={[styles.background, checked ? styles.backgroundChecked : null]}>
            {checked && <Icon name="clear" color="accent" />}
          </View>
          <Box>
            <BodyText>{label}</BodyText>
            <BodyText variation="subdued">{helpText}</BodyText>
          </Box>
        </Box>
      </View>
    </TouchableWithoutFeedback>
  )
}
