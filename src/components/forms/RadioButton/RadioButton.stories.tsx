import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { RadioButton, RadioButtonProps } from './RadioButton'

export default {
  title: getStoryTitle(fileAbsolute),
  component: RadioButton,
}

export const Basic: StoryFn<RadioButtonProps> = props => {
  const [checked, setChecked] = useState(props.checked)

  return <RadioButton {...props} checked={checked} onChange={setChecked} />
}

Basic.args = {
  checked: false,
  label: 'A smoothie',
  helpText: 'Contains orange juice, mangos and love ❤️',
}

Basic.argTypes = {
  label: { control: 'text' },
  helpText: { control: 'text' },
}

export const WithoutHelpText: React.FC = () => {
  const [checked, setChecked] = useState(false)

  return <RadioButton label="Pizza" checked={checked} onChange={setChecked} />
}

export const Disabled: React.FC = () => {
  const [checked, setChecked] = useState(false)

  return <RadioButton label="Pizza" checked={checked} onChange={setChecked} disabled />
}

export const Uncontrolled: React.FC = () => <RadioButton label="Pizza" />
