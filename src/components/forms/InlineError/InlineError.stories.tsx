import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { CenteredVertical } from '../../../storybook/decorators/CenteredVertical'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { InlineError } from './InlineError'

export default {
  title: getStoryTitle(fileAbsolute),
  component: InlineError,
  decorators: [CenteredVertical],
}

export const Default: React.FC = () => <InlineError message="An error occured while doing stuff." />
