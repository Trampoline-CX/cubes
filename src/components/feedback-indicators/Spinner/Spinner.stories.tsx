import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { DarkBackground } from '../../../storybook/decorators/DarkBackground'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Spinner } from './Spinner'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Spinner,
}

export const Default: React.FC = () => <Spinner />
export const Accent: React.FC = () => <Spinner color="accent" />
export const Subdued: React.FC = () => <Spinner color="subdued" />
export const Inverse: React.FC & { story: unknown } = () => <Spinner color="inverse" />
Inverse.story = {
  decorators: [DarkBackground],
}
