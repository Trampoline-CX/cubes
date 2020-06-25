import _ from 'lodash'
import React, { useCallback, useState, useMemo } from 'react'
import { LayoutRectangle, ViewProps, View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { useStyles } from '../../../theme'
import { useAppProviderDimensions } from '../../dev/SizeProvider/AppProviderSizeProvider'
import {
  PopoverPlacement,
  isLeft,
  isRight,
  isStart,
  isEnd,
  isTop,
  isBottom,
} from './popover-placement'

export interface PopoverViewProps {
  children: React.ReactNode
  placement: PopoverPlacement
  matchWidth: boolean
  anchorLayout: LayoutRectangle
}

export const PopoverView: React.FC<PopoverViewProps> = ({
  children,
  placement,
  matchWidth,
  anchorLayout,
}) => {
  const styles = useStyles(theme => ({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      alignItems: 'flex-start',
    },
    popover: {
      backgroundColor: theme.colors.fill.background.lighter,
      ...theme.elevation.z8,
    },
    popoverNotYetLayout: {
      opacity: 0,
    },
    popoverMatchWidth: {
      left: 0,
      right: 0,
    },
  }))
  const insets = useSafeArea()
  const { width: windowWidth, height: windowHeight } = useAppProviderDimensions()

  const [layout, setLayout] = useState<LayoutRectangle | null>(null)
  const onLayout = useCallback<Required<ViewProps>['onLayout']>(
    ({ nativeEvent }) => setLayout(nativeEvent.layout),
    [setLayout],
  )

  // Calculate the offset of the Popover relative to parent according to placement
  const placementOffset = usePlacementOffset(placement, layout, anchorLayout)

  // Corrects the placement to be inside window bounds
  const correctedPlacementOffset = useOffsetsCorrectionToBeInWindow(
    placementOffset,
    layout,
    anchorLayout,
    windowWidth,
    windowHeight,
  )

  return (
    <View
      style={[
        styles.container,
        {
          width: windowWidth - insets.left - insets.right,
          height: windowHeight - insets.top - insets.bottom,
        },
        {
          marginTop: insets.top,
          marginBottom: insets.bottom,
          marginLeft: insets.left,
          marginRight: insets.right,
        },
      ]}
      pointerEvents="box-none" // Children views can receive touches but not this View
    >
      <View
        style={[
          styles.popover,
          layout === null
            ? styles.popoverNotYetLayout
            : {
                transform: [
                  { translateY: correctedPlacementOffset.y },
                  { translateX: correctedPlacementOffset.x },
                ],
              },
          { maxWidth: windowWidth, maxHeight: windowHeight },
          matchWidth ? { width: anchorLayout.width } : null,
        ]}
        onLayout={onLayout}
      >
        {children}
      </View>
    </View>
  )
}

const usePlacementOffset = (
  placement: PopoverPlacement,
  popoverLayout: LayoutRectangle | null,
  anchorLayout: LayoutRectangle,
): Offset =>
  useMemo(
    () => ({
      x: isLeft(placement)
        ? -(popoverLayout?.width ?? 0)
        : isRight(placement)
        ? anchorLayout.width
        : isStart(placement)
        ? 0
        : isEnd(placement)
        ? -(popoverLayout?.width ?? 0) + anchorLayout.width
        : (anchorLayout.width - (popoverLayout?.width ?? 0)) / 2, // Top or bottom centered
      y: isTop(placement)
        ? -(popoverLayout?.height ?? 0)
        : isBottom(placement)
        ? anchorLayout?.height ?? 0
        : isStart(placement)
        ? 0
        : isEnd(placement)
        ? -(popoverLayout?.height ?? 0) + anchorLayout.height
        : (anchorLayout.height - (popoverLayout?.height ?? 0)) / 2, // Left or right centered
    }),
    [placement, popoverLayout, anchorLayout],
  )

const useOffsetsCorrectionToBeInWindow = (
  offset: Offset,
  popoverLayout: LayoutRectangle | null,
  anchorLayout: LayoutRectangle,
  windowWidth: number,
  windowHeight: number,
): Offset =>
  useMemo(() => {
    if (popoverLayout === null) {
      return { x: 0, y: 0 }
    }

    return {
      x: _.clamp(offset.x, -anchorLayout.x, -anchorLayout.x + windowWidth - popoverLayout.width),
      y: _.clamp(offset.y, -anchorLayout.y, -anchorLayout.y + windowHeight - popoverLayout.height),
    }
  }, [popoverLayout, anchorLayout, offset, windowWidth, windowHeight])

interface Offset {
  x: number
  y: number
}
