import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { SkeletonBodyText } from '../SkeletonBodyText/SkeletonBodyText'
import { SkeletonAvatar } from '../SkeletonAvatar/SkeletonAvatar'
import { Box } from '../../structure/Box/Box'
import { SkeletonDisplayText } from '../SkeletonDisplayText/SkeletonDisplayText'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { SkeletonLoading, SkeletonLoadingProps } from './SkeletonLoading'

export default {
  title: getStoryTitle(fileAbsolute),
  component: SkeletonLoading,
}

export const Default: StoryFn<SkeletonLoadingProps> = props => (
  <SkeletonLoading {...props}>
    <Box horizontal space="medium">
      <SkeletonAvatar />
      <SkeletonDisplayText />
    </Box>

    <SkeletonBodyText lines={3} />

    <Box horizontal space="medium">
      <Box fill>{}</Box>
      <SkeletonAvatar />
      <SkeletonAvatar />
    </Box>

    <SkeletonBodyText lines={1} />
  </SkeletonLoading>
)

Default.args = {
  loading: true,
}

Default.argTypes = {
  children: { control: null },
}
