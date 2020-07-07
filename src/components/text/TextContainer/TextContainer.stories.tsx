import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { LOREM_IPSUM } from '../../../storybook/utils/constants'
import { DisplayText } from '../DisplayText/DisplayText'
import { BodyText } from '../BodyText/BodyText'
import { Heading } from '../Heading/Heading'
import { CenteredVertical } from '../../../storybook/decorators/CenteredVertical'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { TextContainer, TextContainerProps } from './TextContainer'

export default {
  title: getStoryTitle(fileAbsolute),
  component: TextContainer,
  decorators: [CenteredVertical],
}

export const Default: StoryFn<TextContainerProps> = props => (
  <TextContainer {...props}>
    <DisplayText>Display Text</DisplayText>
    <BodyText>{LOREM_IPSUM}</BodyText>
    <Heading>Heading Text</Heading>
    <BodyText>{LOREM_IPSUM}</BodyText>
  </TextContainer>
)

Default.argTypes = {
  children: { control: null },
}
