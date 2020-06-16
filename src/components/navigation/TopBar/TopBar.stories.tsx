import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { Screen } from '../../structure/Screen/Screen'
import { NavigationProvider } from '../NavigationProvider/NavigationProvider'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { TextContainer, DisplayText, BodyText } from '../../text'
import { LOREM_IPSUM } from '../../../storybook/utils/constants'
import { TopBar } from './TopBar'

export default {
  title: getStoryTitle(fileAbsolute),
  component: TopBar,
  subcomponents: { 'TopBar.Icon': TopBar.Icon },
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

export const WithLongTitle: React.FC = () => (
  <NavigationProvider goBack={action('Back pressed')}>
    <Screen>
      <TopBar title="This is a long title that should be truncated after a lot of characters" />
      <Screen.Content>
        <TextContainer>
          <DisplayText>Screen Title</DisplayText>
          <BodyText>{LOREM_IPSUM}</BodyText>
        </TextContainer>
      </Screen.Content>
    </Screen>
  </NavigationProvider>
)

export const WithIconsRight: React.FC = () => (
  <NavigationProvider goBack={action('Back pressed')}>
    <Screen>
      <TopBar title="Title">
        <TopBar.Icon name="action-edit" onClick={action('Edit clicked')} />
        <TopBar.Icon name="note" onClick={action('Note clicked')} />
        <TopBar.Icon name="search" onClick={action('Search clicked')} />
      </TopBar>
      <Screen.Content>
        <TextContainer>
          <DisplayText>Screen Title</DisplayText>
          <BodyText>{LOREM_IPSUM}</BodyText>
        </TextContainer>
      </Screen.Content>
    </Screen>
  </NavigationProvider>
)

export const Transparent: React.FC = () => (
  <NavigationProvider goBack={action('Back pressed')}>
    <Screen>
      <TopBar title="TopBar Title" iconStart="close-modal" transparent />
      <Screen.Content>
        <TextContainer>
          <DisplayText>Screen Title</DisplayText>
          <BodyText>{LOREM_IPSUM}</BodyText>
        </TextContainer>
      </Screen.Content>
    </Screen>
  </NavigationProvider>
)
