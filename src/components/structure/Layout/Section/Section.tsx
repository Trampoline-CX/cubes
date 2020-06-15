import React from 'react'

export interface SectionProps {
  /**
   * Children components.
   */
  children: React.ReactNode
}

export const Section: React.FC<SectionProps> = ({ children }) => <>{children}</>
