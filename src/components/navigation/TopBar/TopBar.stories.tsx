import React from 'react'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { fileAbsolute } from 'paths.macro'
import { TopBar } from './TopBar'
import { Screen } from '../../structure/Screen/Screen'
import { NavigationProvider } from '../NavigationProvider/NavigationProvider'
import { action } from '@storybook/addon-actions'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { TextContainer, DisplayText, BodyText } from '../../text'
import { LOREM_IPSUM } from '../../../storybook/utils/constants'
import { Box } from '../../structure'

export default {
  title: getStoryTitle(fileAbsolute),
  component: TopBar,
  decorators: [PhoneScreen],
}

export const Basic: React.FC = () => (
  <NavigationProvider goBack={action('Back pressed')}>
    <Screen>
      <TopBar title="Bar Title" />
      <Screen.Content>
        <TextContainer>
          <DisplayText>Screen Title</DisplayText>
          <BodyText>{LOREM_IPSUM}</BodyText>
        </TextContainer>
      </Screen.Content>
    </Screen>
  </NavigationProvider>
)

export const WithoutIcon: React.FC = () => (
  <NavigationProvider goBack={action('Back pressed')}>
    <Screen>
      <TopBar title="Bar Title" iconStart="none" />
      <Screen.Content>
        <TextContainer>
          <DisplayText>Screen Title</DisplayText>
          <BodyText>{LOREM_IPSUM}</BodyText>
        </TextContainer>
      </Screen.Content>
    </Screen>
  </NavigationProvider>
)

export const WithoutTitle: React.FC = () => (
  <NavigationProvider goBack={action('Back pressed')}>
    <Screen>
      <TopBar />
      <Screen.Content>
        <TextContainer>
          <DisplayText>Screen Title</DisplayText>
          <BodyText>{LOREM_IPSUM}</BodyText>
        </TextContainer>
      </Screen.Content>
    </Screen>
  </NavigationProvider>
)
