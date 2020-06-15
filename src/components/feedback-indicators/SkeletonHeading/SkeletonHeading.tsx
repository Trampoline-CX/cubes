import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Box } from '../../structure/Box/Box'
import { shameStyles } from '../../../theme/shame-styles'
import { SkeletonBodyText } from '../SkeletonBodyText/SkeletonBodyText'

/**
 * Skeleton component acting as a placeholder for `Heading`.
 */
export const SkeletonHeading: React.FC = () => (
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
