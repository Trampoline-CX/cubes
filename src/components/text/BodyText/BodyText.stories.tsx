import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { CenteredVertical } from '../../../storybook/decorators/CenteredVertical'
import { TextContainer } from '../TextContainer/TextContainer'
import { LOREM_IPSUM } from '../../../storybook/utils/constants'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { BodyText } from './BodyText'

export default {
  title: getStoryTitle(fileAbsolute),
  component: BodyText,
  decorators: [CenteredVertical],
}

export const All: React.FC = () => (
  <TextContainer>
    <BodyText>Default BodyText</BodyText>
    <BodyText textAlign="center">Centered Text</BodyText>
    <BodyText variation="accent">Accent Text</BodyText>
    <BodyText variation="strong">Strong Text</BodyText>
    <BodyText maxLines={2}>Limited Text: {LOREM_IPSUM}</BodyText>
  </TextContainer>
)
