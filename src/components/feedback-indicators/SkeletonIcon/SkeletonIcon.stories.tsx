import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { SkeletonLoading } from '../SkeletonLoading/SkeletonLoading'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { SkeletonIcon } from './SkeletonIcon'

export default {
  title: getStoryTitle(fileAbsolute),
  component: SkeletonIcon,
}

export const Default: React.FC = () => (
  <SkeletonLoading loading>
    <SkeletonIcon />
  </SkeletonLoading>
)
