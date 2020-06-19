import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Box } from '../../structure'
import { Button } from '../../actions'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Alert, AlertProps } from './Alert'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Alert,
}

export const Basic: StoryFn<AlertProps> = ({ title, children, buttonText }) => {
  const [visible, setVisible] = useState(false)

  return (
    <Box padding="medium" align="start">
      <Button onClick={() => setVisible(true)}>Alert me!</Button>
      <Alert title={title} open={visible} onClose={() => setVisible(false)} buttonText={buttonText}>
        {children}
      </Alert>
    </Box>
  )
}

Basic.args = {
  title: 'This is very important!',
  children: "Damn you're cute! 😊",
  buttonText: 'Wow thanks!',
}

Basic.argTypes = {
  children: { control: 'text' },
  open: { control: null },
}

export const WithoutTitle: React.FC = () => {
  const [visible, setVisible] = useState(false)

  return (
    <Box padding="medium" align="start">
      <Button onClick={() => setVisible(true)}>Alert me!</Button>
      <Alert open={visible} onClose={() => setVisible(false)} buttonText="Close">
        This is some important content!
      </Alert>
    </Box>
  )
}
