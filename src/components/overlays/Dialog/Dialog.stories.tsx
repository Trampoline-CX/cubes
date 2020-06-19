import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Box } from '../../structure'
import { Button } from '../../actions'
import { BodyText } from '../../text'
import { Dialog } from './Dialog'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Dialog,
  subcomponents: { 'Dialog.Section': Dialog.Section },
}

export const Basic: React.FC = () => {
  const [visible, setVisible] = useState(false)

  return (
    <Box padding="medium" align="start">
      <Button onClick={() => setVisible(true)}>Show me how!</Button>
      <Dialog
        sectioned
        title="Nice Modal"
        open={visible}
        onClose={() => setVisible(false)}
        primaryAction={{ label: 'Got it!', action: () => setVisible(false) }}
        secondaryActions={[
          { label: 'I am dumb', action: () => setVisible(false) },
          { label: 'Share', action: () => setVisible(false) },
        ]}
      >
        <BodyText>Text inside the Dialog!</BodyText>
      </Dialog>
    </Box>
  )
}
