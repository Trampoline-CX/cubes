import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { CenteredVertical } from '../../../storybook/decorators/CenteredVertical'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Caption } from './Caption'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Caption,
  decorators: [CenteredVertical],
}

export const Default: React.FC = () => <Caption>This text is a caption.</Caption>
