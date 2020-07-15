import React from 'react'
import { action } from '@storybook/addon-actions'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { LeftAlign } from '../../../storybook/decorators/LeftAlign'
import { IconButton } from './IconButton'

export default {
  title: getStoryTitle(fileAbsolute),
  component: IconButton,
  decorators: [LeftAlign],
}

export const Default: React.FC = () => (
  <IconButton icon="edit" onClick={action('IconButton clicked')} />
)

export const Disabled: React.FC = () => (
  <IconButton icon="edit" disabled onClick={action('IconButton clicked')} />
)

export const WithAccentColor: React.FC = () => (
  <IconButton icon="favorite" color="accent" onClick={action('IconButton clicked')} />
)
