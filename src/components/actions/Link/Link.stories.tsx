import React from 'react'
import { action } from '@storybook/addon-actions'
import { fileAbsolute } from 'paths.macro'
import { BodyText } from '../../text/BodyText/BodyText'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { StoryFn } from '../../../storybook/utils/storybook-types'
import { Link, LinkProps } from './Link'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Link,
}

export const Default: StoryFn<LinkProps> = props => (
  <BodyText>
    This is a text containing a maybe not <Link {...props} /> mentioning stuff about IT stuff.
  </BodyText>
)

Default.args = {
  children: 'somewhat long link',
  onClick: action('Link clicked'),
}

Default.argTypes = {
  children: { control: 'text' },
}

export const Subdued: React.FC = () => (
  <BodyText>
    This is a text containing a maybe not{' '}
    <Link color="subdued" onClick={action('Link clicked')}>
      somewhat long link
    </Link>{' '}
    mentioning stuff about IT stuff.
  </BodyText>
)
