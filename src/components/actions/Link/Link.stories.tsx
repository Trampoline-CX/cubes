import React from 'react'
import { action } from '@storybook/addon-actions'
import { fileAbsolute } from 'paths.macro'
import { BodyText } from '../../text/BodyText/BodyText'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { Link } from './Link'

export default {
  title: getStoryTitle(fileAbsolute),
  component: Link,
}

export const Default: React.FC = () => (
  <BodyText>
    This is a text containing a maybe not{' '}
    <Link onClick={action('Link clicked')}>somewhat long link</Link> mentioning stuff about IT
    stuff.
  </BodyText>
)

export const Subdued: React.FC = () => (
  <BodyText>
    This is a text containing a maybe not{' '}
    <Link color="subdued" onClick={action('Link clicked')}>
      somewhat long link
    </Link>{' '}
    mentioning stuff about IT stuff.
  </BodyText>
)
