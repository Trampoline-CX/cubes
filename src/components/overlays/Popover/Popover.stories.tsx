import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import isChromatic from 'chromatic/isChromatic'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { AppProvider } from '../../structure/AppProvider/AppProvider'
import { Screen } from '../../structure/Screen/Screen'
import { Box } from '../../structure/Box/Box'
import { Button } from '../../actions/Button/Button'
import { IconButton } from '../../actions/IconButton/IconButton'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { DisplayText, TextContainer, BodyText } from '../../text'
import { LOREM_IPSUM } from '../../../storybook/utils/constants'
import { useTheme } from '../../../theme'
import { Popover, PopoverProps } from './Popover'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Popover,
  subcomponents: { 'Popover.Item': Popover.Item },
  decorators: [PhoneScreen],
  parameters: {
    chromatic: { pauseAnimationAtEnd: true, delay: 300 },
  },
}

const isInitiallyVisible = isChromatic()

export const Basic: StoryFn<PopoverProps> = props => {
  const [visible, setVisible] = useState(isInitiallyVisible)

  return (
    <Screen>
      <Box fill align="center" distribution="center">
        <Popover
          {...props}
          open={visible}
          onRequestClose={() => setVisible(false)}
          activator={<IconButton icon="more" onClick={() => setVisible(true)} />}
        />
      </Box>
    </Screen>
  )
}

Basic.args = {
  placement: 'left-end',
  actions: [
    { label: 'Edit', action: action('Option selected: Edit'), icon: 'edit' },
    {
      label: 'Link',
      action: action('Option selected: Link'),
      icon: 'link',
      color: 'accent',
    },
  ],
}

Basic.argTypes = {
  open: { control: null },
  children: { control: null },
  activator: { control: null },
}

export const UsingChildrenItems: StoryFn<PopoverProps> = () => {
  const [visible, setVisible] = useState(isInitiallyVisible)

  return (
    <Screen>
      <Box fill align="center" distribution="center">
        <Popover
          open={visible}
          onRequestClose={() => setVisible(false)}
          activator={<IconButton icon="more" onClick={() => setVisible(true)} />}
        >
          <Popover.Item label="Edit" icon="edit" onSelect={action('Edit selected')} />
          <Popover.Item
            label="Unlink"
            icon="link"
            iconColor="accent"
            onSelect={action('Unlink selected')}
          />
        </Popover>
      </Box>
    </Screen>
  )
}

export const MatchWidth: React.FC = () => {
  const [visible, setVisible] = useState(isInitiallyVisible)

  return (
    <Screen>
      <Box fill distribution="center" align="center">
        <Popover
          matchWidth
          open={visible}
          onRequestClose={() => setVisible(false)}
          activator={<Button onClick={() => setVisible(true)}>Show Popover</Button>}
          actions={[
            { label: 'A pizza', action: action('Option selected: A pizza') },
            { label: 'A taco', action: action('Option selected: A taco') },
          ]}
        />
      </Box>
    </Screen>
  )
}

export const AboveActivatorAndHideBackdrop: React.FC = () => {
  const [visible, setVisible] = useState(isInitiallyVisible)

  return (
    <Screen>
      <Box fill distribution="center" align="center">
        <Popover
          aboveActivator
          hideBackdrop
          placement="bottom-end"
          open={visible}
          onRequestClose={() => setVisible(false)}
          activator={<IconButton icon="more" onClick={() => setVisible(true)} />}
          actions={[
            { label: 'A pizza', action: action('Option selected: A pizza') },
            { label: 'A taco', action: action('Option selected: A taco') },
          ]}
        />
      </Box>
    </Screen>
  )
}

export const AutomaticPlacementCorrection: StoryFn<PopoverProps> = () => {
  const [visible, setVisible] = useState(isInitiallyVisible)

  return (
    <Screen>
      <Box fill distribution="end">
        <Popover
          open={visible}
          onRequestClose={() => setVisible(false)}
          activator={<Button onClick={() => setVisible(true)}>Show Popover</Button>}
          actions={[
            { label: 'A pizza', action: action('Option selected: A pizza') },
            { label: 'A taco', action: action('Option selected: A taco') },
          ]}
        />
      </Box>
    </Screen>
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

export const CustomContent: StoryFn<PopoverProps> = () => {
  const [visible, setVisible] = useState(isInitiallyVisible)

  return (
    <Screen>
      <Box fill distribution="center">
        <Popover
          open={visible}
          onRequestClose={() => setVisible(false)}
          activator={<Button onClick={() => setVisible(true)}>Show Popover</Button>}
        >
          <Box padding="medium" space="large">
            <TextContainer>
              <DisplayText>Custom content</DisplayText>
              <BodyText>{LOREM_IPSUM}</BodyText>
            </TextContainer>
            <Button onClick={action('Button clicked')}>Click me!</Button>
          </Box>
        </Popover>
      </Box>
    </Screen>
  )
}
