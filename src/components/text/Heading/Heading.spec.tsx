import React from 'react'
import renderer from 'react-test-renderer'
import { Text } from 'react-native'
import { Heading } from './Heading'

describe('<DisplayText />', () => {
  it('renders correct accessibility elements when specifying header element', () => {
    const tree = renderer.create(<Heading element="h1">My Text</Heading>)
    const textComponent = tree.root.findByType(Text)
    expect(textComponent.props.accessibilityRole).toMatch('header')
    expect(textComponent.props['aria-level']).toMatch('1')
  })
})
