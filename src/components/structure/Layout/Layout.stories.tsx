import React from 'react'
import { fileAbsolute } from 'paths.macro'
import { BodyText } from '../../text/BodyText/BodyText'
import { Heading } from '../../text/Heading/Heading'
import { Card } from '../Card/Card'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Layout, LayoutProps } from './Layout'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Layout,
  subcomponents: { 'Layout.Section': Layout.Section },
}

export const MultipleSections: StoryFn<LayoutProps> = props => (
  <Layout {...props}>
    <Layout.Section>
      <Card title="Card Title (Section 1)">
        <Card.Section>
          <BodyText>This is the card 1st section.</BodyText>
        </Card.Section>
        <Card.Section>
          <BodyText>This is the card 2nd section.</BodyText>
        </Card.Section>
      </Card>
    </Layout.Section>
    <Layout.Section>
      <Card sectioned title="Card Title (Section 2)">
        <BodyText>Some text...</BodyText>
      </Card>
    </Layout.Section>
    <Layout.Section>
      <Heading>Heading Section 2</Heading>
      <BodyText>Body Section 2</BodyText>
    </Layout.Section>
    <Layout.Section>
      <Heading>Heading Section 3</Heading>
      <BodyText>Body Section 3</BodyText>
    </Layout.Section>
  </Layout>
)

MultipleSections.argTypes = {
  children: { control: null },
}

export const Sectioned: React.FC = () => (
  <Layout sectioned>
    <Card title="Card Title" sectioned>
      <BodyText>Card description goes here.</BodyText>
    </Card>
  </Layout>
)
