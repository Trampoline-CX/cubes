import React from 'react'
import { action } from '@storybook/addon-actions'
import { fileAbsolute } from 'paths.macro'
import { Centered } from '../../../storybook/decorators/Centered'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { HeaderActionButton } from './HeaderActionButton'

export default {
  title: getStoryTitle(fileAbsolute),
  component: HeaderActionButton,
  decorators: [Centered],
}

export const Default: React.FC = () => (
  <HeaderActionButton iconStart="broken-connection" onClick={action('Button Clicked')}>
    Unlink
  </HeaderActionButton>
)

export const WithoutIcon: React.FC = () => (
  <HeaderActionButton onClick={action('Button Clicked')}>Action</HeaderActionButton>
)
