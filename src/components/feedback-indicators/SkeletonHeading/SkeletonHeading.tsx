import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Box } from '../../structure/Box/Box'
import { shameStyles } from '../../../theme/shame-styles'
import { SkeletonBodyText } from '../SkeletonBodyText/SkeletonBodyText'

/**
 * Gives a low fidelity representation of a `Heading`.
 */
export const SkeletonHeading: React.FC = () => (
  <View style={styles.bodyTextContainer}>
    <SkeletonBodyText />
  </View>
)

const styles = StyleSheet.create({
  bodyTextContainer: {
    width: shameStyles.skeletonHeading.width,
  },
})
