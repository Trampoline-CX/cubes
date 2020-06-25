import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { ScrollView } from 'react-native'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Divider } from '../Divider/Divider'
import { Box } from '../Box/Box'
import { Heading } from '../../text'
import { Card } from '../Card/Card'
import { ListView, ListViewItemProps } from './ListView'

export default {
  title: getStoryTitle(fileAbsolute),
  component: ListView,
  subcomponents: { 'ListView.Item': ListView.Item },
}

export const Basic: React.FC = () => (
  <ListView divider={<Divider />}>
    <ListView.Item title="Francis Morin" description="Engineer" />
    <ListView.Item title="Jonas Chase" description="Salesman" />
    <ListView.Item title="Caldwell Christensen" description="Engineer" />
    <ListView.Item title="Griffith Harrell" description="CEO" />
    <ListView.Item title="Walker James" description="Engineer" />
  </ListView>
)

export const UsingValues: React.FC = () => (
  <ListView
    divider={<Divider />}
    values={[
      { title: 'Cats' },
      { title: 'Cheetahs' },
      { title: 'Dogs' },
      { title: 'Hummingbirds' },
    ]}
  />
)

export const WithActions: React.FC = () => {
  const actions: ListViewItemProps['actions'] = [
    { icon: 'action-edit', action: action('Item Edit Clicked') },
    { icon: 'feedback', action: action('Item Favorite Clicked'), color: 'accent' },
  ]

  return (
    <ListView
      divider={<Divider />}
      values={[
        { title: 'Cats', actions, onClick: action('Cats clicked') },
        { title: 'Cheetahs', actions, onClick: action('Cheetahs clicked') },
        { title: 'Dogs', actions, onClick: action('Dogs clicked') },
        { title: 'Hummingbirds', actions, onClick: action('Hummingbirds clicked') },
      ]}
    />
  )
}
