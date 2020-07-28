import React, { useCallback } from 'react'
import NativeDatePicker from 'react-native-modal-datetime-picker'
import { TimePickerViewProps } from './types'

/**
 * Let the user chooses a date and/or time from a visual calendar/clock.
 *
 * Sadly, on Android, this is styled via native project XML, so it does not support styling (◞‸◟；)
 */
export const TimePickerView: React.FC<TimePickerViewProps> = ({
  open,
  value,
  onChange: onChangeRaw,
  activator,
  onRequestClose,
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
        mode="time"
        onConfirm={onChange}
        onCancel={onRequestClose}
      />
    </>
  )
}
