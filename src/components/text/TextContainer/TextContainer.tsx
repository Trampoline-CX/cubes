import React from 'react'
import { Stack } from '../../structure/Stack/Stack'

export interface TextContainerProps {
  /**
   * Text components.
   */
  children: React.ReactNode
}

/**
 * Displays multiple Text components in a consistent manner, with spacing between each of them.
 */
export const TextContainer: React.FC<TextContainerProps> = ({ children }) => (
  <Stack space="medium">{children}</Stack>
)
