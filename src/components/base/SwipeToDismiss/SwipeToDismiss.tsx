import React, { useState, useCallback, useMemo } from 'react'
import { Animated, LayoutRectangle, ViewProps, PanResponder } from 'react-native'

export interface SwipeToDismissProps {
  children: React.ReactNode
  onSwiped: (layout: LayoutRectangle) => void
}

/**
 * Component used for Swipe-to-dismiss feature. Only animate translation of view and doesn't collapse it.
 * If you want collapsing, implement it in view needing it, as since we need to animate height to collapse
 * the inner component, `overflow: hidden` needs to be set, which isn't possible with components such as Card,
 * because Card's shadow would not be visible.
 */
export const SwipeToDismiss: React.FC<SwipeToDismissProps> = ({ children, onSwiped }) => {
  const [translate] = useState(new Animated.Value(0))
  const [swiped, setSwiped] = useState(false)
  const [layout, setLayout] = useState<null | LayoutRectangle>(null)

  const onLayout = useCallback<Required<ViewProps>['onLayout']>(
    event => setLayout(event.nativeEvent.layout),
    [],
  )

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
          translate.setValue(Math.max(0, gestureState.dx))
        },
        onPanResponderRelease: (event, gestureState) => {
          const shouldDismiss = gestureState.vx >= 0.5

          // Replace to original position or dismiss
          Animated.spring(translate, {
            tension: 8,
            friction: 8,
            overshootClamping: true,
            useNativeDriver: true,
            toValue: shouldDismiss ? layout?.width ?? 0 : 0,
            velocity: gestureState.vx,
            // Customize rest thresholds so animation ends more swiftly
            restSpeedThreshold: 10,
            restDisplacementThreshold: 10,
          }).start(({ finished }) => {
            if (finished && shouldDismiss) {
              setSwiped(true)
              onSwiped(layout ?? { x: 0, y: 0, height: 0, width: 0 })
            }
          })
        },
      }),
    [layout],
  )

  return (
    <Animated.View
      style={{ transform: [{ translateX: translate }] }}
      onLayout={swiped ? undefined : onLayout} // Don't listen to layout changes once swiped, if user want to animate more
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  )
}
