import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { SkeletonBodyText } from '../SkeletonBodyText/SkeletonBodyText'
import { SkeletonAvatar } from '../SkeletonAvatar/SkeletonAvatar'
import { Stack } from '../../structure/Stack/Stack'
import { Box } from '../../structure/Box/Box'
import { SkeletonDisplayText } from '../SkeletonDisplayText/SkeletonDisplayText'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { SkeletonLoading } from './SkeletonLoading'

export default {
  title: getStoryTitle(fileAbsolute),
  component: SkeletonLoading,
}

export const Default: React.FC = () => (
  <SkeletonLoading loading>
    <Stack horizontal space="medium">
      <SkeletonAvatar />
      <SkeletonDisplayText />
    </Stack>

    <SkeletonBodyText lines={3} />

    <Stack horizontal space="medium">
      <Box fill>{}</Box>
      <SkeletonAvatar />
      <SkeletonAvatar />
    </Stack>

    <SkeletonBodyText lines={1} />
  </SkeletonLoading>
)
