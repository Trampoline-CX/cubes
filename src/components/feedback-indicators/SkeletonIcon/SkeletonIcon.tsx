import React from 'react'
import { Skeleton } from '../Skeleton/Skeleton'
import { useStyles } from '../../../theme'

export type SkeletonIconProps = Record<string, never>

/**
 * Gives a low fidelity representation of an `Icon`.
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
