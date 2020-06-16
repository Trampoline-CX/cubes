import React from 'react'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { fileAbsolute } from 'paths.macro'
import { Screen } from './Screen'
import { TextContainer } from '../../text/TextContainer/TextContainer'
import { DisplayText } from '../../text/DisplayText/DisplayText'
import { BodyText } from '../../text/BodyText/BodyText'
import { LOREM_IPSUM } from '../../../storybook/utils/constants'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Screen,
  decorators: [PhoneScreen],
}

export const Default: React.FC = () => (
  <Screen>
    <TextContainer>
      <DisplayText>Title</DisplayText>
      <BodyText>{LOREM_IPSUM}</BodyText>
    </TextContainer>
  </Screen>
)
