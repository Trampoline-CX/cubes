import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { SkeletonBodyText } from '../SkeletonBodyText/SkeletonBodyText'
import { SkeletonAvatar } from '../SkeletonAvatar/SkeletonAvatar'
import { Box } from '../../structure/Box/Box'
import { SkeletonDisplayText } from '../SkeletonDisplayText/SkeletonDisplayText'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Layout } from '../../structure/Layout/Layout'
import { SkeletonLoading } from './SkeletonLoading'

export default {
  title: getStoryTitle(fileAbsolute),
  component: SkeletonLoading,
}

export const Default: React.FC = () => (
  <Layout>
    <SkeletonLoading loading>
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
  </Layout>
)
