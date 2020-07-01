import React, { useState, useCallback } from 'react'
import _ from 'lodash'
import { Box } from '../../structure/Box/Box'
import { SnackbarProps, Snackbar } from './Snackbar'

export type SnackbarOptions = SnackbarProps

export interface SnackbarContext {
  show: (options: SnackbarOptions) => void
}

export const SnackbarContext = React.createContext<SnackbarContext>(
  (undefined as unknown) as SnackbarContext,
)

export interface SnackbarProviderProps {
  children: React.ReactNode
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [snackbarOptions, setSnackbarOptions] = useState<SnackbarOptions>()

  const show = useCallback<SnackbarContext['show']>(
    options => {
      // Wrap the onDismiss callback to unmount the component on dismiss
      options.onDismiss = _.wrap(options.onDismiss, origOnDismiss => {
        origOnDismiss?.()
        setSnackbarOptions(undefined) // Unmount the Snackbar
      }) as () => void

      setSnackbarOptions(options)
    },
    [setSnackbarOptions],
  )

  return (
    <SnackbarContext.Provider value={{ show }}>
      {/* Wrapper for Snackbar which is necessary to make sure the Snackbar is displayed within AppProvider bounds */}
      <Box fill>
        {children}
        {snackbarOptions ? <Snackbar key={snackbarOptions.message} {...snackbarOptions} /> : null}
      </Box>
    </SnackbarContext.Provider>
  )
}
