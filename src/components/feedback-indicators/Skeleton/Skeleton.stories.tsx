/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { SkeletonLoading } from '../SkeletonLoading/SkeletonLoading'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Skeleton } from './Skeleton'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Skeleton,
}

export const Loading: React.FC = () => (
  <SkeletonLoading loading>
    <Skeleton style={{ width: 80, height: 80, borderRadius: 8 }} />
  </SkeletonLoading>
)
