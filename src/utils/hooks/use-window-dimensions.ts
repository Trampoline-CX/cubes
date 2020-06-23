import { Dimensions, ScaledSize } from 'react-native'
import { useState, useEffect, useCallback } from 'react'

/**
 * Custom `useWindowDimensions` hook as React Native Web doesn't supply one right now.
 *
 * TODO: Remove after upgrading React Native Web to >= 0.12.3.
 */
export const useWindowDimensions = (): ScaledSize => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'))

  const onChange = useCallback(({ window }: { window: ScaledSize }): void => {
    setDimensions(window)
  }, [])

  useEffect(() => {
    Dimensions.addEventListener('change', onChange)
    return () => {
      Dimensions.removeEventListener('change', onChange)
    }
  }, [])

  return dimensions
}
