import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { TextContainer } from '../../text/TextContainer/TextContainer'
import { DisplayText } from '../../text/DisplayText/DisplayText'
import { BodyText } from '../../text/BodyText/BodyText'
import { LOREM_IPSUM } from '../../../storybook/utils/constants'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { TopBar } from '../../navigation'
import { BottomNavigationBar } from '../../navigation/BottomNavigationBar/BottomNavigationBar'
import { Screen } from './Screen'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Screen,
  subcomponents: { 'Screen.Content': Screen.Content },
  decorators: [PhoneScreen],
}

export const Default: React.FC = () => (
  <Screen>
    <TopBar title="Bar Title" />
    <Screen.Content padding="medium">
      <TextContainer>
        <DisplayText>Screen Title</DisplayText>
        <BodyText>{LOREM_IPSUM}</BodyText>
        <BodyText>{LOREM_IPSUM}</BodyText>
        <BodyText>{LOREM_IPSUM}</BodyText>
        <BodyText>{LOREM_IPSUM}</BodyText>
        <BodyText>{LOREM_IPSUM}</BodyText>
      </TextContainer>
    </Screen.Content>
    <BottomNavigationBar>
      <BottomNavigationBar.Tab icon="dashboard" selected onClick={action('Money Tab Click')} />
      <BottomNavigationBar.Tab icon="account-balance" onClick={action('Accounts Tab Click')} />
      <BottomNavigationBar.Tab icon="person" onClick={action('Profile Tab Click')} />
    </BottomNavigationBar>
  </Screen>
)

export const NotScrollable: React.FC = () => (
  <Screen>
    <TopBar title="Bar Title" />
    <Screen.Content padding="medium" disableScroll>
      <TextContainer>
        <DisplayText>Screen Title</DisplayText>
        <BodyText>{LOREM_IPSUM}</BodyText>
        <BodyText>{LOREM_IPSUM}</BodyText>
        <BodyText>{LOREM_IPSUM}</BodyText>
        <BodyText>{LOREM_IPSUM}</BodyText>
        <BodyText>{LOREM_IPSUM}</BodyText>
      </TextContainer>
    </Screen.Content>
    <BottomNavigationBar>
      <BottomNavigationBar.Tab icon="dashboard" selected onClick={action('Money Tab Click')} />
      <BottomNavigationBar.Tab icon="account-balance" onClick={action('Accounts Tab Click')} />
      <BottomNavigationBar.Tab icon="person" onClick={action('Profile Tab Click')} />
    </BottomNavigationBar>
  </Screen>
)
