import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { Centered } from '../../../storybook/decorators/Centered'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Badge, BadgeProps } from './Badge'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Badge,
  decorators: [Centered],
}

export const Default: StoryFn<BadgeProps> = props => <Badge {...props} />

Default.args = {
  children: 'Default',
}

Default.argTypes = {
  children: { control: 'text' },
}

export const Warning: React.FC = () => <Badge variation="warning">Warning</Badge>
