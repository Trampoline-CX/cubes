import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Skeleton } from '../Skeleton/Skeleton'
import { useStyles } from '../../../theme'
import { useTextStyles } from '../../text/use-text-styles'
import { shameStyles } from '../../../theme/shame-styles'

export interface SkeletonBodyTextProps {
  /**
   * Number of placeholder lines to display.
   */
  lines?: number
}

/**
 * Skeleton component acting as a placeholder for `BodyText`.
 */
export const SkeletonBodyText: React.FC<SkeletonBodyTextProps> = ({ lines = 1 }) => {
  const styles = useStyles(theme => ({
    skeleton: {
      borderRadius: theme.radius.small,
      height: shameStyles.skeletonBodyText.height,
    },
  }))
  const { textStyles } = useTextStyles()
  const spaceHeight = (textStyles.body.lineHeight - shameStyles.skeletonBodyText.height) / 2

  const skeletons = useMemo(() => {
    const result = []

    for (let i = 0; i < lines; i++) {
      result.push(
        <View key={i} style={{ paddingVertical: spaceHeight }}>
          <Skeleton style={styles.skeleton} />
        </View>,
      )
    }

    return result
  }, [lines])

  return <View>{skeletons}</View>
}
