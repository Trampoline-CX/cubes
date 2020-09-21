import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { fileAbsolute } from 'paths.macro'
import { BodyText } from '../../text/BodyText/BodyText'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { PhoneScreen } from '../../../storybook/decorators/PhoneScreen'
import { Screen } from '../Screen/Screen'
import { Divider } from '../Divider/Divider'
import { Box } from '../Box/Box'
import { Card, CardProps } from './Card'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Card,
  subcomponents: { 'Card.Section': Card.Section },
}

export const DefaultSectioned: StoryFn<CardProps> = props => (
  <Card {...props}>
    <BodyText>This is the text of the card.</BodyText>
  </Card>
)

DefaultSectioned.args = {
  title: 'Card title',
  sectioned: true,
  headerAction: { label: 'Header Action', action: action('Header Action Clicked') },
  imageSource: { uri: require('../../../../storybook/assets/images/puppy-1.jpg') },
  mainActions: [
    { label: 'Action 1', action: action('Action 1 Clicked') },
    { label: 'Action 2', action: action('Action 2 Clicked') },
  ],
}

DefaultSectioned.argTypes = {
  children: { control: null },
}

export const MultipleSections: React.FC = () => (
  <Card title="Card Title">
    <Card.Section>
      <BodyText>This is the first section text.</BodyText>
    </Card.Section>
    <Card.Section>
      <BodyText>This is the text of the second section.</BodyText>
    </Card.Section>
    <Card.Section>
      <BodyText>This is the text of the third section.</BodyText>
    </Card.Section>
  </Card>
)

export const FullWidth: React.FC = () => (
  <Card sectioned title="Title" fullWidth>
    <BodyText>Full-width card</BodyText>
  </Card>
)

export const Subdued: React.FC = () => (
  <Card sectioned subdued>
    <BodyText>No title, subdued</BodyText>
  </Card>
)

export const Warning: React.FC = () => (
  <Card sectioned warning>
    <BodyText>No title, warning</BodyText>
  </Card>
)

export const CardWithoutHorizontalPadding: React.FC = () => (
  <Card title="Card Title">
    <Card.Section noPaddingX>
      <BodyText>No horizontal padding here</BodyText>
    </Card.Section>
  </Card>
)

const SwipeableCard: React.FC = () => {
  const [visible, setVisible] = useState(true)

  return visible ? (
    <>
      <Divider />
      <Card title="Dismiss me" fullWidth sectioned onDismiss={() => setVisible(false)}>
        <BodyText>Everything will be alright...</BodyText>
      </Card>
    </>
  ) : null
}

export const WithSwipeToDismiss: StoryFn<CardProps> = () => (
  <Screen>
    <SwipeableCard />
    <SwipeableCard />
    <SwipeableCard />
    <SwipeableCard />
    <SwipeableCard />
    <SwipeableCard />
    <Box padding="medium">
      <BodyText textAlign="center">You can dismiss these cards!</BodyText>
    </Box>
  </Screen>
)

WithSwipeToDismiss.decorators = [PhoneScreen]
