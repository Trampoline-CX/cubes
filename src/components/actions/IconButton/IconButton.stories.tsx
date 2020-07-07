import React from 'react'
import { action } from '@storybook/addon-actions'
import { fileAbsolute } from 'paths.macro'
import { Centered } from '../../../storybook/decorators/Centered'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { IconButton, IconButtonProps } from './IconButton'

export default {
  title: getStoryTitle(fileAbsolute),
  component: IconButton,
  decorators: [Centered],
}

export const Default: StoryFn<IconButtonProps> = props => <IconButton {...props} />

Default.args = {
  icon: 'more',
  onClick: action('IconButton clicked'),
}

export const Disabled: React.FC = () => (
  <IconButton icon="more" disabled onClick={action('IconButton clicked')} />
)

export const WithAccentColor: React.FC = () => (
  <IconButton icon="feedback" color="accent" onClick={action('IconButton clicked')} />
)
