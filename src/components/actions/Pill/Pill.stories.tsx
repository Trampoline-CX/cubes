import React from 'react'
import { action } from '@storybook/addon-actions'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { LeftAlign } from '../../../storybook/decorators/LeftAlign'
import { Pill, PillProps } from './Pill'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Pill,
  decorators: [LeftAlign],
}

export const Default: StoryFn<PillProps> = props => <Pill {...props} />

Default.args = {
  children: 'Tim Hortons',
  onClick: action('Pill Clicked'),
}

export const Highlighted: React.FC = () => (
  <Pill highlight onClick={action('Pill Clicked')}>
    Tim Hortons
  </Pill>
)
