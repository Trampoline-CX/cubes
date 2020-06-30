import React from 'react'
import { Text } from 'react-native'
import { useTextStyles } from '../use-text-styles'
import { TextProps } from '../TextProps'
import { TextStyle } from '../TextStyle/TextStyle'

export interface HeadingProps extends TextProps {
  /**
   * Element to use for HTML rendering **(Web only)**
   */
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
}

/**
 * Used as titles of major sections or screens.
 *
 * > For example, `Card` components generally use `Heading` as their title.
 */
export const Heading: React.FC<HeadingProps> = ({
  children,
  element = 'p',
  textAlign,
  variation,
  maxLines,
  testID,
  accessibilityLabel,
}) => {
  const { textStyles } = useTextStyles()

  return (
    <Text
      accessibilityRole={element.startsWith('h') ? 'header' : undefined}
      aria-level={element.startsWith('h') ? element[1] : undefined}
      style={[textStyles.heading, { textAlign }]}
      numberOfLines={maxLines}
      ellipsizeMode="tail"
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      {variation ? <TextStyle variation={variation}>{children}</TextStyle> : children}
    </Text>
  )
}
