import React, { useContext, useState, useCallback, useEffect } from 'react'
import { useResponsive } from '../../../../utils/hooks/use-responsive'

export interface DrawerMenuContext {
  isModal: boolean
  opened: boolean
  open: () => void
  close: () => void
}

const warnNoContext = (): void =>
  console.warn('DrawerMenuContext not present. Make sure your component is wrapped in AppProvider.')

const DrawerMenuContext = React.createContext<DrawerMenuContext>({
  isModal: false,
  opened: false,
  open: warnNoContext,
  close: warnNoContext,
})

export interface DrawerMenuProviderProps {
  children: React.ReactNode
}

export const DrawerMenuProvider: React.FC<DrawerMenuProviderProps> = ({ children }) => {
  const isModal = useResponsive({
    small: true,
    medium: false,
    large: false,
  })

  const [opened, setOpened] = useState(false)
  const open = useCallback(() => setOpened(true), [setOpened])
  const close = useCallback(() => setOpened(false), [setOpened])

  // Close drawer when isModal changes...
  useEffect(() => setOpened(false), [isModal])

  return (
    <DrawerMenuContext.Provider value={{ isModal, opened, open, close }}>
      {children}
    </DrawerMenuContext.Provider>
  )
}

export const useDrawerMenuContext = (): DrawerMenuContext => useContext(DrawerMenuContext)
