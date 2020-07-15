import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { SkeletonLoading } from '../SkeletonLoading/SkeletonLoading'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { SkeletonIcon, SkeletonIconProps } from './SkeletonIcon'

export default {
  title: getStoryTitle(fileAbsolute),
  component: SkeletonIcon,
}

export const Default: StoryFn<SkeletonIconProps> = props => (
  <SkeletonLoading loading>
    <SkeletonIcon {...props} />
  </SkeletonLoading>
)

export const Small: React.FC = () => (
  <SkeletonLoading loading>
    <SkeletonIcon size="small" />
  </SkeletonLoading>
)

export const Large: React.FC = () => (
  <SkeletonLoading loading>
    <SkeletonIcon size="large" />
  </SkeletonLoading>
)

export const XLarge: React.FC = () => (
  <SkeletonLoading loading>
    <SkeletonIcon size="xLarge" />
  </SkeletonLoading>
)
