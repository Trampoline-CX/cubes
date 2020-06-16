import React from 'react'
import { action } from '@storybook/addon-actions'
import { fileAbsolute } from 'paths.macro'
import { CenteredVertical } from '../../../storybook/decorators/CenteredVertical'
import { BodyText } from '../../text/BodyText/BodyText'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Card } from './Card'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Card,
  subcomponents: { 'Card.Section': Card.Section },
  decorators: [CenteredVertical],
}

export const DefaultSectioned: React.FC = () => (
  <Card
    title="Card Title"
    sectioned
    headerAction={{ label: 'Header Action', action: action('Header Action Clicked') }}
    mainActions={[
      { label: 'Action 1', action: action('Action 1 Clicked') },
      { label: 'Action 2', action: action('Action 2 Clicked') },
    ]}
  >
    <BodyText>This is the text of the card.</BodyText>
  </Card>
)

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
