import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { InlineError } from './InlineError'

export default {
  title: getStoryTitle(fileAbsolute),
  component: InlineError,
}

export const Default: React.FC = () => <InlineError message="An error occured while doing stuff." />
