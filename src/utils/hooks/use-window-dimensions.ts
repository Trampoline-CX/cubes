import { Dimensions, ScaledSize } from 'react-native'
import { useState, useEffect } from 'react'

/**
 * Custom `useWindowDimensions` hook as React Native Web doesn't supply one right now.
 *
 * TODO: Remove after upgrading React Native Web to >= 0.12.3.
 */
export const useWindowDimensions = (): ScaledSize => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'))

  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }): void => {
      setDimensions(window)
    }

    Dimensions.addEventListener('change', onChange)
    return () => {
      Dimensions.removeEventListener('change', onChange)
    }
  }, [])

  return dimensions
}
