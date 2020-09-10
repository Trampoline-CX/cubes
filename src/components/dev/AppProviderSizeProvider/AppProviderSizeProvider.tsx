import React, { useCallback, useRef, useContext, useEffect, useState } from 'react'
import {
  LayoutRectangle,
  View,
  ViewProps,
  StyleSheet,
  findNodeHandle,
  MeasureLayoutOnSuccessCallback,
  Dimensions,
} from 'react-native'

interface SizeProvider {
  /**
   * Get the layout of `AppProvider`.
   *
   * X and Y positions are relative to Window.
   *
   * Width and Height are dimensions of `AppProvider`.
   */
  layout: LayoutRectangle
  /**
   * Measure a View relative to its `AppProvider`.
   *
   * **Note:** Prefer using `View.onLayout` if you don't need X and Y
   * coordinates of View relative to `AppProvider`.
   *
   * @param ref Reference to the View to measure.
   * @param callback Function called once the View has been measured
   * (not returned directly because of limitations of React Native).
   */
  measure: (ref: View, callback: MeasureLayoutOnSuccessCallback) => void
}

export interface AppProviderSizeProviderProps {
  children: React.ReactNode
}

// Default layout, use window size by default...
const LAYOUT_DEFAULT: LayoutRectangle = { ...Dimensions.get('window'), x: 0, y: 0 }

const SizeContext = React.createContext<SizeProvider>({ layout: LAYOUT_DEFAULT, measure: () => {} })

/**
 * Supply size of AppProvider and ability to get view position relative to AppProvider.
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

/**
 * Provide dimensions of `AppProvider`. X and Y positions are relative to Window.
 */
export const useAppProviderDimensions = (): LayoutRectangle => useContext(SizeContext).layout

/**
 * Provides position of a View in `AppProvider`. First render will return `null` and correct
 * layout will be returned after Native layout pass has been performed.
 *
 * Prefer usage of `View.onLayout` prop, which is more performant. Use only if necessary to
 * obtain View position relative to `AppProvider`.
 *
 * @param ref Reference to the View to measure.
 */
export const usePositionInAppProvider = (ref: View | null): LayoutRectangle | null => {
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
