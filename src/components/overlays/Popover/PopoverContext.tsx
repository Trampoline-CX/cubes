import React from 'react'

export interface PopoverContext {
  requestClose: () => void
}

export const PopoverContext = React.createContext<PopoverContext>({ requestClose: () => {} })
