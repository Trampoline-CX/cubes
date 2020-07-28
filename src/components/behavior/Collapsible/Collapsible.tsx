import React, { useEffect, useState, useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { useTheme } from '../../../theme'
import { useOnLayout } from '../../../utils/hooks/use-on-layout'

export interface CollapsibleProps {
  /**
   * Toggle the expanded state of the Collapsible.
   */
  open: boolean
  /**
   * Content that should be collapsible.
   */
  children: React.ReactNode
}

/**
 * Make long sections of information available in a block that can expand or collapse.
 *
 * Should not wrap views with shadows, as shadow will be clipped.
 */
export const Collapsible: React.FC<CollapsibleProps> = ({ open, children }) => {
  const isFirstEffect = useRef(true)
  const [animating, setAnimating] = useState(false)
  const [anim] = useState(new Animated.Value(open ? 1 : 0))
  const { animation } = useTheme()
  const [layout, onLayout] = useOnLayout()

  useEffect(() => {
    // Prevent animating the first effect (on mount)
    if (isFirstEffect.current) {
      isFirstEffect.current = false
      return
    }

    setAnimating(true)
    Animated.timing(anim, {
      toValue: open ? 1 : 0,
      duration: animation.duration.default,
      useNativeDriver: false,
      easing: animation.easing.move,
    }).start(({ finished }) => (finished ? setAnimating(false) : undefined))
  }, [open])

  return (
    <Animated.View
      style={[
        styles.collapsible,
        {
          opacity: anim,
          height: animating
            ? anim.interpolate({ inputRange: [0, 1], outputRange: [0, layout?.height ?? 0] })
            : open || !layout
            ? undefined
            : 0,
        },
      ]}
      onLayout={animating || (!open && layout) ? undefined : onLayout}
    >
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  collapsible: {
    overflow: 'hidden',
  },
})
