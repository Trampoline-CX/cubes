import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { AppProvider, Screen, Box } from '../../structure'
import { Button, IconButton } from '../../actions'
import { Popover } from './Popover'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Popover,
  subcomponents: { 'Popover.Item': Popover.Item },
  decorators: [PhoneScreen],
}

export const Basic: React.FC = () => {
  const [visible, setVisible] = useState(false)

  return (
    <AppProvider>
      <Screen>
        <Box fill align="center" distribution="center">
          <Popover
            placement="left-end"
            open={visible}
            onRequestClose={() => setVisible(false)}
            anchor={<IconButton icon="more" onClick={() => setVisible(true)} />}
            actions={[
              { label: 'A pizza', action: action('Option selected: A pizza') },
              { label: 'A taco', action: action('Option selected: A taco') },
            ]}
          />
        </Box>
      </Screen>
    </AppProvider>
  )
}

export const PlacementCorrection: React.FC = () => {
  const [visible, setVisible] = useState(false)

  return (
    <AppProvider>
      <Screen>
        <Box fill distribution="end">
          <Popover
            open={visible}
            onRequestClose={() => setVisible(false)}
            anchor={<Button onClick={() => setVisible(true)}>Show Popover</Button>}
            actions={[
              { label: 'A pizza', action: action('Option selected: A pizza') },
              { label: 'A taco', action: action('Option selected: A taco') },
            ]}
          />
        </Box>
      </Screen>
    </AppProvider>
  )
}
