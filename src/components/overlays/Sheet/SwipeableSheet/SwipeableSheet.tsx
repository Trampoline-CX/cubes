import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Animated, LayoutRectangle, ViewProps, PanResponder } from 'react-native'
import { useStyles, useTheme } from '../../../../theme'

export interface SwipeableSheetProps {
  open: boolean
  children: React.ReactNode
  onHidden: () => void
}

const hiddenTranslate = 9999999

const springAnimationConfig: Partial<Animated.SpringAnimationConfig> = {
  overshootClamping: true,
  useNativeDriver: true,
  // Customize rest thresholds so animation ends more swiftly
  restSpeedThreshold: 1,
  restDisplacementThreshold: 0.1,
}

/**
 * Component acting as the Sheet and handling Animations + Swipe.
 */
export const SwipeableSheet: React.FC<SwipeableSheetProps> = ({
  open,
  children,
  onHidden: onHiddenRaw,
}) => {
  const styles = useStyles(theme => ({
    sheet: {
      backgroundColor: theme.colors.fill.background.lighter,
      borderTopLeftRadius: theme.radius.large,
      borderTopRightRadius: theme.radius.large,
      ...theme.elevation.z16,
    },
  }))

  const [translate] = useState(new Animated.Value(hiddenTranslate))
  const [layout, setLayout] = useState<null | LayoutRectangle>(null)
  const onLayout = useCallback<Required<ViewProps>['onLayout']>(
    event => setLayout(event.nativeEvent.layout),
    [],
  )
  const currentTheme = useTheme()

  const onHidden = useCallback(() => {
    translate.setValue(hiddenTranslate) // Make sure Sheet won't be briefly visible if we show it again
    onHiddenRaw()
  }, [onHiddenRaw])

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
            ...springAnimationConfig,
            toValue: shouldDismiss ? layout?.height ?? 0 : 0,
            velocity: gestureState.vy,
          }).start(({ finished }) => (finished && shouldDismiss ? onHidden() : undefined))
        },
      }),
    [layout],
  )

  // Wait to be layouted to bring view into view.
  useEffect(() => {
    // We check layout height and width as they become 0 when modal gets hidden
    if (layout && layout.width > 0 && layout.height > 0) {
      if (open) {
        // When showing view, if we have layout set, animate, otherwise, just make sure view is hidden.
        if (layout) {
          translate.setValue(layout.height)
          Animated.spring(translate, {
            ...springAnimationConfig,
            toValue: 0,
          }).start()
        }
      } else {
        // When hiding view
        Animated.spring(translate, {
          ...springAnimationConfig,
          toValue: layout.height,
        }).start(({ finished }) => (finished ? onHidden() : undefined))
      }
    }
  }, [open, layout])

  return (
    <Animated.View
      style={[
        styles.sheet,
        {
          transform: [{ translateY: translate }],
          elevation: translate.interpolate({
            inputRange: [0, layout?.height ?? 0],
            outputRange: [currentTheme.elevation.z16.elevation, 0],
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
