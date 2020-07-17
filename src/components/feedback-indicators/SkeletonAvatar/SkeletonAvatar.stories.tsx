import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { SkeletonLoading } from '../SkeletonLoading/SkeletonLoading'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Box } from '../../structure/Box/Box'
import { Heading } from '../../text'
import { useTheme } from '../../../theme'
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

export const Size: React.FC = () => {
  const { size } = useTheme()

  return (
    <Box horizontal space="xLarge">
      <Box>
        <Heading>Small ({size.avatar.small}dp)</Heading>
        <SkeletonAvatar size="small" />
      </Box>
      <Box>
        <Heading>Default ({size.avatar.default}dp)</Heading>
        <SkeletonAvatar size="default" />
      </Box>
    </Box>
  )
}
