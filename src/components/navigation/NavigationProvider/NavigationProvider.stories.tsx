import React from 'react'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { fileAbsolute } from 'paths.macro'
import { NavigationProvider } from './NavigationProvider'
import { action } from '@storybook/addon-actions'
import { Screen, Box } from '../../structure'
import { TopBar } from '../TopBar/TopBar'
import { TextContainer, DisplayText, BodyText } from '../../text'
import { LOREM_IPSUM } from '../../../storybook/utils/constants'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'

export default {
  title: getStoryTitle(fileAbsolute),
  component: NavigationProvider,
  decorators: [PhoneScreen],
}

export const Basic: React.FC = () => (
  <NavigationProvider goBack={action('Back pressed')}>
    <Screen>
      <TopBar title="Bar Title" />
      <Box padding="medium">
        <TextContainer>
          <DisplayText>Screen Title</DisplayText>
          <BodyText>{LOREM_IPSUM}</BodyText>
        </TextContainer>
      </Box>
    </Screen>
  </NavigationProvider>
)
