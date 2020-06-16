import React from 'react'
import { Skeleton } from '../Skeleton/Skeleton'
import { useStyles } from '../../../theme'
import { useTextStyles } from '../../text/use-text-styles'
import { shameStyles } from '../../../theme/shame-styles'

export type SkeletonDisplayTextProps = Record<string, never>

/**
 * Skeleton component acting as a placeholder for `DisplayText`.
 */
export const SkeletonDisplayText: React.FC<SkeletonDisplayTextProps> = () => {
  const styles = useStyles(theme => ({
    skeleton: {
      borderRadius: theme.radius.small,
      width: shameStyles.skeletonDisplayText.width,
    },
  }))
  const { textStyles } = useTextStyles()

  return <Skeleton style={[styles.skeleton, { height: textStyles.display.lineHeight }]} />
}
