import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Caption, CaptionProps } from './Caption'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Caption,
}

export const Default: StoryFn<CaptionProps> = props => <Caption {...props} />

Default.args = {
  children: 'This text is a caption.',
}

Default.argTypes = {
  children: { control: 'text' },
}
