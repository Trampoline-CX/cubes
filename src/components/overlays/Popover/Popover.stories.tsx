import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { AppProvider, Screen, Box } from '../../structure'
import { Button, IconButton } from '../../actions'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Popover, PopoverProps } from './Popover'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Popover,
  subcomponents: { 'Popover.Item': Popover.Item },
  decorators: [PhoneScreen],
}

export const Basic: StoryFn<PopoverProps> = props => {
  const [visible, setVisible] = useState(false)

  return (
    <AppProvider>
      <Screen>
        <Box fill align="center" distribution="center">
          <Popover
            {...props}
            open={visible}
            onRequestClose={() => setVisible(false)}
            anchor={<IconButton icon="more" onClick={() => setVisible(true)} />}
          />
        </Box>
      </Screen>
    </AppProvider>
  )
}

Basic.args = {
  placement: 'left-end',
  actions: [
    { label: 'Edit', action: action('Option selected: Edit'), icon: 'action-edit' },
    {
      label: 'Unlink',
      action: action('Option selected: Unlink'),
      icon: 'broken-connection',
      color: 'accent',
    },
  ],
}

Basic.argTypes = {
  open: { control: null },
  children: { control: null },
  anchor: { control: null },
}

export const MatchWidth: React.FC = () => {
  const [visible, setVisible] = useState(false)

  return (
    <AppProvider>
      <Screen>
        <Box fill distribution="center" align="center">
          <Popover
            matchWidth
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

export const AboveAnchorAndHideBackdrop: React.FC = () => {
  const [visible, setVisible] = useState(false)

  return (
    <AppProvider>
      <Screen>
        <Box fill distribution="center" align="center">
          <Popover
            aboveAnchor
            hideBackdrop
            placement="bottom-end"
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

export const AutomaticPlacementCorrection: StoryFn<PopoverProps> = () => {
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

AutomaticPlacementCorrection.story = {
  parameters: {
    docs: {
      storyDescription:
        'The Popover will automatically replace itself so it does not go outside the Window. In this example, the Popover should be displayed below button, but instead goes on top of it.',
    },
  },
}
