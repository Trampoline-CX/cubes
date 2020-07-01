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
   */
  onClick: () => void
}

/**
 * Let the user perform less important or less commonly used actions. Look a lot like a web link.
 */
export const Link: React.FC<LinkProps> = ({ children, onClick, color = 'accent' }) => {
  const theme = useTheme()
  const labelStyles: TextStyle[] = [{ color: theme.colors.text[color] }]

  return (
    <Text style={labelStyles} onPress={onClick}>
      {children}
    </Text>
  )
}
