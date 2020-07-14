import React, { useCallback } from 'react'
import NativeDatePicker from '@react-native-community/datetimepicker'
import { DatePickerViewProps } from './types'

/**
 * Let the user chooses a date and/or time from a visual calendar/clock.
 *
 * **Note:** This component is highly different depending on which version you're on.
 */
export const DatePickerView: React.FC<DatePickerViewProps> = ({
  value = null,
  onChange: onChangeRaw,
}) => {
  const onChange = useCallback(
    (_, newDate: Date | undefined) => {
      if (newDate) {
        onChangeRaw(newDate)
      }
    },
    [onChangeRaw],
  )

  return <NativeDatePicker value={value ?? new Date()} onChange={onChange} mode="date" />
}
