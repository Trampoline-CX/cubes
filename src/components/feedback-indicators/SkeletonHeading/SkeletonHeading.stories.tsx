import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { SkeletonLoading } from '../SkeletonLoading/SkeletonLoading'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { SkeletonHeading } from './SkeletonHeading'

export default {
  title: getStoryTitle(fileAbsolute),
  component: SkeletonHeading,
}

export const Default: React.FC = () => (
  <SkeletonLoading loading>
    <SkeletonHeading />
  </SkeletonLoading>
)
