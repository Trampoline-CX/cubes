import React from 'react'
import { portals } from '../../../dev'
import { Box } from '../../Box/Box'

const LeftSidebarPortals = portals.create('LeftSidebar')

export interface LeftSidebarProviderProps {
  /**
   * Children to show next of the left Sidebar.
   */
  children: React.ReactNode
}

/**
 * Provide a LeftSidebar functionality to the App.
 */
export const LeftSidebarProvider: React.FC<LeftSidebarProviderProps> = ({ children }) => (
  <LeftSidebarPortals.Provider>
    <Box horizontal fill reverse>
      <Box fill>{children}</Box>
      <LeftSidebarPortals.DestinationPortal />
    </Box>
  </LeftSidebarPortals.Provider>
)

/**
 * Display components in the LeftSidebar.
 */
export const LeftSidebar = LeftSidebarPortals.SourcePortal
