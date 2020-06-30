import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Button } from '../../actions'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { AppProvider, Screen } from '../../structure'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { useToast } from './use-toast'
import { Toast, ToastProps } from './Toast'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Toast,
  decorators: [PhoneScreen],
}

export const Basic: StoryFn<ToastProps> = props => {
  const showToast = useToast(props)

  return (
    <AppProvider>
      <Screen>
        <Button onClick={showToast}>Show Toast</Button>
      </Screen>
    </AppProvider>
  )
}

Basic.args = {
  message: 'This is a Toast!',
}
