import React from 'react'
import { action } from '@storybook/addon-actions'
import { fileAbsolute } from 'paths.macro'
import { Centered } from '../../../storybook/decorators/Centered'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { LinkButton } from './LinkButton'

export default {
  title: getStoryTitle(fileAbsolute),
  component: LinkButton,
  decorators: [Centered],
}

export const Main: React.FC = () => (
  <LinkButton iconStart="accounts" withNavigationIndicator onClick={action('LinkButton Clicked')}>
    Accounts
  </LinkButton>
)
export const WithoutIcon: React.FC = () => (
  <LinkButton onClick={action('LinkButton Clicked')} withNavigationIndicator>
    Accounts
  </LinkButton>
)
export const WithoutNavigationIndicator: React.FC = () => (
  <LinkButton onClick={action('LinkButton Clicked')} iconStart="accounts">
    Accounts
  </LinkButton>
)
