import React from 'react'
import { action } from '@storybook/addon-actions'
import { fileAbsolute } from 'paths.macro'
import { Button } from '../../actions/Button/Button'
import { CenteredVertical } from '../../../storybook/decorators/CenteredVertical'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { ButtonGroup, ButtonGroupProps } from './ButtonGroup'

export default {
  title: getStoryTitle(fileAbsolute),
  component: ButtonGroup,
  decorators: [CenteredVertical],
}

export const DefaultFill: StoryFn<ButtonGroupProps> = props => (
  <ButtonGroup {...props}>
    <Button primary onClick={action('Button 1 click')}>
      Button 1
    </Button>
    <Button primary onClick={action('Button 2 click')}>
      Button 2
    </Button>
    <Button primary onClick={action('Button 3 click')}>
      Button 3
    </Button>
  </ButtonGroup>
)

DefaultFill.argTypes = {
  children: { control: null },
}

export const Start: React.FC = () => (
  <ButtonGroup alignment="start">
    <Button primary onClick={action('Button 1 click')}>
      Button 1
    </Button>
    <Button primary onClick={action('Button 2 click')}>
      Button 2
    </Button>
    <Button primary onClick={action('Button 3 click')}>
      Button 3
    </Button>
  </ButtonGroup>
)

export const End: React.FC = () => (
  <ButtonGroup alignment="end">
    <Button primary onClick={action('Button 1 click')}>
      Button 1
    </Button>
    <Button primary onClick={action('Button 2 click')}>
      Button 2
    </Button>
    <Button primary onClick={action('Button 3 click')}>
      Button 3
    </Button>
  </ButtonGroup>
)
