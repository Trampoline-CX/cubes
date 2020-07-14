import React from 'react'
import WebDatePicker from 'react-datepicker'
import { DatePickerViewProps } from './types'

import 'react-datepicker/dist/react-datepicker.css'
import './react-datepicker.css'

/**
 * Let the user chooses a date and/or time from a visual calendar/clock.
 *
 * **Note:** This component is highly different depending on which version you're on.
 *
 * Sadly, this component is styled via CSS, so it is not possible to use Theme (◞‸◟；)
 */
export const DatePickerView: React.FC<DatePickerViewProps> = ({ value = null, onChange }) => (
  <WebDatePicker selected={value ?? new Date()} onChange={onChange} inline showYearDropdown />
)
