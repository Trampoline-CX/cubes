import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Screen } from '../../structure'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { Select } from './Select'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Select,
  decorators: [PhoneScreen],
}

export const Basic: React.FC = () => (
  <Screen>
    <Select options={[{ label: 'A pizza' }, { label: 'A smoothie' }]} />
  </Screen>
)
