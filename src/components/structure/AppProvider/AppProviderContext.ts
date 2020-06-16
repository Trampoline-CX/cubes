import React from 'react'
import { Theme } from '../../../theme'

export interface AppProviderContext {
  theme: Theme
}

export const AppProviderContext = React.createContext<AppProviderContext>(
  (undefined as unknown) as AppProviderContext, // We want to crash if we don't have any AppProvider
)
