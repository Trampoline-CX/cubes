import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { action } from '@storybook/addon-actions'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { AppProvider, Screen } from '../../structure'
import { Button } from '../../actions'
import { BodyText } from '../../text'
import { Popover } from './Popover'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Popover,
  subcomponents: { 'Popover.Item': Popover.Item },
  decorators: [PhoneScreen],
}

export const Basic: React.FC = () => (
  <AppProvider>
    <Screen>
      <Popover
        trigger={show => <Button onClick={show}>I want</Button>}
        actions={[
          { label: 'A pizza', action: action('Option selected: A pizza') },
          { label: 'A taco', action: action('Option selected: A taco') },
        ]}
      />
    </Screen>
  </AppProvider>
)
