import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { Centered } from '../../../storybook/decorators/Centered'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Switch } from './Switch'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Switch,
  decorators: [Centered],
}

export const Default: React.FC = () => {
  const [checked, setChecked] = useState(false)

  return <Switch checked={checked} onChecked={setChecked} />
}
