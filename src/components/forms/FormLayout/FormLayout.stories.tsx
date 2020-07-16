import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { fileAbsolute } from 'paths.macro'
import { TextField, TextFieldProps } from '../TextField/TextField'
import { getStoryTitle } from '../../../storybook/get-story-title'
import { FormLayout } from './FormLayout'

const TextFieldWrapper: React.FC<Omit<TextFieldProps, 'onChange' | 'value'>> = props => {
  const [value, setValue] = useState('')
  const onTextChanged = (newText: string): void => {
    setValue(newText)
    action('Text changed')(newText)
  }

  return <TextField {...props} value={value} onChange={onTextChanged} />
}

export default {
  title: getStoryTitle(fileAbsolute),
  component: FormLayout,
}

export const Default: React.FC = () => (
  <FormLayout>
    <TextFieldWrapper label="First Name" focused />
    <TextFieldWrapper label="Last Name" />
    <TextFieldWrapper label="Email" type="email" helpText="Enter your own email address" />
    <TextFieldWrapper label="Password" type="new-password" />
  </FormLayout>
)
