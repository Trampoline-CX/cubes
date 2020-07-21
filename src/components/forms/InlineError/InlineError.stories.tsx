import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { InlineError, InlineErrorProps } from './InlineError'

export default {
  title: getStoryTitle(fileAbsolute),
  component: InlineError,
}

export const Default: StoryFn<InlineErrorProps> = props => <InlineError {...props} />

Default.args = {
  message: 'An error occured while doing stuff.',
}
