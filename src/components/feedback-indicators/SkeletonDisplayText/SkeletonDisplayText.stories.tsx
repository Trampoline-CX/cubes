import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { SkeletonLoading } from '../SkeletonLoading/SkeletonLoading'
import { CenteredVertical } from '../../../storybook/decorators/CenteredVertical'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { SkeletonDisplayText } from './SkeletonDisplayText'

export default {
  title: getStoryTitle(fileAbsolute),
  component: SkeletonDisplayText,
  decorators: [CenteredVertical],
}

export const Default: React.FC = () => (
  <SkeletonLoading loading>
    <SkeletonDisplayText />
  </SkeletonLoading>
)
