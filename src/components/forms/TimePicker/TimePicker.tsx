import React, { useState, useCallback } from 'react'
import { format as formatDate } from 'date-fns'
import { useUncontrolledState } from '../../../utils/hooks/use-uncontrolled-state'
import { BaseInputContainer } from '../../base/BaseInput/BaseInputContainer'
import { BaseInput } from '../../base/BaseInput/BaseInput'
import { TimePickerView } from './TimePickerView/TimePickerView'

export interface TimePickerProps {
  /**
   * Currently selected Date. If `null`, no time will be selected.
   */
  value?: Date | null
  /**
   * Callback called when time value changes.
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
export const TimePicker: React.FC<TimePickerProps> = ({
  value: valueRaw = null,
  onChange: onChangeRaw,
  label,
  placeholder,
  helpText,
  error = false,
  disabled = false,
  format = 'h:mm a',
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
      <TimePickerView
        open={visible}
        activator={
          <BaseInput
            value={value ? formatDate(value, format) : ''}
            placeholder={placeholder}
            onClick={showDatePicker}
            focused={visible}
            disabled={disabled}
          />
        }
        value={value ?? new Date()}
        onChange={onChange}
        onRequestClose={hideDatePicker}
      />
    </BaseInputContainer>
  )
}
