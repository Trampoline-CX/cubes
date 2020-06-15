/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { Centered } from '../../../storybook/decorators/Centered'
import { SkeletonLoading } from '../SkeletonLoading/SkeletonLoading'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Skeleton } from './Skeleton'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Skeleton,
  decorators: [Centered],
}

export const Loading: React.FC = () => (
  <SkeletonLoading loading>
    <Skeleton style={{ width: 80, height: 80, borderRadius: 8 }} />
  </SkeletonLoading>
)
