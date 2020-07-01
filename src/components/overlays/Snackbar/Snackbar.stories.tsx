import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Button } from '../../actions'
import { Screen } from '../../structure'
import { BottomNavigationBar, TopBar } from '../../navigation'
import { useSnackbar } from './use-snackbar'
import { Snackbar, SnackbarProps } from './Snackbar'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Snackbar,
  decorators: [PhoneScreen],
}

export const Basic: StoryFn<SnackbarProps> = props => {
  const showSnackbar = useSnackbar(props)

  return (
    <Screen>
      <Button onClick={showSnackbar}>Show Snackbar</Button>
    </Screen>
  )
}

Basic.args = {
  message: 'This is a Snackbar!',
}

export const WithAction: React.FC = () => {
  const showSnackbar = useSnackbar({
    message: 'Blog post saved.',
    duration: 'longer',
    action: { label: 'Undo', action: action('Undo Clicked') },
  })

  return (
    <Screen>
      <Button onClick={showSnackbar}>Show Snackbar</Button>
    </Screen>
  )
}

export const WithBottomNavigationBar: StoryFn<SnackbarProps> = () => {
  // Component embedded in Story source to display subcomponent.
  // DON'T DEFINE COMPONENTS IN OTHER COMPONENTS
  const ScreenContent: React.FC = () => {
    const showSnackbar = useSnackbar({
      message: 'Blog post saved.',
      duration: 'longer',
      action: { label: 'Undo', action: action('Undo Clicked') },
    })

    return <Button onClick={showSnackbar}>Show Snackbar</Button>
  }

  return (
    <Screen>
      <TopBar />
      <Screen.Content>
        <ScreenContent />
      </Screen.Content>
      <BottomNavigationBar>
        <BottomNavigationBar.Tab icon="money" onClick={action('Dashboard Tab Clicked')} />
        <BottomNavigationBar.Tab icon="profile" onClick={action('Profile Tab Clicked')} />
      </BottomNavigationBar>
    </Screen>
  )
}

WithBottomNavigationBar.story = {
  name: 'With BottomNavigationBar',
  parameters: {
    docs: {
      storyDescription:
        'When using a `BottomNavigationBar`, use the `useSnackbar` hook in a nested component. This way, it will appear in `Screen.Content` above the `BottomNavigationBar`. Otherwise, it would appear on top of it, which is not a great UX experience.',
    },
  },
}
