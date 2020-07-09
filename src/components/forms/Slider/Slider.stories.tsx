import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Box } from '../../structure/Box/Box'
import { BodyText } from '../../text'
import { Slider, SliderProps } from './Slider'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Slider,
}

export const Basic: StoryFn<SliderProps> = props => {
  const [value, setValue] = useState(props.value ?? 0)

  return (
    <Box space="medium">
      <Slider {...props} onChange={setValue} />
      <BodyText>Current Value: {value}</BodyText>
    </Box>
  )
}

Basic.args = {
  label: 'Select a value',
  helpText: 'Value must be between 0 and 100.',
  value: 50,
}

export const Disabled: React.FC = () => (
  <Slider label="Percentage of happiness" value={50} disabled />
)
