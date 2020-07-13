import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Switch } from './Switch'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Switch,
}

export const Default: React.FC = () => {
  const [checked, setChecked] = useState(false)

  return <Switch checked={checked} onChecked={setChecked} />
}

export const Uncontrolled: React.FC = () => <Switch />
