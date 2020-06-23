/* eslint-disable react-native/no-raw-text */
import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Item } from './Item/Item'
import { List, ListProps } from './List'

export default {
  title: getStoryTitle(fileAbsolute),
  component: List,
  subcomponents: { 'List.Item': Item },
}

export const Basic: StoryFn<ListProps> = ({ type }) => (
  <List type={type}>
    <List.Item>Star Wars</List.Item>
    <List.Item>Game of Thrones</List.Item>
    <List.Item>Origin</List.Item>
    <List.Item>Harry Potter</List.Item>
  </List>
)
Basic.argTypes = {
  values: { control: null },
  children: { control: null },
}

export const UsingValues: StoryFn<ListProps> = () => (
  <List values={['Hospitals', 'Police Stations', 'Elementary School', 'University']} />
)

export const Numbered: StoryFn<ListProps> = () => (
  <List
    type="number"
    values={['Hospitals', 'Police Stations', 'Elementary School', 'University']}
  />
)
