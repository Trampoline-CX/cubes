import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Screen } from '../Screen/Screen'
import { TopBar, BottomNavigationBar } from '../../navigation'
import { TextContainer, DisplayText, BodyText } from '../../text'
import { LOREM_IPSUM } from '../../../storybook/utils/constants'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { themes } from '../../../theme'
import { useNav } from '../../../navigation'
import { Button } from '../../actions'
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

export const WithNavigationSchema: React.FC = () => <AppProvider navigationSchema={schema} />

const BottomBar: React.FC<{
  current: 'MoneyScreen' | 'ExploreScreen' | 'ProfileScreen'
}> = ({ current }) => {
  const navigate = useNav<Schema>()

  return (
    <BottomNavigationBar>
      <BottomNavigationBar.Tab
        selected={current === 'MoneyScreen'}
        icon="money"
        onClick={() => navigate.to('MoneyScreen', {})}
      />
      <BottomNavigationBar.Tab
        selected={current === 'ExploreScreen'}
        icon="search"
        onClick={() => navigate.to('ExploreScreen', {})}
      />
      <BottomNavigationBar.Tab
        selected={current === 'ProfileScreen'}
        icon="profile"
        onClick={() => navigate.to('ProfileScreen', {})}
      />
    </BottomNavigationBar>
  )
}

const MoneyScreen: React.FC = () => {
  const navigate = useNav<Schema>()

  return (
    <Screen>
      <TopBar iconStart="none" title="Money" />
      <Screen.Content padding="medium" space="medium">
        <BodyText>This is Money</BodyText>
        <Button onClick={() => navigate.to('TransactionScreen', { id: 'abc' })}>
          Go to Transaction
        </Button>
      </Screen.Content>
      <BottomBar current="MoneyScreen" />
    </Screen>
  )
}
const TransactionScreen: React.FC<{ id: string }> = ({ id }) => (
  <Screen>
    <TopBar title="Transaction Screen" />
    <Screen.Content padding="medium">
      <BodyText>ID: {id}</BodyText>
    </Screen.Content>
  </Screen>
)
const ExploreScreen: React.FC = () => (
  <Screen>
    <TopBar
      iconStart="none"
      title="Explore"
      actions={[{ icon: 'search', action: action('On Search Clicked') }]}
    />
    <Screen.Content padding="medium">
      <BodyText>This is explore</BodyText>
    </Screen.Content>
    <BottomBar current="ExploreScreen" />
  </Screen>
)
const ProfileScreen: React.FC = () => (
  <Screen>
    <TopBar iconStart="none" title="Profile" />
    <Screen.Content padding="medium">
      <BodyText>This is my profile</BodyText>
    </Screen.Content>
    <BottomBar current="ProfileScreen" />
  </Screen>
)

const schema = {
  switch: [
    { stack: [{ MoneyScreen }, { TransactionScreen }] },
    { ExploreScreen },
    { ProfileScreen },
  ],
} as const

type Schema = typeof schema
