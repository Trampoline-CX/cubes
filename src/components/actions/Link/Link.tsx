import React from 'react'
import { Text, TextStyle } from 'react-native'
import { useTheme } from '../../../theme'

export interface LinkProps {
  /**
   * Text of the link.
   */
  children: string
  /**
   * Color of the link.
   */
  color?: 'accent' | 'subdued'
  /**
   * Action triggered on click.
   *
   * If this is not set, there will still be touch feedback, but no action will be performed.
   * Optional mainly for mockup purposes.
   */
  onClick?: () => void
}

/**
 * Let the user perform less important or less commonly used actions. Look a lot like a web link.
 */
export const Link: React.FC<LinkProps> = ({
  children,
  onClick = () => {}, // Defaults to empty action, to keep touch feedback
  color = 'accent',
}) => {
  const theme = useTheme()
  const labelStyles: TextStyle[] = [{ color: theme.colors.text[color] }]

  return (
    <Text style={labelStyles} onPress={onClick}>
      {children}
    </Text>
  )
}
