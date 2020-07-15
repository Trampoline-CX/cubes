import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { SkeletonLoading } from '../SkeletonLoading/SkeletonLoading'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { SkeletonAvatar, SkeletonAvatarProps } from './SkeletonAvatar'

export default {
  title: getStoryTitle(fileAbsolute),
  component: SkeletonAvatar,
}

export const Default: StoryFn<SkeletonAvatarProps> = props => (
  <SkeletonLoading loading>
    <SkeletonAvatar {...props} />
  </SkeletonLoading>
)

export const Small: React.FC = () => (
  <SkeletonLoading loading>
    <SkeletonAvatar size="small" />
  </SkeletonLoading>
)
