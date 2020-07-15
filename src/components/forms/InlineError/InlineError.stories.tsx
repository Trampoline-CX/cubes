import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { LOREM_IPSUM } from '../../../storybook/utils/constants'
import { InlineError } from './InlineError'

export default {
  title: getStoryTitle(fileAbsolute),
  component: InlineError,
}

export const Default: React.FC = () => <InlineError message="An error occured while doing stuff." />

export const WithLongText: React.FC = () => <InlineError message={LOREM_IPSUM} />
