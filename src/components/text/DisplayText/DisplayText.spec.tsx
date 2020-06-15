import React from 'react'
import renderer from 'react-test-renderer'
import { Text } from 'react-native'
import { DisplayText } from './DisplayText'

describe('<DisplayText />', () => {
  it('renders correct accessibility elements when specifying header element', () => {
    const tree = renderer.create(<DisplayText element="h1">My Text</DisplayText>)
    const textComponent = tree.root.findByType(Text)
    expect(textComponent.props.accessibilityRole).toMatch('header')
    expect(textComponent.props['aria-level']).toMatch('1')
  })
})
