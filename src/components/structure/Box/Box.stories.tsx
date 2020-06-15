import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { BodyText } from '../../text/BodyText/BodyText'
import { Stack } from '../Stack/Stack'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Box } from './Box'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Box,
}

export const Default: React.FC = () => (
  <Stack horizontal>
    <Box>
      <BodyText>A</BodyText>
    </Box>
    <Box fill paddingX="large">
      <BodyText>B</BodyText>
    </Box>
    <Box>
      <BodyText>C</BodyText>
    </Box>
  </Stack>
)

export const MediumPadding: React.FC = () => (
  <Box padding="medium">
    <BodyText>Test</BodyText>
  </Box>
)

export const XLargePadding: React.FC = () => (
  <Box padding="xLarge">
    <BodyText>Test</BodyText>
  </Box>
)
