import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { Centered } from '../../../storybook/decorators/Centered'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Badge } from './Badge'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Badge,
  decorators: [Centered],
}

export const Default: React.FC = () => <Badge>Default</Badge>
export const Warning: React.FC = () => <Badge variation="warning">Warning</Badge>
