import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { TextContainer } from '../TextContainer/TextContainer'
import { LOREM_IPSUM } from '../../../storybook/utils/constants'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { BodyText, BodyTextProps } from './BodyText'

export default {
  title: getStoryTitle(fileAbsolute),
  component: BodyText,
}

export const Basic: StoryFn<BodyTextProps> = props => <BodyText {...props} />

Basic.args = {
  children: 'This is some text.',
}

Basic.argTypes = {
  children: { control: 'text' },
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
