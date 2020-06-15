import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { CenteredVertical } from '../../../storybook/decorators/CenteredVertical'
import { SkeletonLoading } from '../SkeletonLoading/SkeletonLoading'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { SkeletonBodyText } from './SkeletonBodyText'

export default {
  title: getStoryTitle(fileAbsolute),
  component: SkeletonBodyText,
  decorators: [CenteredVertical],
}

export const MultipleLines: React.FC = () => (
  <SkeletonLoading loading>
    <SkeletonBodyText lines={3} />
  </SkeletonLoading>
)

export const SingleLine: React.FC = () => (
  <SkeletonLoading loading>
    <SkeletonBodyText />
  </SkeletonLoading>
)
