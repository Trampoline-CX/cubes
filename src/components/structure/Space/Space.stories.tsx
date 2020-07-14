import React from 'react'
import { View } from 'react-native'
import { fileAbsolute } from 'paths.macro'
import { BodyText } from '../../text/BodyText/BodyText'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Space } from './Space'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Space,
}

export const Small: React.FC = () => (
  <View>
    <BodyText>Test1</BodyText>
    <Space value="small" />
    <BodyText>Test2</BodyText>
  </View>
)

export const Medium: React.FC = () => (
  <View>
    <BodyText>Test1</BodyText>
    <Space value="medium" />
    <BodyText>Test2</BodyText>
  </View>
)

export const Large: React.FC = () => (
  <View>
    <BodyText>Test1</BodyText>
    <Space value="large" />
    <BodyText>Test2</BodyText>
  </View>
)
