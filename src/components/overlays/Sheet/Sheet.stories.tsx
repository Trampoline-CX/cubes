import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import isChromatic from 'chromatic/isChromatic'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Box } from '../../structure/Box/Box'
import { Button } from '../../actions/Button/Button'
import { Heading } from '../../text'
import { ListView } from '../../structure/ListView/ListView'
import { IconButton } from '../../actions/IconButton/IconButton'
import { Sheet, SheetProps } from './Sheet'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Sheet,
  parameters: {
    chromatic: { pauseAnimationAtEnd: true },
  },
}

const isInitiallyVisible = isChromatic()

export const Basic: StoryFn<SheetProps> = props => {
  const [open, setOpen] = useState(props.open)

  return (
    <Box>
      <Button onClick={() => setOpen(true)}>Show Sheet</Button>
      <Sheet {...props} open={open} onClose={() => setOpen(false)}>
        <Box
          horizontal
          paddingX="medium"
          paddingY="small"
          space="medium"
          align="center"
          distribution="space-between"
        >
          <Heading>What do you want?</Heading>
          <IconButton icon="close" onClick={() => setOpen(false)} />
        </Box>
        <ListView>
          <ListView.Item
            title="Pizza"
            description="With toppings and everything!"
            onClick={() => {
              action('Pizza')()
              setOpen(false)
            }}
          />
          <ListView.Item
            title="Tacos"
            description="Hola!"
            onClick={() => {
              action('Tacos')()
              setOpen(false)
            }}
          />
          <ListView.Item
            title="Sushis"
            description="Paradise on earth!"
            onClick={() => {
              action('Sushis')()
              setOpen(false)
            }}
          />
        </ListView>
      </Sheet>
    </Box>
  )
}

Basic.args = {
  open: isInitiallyVisible,
}

Basic.argTypes = {
  children: { control: null },
}

export const FromRightWithBackdrop: React.FC = () => {
  const [open, setOpen] = useState(isInitiallyVisible)

  return (
    <Box>
      <Button onClick={() => setOpen(true)}>Show Sheet</Button>
      <Sheet from="right" open={open} onClose={() => setOpen(false)} showBackdrop>
        <Box
          horizontal
          paddingX="medium"
          paddingY="small"
          space="medium"
          align="center"
          distribution="space-between"
        >
          <Heading>What do you want?</Heading>
          <IconButton icon="close" onClick={() => setOpen(false)} />
        </Box>
        <ListView>
          <ListView.Item
            title="Pizza"
            description="With toppings and everything!"
            onClick={() => {
              action('Pizza')()
              setOpen(false)
            }}
          />
          <ListView.Item
            title="Tacos"
            description="Hola!"
            onClick={() => {
              action('Tacos')()
              setOpen(false)
            }}
          />
          <ListView.Item
            title="Sushis"
            description="Paradise on earth!"
            onClick={() => {
              action('Sushis')()
              setOpen(false)
            }}
          />
        </ListView>
      </Sheet>
    </Box>
  )
}
