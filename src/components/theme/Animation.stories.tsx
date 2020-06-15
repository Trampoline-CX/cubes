import React, { useContext, useState, useEffect, useCallback } from 'react'
import { View, Animated } from 'react-native'
import { fileAbsolute } from 'paths.macro'
import { Stack } from '../structure/Stack/Stack'
import { Centered } from '../../storybook/decorators/Centered'
import { useStyles, ThemeContext, Theme } from '../../theme'
import { Heading } from '../text/Heading/Heading'
import { getStoryTitle } from '../../storybook/get-story-title'

export default {
  title: getStoryTitle(fileAbsolute),
  decorators: [Centered],
}

export const Example: React.FC = () => <AnimatedSquare duration="shorter" easing="move" />

export const Duration: React.FC = () => {
  const theme = useContext(ThemeContext)
  return (
    <Stack space="medium">
      <Heading>Shorter Duration ({theme.animation.duration.shorter}ms)</Heading>
      <AnimatedSquare duration="shorter" easing="move" />

      <Heading>Default Duration ({theme.animation.duration.default}ms)</Heading>
      <AnimatedSquare duration="default" easing="move" />

      <Heading>Longer Duration ({theme.animation.duration.longer}ms)</Heading>
      <AnimatedSquare duration="longer" easing="move" />
    </Stack>
  )
}

export const Easing: React.FC = () => (
  <Stack space="medium">
    <Heading>Move Easing</Heading>
    <AnimatedSquare duration="longer" easing="move" />

    <Heading>Enter Easing</Heading>
    <AnimatedSquare duration="longer" easing="enter" />

    <Heading>Exit Easing</Heading>
    <AnimatedSquare duration="longer" easing="exit" />
  </Stack>
)

// ---
interface SquareProps {
  duration: keyof Theme['animation']['duration']
  easing: keyof Theme['animation']['easing']
}

const AnimatedSquare: React.FC<SquareProps> = ({ duration, easing }) => {
  const [anim] = useState(new Animated.Value(0))
  const [reset, setReset] = useState(false)
  const styles = useStyles(theme => ({
    root: {
      width: 256,
    },
    square: {
      width: 56,
      height: 56,

      backgroundColor: theme.colors.fill.primary.default,
    },
  }))
  const { animation } = useContext(ThemeContext)

  // Reset animation every second
  useInterval(
    useCallback(() => setReset(prev => !prev), []),
    1000,
  )

  useEffect(() => {
    anim.stopAnimation()
    anim.setValue(0)

    Animated.timing(anim, {
      duration: animation.duration[duration],
      toValue: 1,
      easing: animation.easing[easing],
      useNativeDriver: true,
    }).start()
  }, [animation, duration, easing, reset])

  return (
    <View style={styles.root}>
      <Animated.View
        style={[
          styles.square,
          {
            transform: [
              { translateX: anim.interpolate({ inputRange: [0, 1], outputRange: [0, 200] }) },
            ],
          },
        ]}
      />
    </View>
  )
}

const useInterval = (callback: () => void, delay: number): void => {
  // Set up the interval.
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(callback, delay)
      return () => clearInterval(id)
    } else {
      return () => {}
    }
  }, [delay, callback])
}
