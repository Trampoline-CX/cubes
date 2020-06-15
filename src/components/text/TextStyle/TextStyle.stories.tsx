import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { Centered } from '../../../storybook/decorators/Centered'
import { BodyText } from '../BodyText/BodyText'
import { TextContainer } from '../TextContainer/TextContainer'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { TextStyle } from './TextStyle'

export default {
  title: getStoryTitle(fileAbsolute),
  component: TextStyle,
  decorators: [Centered],
}

export const All: React.FC = () => (
  <TextContainer>
    <BodyText>
      This is a body text with a <TextStyle variation="positive">positive</TextStyle> TextStyle.
    </BodyText>
    <BodyText>
      This is a body text with a <TextStyle variation="negative">negative</TextStyle> TextStyle.
    </BodyText>
    <BodyText>
      This is a body text with a <TextStyle variation="subdued">subdued</TextStyle> TextStyle.
    </BodyText>
    <BodyText>
      This is a body text with a <TextStyle variation="accent">accent</TextStyle> TextStyle.
    </BodyText>
    <BodyText>
      This is a body text with a <TextStyle variation="error">error</TextStyle> TextStyle.
    </BodyText>
    <BodyText>
      This is a body text with a <TextStyle variation="strong">strong</TextStyle> TextStyle.
    </BodyText>
  </TextContainer>
)
