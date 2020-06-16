import React, { useContext } from 'react'

export interface Navigation {
  goBack: () => void
}

const NavigationContext = React.createContext<Navigation>({
  goBack: () => {},
})

export interface NavigationProviderProps {
  /**
   * Function that is called to go back to previous screen.
   *
   * This is called by other components like `TopBar`.
   */
  goBack: () => void
}

/**
 * Provides navigation features to Navigation components.
 * You can customize it with any Navigation framework you like.
 */
export const NavigationProvider: React.FC<NavigationProviderProps> = ({ goBack, children }) => {
  return <NavigationContext.Provider value={{ goBack }}>{children}</NavigationContext.Provider>
}

/**
 * Return a `Navigation` object provided by the `NavigationProvider`.
 */
export const useNav = (): Navigation => useContext(NavigationContext)
