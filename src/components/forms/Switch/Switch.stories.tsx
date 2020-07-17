import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Switch, SwitchProps } from './Switch'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Switch,
}

export const Default: StoryFn<SwitchProps> = props => {
  const [checked, setChecked] = useState(props.checked)

  return <Switch checked={checked} onChecked={setChecked} />
}

Default.args = {
  checked: false,
}

export const Uncontrolled: React.FC = () => <Switch />
