import React from 'react'
import { Skeleton } from '../Skeleton/Skeleton'
import { useStyles } from '../../../theme'

export type SkeletonIconProps = Record<string, never>

/**
 * Skeleton acting as a placeholder for `Icon`.
 */
export const SkeletonIcon: React.FC<SkeletonIconProps> = () => {
  const styles = useStyles(theme => ({
    skeleton: {
      borderRadius: theme.radius.medium,
      width: theme.size.icon.default,
      height: theme.size.icon.default,
    },
  }))

  return <Skeleton style={styles.skeleton} />
}
