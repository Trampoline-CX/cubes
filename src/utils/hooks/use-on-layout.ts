import { LayoutRectangle, ViewProps } from 'react-native'
import { useState, useCallback } from 'react'

/**
 * Custom hook to use with `View.onLayout` to get layout of View.
 */
export const useOnLayout = (): [LayoutRectangle | null, Required<ViewProps>['onLayout']] => {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null)

  const onLayout = useCallback<Required<ViewProps>['onLayout']>(
    ({ nativeEvent }) => {
      setLayout(nativeEvent.layout)
    },
    [setLayout],
  )

  return [layout, onLayout]
}
