import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { Text } from 'react-native'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Screen } from '../Screen/Screen'
import { TopBar } from '../../navigation'
import { TextContainer, DisplayText, BodyText } from '../../text'
import { LOREM_IPSUM } from '../../../storybook/utils/constants'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { themes } from '../../../theme'
import { AppProvider } from './AppProvider'

export default {
  title: getStoryTitle(fileAbsolute),
  component: AppProvider,
  decorators: [PhoneScreen],
}

export const Basic: React.FC = () => (
  <AppProvider>
    <Screen>
      <TopBar title="App title" />
      <Screen.Content padding="medium">
        <TextContainer>
          <DisplayText>Title</DisplayText>
          <BodyText>{LOREM_IPSUM}</BodyText>
        </TextContainer>
      </Screen.Content>
    </Screen>
  </AppProvider>
)

export const DarkTheme: React.FC = () => (
  <AppProvider theme={themes.dark}>
    <Screen>
      <TopBar title="App title" />
      <Screen.Content padding="medium">
        <TextContainer>
          <DisplayText>Title</DisplayText>
          <BodyText>{LOREM_IPSUM}</BodyText>
        </TextContainer>
      </Screen.Content>
    </Screen>
  </AppProvider>
)

const MoneyScreen: React.FC = () => <Text>Money</Text>
const TransactionScreen: React.FC<{ id: string }> = () => <Text>TransactionScreen</Text>
const ExploreScreen: React.FC = () => <Text>Explore</Text>
const ProfileScreen: React.FC = () => <Text>ProfileScreen</Text>

export const WithNavigationSchema: React.FC = () => (
  <AppProvider
    navigationSchema={{
      switch: [
        { stack: [{ MoneyScreen }, { TransactionScreen }] },
        { ExploreScreen },
        { ProfileScreen },
      ],
    }}
  />
)
