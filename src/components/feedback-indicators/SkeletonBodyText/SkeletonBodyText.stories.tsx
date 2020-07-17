import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { SkeletonLoading } from '../SkeletonLoading/SkeletonLoading'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { SkeletonBodyText } from './SkeletonBodyText'

export default {
  title: getStoryTitle(fileAbsolute),
  component: SkeletonBodyText,
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
