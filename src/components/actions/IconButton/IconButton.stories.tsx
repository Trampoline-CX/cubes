import React from 'react'
import { action } from '@storybook/addon-actions'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { LeftAlign } from '../../../storybook/decorators/LeftAlign'
import { IconButton, IconButtonProps } from './IconButton'

export default {
  title: getStoryTitle(fileAbsolute),
  component: IconButton,
  decorators: [LeftAlign],
}

export const Default: StoryFn<IconButtonProps> = props => <IconButton {...props} />

Default.args = {
  icon: 'edit',
  onClick: action('IconButton clicked'),
}

export const Disabled: React.FC = () => (
  <IconButton icon="edit" disabled onClick={action('IconButton clicked')} />
)

export const WithAccentColor: React.FC = () => (
  <IconButton icon="favorite" color="accent" onClick={action('IconButton clicked')} />
)
