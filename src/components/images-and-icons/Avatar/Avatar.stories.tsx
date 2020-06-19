import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Avatar } from './Avatar'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Avatar,
}

export const Basic: React.FC = () => (
  <Avatar
    source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/17/09/minion-972908_960_720.jpg' }}
  />
)

export const Generated: React.FC = () => <Avatar source={{ hash: 'John Doe' }} />
export const Small: React.FC = () => <Avatar size="small" source={{ hash: 'Julia Watson' }} />
