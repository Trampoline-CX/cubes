import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { BodyText } from '../../text/BodyText/BodyText'
import { CenteredVertical } from '../../../storybook/decorators/CenteredVertical'
import { Box } from '../Box/Box'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Stack } from './Stack'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Stack,
  decorators: [CenteredVertical],
}

export const Default: React.FC = () => (
  <Stack>
    <BodyText>Test1</BodyText>
    <BodyText>Test2</BodyText>
    <BodyText>Test3</BodyText>
  </Stack>
)

export const Center: React.FC = () => (
  <Stack align="center">
    <BodyText>Test1</BodyText>
    <BodyText>Test2</BodyText>
    <BodyText>Test3</BodyText>
  </Stack>
)

export const MediumSpacing: React.FC = () => (
  <Stack space="medium">
    <BodyText>Test1</BodyText>
    <BodyText>Test2</BodyText>
    <BodyText>Test3</BodyText>
  </Stack>
)

export const HorizontalWithFill: React.FC = () => (
  <Stack horizontal space="medium">
    <BodyText>Test1</BodyText>
    <Box fill>
      <BodyText>Test2</BodyText>
    </Box>
    <BodyText>Test3</BodyText>
  </Stack>
)
