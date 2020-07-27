import React, { useState } from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { Screen } from '../../structure/Screen/Screen'
import { Card } from '../../structure/Card/Card'
import { BodyText } from '../../text'
import { LOREM_IPSUM } from '../../../storybook/utils/constants'
import { Collapsible, CollapsibleProps } from './Collapsible'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Collapsible,
  decorators: [PhoneScreen],
}

export const Basic: StoryFn<CollapsibleProps> = props => {
  const [open, setOpen] = useState(props.open ?? true)

  return (
    <Screen>
      <Screen.Content>
        <Card
          title="A blog post"
          sectioned
          mainActions={[{ label: open ? 'Hide' : 'Show', action: () => setOpen(prev => !prev) }]}
        >
          <Collapsible {...props} open={open}>
            <BodyText>{LOREM_IPSUM}</BodyText>
          </Collapsible>
        </Card>
      </Screen.Content>
    </Screen>
  )
}

Basic.args = {
  open: false,
}

Basic.argTypes = {
  children: { control: null },
}
