import React from 'react'
import { Text } from 'react-native'
import { useTextStyles } from '../use-text-styles'
import { TestProps } from '../../../utils/TestProps'

export interface HeadingProps extends TestProps {
  /**
   * Text or Text components (like `TextStyle`).
   */
  children: React.ReactNode
  /**
   * Element to use for HTML rendering **(Web only)**
   */
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  /**
   * Set a maximum number of lines. If text doesn't fit on these lines, the end of the text is ellipsized.
   */
  maxLines?: number
}

/**
 * Text with less emphasis than `DisplayText`, but more than `BodyText`.
 */
export const Heading: React.FC<HeadingProps> = ({
  children,
  element = 'p',
  maxLines,
  testID,
  accessibilityLabel,
}) => {
  const { textStyles } = useTextStyles()

  return (
    <Text
      accessibilityRole={element.startsWith('h') ? 'header' : undefined}
      aria-level={element.startsWith('h') ? element[1] : undefined}
      style={textStyles.heading}
      numberOfLines={maxLines}
      ellipsizeMode="tail"
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </Text>
  )
}
