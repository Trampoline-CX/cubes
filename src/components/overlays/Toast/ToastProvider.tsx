import React, { useState, useCallback } from 'react'
import _ from 'lodash'
import { View, StyleSheet } from 'react-native'
import { ToastProps, Toast } from './Toast'

export type ToastOptions = ToastProps

export interface ToastContext {
  show: (options: ToastOptions) => void
}

export const ToastContext = React.createContext<ToastContext>(
  (undefined as unknown) as ToastContext,
)

export interface ToastProviderProps {
  children: React.ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toastOptions, setToastOptions] = useState<ToastOptions>()

  const show = useCallback<ToastContext['show']>(
    options => {
      // Wrap the onDismiss callback to unmount the component on dismiss
      options.onDismiss = _.wrap(options.onDismiss, origOnDismiss => {
        origOnDismiss?.()
        setToastOptions(undefined) // Unmount the Toast
      }) as () => void

      setToastOptions(options)
    },
    [setToastOptions],
  )

  return (
    <ToastContext.Provider value={{ show }}>
      {/* Wrapper for Toast which is necessary to make sure the Toast is displayed within AppProvider bounds */}
      <View style={styles.toastContainer}>
        {children}
        {toastOptions ? <Toast key={toastOptions.message} {...toastOptions} /> : null}
      </View>
    </ToastContext.Provider>
  )
}

const styles = StyleSheet.create({
  toastContainer: {
    flex: 1,
  },
})
