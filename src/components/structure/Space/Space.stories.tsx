import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { BodyText } from '../../text/BodyText/BodyText'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Box } from '../Box/Box'
import { Space } from './Space'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Space,
}

export const Small: React.FC = () => (
  <Box horizontal>
    <BodyText>Test1</BodyText>
    <Space value="small" />
    <BodyText>Test2</BodyText>
  </Box>
)

export const Medium: React.FC = () => (
  <Box horizontal>
    <BodyText>Test1</BodyText>
    <Space value="medium" />
    <BodyText>Test2</BodyText>
  </Box>
)

export const Large: React.FC = () => (
  <Box horizontal>
    <BodyText>Test1</BodyText>
    <Space value="large" />
    <BodyText>Test2</BodyText>
  </Box>
)
