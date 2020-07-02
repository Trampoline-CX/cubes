import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { EmptyState, EmptyStateProps } from './EmptyState'

export default {
  title: getStoryTitle(fileAbsolute),
  component: EmptyState,
}

export const Basic: StoryFn<EmptyStateProps> = props => <EmptyState {...props} />

Basic.args = {
  heading: 'Hello?',
  content: "It's so empty in here alone. Why don't you add some friends?",
  action: { label: 'Add friend', action: action('Add friend Clicked') },
  image: 'face',
}

Basic.argTypes = {
  heading: { control: 'text' },
  content: { control: 'text' },
  image: { control: 'text' },
}

export const WithoutImageAndContent: React.FC = () => (
  <EmptyState
    heading="No events for now..."
    action={{ label: 'Add Event', action: action('Add Event Clicked') }}
  />
)
