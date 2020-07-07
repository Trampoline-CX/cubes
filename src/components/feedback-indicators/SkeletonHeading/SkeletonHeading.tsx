import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Box } from '../../structure/Box/Box'
import { shameStyles } from '../../../theme/shame-styles'
import { SkeletonBodyText } from '../SkeletonBodyText/SkeletonBodyText'

export type SkeletonHeadingProps = Record<string, never>

/**
 * Gives a low fidelity representation of a `Heading`.
 */
export const SkeletonHeading: React.FC<SkeletonHeadingProps> = () => (
  <Box padding="medium">
    <View style={styles.bodyTextContainer}>
      <SkeletonBodyText />
    </View>
  </Box>
)

const styles = StyleSheet.create({
  bodyTextContainer: {
    width: shameStyles.skeletonHeading.width,
  },
})
