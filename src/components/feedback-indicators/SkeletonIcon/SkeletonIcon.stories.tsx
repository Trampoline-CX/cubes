import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { SkeletonLoading } from '../SkeletonLoading/SkeletonLoading'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Box } from '../../structure/Box/Box'
import { Heading } from '../../text'
import { useTheme } from '../../../theme'
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

export const Size: React.FC = () => {
  const { size } = useTheme()

  return (
    <Box horizontal space="xLarge">
      <Box>
        <Heading>Small ({size.icon.small}dp)</Heading>
        <SkeletonIcon size="small" />
      </Box>
      <Box>
        <Heading>Default ({size.icon.default}dp)</Heading>
        <SkeletonIcon size="default" />
      </Box>
      <Box>
        <Heading>Large ({size.icon.large}dp)</Heading>
        <SkeletonIcon size="large" />
      </Box>
      <Box>
        <Heading>X Large ({size.icon.xLarge}dp)</Heading>
        <SkeletonIcon size="xLarge" />
      </Box>
    </Box>
  )
}
