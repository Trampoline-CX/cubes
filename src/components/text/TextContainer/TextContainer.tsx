import React from 'react'
import { Box } from '../../structure'

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
  <Box space="medium">{children}</Box>
)
