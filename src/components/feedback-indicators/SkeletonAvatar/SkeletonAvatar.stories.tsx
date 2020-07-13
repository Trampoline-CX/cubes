import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { SkeletonLoading } from '../SkeletonLoading/SkeletonLoading'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { SkeletonAvatar } from './SkeletonAvatar'

export default {
  title: getStoryTitle(fileAbsolute),
  component: SkeletonAvatar,
}

export const Default: React.FC = () => (
  <SkeletonLoading loading>
    <SkeletonAvatar />
  </SkeletonLoading>
)
