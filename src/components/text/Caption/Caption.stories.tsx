import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { CenteredVertical } from '../../../storybook/decorators/CenteredVertical'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Caption, CaptionProps } from './Caption'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Caption,
  decorators: [CenteredVertical],
}

export const Default: StoryFn<CaptionProps> = props => <Caption {...props} />

Default.args = {
  children: 'This text is a caption.',
}

Default.argTypes = {
  children: { control: 'text' },
}
