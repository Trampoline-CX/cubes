import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Screen } from '../../structure/Screen/Screen'
import { TextContainer, Heading, BodyText } from '../../text'
import { LOREM_IPSUM } from '../../../storybook/utils/constants'
import { TopBar } from '../TopBar/TopBar'
import { Button } from '../../actions/Button/Button'
import { useNav } from '../../../navigation'
import { DrawerMenu, DrawerMenuProps } from './DrawerMenu'

export default {
  title: getStoryTitle(fileAbsolute),
  component: DrawerMenu,
}

export const Basic: StoryFn<DrawerMenuProps> = props => {
  const navigate = useNav()

  return (
    <Screen>
      <TopBar iconStart="none" title="My Screen" />
      <DrawerMenu {...props} />
      <Screen.Content padding="medium">
        <TextContainer>
          <Heading>Title</Heading>
          <BodyText>{LOREM_IPSUM}</BodyText>
        </TextContainer>
        <Button onClick={navigate.drawer.open}>Open Drawer</Button>
      </Screen.Content>
    </Screen>
  )
}

Basic.args = {
  items: [
    { label: 'Inbox', icon: 'email', selected: true, onClick: action('Inbox clicked') },
    { label: 'Favorites', icon: 'favorite', onClick: action('Favorites clicked') },
    { label: 'Trash', icon: 'delete', onClick: action('Trash clicked') },
  ],
}
