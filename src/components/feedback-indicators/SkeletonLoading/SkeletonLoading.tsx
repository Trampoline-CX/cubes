import React, { useState, useEffect } from 'react'
import { Animated, Easing } from 'react-native'
import { shameStyles } from '../../../theme/shame-styles'

export const SkeletonLoadingContext = React.createContext(new Animated.Value(0))

export interface SkeletonLoadingProps {
  /**
   * Set to `true` to enter loading state. All children `Skeleton` components will display a loading Shimmer if in loading state.
   */
  loading: boolean
  /**
   * Children component.
   */
  children: React.ReactNode
}

/**
 * Wraps other `Skeleton` components to control their loading state.
 */
export const SkeletonLoading: React.FC<SkeletonLoadingProps> = ({ loading, children }) => {
  const [anim] = useState(new Animated.Value(0))

  useEffect(() => {
    const animation = (toValue: number): Animated.CompositeAnimation =>
      Animated.timing(anim, {
        toValue,
        duration: shameStyles.skeletonLoading.animationDuration,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })

    if (loading) {
      anim.stopAnimation()
      Animated.loop(Animated.sequence([animation(1), animation(0)])).start()
    } else {
      anim.stopAnimation()
      animation(0).start()
    }
  }, [loading])

  return <SkeletonLoadingContext.Provider value={anim}>{children}</SkeletonLoadingContext.Provider>
}
