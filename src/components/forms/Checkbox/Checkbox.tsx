import React, { useCallback } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import { useStyles } from '../../../theme'
import { Box } from '../../structure'
import { BodyText } from '../../text'
import { shameStyles } from '../../../theme/shame-styles'
import { Icon } from '../../images-and-icons'

export interface CheckboxProps {
  /**
   * True if selected.
   */
  checked: boolean
  /**
   * Label to display next to the Checkbox.
   */
  label: string
  /**
   * Additional text to aid in use.
   */
  helpText?: string
  /**
   * Called when selection state changes. Should propagate change to `checked` prop.
   */
  onChange: (checked: boolean) => void
}

const { size } = shameStyles.checkbox

/**
 * Use when the user needs to choose a single item in a list.
 */
export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, helpText }) => {
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
  }))

  const onClick = useCallback(() => onChange(!checked), [checked, onChange])

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View>
        <Box horizontal space="medium" paddingY="medium">
          <View style={[styles.background, checked ? styles.backgroundChecked : null]}>
            {checked ? <Icon name="clear" color="accent" /> : null}
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
