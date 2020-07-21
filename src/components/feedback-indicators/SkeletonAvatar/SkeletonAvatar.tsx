import React from 'react'
import { Skeleton } from '../Skeleton/Skeleton'
import { useStyles, Theme, useTheme } from '../../../theme'

export interface SkeletonAvatarProps {
  /**
   * Size of the Avatar.
   */
  size?: keyof Theme['size']['avatar']
}

/**
 * Gives a low fidelity representation of an `Avatar`.
 */
export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({ size: sizeRaw = 'default' }) => {
  const styles = useStyles(theme => ({
    skeleton: {
      borderRadius: theme.radius.medium,
    },
  }))
  const currentTheme = useTheme()
  const size = currentTheme.size.avatar[sizeRaw]

  return <Skeleton style={[styles.skeleton, { width: size, height: size }]} />
}
