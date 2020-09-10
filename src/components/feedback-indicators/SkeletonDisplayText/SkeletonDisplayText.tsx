import React from 'react'
import { Skeleton } from '../Skeleton/Skeleton'
import { useStyles } from '../../../theme'
import { useTextStyles } from '../../text/use-text-styles'
import { shameStyles } from '../../../theme/shame-styles'

/**
 * Gives a low fidelity representation of a `DisplayText`.
 */
export const SkeletonDisplayText: React.FC = () => {
  const styles = useStyles(theme => ({
    skeleton: {
      borderRadius: theme.radius.small,
      width: shameStyles.skeletonDisplayText.width,
    },
  }))
  const { textStyles } = useTextStyles()

  return <Skeleton style={[styles.skeleton, { height: textStyles.display.lineHeight }]} />
}
