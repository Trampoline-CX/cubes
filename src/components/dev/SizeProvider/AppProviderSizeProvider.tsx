import React, { useCallback, useRef, useContext, useEffect, useState } from 'react'
import {
  LayoutRectangle,
  View,
  ViewProps,
  StyleSheet,
  findNodeHandle,
  MeasureLayoutOnSuccessCallback,
} from 'react-native'

interface SizeProvider {
  layout: LayoutRectangle
  measure: (ref: View, callback: MeasureLayoutOnSuccessCallback) => void
}

export interface AppProviderSizeProviderProps {
  children: React.ReactNode
}

const LAYOUT_DEFAULT: LayoutRectangle = { width: 0, height: 0, x: 0, y: 0 }

const SizeContext = React.createContext<SizeProvider>({ layout: LAYOUT_DEFAULT, measure: () => {} })

/**
 * View supplying
 */
export const AppProviderSizeProvider: React.FC<AppProviderSizeProviderProps> = ({ children }) => {
  const ref = useRef<View>(null)
  const [layout, setLayout] = useState(LAYOUT_DEFAULT)
  const onLayout = useCallback<Required<ViewProps>['onLayout']>(
    ({ nativeEvent }) => setLayout(nativeEvent.layout),
    [],
  )

  const measure = useCallback<SizeProvider['measure']>(
    (otherRef, callback) => {
      if (ref.current) {
        otherRef.measureLayout(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          findNodeHandle(ref.current)!,
          callback,
          () => {}, // We don't do anything when failure occurs
        )
      }
    },
    [ref.current],
  )

  return (
    <View ref={ref} style={styles.root} onLayout={onLayout}>
      <SizeContext.Provider value={{ layout, measure }}>{children}</SizeContext.Provider>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})

export const useAppProviderDimensions = (): LayoutRectangle => useContext(SizeContext).layout
export const useAppProviderPosition = (ref: View | null): LayoutRectangle | null => {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null)
  const { measure, layout: providerLayout } = useContext(SizeContext)

  useEffect(() => {
    if (ref) {
      measure(ref, (x, y, width, height) => setLayout({ x, y, width, height }))
    }
  }, [
    providerLayout, // Retrigger measurement if AppProvider layout changes changes
    ref,
  ])

  return layout
}
