import React, { useEffect } from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import isChromatic from 'chromatic/isChromatic'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Button } from '../../actions/Button/Button'
import { Screen } from '../../structure/Screen/Screen'
import { BottomNavigationBar } from '../../navigation/BottomNavigationBar/BottomNavigationBar'
import { TopBar } from '../../navigation/TopBar/TopBar'
import { useSnackbar as useSnackbarOriginal } from './use-snackbar'
import { Snackbar, SnackbarProps } from './Snackbar'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Snackbar,
  decorators: [PhoneScreen],
  parameters: {
    chromatic: { pauseAnimationAtEnd: true, delay: 100 },
  },
}

const useSnackbar: typeof useSnackbarOriginal = (...args) => {
  const dispatch = useSnackbarOriginal(...args)

  // Call dispatch as soon as we mount the component on Chromatic, so we can review the UI showing the Snackbar.
  useEffect(() => {
    if (isChromatic()) {
      dispatch()
    }
  }, [])

  return dispatch
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
        <BottomNavigationBar.Tab icon="dashboard" onClick={action('Dashboard Tab Clicked')} />
        <BottomNavigationBar.Tab icon="account-circle" onClick={action('Profile Tab Clicked')} />
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
