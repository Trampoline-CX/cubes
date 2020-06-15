import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { CenteredVertical } from '../../../storybook/decorators/CenteredVertical'
import { SkeletonLoading } from '../SkeletonLoading/SkeletonLoading'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { SkeletonHeading } from './SkeletonHeading'

export default {
  title: getStoryTitle(fileAbsolute),
  component: SkeletonHeading,
  decorators: [CenteredVertical],
}

export const Default: React.FC = () => (
  <SkeletonLoading loading>
    <SkeletonHeading />
  </SkeletonLoading>
)
