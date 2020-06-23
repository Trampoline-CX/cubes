import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { TouchableHighlight, View } from 'react-native'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { AppProvider, Screen, Box } from '../../structure'
import { Button, IconButton } from '../../actions'
import { BodyText, DisplayText } from '../../text'
import { Popover } from './Popover'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Popover,
  subcomponents: { 'Popover.Item': Popover.Item },
  decorators: [PhoneScreen],
}

export const Basic: React.FC = () => {
  const [firstVisible, setFirstVisible] = useState(false)
  const [secondVisible, setSecondVisible] = useState(false)

  return (
    <AppProvider>
      <Screen>
        <Box fill space="medium">
          <DisplayText>Some Title</DisplayText>
          <Popover
            open={firstVisible}
            onRequestClose={() => setFirstVisible(false)}
            anchor={<Button onClick={() => setFirstVisible(true)}>I want</Button>}
            actions={[
              { label: 'A pizza', action: action('Option selected: A pizza') },
              { label: 'A taco', action: action('Option selected: A taco') },
            ]}
          />
        </Box>
        <Box align="end">
          <Popover
            open={secondVisible}
            onRequestClose={() => setSecondVisible(false)}
            anchor={<IconButton icon="more" onClick={() => setSecondVisible(true)} />}
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
