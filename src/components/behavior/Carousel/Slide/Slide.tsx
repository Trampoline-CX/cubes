import React from 'react'
import { View, StyleSheet } from 'react-native'

export interface SlideProps {
  /**
   * Slide content.
   */
  children: React.ReactNode
}

/**
 * Displays a single page (or slide) in a `Carousel`.
 */
export const Slide: React.FC<SlideProps> = ({ children }) => (
  <View style={styles.slide}>{children}</View>
)

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: '100%',
  },
})
