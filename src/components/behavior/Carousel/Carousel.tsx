/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 akveo.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @see https://github.com/akveo/react-native-ui-kitten/blob/master/src/components/ui/viewPager/viewPager.component.tsx
 */
import React, { useMemo, useRef, useEffect, useCallback } from 'react'
import { Animated, PanResponder, StyleSheet, StyleProp, ViewStyle, View } from 'react-native'
import _ from 'lodash'
import { useUncontrolledState } from '../../../utils/hooks/use-uncontrolled-state'
import { useOnLayout } from '../../../utils/hooks/use-on-layout'
import { useTheme } from '../../../theme'
import { Slide, SlideProps } from './Slide/Slide'

export interface CarouselProps {
  /**
   * Index of the currently selected Slide.
   */
  selectedIndex?: number
  /**
   * Called when a new Slide is selected.
   */
  onSelect?: (index: number) => void
  /**
   * Slides to present in the Carousel.
   */
  children: React.ReactNode
  /**
   * Additional styles for the view.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * A view containing swipeable pages to present different content types, like photos, or tutorial steps.
 */
export const Carousel: React.FC<CarouselProps> & { Slide: typeof Slide } = ({
  selectedIndex: selectedIndexRaw = 0,
  onSelect: onSelectRaw,
  children,
  style,
}) => {
  const contentOffset = useRef(new Animated.Value(0)).current
  const contentOffsetValue = useRef(0)

  const [selectedIndex, onSelect] = useUncontrolledState(selectedIndexRaw, onSelectRaw)
  const [layout, onLayout] = useOnLayout()
  const childCount = React.Children.count(children)
  const contentWidth = layout ? layout.width / childCount : 0
  const { animation } = useTheme()

  // Keep track of animation value to recalculate selected index
  useEffect(() => {
    contentOffset.addListener(({ value }) => {
      contentOffsetValue.current = value
    })
  }, [])

  /**
   * Scroll to an offset. Velocity can be set to use a spring animation, useful when swiping.
   */
  const scrollToOffset = useCallback(
    (offset: number, animated = false, velocity = 0) => {
      const anim =
        velocity > 0 && animated
          ? Animated.spring(contentOffset, {
              toValue: offset,
              velocity,
              useNativeDriver: true,
              overshootClamping: true,
              restDisplacementThreshold: 10,
              restSpeedThreshold: 10,
            })
          : Animated.timing(contentOffset, {
              toValue: offset,
              easing: animation.easing.move,
              duration: animated ? animation.duration.default : 0,
              useNativeDriver: true,
            })

      anim.start(() => {
        const index = Math.round(-contentOffsetValue.current / contentWidth)

        if (contentWidth > 0 && index !== selectedIndex) {
          onSelect(index)
        }
      })
    },
    [selectedIndex, onSelect, contentOffsetValue.current, contentWidth],
  )
  const scrollToIndex = useCallback(
    (index: number, animated = false, velocity = 0) => {
      const offset = -contentWidth * _.clamp(index, 0, childCount - 1)
      scrollToOffset(offset, animated, velocity)
    },
    [contentWidth, childCount, scrollToOffset],
  )

  useEffect(() => {
    scrollToIndex(selectedIndex)
  }, [contentWidth, childCount, selectedIndex])

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (event, state) => {
          const isHorizontalMove = Math.abs(state.dx) > Math.abs(state.dy)

          if (isHorizontalMove) {
            const nextSelectedIndex = selectedIndex - Math.sign(state.dx)

            // Handle touch if next index would be inside bounds
            return nextSelectedIndex >= 0 && nextSelectedIndex < childCount
          } else {
            return false
          }
        },
        onPanResponderMove: (event, state) => {
          const selectedPageOffset = selectedIndex * -contentWidth
          contentOffset.setValue(
            _.clamp(state.dx + selectedPageOffset, -contentWidth * (childCount - 1), 0),
          )
        },
        onPanResponderRelease: (event, state) => {
          // If velocity or current move is large enough to go to left or right index
          if (Math.abs(state.vx) >= 0.5 || Math.abs(state.dx) >= 0.5 * contentWidth) {
            const index = state.dx > 0 ? selectedIndex - 1 : selectedIndex + 1
            scrollToIndex(index, true, Math.abs(state.vx))
          } else {
            // Velocity or movement is not enough, come back to current index
            scrollToIndex(selectedIndex, true, Math.abs(state.vx))
          }
        },
      }),
    [childCount, contentWidth, selectedIndex, scrollToIndex],
  )

  return (
    <View style={styles.hideOverflow}>
      <Animated.View
        style={[
          styles.container,
          style,
          { width: `${100 * childCount}%`, transform: [{ translateX: contentOffset }] },
        ]}
        onLayout={onLayout}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  hideOverflow: {
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
  },
})

export type CarouselSlideProps = SlideProps
Carousel.Slide = Slide
