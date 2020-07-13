import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { ProgressBar, ProgressBarProps } from './ProgressBar'

export default {
  title: getStoryTitle(fileAbsolute),
  component: ProgressBar,
}

export const Basic: StoryFn<ProgressBarProps> = props => <ProgressBar {...props} />

Basic.args = { progress: 75 }
