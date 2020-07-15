import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { DrawerMenu, DrawerMenuProps } from './DrawerMenu'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { action } from '@storybook/addon-actions'

export default {
  title: getStoryTitle(fileAbsolute),
  component: DrawerMenu,
}

export const Basic: StoryFn<DrawerMenuProps> = props => <DrawerMenu {...props} />

Basic.args = {
  items: [
    { label: 'Inbox', icon: 'email', selected: true, onClick: action('Inbox clicked') },
    { label: 'Favorites', icon: 'favorite', onClick: action('Favorites clicked') },
    { label: 'Trash', icon: 'delete', onClick: action('Trash clicked') },
  ],
}
