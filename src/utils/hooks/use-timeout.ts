import { useEffect } from 'react'

/**
 * Hook calling a function after a certain delay. Resets automatically if `delay`
 * changes.
 */
export const useTimeout = (callback: () => void, delay: number): void => {
  useEffect(() => {
    const timeoutRef = setTimeout(callback, delay)

    return () => clearTimeout(timeoutRef)
  }, [delay])
}
