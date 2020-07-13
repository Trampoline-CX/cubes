import React from 'react'

export interface SectionProps {
  /**
   * Children components.
   */
  children: React.ReactNode
}

/**
 * Group items together in a `Layout`.
 */
export const Section: React.FC<SectionProps> = ({ children }) => <>{children}</>
