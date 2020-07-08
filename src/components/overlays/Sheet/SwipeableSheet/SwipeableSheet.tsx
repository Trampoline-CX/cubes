import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Animated, LayoutRectangle, ViewProps, PanResponder } from 'react-native'
import { useStyles, useTheme } from '../../../../theme'

export interface SwipeableSheetProps {
  children: React.ReactNode
  onSwiped: () => void
}

export const SwipeableSheet: React.FC<SwipeableSheetProps> = ({ children, onSwiped }) => {
  const styles = useStyles(theme => ({
    sheet: {
      backgroundColor: theme.colors.fill.background.lighter,
      borderTopLeftRadius: theme.radius.large,
      borderTopRightRadius: theme.radius.large,
      ...theme.elevation.z8,
    },
  }))

  const [translate] = useState(new Animated.Value(9999999))
  const [layout, setLayout] = useState<null | LayoutRectangle>(null)
  const onLayout = useCallback<Required<ViewProps>['onLayout']>(
    event => setLayout(event.nativeEvent.layout),
    [],
  )
  const currentTheme = useTheme()

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: event => {
          event.bubbles = false
          return true
        },
        onPanResponderMove: (event, gestureState) => {
          translate.setValue(Math.max(0, gestureState.dy))
        },
        onPanResponderRelease: (event, gestureState) => {
          const shouldDismiss = gestureState.vy >= 0.5

          // Replace to original position or dismiss
          Animated.spring(translate, {
            toValue: shouldDismiss ? layout?.height ?? 0 : 0,
            velocity: gestureState.vy,
            tension: 8,
            friction: 8,
            overshootClamping: true,
            useNativeDriver: true,
          }).start(shouldDismiss ? onSwiped : undefined)
        },
      }),
    [layout],
  )

  // Wait to be layouted to bring view into view.
  useEffect(() => {
    if (layout) {
      translate.setValue(layout.height)
      Animated.spring(translate, {
        toValue: 0,
        velocity: 4,
        tension: 8,
        friction: 12,
        overshootClamping: true,
        useNativeDriver: true,
      }).start()
    }
  }, [layout])

  return (
    <Animated.View
      style={[
        styles.sheet,
        {
          transform: [{ translateY: translate }],
          elevation: translate.interpolate({
            inputRange: [0, layout?.height ?? 0],
            outputRange: [currentTheme.elevation.z8.elevation, 0],
          }),
        },
      ]}
      {...panResponder.panHandlers}
      onLayout={onLayout}
    >
      {children}
    </Animated.View>
  )
}
