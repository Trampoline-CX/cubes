import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Box } from '../../structure/Box/Box'
import { Button } from '../../actions/Button/Button'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { AlertDialog, AlertDialogProps } from './AlertDialog'

export default {
  title: getStoryTitle(fileAbsolute),
  component: AlertDialog,
}

export const Basic: StoryFn<AlertDialogProps> = ({ title, message, buttonText }) => {
  const [visible, setVisible] = useState(false)

  return (
    <Box padding="medium" align="start">
      <Button onClick={() => setVisible(true)}>Alert me!</Button>
      <AlertDialog
        title={title}
        message={message}
        open={visible}
        onClose={() => setVisible(false)}
        buttonText={buttonText}
      />
    </Box>
  )
}

Basic.args = {
  title: 'This is very important!',
  message: "Damn you're cute! 😊",
  buttonText: 'Wow thanks!',
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
      <AlertDialog
        open={visible}
        onClose={() => setVisible(false)}
        buttonText="Close"
        message="This is some important content!"
      />
    </Box>
  )
}
