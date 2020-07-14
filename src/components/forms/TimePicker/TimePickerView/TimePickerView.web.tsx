import React, { useCallback, useRef, useEffect, InputHTMLAttributes } from 'react'
import { format, parse } from 'date-fns'
import { TimePickerViewProps } from './types'

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
  const onChange = useCallback<Required<InputHTMLAttributes<HTMLInputElement>>['onChange']>(
    ev => {
      onChangeRaw(parse(ev.target.value, 'HH:mm', value))
      onRequestClose()
    },
    [value, onChangeRaw, onRequestClose],
  )

  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      ref.current?.click()
    }
  }, [open])

  return (
    <>
      {activator}
      <input
        ref={ref}
        type="time"
        value={format(value, 'HH:mm')}
        onChange={onChange}
        onClick={() => console.log('TEST')}
        style={{ display: 'none' }}
      />
    </>

    // <Popover
    //   open={open}
    //   activator={activator}
    //   onRequestClose={onRequestClose}
    //   hideBackdrop
    //   placement="bottom-start"
    // >
    //   <WebDatePicker selected={value} onChange={onChange} inline showTimeInput />
    // </Popover>
  )
}
