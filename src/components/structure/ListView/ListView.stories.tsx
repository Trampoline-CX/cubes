import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Divider } from '../Divider/Divider'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { ListView, ListViewItemProps, ListViewProps } from './ListView'

export default {
  title: getStoryTitle(fileAbsolute),
  component: ListView,
  subcomponents: { 'ListView.Item': ListView.Item },
}

export const Basic: StoryFn<ListViewProps> = props => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <ListView {...(props as any)}>
    <ListView.Item title="Francis Morin" description="Engineer" />
    <ListView.Item title="Jonas Chase" description="Salesman" />
    <ListView.Item title="Caldwell Christensen" description="Engineer" />
    <ListView.Item title="Griffith Harrell" description="CEO" />
    <ListView.Item title="Walker James" description="Engineer" />
  </ListView>
)

Basic.args = {
  divider: <Divider />,
}

Basic.argTypes = {
  divider: { control: null },
  children: { control: null },
}

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
    { icon: 'create', action: action('Item Edit Clicked') },
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

export const WithoutDividers: React.FC = () => (
  <ListView
    values={[
      { title: 'Cats' },
      { title: 'Cheetahs' },
      { title: 'Dogs' },
      { title: 'Hummingbirds' },
    ]}
  />
)
