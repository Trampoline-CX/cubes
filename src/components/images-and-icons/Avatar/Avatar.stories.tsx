import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Box } from '../../structure/Box/Box'
import { Heading } from '../../text'
import { useTheme } from '../../../theme'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Avatar, AvatarProps } from './Avatar'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Avatar,
}

export const Basic: StoryFn<AvatarProps> = props => <Avatar {...props} />

Basic.args = {
  source: {
    uri:
      'https://images.unsplash.com/photo-1551408687-4fa2bd0b683a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
  },
}

export const Generated: React.FC = () => (
  <Box horizontal space="medium">
    <Avatar source={{ hash: 'John Doe' }} />
    <Avatar source={{ hash: 'Arnold Junior' }} />
    <Avatar source={{ hash: 'Random Text' }} />
  </Box>
)
export const Size: React.FC = () => {
  const { size } = useTheme()

  return (
    <Box horizontal space="xLarge">
      <Box>
        <Heading>Small ({size.avatar.small}dp)</Heading>
        <Avatar
          size="small"
          source={{
            uri:
              'https://images.unsplash.com/photo-1551408687-4fa2bd0b683a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
          }}
        />
      </Box>
      <Box>
        <Heading>Default ({size.avatar.default}dp)</Heading>
        <Avatar
          source={{
            uri:
              'https://images.unsplash.com/photo-1551408687-4fa2bd0b683a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
          }}
        />
      </Box>
    </Box>
  )
}
