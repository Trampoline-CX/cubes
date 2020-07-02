import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Screen } from '../Screen/Screen'
import { EmptyState, EmptyStateProps } from './EmptyState'

export default {
  title: getStoryTitle(fileAbsolute),
  component: EmptyState,
  decorators: [PhoneScreen],
}

export const Basic: StoryFn<EmptyStateProps> = props => (
  <Screen>
    <Screen.Content>
      <EmptyState {...props} />
    </Screen.Content>
  </Screen>
)

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

export const WithoutImageAndHeading: React.FC = () => (
  <Screen>
    <Screen.Content>
      <EmptyState
        content="No events for now..."
        action={{ label: 'Add Event', action: action('Add Event Clicked') }}
      />
    </Screen.Content>
  </Screen>
)
