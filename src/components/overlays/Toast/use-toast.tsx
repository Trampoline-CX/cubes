import { useContext, useCallback } from 'react'
import { ToastOptions, ToastContext } from './ToastProvider'

/**
 * Get a function for showing a toast with the specified options.
 *
 * Simply call the function to show the Toast, which will be automatically
 * dismissed.
 *
 * @example
 * const showToast = useToast({ message: 'This is a toast!' })
 * <Button onClick={showToast}>Show Toast!</Button>
 */
export const useToast = (options: ToastOptions): (() => void) => {
  const context = useContext(ToastContext)

  return useCallback(() => context.show(options), [context, options])
}
