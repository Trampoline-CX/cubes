import React from 'react'
import { BodyText } from '../../BodyText/BodyText'

export interface ItemProps {
  /**
   * Text to display in the Item. Can contain stylized text using `TextStyle`.
   */
  children: React.ReactNode
}

/**
 * Item to display in a List.
 */
export const Item: React.FC<ItemProps> = ({ children }) => <BodyText>{children}</BodyText>
