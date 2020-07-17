import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Animated, LayoutRectangle, ViewProps, PanResponder } from 'react-native'
import { useStyles, useTheme } from '../../../../theme'

export type SwipeableSheetFromProp = 'bottom' | 'left' | 'right'

export interface SwipeableSheetProps {
  open: boolean
  children: React.ReactNode
  from: SwipeableSheetFromProp
  onHidden: () => void
}

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
  from,
  onHidden: onHiddenRaw,
}) => {
  const styles = useStyles(theme => ({
    sheet: {
      backgroundColor: theme.colors.fill.background.lighter,
      ...theme.elevation.z16,
    },
    sheetBottom: {
      borderTopLeftRadius: theme.radius.large,
      borderTopRightRadius: theme.radius.large,
    },
  }))

  const hiddenTranslate = getHiddenTranslate(from)
  const animatedProp = getAnimatedProp(from)
  const dimensionProp = getDimensionProp(from)
  const moveProp = getMoveProp(from)
  const velocityProp = getVelocityProp(from)
  const reverse = isReverse(from)

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
          translate.setValue(Math[reverse ? 'min' : 'max'](0, gestureState[moveProp]))
        },
        onPanResponderRelease: (event, gestureState) => {
          const shouldDismiss = reverse
            ? gestureState[velocityProp] <= -0.5
            : gestureState[velocityProp] >= 0.5

          // Replace to original position or dismiss
          Animated.spring(translate, {
            ...springAnimationConfig,
            toValue: shouldDismiss ? (layout?.[dimensionProp] ?? 0) * (reverse ? -1 : 1) : 0,
            velocity: gestureState[velocityProp],
          }).start(({ finished }) => (finished && shouldDismiss ? onHidden() : undefined))
        },
      }),
    [layout, moveProp, velocityProp, dimensionProp],
  )

  // Wait to be layouted to bring view into view.
  useEffect(() => {
    // We check layout height and width as they become 0 when modal gets hidden
    if (layout && layout.width > 0 && layout.height > 0) {
      const closedTranslateValue = layout[dimensionProp] * (reverse ? -1 : 1)

      if (open) {
        // When showing view, if we have layout set, animate, otherwise, just make sure view is hidden.
        if (layout) {
          translate.setValue(closedTranslateValue)
          Animated.spring(translate, {
            ...springAnimationConfig,
            toValue: 0,
          }).start()
        }
      } else {
        // When hiding view
        Animated.spring(translate, {
          ...springAnimationConfig,
          toValue: closedTranslateValue,
        }).start(({ finished }) => (finished ? onHidden() : undefined))
      }
    }
  }, [open, layout, dimensionProp])

  return (
    <Animated.View
      style={[
        styles.sheet,
        from === 'bottom' && styles.sheetBottom,
        {
          transform: [{ [animatedProp]: translate }],
          elevation: translate.interpolate({
            inputRange: [0, layout?.[dimensionProp] ?? 0],
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

const getHiddenTranslate = (from: SwipeableSheetFromProp): number =>
  9999999 * (from === 'bottom' || from === 'right' ? 1 : -1)

const getVelocityProp = (from: SwipeableSheetFromProp): 'vx' | 'vy' =>
  from === 'left' || from === 'right' ? 'vx' : 'vy'

const getMoveProp = (from: SwipeableSheetFromProp): 'dx' | 'dy' =>
  from === 'left' || from === 'right' ? 'dx' : 'dy'

const getDimensionProp = (from: SwipeableSheetFromProp): 'width' | 'height' =>
  from === 'left' || from === 'right' ? 'width' : 'height'

const getAnimatedProp = (from: SwipeableSheetFromProp): 'translateX' | 'translateY' =>
  from === 'left' || from === 'right' ? 'translateX' : 'translateY'

const isReverse = (from: SwipeableSheetFromProp): boolean => from === 'left'
