import React, { useCallback } from 'react'
import WebDatePicker from 'react-datepicker'
import { Popover } from '../../../overlays/Popover/Popover'
import { TimePickerViewProps } from './types'

import 'react-datepicker/dist/react-datepicker.css'

/**
 * Let the user chooses a date and/or time from a visual calendar/clock.
 *
 * Sadly, this component is styled via CSS, so it does not support styling (◞‸◟；)
 */
export const TimePickerView: React.FC<TimePickerViewProps> = ({
  value,
  onChange: onChangeRaw,
  open,
  activator,
  onRequestClose,
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
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={1}
        title=""
      />
    </Popover>
  )
}
