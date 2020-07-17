import React from 'react'
import { Skeleton } from '../Skeleton/Skeleton'
import { useStyles, useTheme } from '../../../theme'
import { IconSize } from '../../images-and-icons/Icon/Icon'

export interface SkeletonIconProps {
  /**
   * Icon size.
   */
  size?: IconSize
}

/**
 * Gives a low fidelity representation of an `Icon`.
 */
export const SkeletonIcon: React.FC<SkeletonIconProps> = ({ size: sizeRaw = 'default' }) => {
  const styles = useStyles(theme => ({
    skeleton: {
      borderRadius: theme.radius.medium,
    },
  }))
  const currentTheme = useTheme()
  const size = currentTheme.size.icon[sizeRaw]

  return <Skeleton style={[styles.skeleton, { width: size, height: size }]} />
}
