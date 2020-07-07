import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { CenteredVertical } from '../../../storybook/decorators/CenteredVertical'
import { SkeletonLoading } from '../SkeletonLoading/SkeletonLoading'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { SkeletonBodyText, SkeletonBodyTextProps } from './SkeletonBodyText'

export default {
  title: getStoryTitle(fileAbsolute),
  component: SkeletonBodyText,
  decorators: [CenteredVertical],
}

export const MultipleLines: StoryFn<SkeletonBodyTextProps> = props => (
  <SkeletonLoading loading>
    <SkeletonBodyText {...props} />
  </SkeletonLoading>
)

MultipleLines.args = {
  lines: 3,
}

export const SingleLine: React.FC = () => (
  <SkeletonLoading loading>
    <SkeletonBodyText />
  </SkeletonLoading>
)
