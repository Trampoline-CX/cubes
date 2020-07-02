import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Box } from '../../structure/Box/Box'
import { Button } from '../../actions/Button/Button'
import { ProgressBar, ProgressBarProps } from './ProgressBar'

export default {
  title: getStoryTitle(fileAbsolute),
  component: ProgressBar,
}

export const Basic: StoryFn<ProgressBarProps> = props => {
  const [value, setValue] = useState(props.progress)

  return (
    <Box space="medium">
      <ProgressBar progress={value} />
      <Button onClick={() => setValue(Math.random() * 100)}>Randomize Value</Button>
    </Box>
  )
}

Basic.args = { progress: 75 }
