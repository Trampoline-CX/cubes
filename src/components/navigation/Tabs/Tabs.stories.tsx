import React, { useState, useMemo } from 'react'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Box, Screen, Card } from '../../structure'
import { TextContainer, Heading, BodyText } from '../../text'
import { LOREM_IPSUM } from '../../../storybook/utils/constants'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { Icon } from '../../images-and-icons'
import { Tabs, TabsProps } from './Tabs'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Tabs,
  decorators: [PhoneScreen],
}

export const Basic: StoryFn<TabsProps> = props => {
  const [selected, setSelected] = useState(props.selected ?? 0)

  return (
    <Screen>
      <Tabs {...props} selected={selected} onSelect={setSelected}>
        <Screen.Content>
          <Box padding="medium">
            <TextContainer>
              <Heading>{props.tabs[selected].label}</Heading>
              <BodyText>{LOREM_IPSUM}</BodyText>
            </TextContainer>
          </Box>
        </Screen.Content>
      </Tabs>
    </Screen>
  )
}

Basic.args = {
  tabs: [
    { label: 'Developers', id: 'devs' },
    { label: 'Designers', id: 'designers' },
  ],
  selected: 0,
}

Basic.argTypes = {
  children: { control: null },
}

export const DifferentTabsContent: React.FC = () => {
  const [selected, setSelected] = useState(0)

  const tabContent = useMemo(() => {
    switch (selected) {
      case 0:
        return <BodyText>Developers like things simple.</BodyText>
      case 1:
        return (
          <Card title="Designers" sectioned>
            <Box horizontal space="small">
              <Icon name="theme" color="accent" />
              <BodyText>Designers like beautiful things!</BodyText>
            </Box>
          </Card>
        )
      default:
        throw new Error('Invalid tab')
    }
  }, [selected])

  return (
    <Screen>
      <Tabs
        tabs={[
          { label: 'Developers', id: 'devs' },
          { label: 'Designers', id: 'designers' },
        ]}
        selected={selected}
        onSelect={setSelected}
      >
        <Screen.Content padding="medium">{tabContent}</Screen.Content>
      </Tabs>
    </Screen>
  )
}
