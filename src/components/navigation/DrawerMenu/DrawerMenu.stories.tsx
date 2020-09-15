import React from 'react'
import _ from 'lodash'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { View } from 'react-native'
import { DecoratorFunction } from '@storybook/addons'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Screen } from '../../structure/Screen/Screen'
import { TextContainer, Heading, BodyText, Caption } from '../../text'
import { LOREM_IPSUM } from '../../../storybook/utils/constants'
import { TopBar } from '../TopBar/TopBar'
import { AppProvider } from '../../structure/AppProvider/AppProvider'
import { useNav } from '../../../navigation'
import { ListView } from '../../structure/ListView/ListView'
import { Card } from '../../structure/Card/Card'
import { Divider } from '../../structure/Divider/Divider'
import { DrawerMenu, DrawerMenuProps } from './DrawerMenu'

const WithHeightDecorator: DecoratorFunction<React.ReactNode> = storyFn => (
  <View style={{ height: 450 }}>{storyFn()}</View>
)

export default {
  title: getStoryTitle(fileAbsolute),
  component: DrawerMenu,
  parameters: {
    chromatic: { viewports: [380, 1200] }, // Make sure we test both Mobile and Desktop UIs
  },
  decorators: [WithHeightDecorator],
}

export const Basic: StoryFn<DrawerMenuProps> = props => (
  <Screen>
    <TopBar title="My Screen" withDrawerMenu />
    <DrawerMenu {...props} />
    <Screen.Content padding="medium">
      <TextContainer>
        <Heading>Title</Heading>
        <BodyText>{LOREM_IPSUM}</BodyText>
      </TextContainer>
    </Screen.Content>
  </Screen>
)

Basic.args = {
  items: [
    { label: 'Inbox', icon: 'email', selected: true, onClick: action('Inbox clicked') },
    { label: 'Favorites', icon: 'favorite', onClick: action('Favorites clicked') },
    { label: 'Trash', icon: 'delete', onClick: action('Trash clicked') },
  ],
}

Basic.argTypes = {
  children: { control: null },
}

export const WithNavigationSchema: React.FC = () => (
  <AppProvider navigationSchema={schema}>
    <MyDrawerMenu />
  </AppProvider>
)

const MyDrawerMenu: React.FC = () => {
  const navigate = useNav<Schema>()

  return (
    <DrawerMenu>
      <DrawerMenu.Item
        icon="mail"
        label="Inbox"
        onClick={() => navigate.to('InboxScreen')}
        selected={navigate.current === 'InboxScreen'}
      />
      <DrawerMenu.Item
        icon="favorite"
        label="Favorites"
        onClick={() => navigate.to('FavoritesScreen')}
        selected={navigate.current === 'FavoritesScreen'}
      />
    </DrawerMenu>
  )
}

const InboxScreen: React.FC = () => (
  <Screen>
    <TopBar withDrawerMenu title="Inbox" />
    <Screen.Content padding="medium">
      <Card>
        <ListView divider={<Divider />}>
          {_.range(1, 10).map(i => (
            <ListView.Item
              key={i}
              title="My Mail"
              description="Lorem Ipsum"
              actions={[{ icon: 'favorite' }]}
            />
          ))}
        </ListView>
      </Card>
    </Screen.Content>
  </Screen>
)

const FavoritesScreen: React.FC = () => (
  <Screen>
    <TopBar withDrawerMenu title="Favorites" />
    <Screen.Content padding="medium" space="large">
      <Caption textAlign="center">
        Add Items to your favorites by pressing the heart in your Inbox.
      </Caption>
      <Card>
        <ListView divider={<Divider />}>
          {_.range(1, 10).map(i => (
            <ListView.Item
              key={i}
              title="My Mail"
              description="Lorem Ipsum"
              actions={[{ icon: 'favorite', color: 'accent' }]}
            />
          ))}
        </ListView>
      </Card>
    </Screen.Content>
  </Screen>
)

const schema = {
  switch: [{ InboxScreen }, { FavoritesScreen }],
  options: { backBehavior: 'tabs' },
} as const

type Schema = typeof schema
