import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { TextContainer } from '../TextContainer/TextContainer'
import { LOREM_IPSUM } from '../../../storybook/utils/constants'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { DisplayText, DisplayTextProps } from './DisplayText'

export default {
  title: getStoryTitle(fileAbsolute),
  component: DisplayText,
}

export const Basic: StoryFn<DisplayTextProps> = props => <DisplayText {...props} />

Basic.args = {
  children: 'Wow, so big!',
}

export const All: React.FC = () => (
  <TextContainer>
    <DisplayText>Default Display Text</DisplayText>
    <DisplayText element="h2">H2 Display Text</DisplayText>
    <DisplayText textAlign="center">Centered</DisplayText>
    <DisplayText maxLines={1}>Single Line: {LOREM_IPSUM}</DisplayText>
  </TextContainer>
)
