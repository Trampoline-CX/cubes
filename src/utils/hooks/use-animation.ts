import { useRef, useEffect } from 'react'
import { Animated } from 'react-native'

export const useAnimatedValue = (initialValue: number): Animated.Value => {
  const ref = useRef(new Animated.Value(initialValue))
  return ref.current
}

interface BaseAnimationConfig {
  initialValue?: number
}

export type TimingAnimationConfig = BaseAnimationConfig &
  ({ type: 'timing' } & Animated.TimingAnimationConfig)

export type SpringAnimationConfig = BaseAnimationConfig &
  ({ type: 'spring' } & Animated.SpringAnimationConfig)

export type UseAnimationConfig = TimingAnimationConfig | SpringAnimationConfig

const getInitialValue = (config: UseAnimationConfig): number => {
  if (typeof config.initialValue !== 'undefined') {
    return config.initialValue
  } else {
    return config.toValue as number // TODO deal with other types possibilities here
  }
}

/**
 * Returns an `Animated.Value` object initialized with the specified config.
 * Its initial value is either `initialValue` or if this is not provided, initial
 * `toValue` is used.
 *
 * When `toValue` value changes, an animation will run with the specified config.
 */
export const useAnimation = (config: UseAnimationConfig): Animated.Value => {
  const animatedValue = useAnimatedValue(getInitialValue(config))

  useEffect(() => {
    switch (config.type) {
      case 'timing':
        Animated.timing(animatedValue, config).start()
        break
      case 'spring':
        Animated.spring(animatedValue, config).start()
        break
      default:
        throw new Error('Unsupported animation type. Should be timing or spring.')
    }
  }, [config.toValue])

  return animatedValue
}
