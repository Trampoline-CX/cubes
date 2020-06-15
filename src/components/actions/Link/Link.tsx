import React, { useContext } from 'react'
import { Text, TextStyle } from 'react-native'
import { ThemeContext } from '../../../theme'

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
 * Component displaying an inline link, pretty much like web links.
 */
export const Link: React.FC<LinkProps> = ({ children, onClick, color = 'accent' }) => {
  const theme = useContext(ThemeContext)
  const labelStyles: TextStyle[] = [{ color: theme.colors.text[color] }]

  return (
    <Text style={labelStyles} onPress={onClick}>
      {children}
    </Text>
  )
}
