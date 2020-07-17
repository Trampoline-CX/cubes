import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { LeftAlign } from '../../../storybook/decorators/LeftAlign'
import { Badge } from './Badge'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Badge,
  decorators: [LeftAlign],
}

export const Default: React.FC = () => <Badge>Default</Badge>
export const Warning: React.FC = () => <Badge variation="warning">Warning</Badge>
