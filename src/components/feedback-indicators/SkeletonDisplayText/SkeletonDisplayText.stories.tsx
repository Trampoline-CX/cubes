import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { SkeletonLoading } from '../SkeletonLoading/SkeletonLoading'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { SkeletonDisplayText } from './SkeletonDisplayText'

export default {
  title: getStoryTitle(fileAbsolute),
  component: SkeletonDisplayText,
}

export const Default: React.FC = () => (
  <SkeletonLoading loading>
    <SkeletonDisplayText />
  </SkeletonLoading>
)
