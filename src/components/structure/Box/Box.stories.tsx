import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { View } from 'react-native'
import { BodyText } from '../../text/BodyText/BodyText'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Pill } from '../../actions/Pill/Pill'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Box, BoxProps } from './Box'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Box,
}

export const Basic: StoryFn<BoxProps> = props => (
  <Box {...props}>
    <BodyText>A</BodyText>
    <BodyText>B</BodyText>
    <BodyText>C</BodyText>
  </Box>
)

Basic.args = {
  horizontal: true,
}

Basic.argTypes = {
  children: { control: null },
}

export const MediumPadding: React.FC = () => (
  <Box padding="medium">
    <BodyText>Test</BodyText>
    <BodyText>Test 2</BodyText>
    <BodyText>Test 3</BodyText>
  </Box>
)

export const XLargePadding: React.FC = () => (
  <Box padding="xLarge">
    <BodyText>Test</BodyText>
    <BodyText>Test 2</BodyText>
    <BodyText>Test 3</BodyText>
  </Box>
)

export const WithSpacing: React.FC = () => (
  <Box horizontal space="medium">
    <Pill onClick={action('Pill 1 clicked')}>Pill 1</Pill>
    <Pill onClick={action('Pill 2 clicked')}>Pill 2</Pill>
    <Pill onClick={action('Pill 3 clicked')}>Pill 3</Pill>
  </Box>
)

export const ReversedAndCentered: React.FC = () => (
  <Box space="medium" align="center" reverse>
    <BodyText>Test Test Test 1</BodyText>
    <BodyText>Test Test Test 2</BodyText>
    <BodyText>Test Test Test 3</BodyText>
  </Box>
)

export const Distribution: React.FC = () => (
  <View style={{ height: 200 }}>
    <Box fill distribution="center" align="end">
      <BodyText>Test Test Test 1</BodyText>
      <BodyText>Test Test Test 2</BodyText>
      <BodyText>Test Test Test 3</BodyText>
    </Box>
  </View>
)
