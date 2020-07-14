import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { Screen } from '../../structure/Screen/Screen'
import { DatePicker } from './DatePicker'

export default {
  title: getStoryTitle(fileAbsolute),
  component: DatePicker,
  decorators: [PhoneScreen],
}

export const Basic: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <Screen>
      <DatePicker label="Select a date" value={date} onChange={setDate} />
    </Screen>
  )
}
