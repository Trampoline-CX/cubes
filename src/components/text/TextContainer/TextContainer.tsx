import React from 'react'
import { Box } from '../../structure/Box/Box'

export interface TextContainerProps {
  /**
   * Text components.
   */
  children: React.ReactNode
}

/**
 * Arrange multiple text components with consistent spacing.
 */
export const TextContainer: React.FC<TextContainerProps> = ({ children }) => (
  <Box space="medium">{children}</Box>
)
