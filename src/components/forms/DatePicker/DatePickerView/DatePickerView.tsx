import React, { useCallback } from 'react'
import NativeDatePicker from 'react-native-modal-datetime-picker'
import { DatePickerViewProps } from './types'

/**
 * Let the user chooses a date and/or time from a visual calendar/clock.
 *
 * Sadly, on Android, this is styled via native project XML, so it does not support styling (◞‸◟；)
 */
export const DatePickerView: React.FC<DatePickerViewProps> = ({
  open,
  value,
  onChange: onChangeRaw,
  activator,
  onRequestClose,
  minDate,
  maxDate,
}) => {
  const onChange = useCallback(
    (date: Date) => {
      onRequestClose()
      onChangeRaw(date)
    },
    [onChangeRaw, onRequestClose],
  )

  return (
    <>
      {activator}
      <NativeDatePicker
        isVisible={open}
        date={value}
        mode="date"
        onConfirm={onChange}
        onCancel={onRequestClose}
        minimumDate={minDate}
        maximumDate={maxDate}
      />
    </>
  )
}
