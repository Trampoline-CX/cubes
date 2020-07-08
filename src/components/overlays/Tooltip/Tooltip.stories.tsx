import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { BodyText } from '../../text'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { Screen } from '../../structure/Screen/Screen'
import { Box } from '../../structure/Box/Box'
import { IconButton } from '../../actions/IconButton/IconButton'
import { Tooltip, TooltipProps } from './Tooltip'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Tooltip,
  decorators: [PhoneScreen],
}

export const Basic: StoryFn<TooltipProps> = props => (
  <Screen>
    <Box fill distribution="center">
      <Tooltip {...props}>
        <BodyText>This is some unclear text.</BodyText>
      </Tooltip>
    </Box>
  </Screen>
)

Basic.args = {
  content: 'Here is some very important clarification!',
}

Basic.argTypes = {
  children: { control: null },
}

export const WithClickableChildren: React.FC = () => (
  <Screen>
    <Box fill distribution="center" align="start">
      <Tooltip content="Navigate to link" preferredPlacement="below">
        <IconButton icon="web" onClick={action('Icon clicked')} />
      </Tooltip>
    </Box>
  </Screen>
)
