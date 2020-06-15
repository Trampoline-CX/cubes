import React from 'react'
import { View } from 'react-native'
import { Section } from './Section/Section'
import { Item } from './Item/Item'

export interface LayoutProps {
  /**
   * Children views (should be `Layout.Section` if not using `sectioned={true}`)
   */
  children: React.ReactNode
  /**
   * Set to `true` to automatically wrap content in a `Layout.Section`.
   */
  sectioned?: boolean
}

/**
 * Organize content in sections with standardized padding. Very useful when used with `Card` components.
 */
export const Layout: React.FC<LayoutProps> & { Section: typeof Section } = ({
  children,
  sectioned = false,
}) => {
  const content = sectioned ? <Section>{children}</Section> : children

  // Map in Items components for layouting
  const childCount = React.Children.count(content)
  const items = React.Children.map(content, (child, index) => (
    <Item last={index === childCount - 1}>{child}</Item>
  ))

  return <View>{items}</View>
}

Layout.Section = Section
