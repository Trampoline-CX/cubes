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
}

Basic.argTypes = {
  value: { control: 'date' },
  error: { control: 'text' },
  helpText: { control: 'text' },
}
