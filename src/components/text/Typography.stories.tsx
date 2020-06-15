import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../storybook/get-story-title'
import { Heading } from './Heading/Heading'
import { DisplayText } from './DisplayText/DisplayText'
import { BodyText } from './BodyText/BodyText'
import { Caption } from './Caption/Caption'
import { TextContainer } from './TextContainer/TextContainer'

export default {
  title: getStoryTitle(fileAbsolute),
}

export const All: React.FC = () => (
  <TextContainer>
    <DisplayText>Display text</DisplayText>
    <Heading>Heading</Heading>
    <BodyText>Body text</BodyText>
    <Caption>Caption</Caption>
  </TextContainer>
)
