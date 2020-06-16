import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { Centered } from '../../../storybook/decorators/Centered'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Box } from '../../structure'
import { Button, ButtonProps } from './Button'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Button,
  decorators: [Centered],
}

export const Basic: StoryFn<ButtonProps> = props => <Button {...props} />
Basic.args = {
  children: 'Button',
  onClick: action('button clicked'),
}

export const Secondary: React.FC = () => (
  <Box horizontal space="medium">
    <Button onClick={action('button clicked')}>Normal</Button>

    <Button disabled onClick={action('button clicked')}>
      Disabled
    </Button>

    <Button loading onClick={action('button clicked')}>
      Loading
    </Button>
  </Box>
)

export const Primary: React.FC = () => (
  <Box horizontal space="medium">
    <Button primary onClick={action('button clicked')}>
      Normal
    </Button>

    <Button primary disabled onClick={action('button clicked')}>
      Disabled
    </Button>

    <Button primary loading onClick={action('button clicked')}>
      Loading
    </Button>
  </Box>
)
