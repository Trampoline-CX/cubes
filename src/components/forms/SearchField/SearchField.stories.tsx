import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { fileAbsolute } from 'paths.macro'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { SearchField } from './SearchField'

export default {
  title: getStoryTitle(fileAbsolute),
  component: SearchField,
}

export const Default: React.FC = () => {
  const [value, setValue] = useState('')

  return (
    <SearchField
      value={value}
      onChange={setValue}
      placeholder="Enter a search"
      onFocus={action('Focused')}
      onBlur={action('Blurred')}
      onSubmit={action('Submitted')}
    />
  )
}

export const WithPills: React.FC = () => {
  const [value, setValue] = useState('')

  return (
    <SearchField
      value={value}
      onChange={setValue}
      placeholder="Enter a search"
      onFocus={action('Focused')}
      onBlur={action('Blurred')}
      onSubmit={action('Submitted')}
      pills={[
        { label: 'Tim Hortons', onDismiss: action('Dismissed Tim Hortons') },
        { label: 'Uber', onDismiss: action('Dismissed Uber') },
      ]}
    />
  )
}

export const Uncontrolled: React.FC = () => <SearchField placeholder="Enter a search" />
