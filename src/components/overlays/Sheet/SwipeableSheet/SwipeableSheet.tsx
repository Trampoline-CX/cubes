import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Animated, LayoutRectangle, ViewProps, PanResponder } from 'react-native'
import { useStyles, useTheme, Theme } from '../../../../theme'
import { DirectionHelper, SheetFromProp } from '../direction-helpers'

export interface SwipeableSheetProps {
  open: boolean
  children: React.ReactNode
  from: SheetFromProp
  directionHelper: DirectionHelper
  onHidden: () => void
  onTouchMove: (openedRatio: number) => void
  onTouchRelease: (dismiss: boolean) => void
}

const springAnimationConfig: Partial<Animated.SpringAnimationConfig> = {
  overshootClamping: true,
  useNativeDriver: true,
}

/**
 * Component acting as the Sheet and handling Animations + Swipe.
 */
export const SwipeableSheet: React.FC<SwipeableSheetProps> = ({
  open,
  children,
  from,
  directionHelper,
  onHidden: onHiddenRaw,
  onTouchMove,
  onTouchRelease,
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

  const [translate] = useState(new Animated.Value(directionHelper.offScreenTranslationValue))
  const [layout, setLayout] = useState<null | LayoutRectangle>(null)
  const onLayout = useCallback<Required<ViewProps>['onLayout']>(
    event => setLayout(event.nativeEvent.layout),
    [],
  )
  const currentTheme = useTheme()

  const onHidden = useCallback(() => {
    translate.setValue(directionHelper.offScreenTranslationValue) // Make sure Sheet won't be briefly visible if we show it again
    onHiddenRaw()
  }, [onHiddenRaw, directionHelper])

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: event => {
          event.bubbles = false
          return true
        },
        onPanResponderMove: (event, gestureState) => {
          translate.setValue(directionHelper.getTranslateValue(gestureState))

          const closedValue = layout ? directionHelper.getTranslationClosedValue(layout) : 0

          if (closedValue !== 0) {
            onTouchMove(1 - Math.abs(directionHelper.getTranslateValue(gestureState) / closedValue))
          }
        },
        onPanResponderRelease: (event, gestureState) => {
          const shouldDismiss = directionHelper.shouldDismiss(
            gestureState[directionHelper.velocityProp],
          )

          onTouchRelease(shouldDismiss)

          // Replace to original position or dismiss
          Animated.spring(translate, {
            ...springAnimationConfig,
            toValue:
              shouldDismiss && layout ? directionHelper.getTranslationClosedValue(layout) : 0,
            velocity: gestureState[directionHelper.velocityProp],
          }).start(({ finished }) => (finished && shouldDismiss ? onHidden() : undefined))
        },
      }),
    [layout, directionHelper, onTouchMove, onTouchRelease],
  )

  // Wait to be layouted to bring view into view.
  useEffect(() => {
    // We check layout height and width as they become 0 when modal gets hidden
    if (layout && layout.width > 0 && layout.height > 0) {
      const closedTranslateValue = directionHelper.getTranslationClosedValue(layout)

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
  }, [open, layout, directionHelper])

  return (
    <Animated.View
      style={[
        styles.sheet,
        from === 'bottom' && styles.sheetBottom,
        {
          transform: [{ [directionHelper.animatedProp]: translate }],
          elevation: translate.interpolate(
            getElevationInterpolationConfig(currentTheme, layout, directionHelper),
          ),
        },
      ]}
      {...panResponder.panHandlers}
      onLayout={onLayout}
    >
      {children}
    </Animated.View>
  )
}

const getElevationInterpolationConfig = (
  theme: Theme,
  layout: LayoutRectangle | null,
  directionHelper: DirectionHelper,
): Animated.InterpolationConfigType => {
  const closedValue = layout ? directionHelper.getTranslationClosedValue(layout) : 0

  // Input range must be sorted and outputRange need to be sorted according to it
  return closedValue >= 0
    ? {
        inputRange: [0, closedValue],
        outputRange: [theme.elevation.z16.elevation, 0],
      }
    : {
        inputRange: [closedValue, 0],
        outputRange: [0, theme.elevation.z16.elevation],
      }
}
