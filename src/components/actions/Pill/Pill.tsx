import React from 'react'
import { View } from 'react-native'
import { useStyles } from '../../../theme'
import { Touchable } from '../../base/Touchable/Touchable'
import { BodyText } from '../../text/BodyText/BodyText'

export interface PillProps {
  /**
   * Set to `true` to highlight this Pill and make it stand out.
   */
  highlight?: boolean
  /**
   * Action triggered on click.
   *
   * If this is not set, there will still be touch feedback, but no action will be performed.
   * Optional mainly for mockup purposes.
   */
  onClick?: () => void
  /**
   * Text of the Pill.
   */
  children: string
}

/**
 * Display quick actions such as data filters.
 */
export const Pill: React.FC<PillProps> = ({
  children,
  onClick = () => {}, // Defaults to empty action, to keep touch feedback
  highlight = false,
}) => {
  const styles = useStyles(theme => ({
    bounds: {
      borderRadius: theme.radius.circle,
      overflow: 'hidden',
    },
    container: {
      backgroundColor: theme.colors.fill.background.lighter,
      borderColor: theme.colors.fill.divider,
      borderWidth: theme.border.thinner,
      borderRadius: theme.radius.circle,

      paddingVertical: theme.spacing.xSmall - theme.border.small,
      paddingHorizontal: theme.spacing.medium,
    },
    containerHighlighted: {
      backgroundColor: theme.colors.fill.secondary.lighter,
      borderColor: theme.colors.fill.secondary.default,
    },
  }))

  return (
    <Touchable viewStyle={styles.bounds} onClick={onClick}>
      <View style={[styles.container, highlight && styles.containerHighlighted]}>
        <BodyText>{children}</BodyText>
      </View>
    </Touchable>
  )
}
