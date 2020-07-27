import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { BodyText } from '../../text/BodyText/BodyText'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Box } from '../Box/Box'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Space, SpaceProps } from './Space'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Space,
}

export const Small: StoryFn<SpaceProps> = props => (
  <Box horizontal>
    <BodyText>Test1</BodyText>
    <Space {...props} />
    <BodyText>Test2</BodyText>
  </Box>
)

Small.args = {
  value: 'small',
}

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
