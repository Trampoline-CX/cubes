import React from 'react'
import { Skeleton } from '../Skeleton/Skeleton'
import { useStyles } from '../../../theme'
import { shameStyles } from '../../../theme/shame-styles'

export type SkeletonAvatarProps = Record<string, never>

/**
 * Gives a low fidelity representation of an `Avatar`.
 */
export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = () => {
  const styles = useStyles(theme => ({
    skeleton: {
      borderRadius: theme.radius.medium,
      width: shameStyles.skeletonAvatar.size,
      height: shameStyles.skeletonAvatar.size,
    },
  }))

  return <Skeleton style={styles.skeleton} />
}
