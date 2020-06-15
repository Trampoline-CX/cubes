import React from 'react'
import { View } from 'react-native'
import { Item } from './Item/Item'

export interface FormLayoutProps {
  /**
   * Children components (should be `TextField` components).
   */
  children: React.ReactNode
}

/**
 * Component used to organize display of children form components like `TextField`.
 */
export const FormLayout: React.FC<FormLayoutProps> = ({ children }) => {
  // Map in Items components for layouting
  const childCount = React.Children.count(children)
  const items = React.Children.map(children, (child, index) => (
    <Item last={index === childCount - 1}>{child}</Item>
  ))

  return <View>{items}</View>
}
