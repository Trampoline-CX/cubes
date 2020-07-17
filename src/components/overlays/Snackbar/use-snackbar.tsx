import { useContext, useCallback } from 'react'
import { SnackbarOptions, SnackbarContext } from './SnackbarProvider'

/**
 * Get a function for showing a Snackbar with the specified options.
 *
 * Simply call the function to show the Snackbar, which will be automatically
 * dismissed.
 *
 * @example
 * const showSnackbar = useSnackbar({ message: 'This is a Snackbar!' })
 * <Button onClick={showSnackbar}>Show Snackbar!</Button>
 */
export const useSnackbar = (options: SnackbarOptions): (() => void) => {
  const context = useContext(SnackbarContext)

  return useCallback(() => context.show(options), [context, options])
}
