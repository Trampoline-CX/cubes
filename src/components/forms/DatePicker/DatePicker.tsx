import React, { useState, useCallback } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import { format as formatDate } from 'date-fns'
import { useUncontrolledState } from '../../../utils/hooks/use-uncontrolled-state'
import { Popover } from '../../overlays/Popover/Popover'
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
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value: valueRaw = null,
  onChange: onChangeRaw,
  label,
  placeholder,
  helpText,
  error,
  disabled = false,
  format = 'MM/dd/Y',
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

  const onDatePicked = useCallback(
    (date: Date) => {
      setVisible(false)
      onChange(date)
    },
    [onChange],
  )

  return (
    <Box>
      <TouchableWithoutFeedback onPress={showDatePicker} disabled={disabled}>
        <View>
          <Box paddingBottom="small">
            <Heading>{label}</Heading>
          </Box>
        </View>
      </TouchableWithoutFeedback>
      <Popover
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
        onRequestClose={hideDatePicker}
        hideBackdrop
        placement="bottom-start"
      >
        <DatePickerView value={value ?? new Date()} onChange={onDatePicked} />
      </Popover>
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
