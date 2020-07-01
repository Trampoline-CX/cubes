import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Box } from '../../structure/Box/Box'
import { Button } from '../../actions/Button/Button'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Confirm, ConfirmProps } from './Confirm'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Confirm,
}

export const Basic: StoryFn<ConfirmProps> = ({
  title,
  message,
  positiveActionText,
  negativeActionText,
}) => {
  const [visible, setVisible] = useState(false)

  return (
    <Box padding="medium" align="start">
      <Button onClick={() => setVisible(true)}>Alert me!</Button>
      <Confirm
        title={title}
        message={message}
        open={visible}
        onClose={() => setVisible(false)}
        positiveActionText={positiveActionText}
        negativeActionText={negativeActionText}
      />
    </Box>
  )
}

Basic.args = {
  title: 'This is very important!',
  message: 'Are you a cute unicorn? 🦄',
  positiveActionText: 'Yes',
  negativeActionText: 'Probably',
}

Basic.argTypes = {
  message: { control: 'text' },
  open: { control: null },
}

export const WithoutTitle: React.FC = () => {
  const [visible, setVisible] = useState(false)

  return (
    <Box padding="medium" align="start">
      <Button onClick={() => setVisible(true)}>Alert me!</Button>
      <Confirm
        message="Do you want to have peace in the world?"
        open={visible}
        onClose={() => setVisible(false)}
        positiveActionText="Yes"
        negativeActionText="No"
      />
    </Box>
  )
}
