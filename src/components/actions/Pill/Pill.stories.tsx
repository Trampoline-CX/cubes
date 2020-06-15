import React from 'react'
import { action } from '@storybook/addon-actions'
import { fileAbsolute } from 'paths.macro'
import { Centered } from '../../../storybook/decorators/Centered'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Pill } from './Pill'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Pill,
  decorators: [Centered],
}

export const Default: React.FC = () => <Pill onClick={action('Pill Clicked')}>Tim Hortons</Pill>
export const Highlighted: React.FC = () => (
  <Pill highlight onClick={action('Pill Clicked')}>
    Tim Hortons
  </Pill>
)
