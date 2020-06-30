import React from 'react'
import { View } from 'react-native'
import { useStyles } from '../../../theme'
import { Caption } from '../../text/Caption/Caption'
import { TextStyle, TextStyleProps } from '../../text/TextStyle/TextStyle'

export interface BadgeProps {
  /**
   * Text shown in the badge.
   */
  children: string
  /**
   * Variation of the badge.
   */
  variation?: 'default' | 'warning'
}

/**
 * Used to inform the user about the status of an object or give additional non-critical information about it.
 */
export const Badge: React.FC<BadgeProps> = ({ children, variation = 'default' }) => {
  const styles = useStyles(theme => ({
    container: {
      backgroundColor: theme.colors.fill.background.darker,
      borderColor: theme.colors.fill.divider.default,
      borderWidth: theme.border.small,
      borderRadius: theme.radius.circle,

      paddingVertical: theme.spacing.xSmall - theme.border.small,
      paddingHorizontal: theme.spacing.small,
    },
    containerWarning: {
      backgroundColor: theme.colors.status.warning,
      borderWidth: theme.border.none,
    },
  }))

  const textVariation: TextStyleProps['variation'] | undefined =
    variation === 'default' ? 'subdued' : undefined

  return (
    <View style={[styles.container, variation === 'warning' && styles.containerWarning]}>
      <Caption>
        {textVariation ? <TextStyle variation={textVariation}>{children}</TextStyle> : children}
      </Caption>
    </View>
  )
}
