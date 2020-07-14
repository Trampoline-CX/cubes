import React, { useState, useCallback } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import { format as formatDate } from 'date-fns'
import { useUncontrolledState } from '../../../utils/hooks/use-uncontrolled-state'
import { useStyles } from '../../../theme'
import { Touchable } from '../../base/Touchable/Touchable'
import { Box } from '../../structure/Box/Box'
import { Heading, Caption, BodyText } from '../../text'
import { InlineError } from '../InlineError/InlineError'
import { DatePickerView } from './DatePickerView/DatePickerView'

export interface DatePickerProps {
  /**
   * Currently selected Date. If `null`, no date will be selected.
   */
  value?: Date | null
  /**
   * Callback called when Date value change.
   */
  onChange?: (date: Date | null) => void
  /**
   * Label shown above the input.
   */
  label: string
  /**
   * Text to display as a placeholder.
   */
  placeholder?: string
  /**
   * Additional text to help the user.
   */
  helpText?: React.ReactNode
  /**
   * Display an error state.
   */
  error?: boolean | string
  /**
   * If true, disables the input.
   */
  disabled?: boolean
  /**
   * Date Format to display according to date-fns.
   *
   * @see https://date-fns.org/docs/format
   */
  format?: string
  /**
   * Minimum selectable date.
   */
  minDate?: Date
  /**
   * Maximum selectable date.
   */
  maxDate?: Date
}

/**
 * Let the user chooses a date and/or time from a visual calendar/clock.
 *
 * Sadly, this component does not support theming for the DatePicker shown once the input is clicked. (◞‸◟；)
 *
 * **Note:** This component is highly different depending on which version you're on.
 * - On Web, it will display a Web DatePicker.
 * - On Android, it will display the native Android DatePicker (in a Dialog).
 * - On iOS, it will display the native iOS DatePicker (in a dialog).
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  value: valueRaw = null,
  onChange: onChangeRaw,
  label,
  placeholder,
  helpText,
  error,
  disabled = false,
  format = 'MM/dd/Y',
  minDate,
  maxDate,
}) => {
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

  const [value, onChange] = useUncontrolledState(valueRaw, onChangeRaw)

  const [visible, setVisible] = useState(false)
  const showDatePicker = useCallback(() => setVisible(true), [])
  const hideDatePicker = useCallback(() => setVisible(false), [])

  return (
    <Box>
      <TouchableWithoutFeedback onPress={showDatePicker} disabled={disabled}>
        <View>
          <Box paddingBottom="small">
            <Heading>{label}</Heading>
          </Box>
        </View>
      </TouchableWithoutFeedback>
      <DatePickerView
        open={visible}
        activator={
          <Touchable
            viewStyle={[
              styles.inputContainer,
              visible && styles.inputContainerFocused,
              disabled && styles.inputContainerDisabled,
            ]}
            onClick={showDatePicker}
            disabled={disabled}
          >
            <BodyText maxLines={1}>
              {value ? formatDate(value, format) : placeholder ?? ''}
            </BodyText>
          </Touchable>
        }
        value={value ?? new Date()}
        onChange={onChange}
        onRequestClose={hideDatePicker}
        minDate={minDate}
        maxDate={maxDate}
      />

      {error && (
        <Box paddingTop="xSmall">
          <InlineError message={typeof error === 'string' ? error : ''} />
        </Box>
      )}
      {helpText && (
        <Box paddingTop="xSmall">
          <Caption variation="subdued">{helpText}</Caption>
        </Box>
      )}
    </Box>
  )
}
