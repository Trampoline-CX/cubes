import React from 'react'
import { portals } from '../../../dev'
import { Box } from '../../../structure/Box/Box'

const TopBarPortals = portals.create('TopBar')

export interface TopBarProviderProps {
  /**
   * Children to show below the top bar.
   */
  children: React.ReactNode
}

/**
 * Provide a TopBar functionality to the App.
 */
export const TopBarProvider: React.FC<TopBarProviderProps> = ({ children }) => (
  <TopBarPortals.Provider>
    <TopBarPortals.DestinationPortal />
    <Box fill>{children}</Box>
  </TopBarPortals.Provider>
)

/**
 * Display components in the TopBar.
 */
export const TopBarSource = TopBarPortals.SourcePortal
