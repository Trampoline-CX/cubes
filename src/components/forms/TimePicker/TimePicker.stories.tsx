import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Screen } from '../../structure/Screen/Screen'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { TimePicker, TimePickerProps } from './TimePicker'

export default {
  title: getStoryTitle(fileAbsolute),
  component: TimePicker,
  decorators: [PhoneScreen],
}

export const Basic: StoryFn<TimePickerProps> = props => {
  const [date, setDate] = useState<Date | null>(props.value ?? null)

  return (
    <Screen>
      <TimePicker {...props} value={date} onChange={setDate} />
    </Screen>
  )
}

Basic.args = {
  label: 'Select a time',
  value: null,
  placeholder: 'No time selected',
}

Basic.argTypes = {
  value: { control: 'date' },
  error: { control: 'text' },
  helpText: { control: 'text' },
}

export const Disabled: React.FC = () => {
  const [date, setDate] = useState<Date | null>()

  return (
    <Screen>
      <TimePicker label="Select a time" value={date} onChange={setDate} disabled />
    </Screen>
  )
}

export const WithError: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date(1608912252000))

  return (
    <Screen>
      <TimePicker
        label="Select an arrival time"
        value={date}
        onChange={setDate}
        error="You're not arrived yet, choose something else"
      />
    </Screen>
  )
}

export const WithCustomFormat: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date(1608912252000))

  return (
    <Screen>
      <TimePicker
        label="Select a time"
        value={date}
        onChange={setDate}
        format="'Hour:' H, 'Minute:' m"
      />
    </Screen>
  )
}
