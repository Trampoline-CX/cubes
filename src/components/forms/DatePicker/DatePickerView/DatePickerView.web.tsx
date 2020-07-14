import React, { useCallback } from 'react'
import WebDatePicker from 'react-datepicker'
import { Popover } from '../../../overlays/Popover/Popover'
import { DatePickerViewProps } from './types'

import 'react-datepicker/dist/react-datepicker.css'
import './react-datepicker.css'

/**
 * Let the user chooses a date and/or time from a visual calendar/clock.
 *
 * Sadly, this component is styled via CSS, so it does not support styling (◞‸◟；)
 */
export const DatePickerView: React.FC<DatePickerViewProps> = ({
  value,
  onChange: onChangeRaw,
  open,
  activator,
  onRequestClose,
  minDate,
  maxDate,
}) => {
  const onChange = useCallback(
    (date: Date) => {
      onChangeRaw(date)
      onRequestClose()
    },
    [onChangeRaw, onRequestClose],
  )

  return (
    <Popover
      open={open}
      activator={activator}
      onRequestClose={onRequestClose}
      hideBackdrop
      placement="bottom-start"
    >
      <WebDatePicker
        selected={value}
        onChange={onChange}
        inline
        showYearDropdown
        minDate={minDate}
        maxDate={maxDate}
      />
    </Popover>
  )
}
