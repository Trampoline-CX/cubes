import React, { useState, useCallback } from 'react'
import { format as formatDate } from 'date-fns'
import { useUncontrolledState } from '../../../utils/hooks/use-uncontrolled-state'
import { BaseInputContainer } from '../../base/BaseInput/BaseInputContainer'
import { BaseInput } from '../../base/BaseInput/BaseInput'
import { DatePickerView } from './DatePickerView/DatePickerView'

export interface DatePickerProps {
  /**
   * Currently selected Date. If `null`, no date will be selected.
   */
  value?: Date | null
  /**
   * Callback called when Date value changes.
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
  error = false,
  disabled = false,
  format = 'MM/dd/Y',
  minDate,
  maxDate,
}) => {
  const [value, onChange] = useUncontrolledState(valueRaw, onChangeRaw)

  const [visible, setVisible] = useState(false)
  const showDatePicker = useCallback(() => setVisible(true), [])
  const hideDatePicker = useCallback(() => setVisible(false), [])

  return (
    <BaseInputContainer
      label={label}
      disabled={disabled}
      helpText={helpText}
      error={error}
      onLabelClick={showDatePicker}
    >
      <DatePickerView
        open={visible}
        activator={
          <BaseInput
            value={value ? formatDate(value, format) : placeholder ?? ''}
            onClick={showDatePicker}
            focused={visible}
            disabled={disabled}
          />
        }
        value={value ?? new Date()}
        onChange={onChange}
        onRequestClose={hideDatePicker}
        minDate={minDate}
        maxDate={maxDate}
      />
    </BaseInputContainer>
  )
}
