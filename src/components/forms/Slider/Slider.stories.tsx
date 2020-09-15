import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Box } from '../../structure/Box/Box'
import { BodyText } from '../../text'
import { Slider, SliderProps } from './Slider'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Slider,
  parameters: {
    chromatic: { delay: 300 }, // Add small delay as Slider takes some time to render sometimes...
  },
}

export const Basic: StoryFn<SliderProps> = props => {
  const [value, setValue] = useState(props.value ?? 0)

  return (
    <Box space="medium">
      <Slider {...props} value={value} onChange={setValue} />
      <BodyText>Current Value: {value}</BodyText>
    </Box>
  )
}

Basic.args = {
  label: 'Select a value',
  helpText: 'Value must be between 0 and 100.',
  value: 50,
}

export const Disabled: React.FC = () => {
  const [value, setValue] = useState(50)

  return <Slider label="Percentage of happiness" value={value} onChange={setValue} disabled />
}

export const CustomRangeAndStep: React.FC = () => {
  const [value, setValue] = useState(2)

  return (
    <Box>
      <Slider
        label="Happy with your purchase?"
        value={value}
        onChange={setValue}
        min={1}
        max={5}
        step={0.5}
      />
      <BodyText>{value}</BodyText>
    </Box>
  )
}

export const Uncontrolled: React.FC = () => <Slider label="Percentage of happiness" />
