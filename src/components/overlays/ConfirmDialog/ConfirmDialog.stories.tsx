import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import isChromatic from 'chromatic/isChromatic'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Box } from '../../structure/Box/Box'
import { Button } from '../../actions/Button/Button'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { ConfirmDialog, ConfirmDialogProps } from './ConfirmDialog'

export default {
  title: getStoryTitle(fileAbsolute),
  component: ConfirmDialog,
  parameters: {
    chromatic: { pauseAnimationAtEnd: true, delay: 300 },
  },
}

const isInitiallyVisible = isChromatic()

export const Basic: StoryFn<ConfirmDialogProps> = ({
  title,
  message,
  positiveActionText,
  negativeActionText,
}) => {
  const [visible, setVisible] = useState(isInitiallyVisible)

  return (
    <Box padding="medium" align="start">
      <Button onClick={() => setVisible(true)}>Alert me!</Button>
      <ConfirmDialog
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
  open: { control: null },
}

export const WithoutTitle: React.FC = () => {
  const [visible, setVisible] = useState(isInitiallyVisible)

  return (
    <Box padding="medium" align="start">
      <Button onClick={() => setVisible(true)}>Alert me!</Button>
      <ConfirmDialog
        message="Do you want to have peace in the world?"
        open={visible}
        onClose={() => setVisible(false)}
        positiveActionText="Yes"
        negativeActionText="No"
      />
    </Box>
  )
}
