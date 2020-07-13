import React from 'react'
import { action } from '@storybook/addon-actions'
import { fileAbsolute } from 'paths.macro'
import { Button } from '../../actions/Button/Button'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { ButtonGroup } from './ButtonGroup'

export default {
  title: getStoryTitle(fileAbsolute),
  component: ButtonGroup,
}

export const DefaultFill: React.FC = () => (
  <ButtonGroup>
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
