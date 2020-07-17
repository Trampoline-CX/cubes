import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { BodyText } from '../../text/BodyText/BodyText'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Box } from '../Box/Box'
import { Divider } from './Divider'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Divider,
}

export const Default: React.FC = () => (
  <Box space="medium">
    <BodyText>Text1</BodyText>
    <Divider />
    <BodyText>Text2</BodyText>
  </Box>
)
