import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { Screen } from '../../structure/Screen/Screen'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { DatePicker, DatePickerProps } from './DatePicker'

export default {
  title: getStoryTitle(fileAbsolute),
  component: DatePicker,
  decorators: [PhoneScreen],
}

export const Basic: StoryFn<DatePickerProps> = props => {
  const [date, setDate] = useState<Date | null>(props.value ?? null)

  return (
    <Screen>
      <DatePicker {...props} value={date} onChange={setDate} />
    </Screen>
  )
}

Basic.args = {
  label: 'Select a date',
  value: null,
  placeholder: 'No date selected',
}

Basic.argTypes = {
  value: { control: 'date' },
  minDate: { control: 'date' },
  maxDate: { control: 'date' },
  error: { control: 'text' },
  helpText: { control: 'text' },
}

export const Disabled: React.FC = () => {
  const [date, setDate] = useState<Date | null>()

  return (
    <Screen>
      <DatePicker label="Select a date" value={date} onChange={setDate} disabled />
    </Screen>
  )
}

export const WithMinAndMaxDates: React.FC = () => {
  const [date, setDate] = useState<Date | null>()
  const aMonth = 1000 * 60 * 60 * 24 * 30

  return (
    <Screen>
      <DatePicker
        label="Select a date"
        value={date}
        onChange={setDate}
        minDate={new Date(Date.now() - aMonth)}
        maxDate={new Date(Date.now() + aMonth)}
      />
    </Screen>
  )
}

export const WithError: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date(1608912252000))

  return (
    <Screen>
      <DatePicker
        label="Select a festive date"
        value={date}
        onChange={setDate}
        error="Christmas is way too much festive..."
      />
    </Screen>
  )
}

export const WithCustomFormat: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date())

  return (
    <Screen>
      <DatePicker label="Select a date" value={date} onChange={setDate} format="MMMM d, Y" />
    </Screen>
  )
}
