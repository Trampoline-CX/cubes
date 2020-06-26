import React, { useState, useEffect } from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { ChoiceList, ChoiceListProps } from './ChoiceList'

export default {
  title: getStoryTitle(fileAbsolute),
  component: ChoiceList,
}

export const Basic: StoryFn<ChoiceListProps> = props => {
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    action('Selection changed')(selected)
  }, [selected])

  return <ChoiceList {...props} selected={selected} onChange={setSelected} />
}

Basic.args = {
  title: 'What do you want on your pizza?',
  choices: [
    {
      label: 'Mushrooms 🍄',
      helpText: "Not everyone like them, but they're tasty!",
      value: 'mushrooms',
    },
    {
      label: 'Cheese 🧀',
      helpText: 'Everyone like cheese!',
      value: 'cheese',
    },
    {
      label: 'Jalapeños 🌶️',
      helpText: 'If you like it hot!',
      value: 'jalapenos',
    },
    { label: 'Bacon 🐖', value: 'bacon' },
  ],
}

Basic.argTypes = {
  title: { control: 'text' },
  selected: { control: null },
}
