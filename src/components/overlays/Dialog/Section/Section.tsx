import React from 'react'
import { Box } from '../../../structure/Box/Box'

export interface SectionProps {
  /**
   * Content to put in Dialog Section.
   */
  children: React.ReactNode
}

/**
 * Wraps Dialog content in a section which provides correct padding for content.
 */
export const Section: React.FC<SectionProps> = ({ children }) => (
  <Box padding="medium">{children}</Box>
)
