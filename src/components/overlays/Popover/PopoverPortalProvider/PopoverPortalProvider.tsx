import _ from 'lodash'
import React, { useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { View, findNodeHandle } from 'react-native'

interface PopoverPortalContext {
  popovers: { [key: number]: React.ReactNode }
  setPopover: (key: number, popover: null | React.ReactNode) => void
}

// Context providing ability to place multiple portals somewhere else in Component tree.
const PopoverPortalContext = React.createContext<PopoverPortalContext>({
  popovers: {},
  setPopover: () => {},
})

export interface PopoverPortalProvider {
  children: React.ReactNode
}
/**
 * Provides a place for Popovers to appear in the component tree.
 */
export const PopoverPortalProvider: React.FC<PopoverPortalProvider> = ({ children }) => {
  const [popovers, setPopovers] = useState<{ [key: number]: React.ReactNode }>({})

  const setPopover = useCallback<PopoverPortalContext['setPopover']>(
    (key, popover) => {
      setPopovers(prev => ({ ...prev, [key]: popover || null }))
    },
    [setPopovers],
  )

  return (
    <PopoverPortalContext.Provider value={{ popovers, setPopover }}>
      {children}
      <PopoverRenderer />
    </PopoverPortalContext.Provider>
  )
}

/**
 * Renders the popovers.
 */
const PopoverRenderer: React.FC = () => {
  const { popovers } = useContext(PopoverPortalContext)

  return <>{_.values(popovers)}</>
}

export interface PopoverPortalProps {
  popoverRef: React.RefObject<View>
  children: React.ReactNode
}

/**
 * Wraps a Popover component to render them in a different spot in the Component tree.
 */
export const PopoverPortal: React.FC<PopoverPortalProps> = ({ popoverRef, children }) => {
  const { setPopover } = useContext(PopoverPortalContext)

  // Retrieves a Native handle on the component to identify it.
  const handle = useMemo(() => findNodeHandle(popoverRef.current), [popoverRef.current])

  // When content of Popover is updated, update it in the Context too
  useEffect(() => {
    if (handle) {
      setPopover(handle, children)
    }
  }, [handle, children])

  // Removes the Popover from the DOM once it is unmounted
  useEffect(
    () => () => {
      if (handle) {
        setPopover(handle, null)
      }
    },
    [],
  )

  return null
}
