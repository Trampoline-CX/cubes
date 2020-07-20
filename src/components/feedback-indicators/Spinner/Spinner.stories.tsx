import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { DarkBackground } from '../../../storybook/decorators/DarkBackground'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Spinner, SpinnerProps } from './Spinner'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Spinner,
}

export const Default: StoryFn<SpinnerProps> = props => <Spinner {...props} />
export const Accent: React.FC = () => <Spinner color="accent" />
export const Subdued: React.FC = () => <Spinner color="subdued" />
export const Inverse: React.FC & { story: unknown } = () => <Spinner color="inverse" />
Inverse.story = {
  decorators: [DarkBackground],
}
