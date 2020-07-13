import React from 'react'
import { action } from '@storybook/addon-actions'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { LeftAlign } from '../../../storybook/decorators/LeftAlign'
import { Pill } from './Pill'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Pill,
  decorators: [LeftAlign],
}

export const Default: React.FC = () => <Pill onClick={action('Pill Clicked')}>Tim Hortons</Pill>
export const Highlighted: React.FC = () => (
  <Pill highlight onClick={action('Pill Clicked')}>
    Tim Hortons
  </Pill>
)
