import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { CenteredVertical } from '../../../storybook/decorators/CenteredVertical'
import { BodyText } from '../../text/BodyText/BodyText'
import { Stack } from '../Stack/Stack'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Divider } from './Divider'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Divider,
  decorators: [CenteredVertical],
}

export const Default: React.FC = () => (
  <Stack space="medium">
    <BodyText>Text1</BodyText>
    <Divider />
    <BodyText>Text2</BodyText>
  </Stack>
)
