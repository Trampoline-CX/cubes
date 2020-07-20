import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { BodyText } from '../BodyText/BodyText'
import { TextContainer } from '../TextContainer/TextContainer'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { TextStyle, TextStyleProps } from './TextStyle'

export default {
  title: getStoryTitle(fileAbsolute),
  component: TextStyle,
}

export const Basic: StoryFn<TextStyleProps> = props => (
  <BodyText>
    This is some <TextStyle {...props} /> text.
  </BodyText>
)

Basic.args = {
  children: 'cool',
  variation: 'strong',
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
