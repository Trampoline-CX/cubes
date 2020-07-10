import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Animated, LayoutRectangle, ViewProps, PanResponder } from 'react-native'
import { useTheme } from '../../../theme'

export interface SwipeableProps {
  children: React.ReactNode
  onSwiped: () => void
}

const springAnimationConfig: Partial<Animated.SpringAnimationConfig> = {
  velocity: 4,
  tension: 8,
  friction: 8,
  overshootClamping: true,
  useNativeDriver: true,
}

/**
 * Component acting as the Sheet and handling Animations + Swipe.
 */
export const Swipeable: React.FC<SwipeableProps> = ({ children, onSwiped }) => {
  const [translate] = useState(new Animated.Value(0))
  const [shrink] = useState(new Animated.Value(0))
  const [collapsing, setCollapsing] = useState(false)
  const [layout, setLayout] = useState<null | LayoutRectangle>(null)
  const { animation } = useTheme()

  const onLayout = useCallback<Required<ViewProps>['onLayout']>(
    event => setLayout(event.nativeEvent.layout),
    [],
  )

  const collapse = useCallback(() => {
    setCollapsing(true)
    Animated.timing(shrink, {
      toValue: 0,
      duration: animation.duration.default,
      easing: animation.easing.exit,
    }).start(onSwiped)
  }, [onSwiped])

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: event => {
          event.bubbles = false
          return true
        },
        onPanResponderMove: (event, gestureState) => {
          translate.setValue(Math.max(0, gestureState.dx))
        },
        onPanResponderRelease: (event, gestureState) => {
          const shouldDismiss = gestureState.vx >= 0.5

          // Replace to original position or dismiss
          Animated.spring(translate, {
            ...springAnimationConfig,
            toValue: shouldDismiss ? layout?.width ?? 0 : 0,
            velocity: gestureState.vx,
            // Customize rest thresholds so animation ends more swiftly
            restSpeedThreshold: 100,
            restDisplacementThreshold: 40,
          }).start(({ finished }) => (finished && shouldDismiss ? collapse() : undefined))
        },
      }),
    [layout],
  )

  useEffect(() => {
    shrink.setValue(layout?.height ?? 0)
  }, [layout])

  return (
    <Animated.View
      style={{ transform: [{ translateX: translate }] }}
      onLayout={collapsing ? undefined : onLayout}
      {...panResponder.panHandlers}
    >
      <Animated.View
        style={{
          overflow: 'hidden',
          height: layout ? shrink : undefined,
        }}
      >
        {children}
      </Animated.View>
    </Animated.View>
  )
}
